# ModalIn Frontend

Frontend aplikasi **ModalIn** — Platform Alternative Credit Scoring berbasis AI untuk UMKM Indonesia.  
Dibangun dengan **React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui**.

---

## 🛠️ Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | 18.3.1 | UI library utama |
| Vite | 6.3.5 | Build tool & dev server |
| TypeScript | - | Type safety |
| Tailwind CSS | 4.1.12 | Styling utility-first |
| shadcn/ui (Radix UI) | - | Komponen UI |
| Motion (Framer) | 12.23.24 | Animasi |
| Recharts | 2.15.2 | Visualisasi data & grafik |
| React Router | 7.13.0 | Client-side routing |
| React Hook Form | 7.55.0 | Form management |
| Lucide React | 0.487.0 | Icon library |
| Sonner | 2.0.3 | Toast notification |
| MUI | 7.3.5 | Material UI komponen tambahan |

---

## 📁 Struktur Folder

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx              ← Komponen utama (semua halaman)
│   │   ├── components/
│   │   │   ├── ui/              ← Komponen shadcn/ui
│   │   │   └── figma/           ← Komponen dari Figma
│   │   └── services/            ← API service calls
│   ├── api/                     ← Konfigurasi axios & endpoints
│   ├── assets/
│   │   ├── icons/               ← Icon SVG
│   │   └── images/              ← Gambar & ilustrasi
│   ├── styles/                  ← Global CSS
│   └── main.tsx                 ← Entry point React
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── postcss.config.mjs
```

---

## 🚀 Cara Menjalankan Lokal

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Siapkan environment variable
Buat file `.env` di folder `frontend/`:
```env
VITE_API_URL=http://localhost:5000
VITE_AI_API_URL=http://localhost:8000
```

Ganti dengan URL Railway jika ingin terhubung ke server production:
```env
VITE_API_URL=https://modalin-app-production-21a....up.railway.app
VITE_AI_API_URL=https://spectacular-joy-production-0e13.up.railway.app
```

### 3. Jalankan dev server
```bash
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**

### 4. Build untuk production
```bash
npm run build
```

---

## 📄 Halaman & Fitur

| Halaman | Deskripsi |
|---------|-----------|
| Landing Page | Halaman publik pengenalan ModalIn |
| Register | Pendaftaran akun baru UMKM |
| Login | Masuk ke dashboard |
| Lupa Password | Reset password via OTP email |
| Dashboard | Ringkasan skor kredit & status finansial |
| Hasil Scoring | Detail skor kredit 100–900 dengan breakdown 4C |
| Anomali Arus Kas | Deteksi 7 jenis anomali finansial real-time |
| Rekomendasi | Rekomendasi pinjaman & fitur gamifikasi poin |
| AI Advisor | Rencana aksi finansial personal |
| Profil & Manajemen Data | Edit profil, upload PDF mutasi rekening |

---

## 🔗 Koneksi ke Backend

Frontend berkomunikasi dengan dua service terpisah:

**Backend (Express.js):**
- Base URL: `VITE_API_URL`
- Endpoint: `/api/auth`, `/api/user`, `/api/upload`, `/api/scoring`
- Auth: JWT Bearer Token disimpan di `localStorage`

**AI Service (FastAPI):**
- Base URL: `VITE_AI_API_URL`
- Endpoint: `/predict`, `/shap`, `/advisor`

---

## ☁️ Deployment

Frontend di-deploy ke **Vercel** dengan CI/CD otomatis dari branch `main`.

**Live URL:** https://modalin-app-eta.vercel.app

Vercel otomatis rebuild setiap ada push ke `main`. Pastikan environment variables sudah dikonfigurasi di Vercel Dashboard → Settings → Environment Variables.

---

## 👥 Tim Pengembang

**CC26-PSU259 | Coding Camp 2026 powered by DBS Foundation**

| Nama | Role |
|------|------|
| Andy Bagus Oesmadi | AI Engineer |
| Andy Bagus Oesmadi | Full Stack Developer (Backend) |
| Zacky Maulana | Full Stack Developer (Frontend) |
| Zacky Maulana | Data Scientist |
