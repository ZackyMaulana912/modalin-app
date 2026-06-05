# ModalIn 

**Transformasi Inklusi Finansial UMKM melalui Alternative Credit Scoring Berbasis AI dan Deteksi Anomali Arus Kas**

> Coding Camp 2026 powered by DBS Foundation | Tim CC26-PSU259

[![Live Demo](https://img.shields.io/badge/Live-modalin--app--eta.vercel.app-02C39A?style=for-the-badge)](https://modalin-app-eta.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-ZackyMaulana912%2Fmodalin--app-181717?style=for-the-badge&logo=github)](https://github.com/ZackyMaulana912/modalin-app)

---

##  Tentang Proyek

ModalIn adalah platform web alternative credit scoring yang dirancang khusus untuk UMKM Indonesia. Jutaan pelaku UMKM generasi muda ditolak pinjaman bukan karena bisnis mereka tidak layak, tapi karena sistem kredit konvensional masih bergantung pada riwayat bank formal yang mereka tidak miliki.

ModalIn memecahkan masalah ini dengan:
- **Menilai kelayakan kredit** dari data omzet, pengeluaran, dan frekuensi transaksi harian
- **Mendeteksi anomali arus kas** secara otomatis untuk mencegah risiko gagal bayar
- **Memberikan rekomendasi personal** yang transparan dan mudah dipahami

Selaras dengan **POJK No. 29/2024** tentang Alternative Credit Scoring (Innovative Credit Scoring).

---

##  Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
|  AI Credit Scoring | Neural Network (Keras) menghasilkan skor 100–900 berbasis framework 4C |
|  Deteksi Anomali | 7 jenis anomali arus kas terdeteksi secara real-time |
|  Dashboard Interaktif | Visualisasi skor kredit dengan breakdown Character, Capacity, Capital, Condition |
|  Upload PDF Mutasi | Upload laporan mutasi rekening untuk analisis finansial |
|  Gamifikasi Poin | Sistem poin untuk mendorong kelengkapan profil UMKM |
|  AI Advisor | Rencana aksi finansial yang dipersonalisasi |

---

##  Arsitektur Sistem

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend      │────▶│    Backend API   │────▶│   AI Service    │     │  DS Dashboard   │
│  React 18 + Vite│     │  Express.js      │     │  FastAPI        │     │  Streamlit      │
│  TypeScript      │     │  MongoDB Atlas   │     │  Keras Model    │     │  EDA & Analisis │
│  Tailwind CSS    │     │  JWT + OTP       │     │  .keras file    │     │                 │
│  Vercel          │     │  Railway         │     │  Railway        │     │  Streamlit Cloud│
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

##  Tech Stack

### Frontend
- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui (Radix UI)
- Motion (Framer Motion), Recharts, React Router

### Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose ORM
- JWT Authentication + Nodemailer OTP
- Multer (file upload)

### AI Service
- Python + FastAPI + Uvicorn
- TensorFlow/Keras (Custom CreditScoringLayer)
- Model trained on 998 synthetic UMKM data

### Data Science
- Python + Streamlit
- Pandas, Scikit-learn, Matplotlib
- A/B Testing dengan SciPy

### Deployment
- **Frontend:** Vercel
- **Backend + AI API:** Railway
- **DS Dashboard:** Streamlit Cloud
- **Database:** MongoDB Atlas

---

## 📁 Struktur Repository

```
modalin-app/
├── frontend/           ← React 18 + Vite + TypeScript
│   ├── src/
│   │   ├── app/
│   │   │   └── App.tsx     ← Komponen utama
│   │   ├── api/            ← API service calls
│   │   └── assets/         ← Gambar & icon
│   └── README.md
├── backend/            ← Express.js REST API
│   ├── src/
│   │   ├── controllers/    ← Auth, User, Upload, Scoring
│   │   ├── models/         ← MongoDB models
│   │   ├── routes/         ← API routes
│   │   └── middleware/     ← JWT auth, Multer upload
│   └── README.md
├── ai-engineer/        ← FastAPI + Keras Model
│   ├── model/          ← File .keras tersimpan
│   ├── notebook/       ← Training notebook
│   ├── main.py         ← FastAPI entry point
│   └── requirements.txt
├── data-scientist/     ← Streamlit Dashboard & EDA
│   ├── app.py          ← Streamlit app
│   └── dataset/        ← dataset_modalin_clean.csv
└── README.md           ← (ini)
```

---

##  Cara Menjalankan Lokal

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- MongoDB Atlas account

### 1. Clone repository
```bash
git clone https://github.com/ZackyMaulana912/modalin-app.git
cd modalin-app
```

### 2. Jalankan Backend
```bash
cd backend
npm install
cp .env.example .env   # isi MONGODB_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
npm run dev
# Server berjalan di http://localhost:5000
```

### 3. Jalankan AI Service
```bash
cd ai-engineer
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API berjalan di http://localhost:8000
```

### 4. Jalankan Frontend
```bash
cd frontend
npm install
# Buat .env dan isi:
# VITE_API_URL=http://localhost:5000
# VITE_AI_API_URL=http://localhost:8000
npm run dev
# App berjalan di http://localhost:5173
```

### 5. Jalankan DS Dashboard
```bash
cd data-scientist
pip install -r requirements.txt
streamlit run app.py
```

---

##  Live URLs

| Service | URL |
|---------|-----|
| Frontend | https://modalin-app-eta.vercel.app |
| DS Dashboard | https://capstone-project-modalin-data-scientist-ccxbzubf5armtd26gviehr.streamlit.app |

---

##  Model AI

- **Arsitektur:** Custom Keras Neural Network dengan `CreditScoringLayer`
- **Input:** 5 fitur (omzet, pengeluaran, frekuensi transaksi, total aset, lama usaha)
- **Output:** Skor kredit 100–900 + breakdown persentase 4C
- **Training:** 998 data UMKM sintetis, split 80/20, akurasi >85%
- **Framework evaluasi:** 4C (Character, Capacity, Capital, Condition)

---

##  Tim

| Nama | ID | Role |
|------|----|------|
| Andy Bagus Oesmadi | CACC863D6Y2202 | AI Engineer |
| Andy Bagus Oesmad | CFCC004D6Y1942 | Full Stack Developer (Backend) |
| Zacky Maulana | CFCC525D6X0231 | Full Stack Developer (Frontend) |
| Zacky Maulana | CDCC863D6Y1039 | Data Scientist |

---

##  Lisensi

Proyek ini dibuat untuk keperluan Capstone Project Coding Camp 2026 powered by DBS Foundation.
