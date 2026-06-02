"""
ModalIn — AI Inference API
FastAPI microservice untuk Credit Scoring UMKM
"""

import os
import pickle
import warnings
import numpy as np
import tensorflow as tf
import keras
import shap
import google.generativeai as genai
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator

warnings.filterwarnings("ignore")

# ── Custom Layer ──────────────────────────────────────────────
class CreditScoringLayer(keras.layers.Layer):
    def __init__(self, units, dropout_rate=0.2, **kwargs):
        super().__init__(**kwargs)
        self.units        = units
        self.dropout_rate = dropout_rate
        self.dense        = keras.layers.Dense(units, activation="relu")
        self.bn           = keras.layers.BatchNormalization()
        self.dropout      = keras.layers.Dropout(dropout_rate)

    def call(self, inputs, training=False):
        x = self.dense(inputs)
        x = self.bn(x, training=training)
        return self.dropout(x, training=training)

    def get_config(self):
        cfg = super().get_config()
        cfg.update({"units": self.units, "dropout_rate": self.dropout_rate})
        return cfg


# ── Load artifacts ────────────────────────────────────────────
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
artifacts = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model & scaler saat server start."""
    print("⏳ Loading model artifacts...")

    artifacts["model"] = keras.models.load_model(
        os.path.join(MODEL_DIR, "modalin_model.keras"),
        custom_objects={"CreditScoringLayer": CreditScoringLayer},
    )
    with open(os.path.join(MODEL_DIR, "scaler.pkl"),        "rb") as f:
        artifacts["scaler"]      = pickle.load(f)
    with open(os.path.join(MODEL_DIR, "skor_scaler.pkl"),   "rb") as f:
        artifacts["skor_scaler"] = pickle.load(f)
    with open(os.path.join(MODEL_DIR, "label_encoder.pkl"), "rb") as f:
        artifacts["le"]          = pickle.load(f)
    with open(os.path.join(MODEL_DIR, "features.pkl"),      "rb") as f:
        artifacts["features"]    = pickle.load(f)

    # Pre-compute SHAP background dari data training sintetis
    # 10 titik background cukup untuk KernelExplainer — cepat & ringan
    rng = np.random.default_rng(42)
    background_raw = rng.standard_normal((10, len(artifacts["features"]))).astype(np.float32)
    artifacts["shap_background"] = background_raw

    # Inisialisasi Generative AI
    gemini_key = os.environ.get("GEMINI_API_KEY", "")
    if gemini_key:
        genai.configure(api_key=gemini_key)
        artifacts["genai_model"] = genai.GenerativeModel("gemini-2.0-flash")
        print("✅ Gemini AI loaded!")
    else:
        artifacts["genai_model"] = None
        print("⚠️  GEMINI_API_KEY tidak ditemukan — /advisor akan pakai fallback.")

    print("✅ Model loaded!")
    print(f"   Fitur   : {artifacts['features']}")
    print(f"   Kategori: {list(artifacts['le'].classes_)}")
    yield
    artifacts.clear()


# ── FastAPI App ───────────────────────────────────────────────
app = FastAPI(
    title       = "ModalIn AI API",
    description = "Microservice Credit Scoring UMKM — Capstone CC26-PSU259",
    version     = "1.1.0",
    lifespan    = lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["*"],
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)


# ── Schema ────────────────────────────────────────────────────
VALID_JENIS_USAHA = [
    "Bisnis Kuliner",
    "Jasa & Freelancer",
    "Produk Digital",
    "Produk Kreatif",
    "Toko & E-commerce",
]

class UMKMInput(BaseModel):
    omzet       : float = Field(..., gt=0,  description="Rata-rata omzet bulanan (Rp)")
    pengeluaran : float = Field(..., gt=0,  description="Rata-rata pengeluaran bulanan (Rp)")
    aset        : float = Field(..., gt=0,  description="Estimasi total aset usaha (Rp)")
    hutang      : float = Field(..., ge=0,  description="Total hutang (Rp)")
    freq_trx    : int   = Field(..., gt=0,  description="Frekuensi transaksi digital per bulan")
    lama_bln    : float = Field(..., gt=0,  description="Lama usaha berdiri (bulan)")
    jenis_usaha : str   = Field(...,        description=f"Kategori usaha: {VALID_JENIS_USAHA}")

    @validator("jenis_usaha")
    def validate_jenis_usaha(cls, v):
        if v not in VALID_JENIS_USAHA:
            raise ValueError(f"jenis_usaha harus salah satu dari: {VALID_JENIS_USAHA}")
        return v

    @validator("pengeluaran")
    def validate_pengeluaran(cls, v, values):
        if "omzet" in values and v >= values["omzet"]:
            raise ValueError("pengeluaran tidak boleh lebih besar atau sama dengan omzet")
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "omzet"      : 5000000,
                "pengeluaran": 3750000,
                "aset"       : 25000000,
                "hutang"     : 5000000,
                "freq_trx"   : 150,
                "lama_bln"   : 36,
                "jenis_usaha": "Bisnis Kuliner"
            }
        }


class SkorOutput(BaseModel):
    skor_kredit  : float
    status       : str
    probabilitas : dict
    fitur_hitung : dict
    pesan        : str


class AdvisorOutput(BaseModel):
    skor_kredit      : float
    status           : str
    rekomendasi_ai   : str
    fitur_dominan    : dict
    source           : str   # "gemini" | "fallback"


# ── Helpers ───────────────────────────────────────────────────
STATUS_MAP = {0: "Tidak Layak", 1: "Review", 2: "Layak"}
STATUS_MSG = {
    0: "Profil risiko tinggi. Disarankan perbaiki arus kas terlebih dahulu.",
    1: "Profil perlu ditinjau lebih lanjut. Ada potensi tapi perlu penguatan.",
    2: "Profil keuangan sehat. Layak mendapatkan akses permodalan.",
}

def hitung_fitur(data: UMKMInput) -> dict:
    laba_bersih = data.omzet - data.pengeluaran
    return {
        "margin_laba"    : (laba_bersih / data.omzet) * 100,
        "dar_ratio"      : data.hutang / (data.aset + 1),
        "oer_ratio"      : data.pengeluaran / (data.omzet + 1),
        "avg_trx_value"  : data.omzet / (data.freq_trx + 1),
        "laba_bersih"    : laba_bersih,
        "lama_bln"       : data.lama_bln,
        "freq_trx"       : data.freq_trx,
        "hutang"         : data.hutang,
        "jenis_usaha_enc": int(artifacts["le"].transform([data.jenis_usaha])[0]),
    }

def run_inference(data: UMKMInput):
    """Jalankan inferensi dan kembalikan skor, status, fitur."""
    fitur  = hitung_fitur(data)
    row    = np.array([[fitur[f] for f in artifacts["features"]]], dtype=np.float32)
    row_sc = artifacts["scaler"].transform(row)
    row_t  = tf.cast(row_sc, tf.float32)

    skor_norm, status_prob = artifacts["model"](row_t, training=False)

    skor_norm_val = float(skor_norm.numpy()[0][0])
    skor_asli     = float(
        artifacts["skor_scaler"].inverse_transform([[skor_norm_val]])[0][0]
    )
    skor_asli  = max(100.0, min(900.0, skor_asli))
    status_idx = int(np.argmax(status_prob.numpy()[0]))
    proba_dict = {
        STATUS_MAP[i]: round(float(p), 4)
        for i, p in enumerate(status_prob.numpy()[0])
    }
    return skor_asli, status_idx, proba_dict, fitur

def fitur_dominan(fitur: dict) -> dict:
    """Identifikasi 3 fitur terpenting secara rule-based (proxy SHAP)."""
    ranked = {
        "margin_laba" : fitur["margin_laba"],
        "dar_ratio"   : -fitur["dar_ratio"] * 100,   # negatif = lebih baik jika rendah
        "oer_ratio"   : -fitur["oer_ratio"] * 100,
        "freq_trx"    : fitur["freq_trx"] / 10,
        "lama_bln"    : fitur["lama_bln"] / 12,
    }
    top3 = dict(sorted(ranked.items(), key=lambda x: abs(x[1]), reverse=True)[:3])
    return {k: round(v, 4) for k, v in top3.items()}

FALLBACK_ADVICE = {
    2: (
        "Profil keuangan Anda dalam kondisi sehat. Pertahankan margin laba di atas 20%, "
        "jaga rasio hutang terhadap aset (DAR) di bawah 0.5, dan terus tingkatkan "
        "frekuensi transaksi digital untuk memperkuat rekam jejak kredit Anda. "
        "Anda berpotensi mengajukan pinjaman modal kerja hingga 3x omzet bulanan."
    ),
    1: (
        "Profil Anda memerlukan penguatan sebelum pengajuan kredit. Fokus pada "
        "peningkatan margin laba dengan menekan pengeluaran operasional, serta "
        "kurangi rasio hutang terhadap aset. Konsisten dalam transaksi digital "
        "selama 3-6 bulan ke depan akan meningkatkan skor kredit Anda secara signifikan."
    ),
    0: (
        "Profil risiko saat ini masih tinggi. Prioritaskan perbaikan arus kas: "
        "tingkatkan omzet atau kurangi pengeluaran agar margin laba minimal 15%. "
        "Lunasi hutang yang ada sebelum mengajukan kredit baru. "
        "Dengan konsistensi 6 bulan, skor kredit Anda dapat meningkat ke kategori Review."
    ),
}

def generate_advice_gemini(data: UMKMInput, skor: float, status_idx: int, fitur: dict) -> tuple[str, str]:
    """Generate rekomendasi menggunakan Gemini API. Return (teks, source)."""
    if artifacts.get("genai_model") is None:
        return FALLBACK_ADVICE[status_idx], "fallback"

    prompt = f"""Kamu adalah advisor keuangan UMKM Indonesia yang ahli di bidang kredit.

Data UMKM:
- Jenis Usaha   : {data.jenis_usaha}
- Omzet Bulanan : Rp {data.omzet:,.0f}
- Pengeluaran   : Rp {data.pengeluaran:,.0f}
- Total Aset    : Rp {data.aset:,.0f}
- Total Hutang  : Rp {data.hutang:,.0f}
- Freq Transaksi: {data.freq_trx} transaksi/bulan
- Lama Berdiri  : {data.lama_bln:.0f} bulan

Hasil Credit Scoring AI:
- Skor Kredit   : {skor:.0f} / 900
- Status        : {STATUS_MAP[status_idx]}
- Margin Laba   : {fitur['margin_laba']:.1f}%
- DAR Ratio     : {fitur['dar_ratio']:.3f}
- OER Ratio     : {fitur['oer_ratio']:.3f}

Berikan rekomendasi finansial yang spesifik, actionable, dan personal dalam 3-4 kalimat.
Gunakan bahasa Indonesia yang mudah dipahami pelaku UMKM.
Fokus pada langkah konkret untuk meningkatkan skor kredit mereka."""

    try:
        response = artifacts["genai_model"].generate_content(prompt)
        return response.text.strip(), "gemini"
    except Exception as e:
        print(f"⚠️ Gemini error: {e} — pakai fallback")
        return FALLBACK_ADVICE[status_idx], "fallback"


# ── Endpoints ─────────────────────────────────────────────────
@app.get("/", tags=["Info"])
def root():
    return {
        "service" : "ModalIn AI Credit Scoring API",
        "version" : "1.1.0",
        "status"  : "running",
        "endpoints": ["/predict", "/advisor", "/health"],
        "docs"    : "/docs",
    }


@app.get("/health", tags=["Info"])
def health_check():
    model_loaded = "model" in artifacts
    return {
        "status"       : "healthy" if model_loaded else "unhealthy",
        "model_loaded" : model_loaded,
        "genai_enabled": artifacts.get("genai_model") is not None,
    }


class ShapOutput(BaseModel):
    skor_kredit      : float
    status           : str
    shap_values      : dict   # {nama_fitur: shap_value}
    shap_abs_ranking : list   # [{"fitur": str, "kontribusi": float, "arah": str}]
    base_value       : float
    interpretasi     : str


@app.post("/predict", response_model=SkorOutput, tags=["Prediksi"])
def predict(data: UMKMInput):
    """
    Prediksi skor kredit UMKM berdasarkan data operasional.
    Mengembalikan skor 100-900, status kelayakan, dan probabilitas per kategori.
    """
    try:
        skor_asli, status_idx, proba_dict, fitur = run_inference(data)
        return SkorOutput(
            skor_kredit  = round(skor_asli, 1),
            status       = STATUS_MAP[status_idx],
            probabilitas = proba_dict,
            fitur_hitung = {k: round(v, 4) for k, v in fitur.items()},
            pesan        = STATUS_MSG[status_idx],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")


@app.post("/advisor", response_model=AdvisorOutput, tags=["Generative AI"])
def advisor(data: UMKMInput):
    """
    Credit Scoring + Rekomendasi Finansial berbasis Generative AI (Gemini).
    Menggabungkan hasil model DL dengan narasi rekomendasi yang dipersonalisasi
    menggunakan Google Gemini API sebagai fitur sekunder aplikasi ModalIn.
    """
    try:
        skor_asli, status_idx, _, fitur = run_inference(data)
        rekomendasi, source = generate_advice_gemini(data, skor_asli, status_idx, fitur)
        top_fitur = fitur_dominan(fitur)

        return AdvisorOutput(
            skor_kredit    = round(skor_asli, 1),
            status         = STATUS_MAP[status_idx],
            rekomendasi_ai = rekomendasi,
            fitur_dominan  = top_fitur,
            source         = source,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Advisor error: {str(e)}")


@app.post("/shap", response_model=ShapOutput, tags=["Explainable AI"])
def shap_explain(data: UMKMInput):
    """
    SHAP — Explainable AI untuk Credit Scoring ModalIn.

    Menggunakan KernelExplainer (model-agnostic) untuk menghitung
    Shapley Values: kontribusi nyata setiap fitur terhadap skor kredit.

    - **shap_values**: nilai kontribusi per fitur (positif = naikkan skor, negatif = turunkan)
    - **shap_abs_ranking**: fitur diurutkan dari yang paling berpengaruh
    - **base_value**: skor baseline jika semua fitur rata-rata
    """
    try:
        # 1. Hitung fitur dan jalankan prediksi
        skor_asli, status_idx, _, fitur = run_inference(data)

        # 2. Susun input array sesuai urutan FEATURES_FINAL
        features_list = artifacts["features"]
        row = np.array(
            [[fitur[f] for f in features_list]],
            dtype=np.float32
        )
        row_sc = artifacts["scaler"].transform(row)

        # 3. Wrapper model untuk SHAP (ambil output skor saja)
        def model_predict_skor(X):
            X_t = tf.cast(X.astype(np.float32), tf.float32)
            skor_norm, _ = artifacts["model"](X_t, training=False)
            # Inverse transform ke skala skor asli (100-900)
            vals = artifacts["skor_scaler"].inverse_transform(
                skor_norm.numpy()
            ).flatten()
            return np.clip(vals, 100.0, 900.0)

        # 4. Hitung SHAP values menggunakan KernelExplainer
        # Background = 10 titik acak yang sudah di-scale saat startup
        background_sc = artifacts["scaler"].transform(
            artifacts["shap_background"]
        )
        explainer   = shap.KernelExplainer(model_predict_skor, background_sc)
        shap_vals   = explainer.shap_values(row_sc, nsamples=200, silent=True)
        base_val    = float(explainer.expected_value)

        # shap_vals bisa nested list tergantung versi SHAP
        if isinstance(shap_vals, list):
            sv_arr = np.array(shap_vals[0]).flatten()
        else:
            sv_arr = np.array(shap_vals).flatten()

        # 5. Susun output per fitur
        shap_dict = {
            features_list[i]: round(float(sv_arr[i]), 4)
            for i in range(len(features_list))
        }

        # 6. Ranking absolut — fitur paling berpengaruh di urutan pertama
        FITUR_LABEL = {
            "margin_laba"    : "Margin Laba (%)",
            "dar_ratio"      : "Rasio Hutang/Aset (DAR)",
            "oer_ratio"      : "Rasio Pengeluaran/Omzet (OER)",
            "avg_trx_value"  : "Rata-rata Nilai Transaksi",
            "laba_bersih"    : "Laba Bersih",
            "lama_bln"       : "Lama Usaha Berdiri (bulan)",
            "freq_trx"       : "Frekuensi Transaksi Digital",
            "hutang"         : "Total Hutang",
            "jenis_usaha_enc": "Jenis Usaha",
        }
        ranking = sorted(
            [
                {
                    "fitur"       : FITUR_LABEL.get(f, f),
                    "fitur_key"   : f,
                    "kontribusi"  : round(float(sv_arr[i]), 4),
                    "arah"        : "positif ↑" if sv_arr[i] >= 0 else "negatif ↓",
                }
                for i, f in enumerate(features_list)
            ],
            key=lambda x: abs(x["kontribusi"]),
            reverse=True,
        )

        # 7. Buat kalimat interpretasi otomatis
        top    = ranking[0]
        bottom = next((r for r in ranking if r["arah"].startswith("negatif")), None)

        interpretasi = (
            f"Faktor terbesar yang {'meningkatkan' if top['arah'].startswith('positif') else 'menurunkan'} "
            f"skor kredit Anda adalah **{top['fitur']}** "
            f"(kontribusi {'+' if top['kontribusi'] >= 0 else ''}{top['kontribusi']*100:.1f} poin). "
        )
        if bottom:
            interpretasi += (
                f"Faktor yang paling menekan skor adalah **{bottom['fitur']}** "
                f"(kontribusi {bottom['kontribusi']*100:.1f} poin). "
            )
        interpretasi += (
            f"Skor baseline model adalah {base_val:.0f}, "
            f"dan profil Anda menghasilkan skor akhir {skor_asli:.0f}."
        )

        return ShapOutput(
            skor_kredit      = round(skor_asli, 1),
            status           = STATUS_MAP[status_idx],
            shap_values      = shap_dict,
            shap_abs_ranking = ranking,
            base_value       = round(base_val, 1),
            interpretasi     = interpretasi,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SHAP error: {str(e)}")
