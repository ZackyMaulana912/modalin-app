# ModalIn — AI Credit Scoring UMKM

> Capstone Project · Coding Camp 2026 Powered by DBS Foundation · Tim CC26-PSU259

ModalIn adalah sistem *alternative credit scoring* berbasis AI untuk UMKM yang tidak memiliki riwayat perbankan formal (*thin-file borrowers*). Platform ini menganalisis data operasional bisnis secara real-time untuk menghasilkan skor kelayakan kredit yang adil dan transparan.

---

##  Demo

| Layanan | URL |
|---------|-----|
| Frontend | https://modalin-app-eta.vercel.app |
| Backend API | https://modalin-app-production-21a2.up.railway.app |
| AI Model API | https://spectacular-joy-production-0e13.up.railway.app |

---

##  Tim

| Nama | Role |
|------|------|
| Zacky Maulana | Data Scientist |
| Andy | AI Engineer |

---

##  Arsitektur

```
Frontend (Vercel)
      ↓
Backend API (Railway) ──→ MongoDB Atlas
      ↓
AI Model API (Railway)
```

---

##  Struktur Repositori

```
modalin-app/
├── frontend/          # React + Vite + TypeScript
├── backend/           # Node.js + Express + MongoDB
├── ai-engineer/       # FastAPI + TensorFlow (Credit Scoring Model)
├── data-scientist/    # Notebook, Dataset, Laporan Teknis
├── README.md
└── ATTRIBUTIONS.md
```

---

##  Teknologi

**Frontend**
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui, Framer Motion
- Deploy: Vercel

**Backend**
- Node.js, Express.js
- MongoDB Atlas, Mongoose
- JWT Authentication, Multer (file upload)
- Deploy: Railway

**AI Model**
- TensorFlow / Keras (Custom Neural Network)
- FastAPI, Uvicorn
- Pipeline: Data → Feature Engineering → Model → Credit Score
- Deploy: Railway

**Data Scientist**
- Python, Pandas, Scikit-learn
- Dataset sintetis 998 data UMKM
- EDA, A/B Testing, Laporan Teknis

---

##  Cara Menjalankan Lokal

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Isi VITE_API_URL di .env
npm run dev
```

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Isi MONGODB_URI, JWT_SECRET, dll di .env
npm run dev
```

### AI Model
```bash
cd ai-engineer
pip install -r requirements.txt
uvicorn main:app --reload
```

### Data Scientist (Streamlit Dashboard)
```bash
cd data-scientist
pip install -r requirements.txt
streamlit run app.py
```

---

##  Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
EMAIL_USER=...
EMAIL_PASS=...
FRONTEND_URL=https://modalin-app-eta.vercel.app
```

### Frontend (`.env`)
```
VITE_API_URL=https://modalin-app-production-21a2.up.railway.app/api
```

---

##  Fitur Utama

- **AI Credit Scoring** — Skor kredit 100–900 berbasis model neural network
- **Analisis 5C** — Character, Capacity, Capital, Condition
- **Deteksi Anomali** — 7 jenis anomali arus kas terdeteksi otomatis
- **Rekomendasi** — Rencana aksi finansial yang dipersonalisasi
- **Upload Mutasi** — Analisis PDF mutasi rekening bank
- **Gamifikasi** — Sistem poin untuk mendorong kelengkapan data

---

##  Lisensi

Proyek ini dibuat untuk keperluan akademik Coding Camp 2026 DBS Foundation.
