# ModalIn — AI Credit Scoring untuk UMKM

> Capstone Project · Coding Camp 2026 Powered by DBS Foundation · Tim CC26-PSU259

ModalIn membantu UMKM yang tidak punya riwayat kredit formal (*thin-file borrowers*) mendapatkan akses permodalan lewat sistem penilaian kredit alternatif berbasis AI. Dengan menganalisis data keuangan operasional seperti omzet, pengeluaran, frekuensi transaksi, dan jenis usaha, ModalIn menghasilkan skor kredit 100–900 secara real-time beserta penjelasan yang bisa dipahami pemilik usaha.

---

## Demo

| Layanan | URL |
|---------|-----|
| Frontend | https://modalin-app-eta.vercel.app |
| Backend API | https://modalin-app-production-21a2.up.railway.app |
| AI Model API | https://spectacular-joy-production-0e13.up.railway.app |
| API Docs | https://spectacular-joy-production-0e13.up.railway.app/docs |
| Analisis DS | https://capstone-project-modalln-data-scientist-ccxbzubf5armtd26gviehr.streamlit.app |

---

## Tim CC26-PSU259

| Nama | Role | Tanggung Jawab |
|------|------|----------------|
| Zacky Maulana | Data Scientist | Dataset, EDA, model training, laporan teknis |
| Andy | AI Engineer | FastAPI, deployment model, SHAP, Gemini AI |
| Zacky Maulana | Backend Engineer | REST API, autentikasi, database |
| Andy| Frontend Engineer | UI/UX, integrasi API, Vercel deployment |

---

## Arsitektur Sistem

```
User (Browser)
     │
     ▼
Frontend — React + Vite (Vercel)
     │
     ▼
Backend API — Express.js (Railway)
     │                    │
     ▼                    ▼
MongoDB Atlas      AI Model API — FastAPI + TensorFlow (Railway)
                         │
                         ▼
                   Gemini AI (Google)
```

Setiap request scoring dari frontend melewati backend terlebih dahulu. Backend memvalidasi token, menyiapkan payload dari profil user, lalu meneruskan ke AI Model API untuk prediksi. Hasilnya dikembalikan ke frontend beserta analisis SHAP dan rekomendasi Gemini.

---

## Struktur Repositori

```
modalin-app/
├── frontend/           # React 18 + TypeScript + Vite
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx         # Root component, semua halaman
│   │   │   └── services/
│   │   │       └── api.ts      # API calls ke backend
│   │   ├── api/                # Typed API clients
│   │   └── assets/             # Gambar dan ikon
│   ├── package.json
│   └── vite.config.ts
│
├── backend/            # Node.js + Express.js
│   └── src/
│       ├── controllers/        # Logic handler tiap endpoint
│       ├── models/             # Mongoose schema
│       ├── routes/             # Definisi route API
│       ├── middleware/         # Auth JWT, file upload
│       └── index.js            # Entry point
│
├── ai-engineer/        # FastAPI + TensorFlow
│   ├── main.py                 # Endpoints: /predict, /shap, /advisor
│   ├── model/                  # File model .keras dan scaler
│   └── requirements.txt
│
├── data-scientist/     # Python notebooks dan dataset
│   ├── notebook.ipynb          # Training, EDA, A/B testing
│   ├── dataset_modalin_clean.csv
│   └── app.py                  # Streamlit dashboard
│
└── README.md
```

---

## Stack Teknologi

**Frontend**
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui, Framer Motion
- Hosting: Vercel (auto-deploy dari GitHub)

**Backend**
- Node.js 18, Express.js
- MongoDB Atlas, Mongoose ODM
- JWT untuk autentikasi, Multer untuk upload file
- Hosting: Railway

**AI Model**
- TensorFlow 2.x / Keras — custom neural network untuk credit scoring
- SHAP (KernelExplainer) — explainable AI
- Google Gemini API — rekomendasi finansial berbasis generative AI
- FastAPI, Uvicorn
- Hosting: Railway

**Data**
- Python, Pandas, NumPy, Scikit-learn
- Dataset sintetis 998 data UMKM Indonesia
- Teknik: SMOTE untuk balancing, A/B testing model

---

## Menjalankan di Lokal

Pastikan sudah install: Node.js 18+, Python 3.10+, dan MongoDB Atlas URI (atau MongoDB lokal).

### 1. Clone repo

```bash
git clone https://github.com/ZackyMaulana912/modalin-app.git
cd modalin-app
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Isi file `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/modalin
JWT_SECRET=rahasia_jwt_kamu
JWT_EXPIRES_IN=7d
EMAIL_USER=emailkamu@gmail.com
EMAIL_PASS=app_password_gmail
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
# Backend berjalan di http://localhost:5000
```

### 3. AI Model

```bash
cd ../ai-engineer
pip install -r requirements.txt
```

Buat file `.env` di folder `ai-engineer/`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

```bash
uvicorn main:app --reload --port 8000
# AI API berjalan di http://localhost:8000
# Docs: http://localhost:8000/docs
```

### 4. Frontend

```bash
cd ../frontend
npm install
```

Buat file `.env` di folder `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

> Catatan: Kalau backend berjalan di port berbeda, sesuaikan URL-nya.

```bash
npm run dev
# Frontend berjalan di http://localhost:5173
```

### 5. Data Scientist (opsional)

```bash
cd ../data-scientist
pip install -r requirements.txt
streamlit run app.py
# Dashboard berjalan di http://localhost:8501
```

---

## Alur Penggunaan

1. **Daftar** — buat akun dengan NIK, nama, dan email
2. **Lengkapi profil bisnis** — isi data usaha seperti omzet, pengeluaran, jenis usaha, lama berdiri
3. **Upload mutasi rekening** — opsional, untuk ekstraksi data keuangan otomatis (PDF/CSV/XLS)
4. **Lihat skor kredit** — sistem menghitung skor 100–900 berdasarkan model AI
5. **Baca analisis** — halaman AI Advisor menampilkan penjelasan SHAP dan rekomendasi dari Gemini
6. **Pantau anomali** — sistem mendeteksi pola mencurigakan di arus kas secara otomatis

---

## Endpoint API Utama

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/register` | Daftar akun baru |
| POST | `/api/auth/login` | Login dan dapatkan token |
| GET | `/api/user/profile` | Ambil profil user |
| PUT | `/api/user/profile/personal` | Update info pribadi |
| PUT | `/api/user/profile/business` | Update info bisnis |
| POST | `/api/upload/data` | Upload file mutasi |
| GET | `/api/scoring` | Hitung dan ambil skor kredit |
| GET | `/api/scoring/anomali` | Deteksi anomali arus kas |
| GET | `/api/scoring/rekomendasi` | Rekomendasi produk pinjaman |
| POST | `/api/scoring/shap` | Analisis kontribusi fitur (SHAP) |
| POST | `/api/scoring/advisor` | Rekomendasi AI via Gemini |

---

## Lisensi

Dibuat untuk keperluan akademik Coding Camp 2026 Powered by DBS Foundation. Tidak untuk penggunaan komersial.
