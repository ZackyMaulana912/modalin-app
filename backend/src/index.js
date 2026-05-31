require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

// ── Routes ────────────────────────────────────────────────────────────────────
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/upload");
const scoringRoutes = require("./routes/scoring");

// ── Koneksi Database ──────────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Middleware Global ─────────────────────────────────────────────────────────

// CORS — izinkan frontend mengakses backend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// Parsing JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "ModalIn API berjalan 🚀",
    version: "1.0.0",
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);       // Register, Login, Forgot Password
app.use("/api/user", userRoutes);       // Profil user
app.use("/api/upload", uploadRoutes);   // Upload file
app.use("/api/scoring", scoringRoutes); // Credit scoring, anomali, rekomendasi

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.url} tidak ditemukan.`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server.",
  });
});

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 ModalIn Backend berjalan di http://localhost:${PORT}`);
  console.log(`📋 Endpoint tersedia:`);
  console.log(`   POST   /api/auth/register`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   POST   /api/auth/forgot-password`);
  console.log(`   POST   /api/auth/verify-otp`);
  console.log(`   POST   /api/auth/reset-password`);
  console.log(`   GET    /api/user/profile`);
  console.log(`   PUT    /api/user/profile/personal`);
  console.log(`   PUT    /api/user/profile/business`);
  console.log(`   PUT    /api/user/profile/password`);
  console.log(`   POST   /api/upload/data`);
  console.log(`   GET    /api/upload/riwayat`);
  console.log(`   GET    /api/scoring`);
  console.log(`   GET    /api/scoring/anomali`);
  console.log(`   GET    /api/scoring/rekomendasi\n`);
});
