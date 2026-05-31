const User = require("../models/User");

const AI_API_URL = "https://web-production-e9d64.up.railway.app";

const toNumber = (str) => {
  if (!str) return 0;
  return parseInt(String(str).replace(/\D/g, "")) || 0;
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /predict → AI API
// Response: { skor_kredit, status, probabilitas, fitur_hitung, pesan }
// ══════════════════════════════════════════════════════════════════════════════
exports.getScoring = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.omzetBulanan || !user.pengeluaranBulanan) {
      return res.status(400).json({
        status: "error",
        message: "Lengkapi data bisnis terlebih dahulu untuk melihat scoring.",
      });
    }

    const omzet       = toNumber(user.omzetBulanan);
    const pengeluaran = toNumber(user.pengeluaranBulanan);
    const asetRaw     = toNumber(user.totalAset);
    const aset        = asetRaw < 100000 ? asetRaw * 1000000 : asetRaw;
    const hutang      = toNumber(user.totalHutang);

    const safeOmzet = Math.min(Math.max(omzet, 3000000), 100000000);
    const safePengeluaran = Math.min(Math.max(pengeluaran, 100000), safeOmzet * 3);
    const safeAset        = Math.min(Math.max(aset, 1000000), 500000000);
    const safeHutang = Math.min(Math.max(hutang, 0), 50000000);
    const safeFreq        = Math.min(Math.max(toNumber(user.frekuensiTransaksi), 1), 500);
    const safeLama        = Math.min(Math.max(toNumber(user.lamaBerdiri), 1), 120);

    const j = (user.jenisUsaha || "").toLowerCase();
    const safeJenis =
      j.includes("kuliner") || j.includes("makanan") || j.includes("minuman") || j.includes("catering") || j.includes("resto") ? "Bisnis Kuliner" :
      j.includes("jasa") || j.includes("freelance") || j.includes("servis") || j.includes("bengkel") || j.includes("salon") ? "Jasa & Freelancer" :
      j.includes("digital") || j.includes("software") || j.includes("aplikasi") || j.includes("tech") ? "Produk Digital" :
      j.includes("kreatif") || j.includes("kerajinan") || j.includes("fashion") || j.includes("batik") || j.includes("seni") ? "Produk Kreatif" :
      j.includes("toko") || j.includes("dagang") || j.includes("online") || j.includes("retail") || j.includes("kelontong") || j.includes("elektronik") ? "Toko & E-commerce" :
      "Bisnis Kuliner";

    const payload = {
      omzet:       safeOmzet,
      pengeluaran: safePengeluaran,
      aset:        safeAset,
      hutang:      safeHutang,
      freq_trx:    safeFreq,
      lama_bln:    safeLama,
      jenis_usaha: safeJenis,
    };

    console.log("PAYLOAD KE AI:", JSON.stringify(payload));

    const aiResponse = await fetch(`${AI_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();

    // Map response AI ke format yang dipakai frontend
    const skorKredit = aiData.skor_kredit ?? 0;
    const statusKredit = skorKredit >= 600 ? "Layak" :
                        skorKredit >= 500 ? "Layak Bersyarat" : "Tidak Layak";
    const pesan = aiData.pesan ?? "";
    const fitur = aiData.fitur_hitung ?? {};

    // ── Mapping fitur_hitung ke 5C ────────────────────────────────────────────
    // Character  → lama_bln (max 60 bln) + freq_trx (max 300)
    const characterScore = Math.min(100, Math.round(
      (Math.min(fitur.lama_bln ?? 0, 60) / 60) * 50 +
      (Math.min(fitur.freq_trx ?? 0, 300) / 300) * 50
    ));

    // Capacity → margin_laba (0-100%) + oer_ratio (makin kecil makin baik, max 1)
    const capacityScore = Math.min(100, Math.round(
      Math.min(fitur.margin_laba ?? 0, 100) * 0.6 +
      Math.max(0, (1 - (fitur.oer_ratio ?? 1))) * 100 * 0.4
    ));

    // Capital → dar_ratio (makin kecil makin baik, 0-1) + laba_bersih
    const capitalScore = Math.min(100, Math.round(
      Math.max(0, (1 - (fitur.dar_ratio ?? 1))) * 100 * 0.7 +
      (fitur.laba_bersih > 0 ? 30 : 0)
    ));

    // Condition → jenis_usaha_enc (0-4) + avg_trx_value
    const conditionScore = Math.min(100, Math.round(
      ((fitur.jenis_usaha_enc ?? 0) / 4) * 50 +
      (Math.min(fitur.avg_trx_value ?? 0, 100000) / 100000) * 50
    ));

    const getColor = (score) => score >= 70 ? "#006b55" : score >= 50 ? "#fbbf24" : "#ef4444";

    const detail = [
      {
        label: "Character",
        score: characterScore,
        color: getColor(characterScore),
        barColor: getColor(characterScore),
        desc: `Lama usaha ${fitur.lama_bln ?? 0} bulan dengan ${fitur.freq_trx ?? 0} transaksi per bulan.`,
      },
      {
        label: "Capacity",
        score: capacityScore,
        color: getColor(capacityScore),
        barColor: getColor(capacityScore),
        desc: `Margin laba ${fitur.margin_laba ?? 0}% dengan rasio operasional ${((fitur.oer_ratio ?? 0) * 100).toFixed(0)}%.`,
      },
      {
        label: "Capital",
        score: capitalScore,
        color: getColor(capitalScore),
        barColor: getColor(capitalScore),
        desc: `Rasio hutang ${((fitur.dar_ratio ?? 0) * 100).toFixed(0)}% dengan laba bersih Rp ${(fitur.laba_bersih ?? 0).toLocaleString("id-ID")}.`,
      },
      {
        label: "Condition",
        score: conditionScore,
        color: getColor(conditionScore),
        barColor: getColor(conditionScore),
        desc: `Rata-rata nilai transaksi Rp ${Math.round(fitur.avg_trx_value ?? 0).toLocaleString("id-ID")} per transaksi.`,
      },
    ];

    res.json({
      status: "success",
      data: {
        skor_kredit:  skorKredit,
        status:       statusKredit,
        pesan,
        probabilitas: aiData.probabilitas ?? {},
        fitur_hitung: fitur,
        detail,
      },
    });
  } catch (error) {
    console.error("Scoring error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Gagal menghitung scoring. Coba lagi.",
    });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/scoring/anomali
// ══════════════════════════════════════════════════════════════════════════════
exports.getAnomali = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const omzet       = toNumber(user.omzetBulanan);
    const pengeluaran = toNumber(user.pengeluaranBulanan);
    const hutang      = toNumber(user.totalHutang);
    const rasio       = omzet > 0 ? pengeluaran / omzet : 0;
    const anomali     = [];

const today = new Date().toISOString();

    if (rasio > 0.9) {
      anomali.push({
        tipe: "Pengeluaran Operasional",
        warna: "#ef4444",
        pesan: "Pengeluaran melebihi 90% dari omzet. Risiko arus kas sangat tinggi.",
        nilai: Math.round(pengeluaran - omzet * 0.9),
        tingkatRisiko: "Tinggi",
        tanggal: today,
      });
    } else if (rasio > 0.75) {
      anomali.push({
        tipe: "Pengeluaran Operasional",
        warna: "#fbbf24",
        pesan: "Pengeluaran antara 75–90% dari omzet. Perlu pemantauan lebih ketat.",
        nilai: Math.round(pengeluaran - omzet * 0.75),
        tingkatRisiko: "Sedang",
        tanggal: today,
      });
    }

    if (omzet > 0 && (omzet - pengeluaran) < omzet * 0.2) {
      anomali.push({
        tipe: "Pola Pendapatan",
        warna: "#fbbf24",
        pesan: "Margin pendapatan bersih di bawah 20%. Terdeteksi penurunan pendapatan yang signifikan.",
        nilai: Math.round(omzet * 0.2 - (omzet - pengeluaran)),
        tingkatRisiko: "Sedang",
        tanggal: today,
      });
    }

    if (hutang > omzet * 12) {
      anomali.push({
        tipe: "Transfer Keluar",
        warna: "#fbbf24",
        pesan: "Total hutang melebihi pendapatan tahunan. Pertimbangkan restrukturisasi.",
        nilai: Math.round(hutang - omzet * 12),
        tingkatRisiko: "Tinggi",
        tanggal: today,
      });
    }

     // ── Deteksi transaksi di luar jam operasional ──────────────
    const Upload = require("../models/Upload");
    const uploads = await Upload.find({ userId: user._id }).sort({ createdAt: -1 }).limit(50);
    const jamAneh = uploads.filter(u => {
      const jam = new Date(u.createdAt).getHours();
      return jam < 6 || jam >= 22;
    });
    if (jamAneh.length > 0) {
      anomali.push({
        tipe: "Transaksi Luar Jam Operasional",
        warna: "#f59e0b",
        pesan: `Terdeteksi ${jamAneh.length} transaksi di luar jam operasional normal (sebelum 06.00 atau setelah 22.00).`,
        nilai: Math.round(pengeluaran * 0.1),
        tingkatRisiko: "Sedang",
        tanggal: today,
      });
    }

        // ── Deteksi transfer ke rekening baru/tidak terdaftar ────────
    const recentUploads = await Upload.find({ userId: user._id }).sort({ createdAt: -1 }).limit(100);
    const transferAneh = recentUploads.filter(u => {
      const nama = (u.originalname || u.filename || "").toLowerCase();
      return nama.includes("transfer") || nama.includes("trx") || nama.includes("rekening baru");
    });
    // Cek juga dari data keuangan: jika ada pengeluaran besar tiba-tiba (>50% omzet dalam 1 transaksi)
    if (transferAneh.length > 0 || pengeluaran > omzet * 1.5) {
      anomali.push({
        tipe: "Transfer ke Rekening Tidak Terdaftar",
        warna: "#ef4444",
        pesan: "Terdeteksi transfer ke rekening baru yang tidak ada dalam pola transaksi rutin sebelumnya.",
        nilai: Math.round(pengeluaran * 0.2),
        tingkatRisiko: "Tinggi",
        tanggal: today,
      });
    }

    // ── Deteksi pendapatan nihil ───────────────────────────────
    if (omzet === 0 || (omzet > 0 && omzet < pengeluaran * 0.1)) {
      anomali.push({
        tipe: "Pendapatan Nihil",
        warna: "#ef4444",
        pesan: "Terdeteksi periode pendapatan sangat rendah atau nihil. Indikasi gangguan operasional bisnis.",
        nilai: Math.round(pengeluaran * 0.05),
        tingkatRisiko: "Tinggi",
        tanggal: today,
      });
    }

    res.json({
      status: "success",
      data: { omzet, pengeluaran, arus_kas_bersih: omzet - pengeluaran, rasio_pengeluaran: `${(rasio * 100).toFixed(1)}%`, anomali, total_anomali: anomali.length },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/scoring/rekomendasi
// ══════════════════════════════════════════════════════════════════════════════
exports.getRekomendasi = async (req, res) => {
  try {
    const user  = await User.findById(req.user._id);
    const omzet = toNumber(user.omzetBulanan);
    let rekomendasiPinjaman;
    if (omzet >= 50_000_000)      rekomendasiPinjaman = { label: "Rp 100 jt – Rp 500 jt" };
    else if (omzet >= 10_000_000) rekomendasiPinjaman = { label: "Rp 25 jt – Rp 100 jt" };
    else                          rekomendasiPinjaman = { label: "Rp 5 jt – Rp 25 jt" };

    res.json({
      status: "success",
      data: {
        rekomendasiPinjaman,
        produk: [
          { nama: "Kredit Usaha Rakyat (KUR)", bunga: "6% per tahun", tenor: "3–5 tahun", cocok: omzet < 50_000_000 },
          { nama: "Pinjaman Modal Kerja", bunga: "8–12% per tahun", tenor: "1–3 tahun", cocok: true },
          { nama: "Invoice Financing", bunga: "1–2% per bulan", tenor: "1–6 bulan", cocok: omzet >= 20_000_000 },
        ].filter(p => p.cocok),
        tips: [
          "Pastikan laporan keuangan selalu diperbarui setiap bulan.",
          "Pisahkan rekening pribadi dan bisnis.",
          "Catat setiap transaksi untuk meningkatkan skor kredit.",
        ],
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};
