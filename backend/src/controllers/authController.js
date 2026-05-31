const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ── Helper: buat JWT token ────────────────────────────────────────────────────
const buatToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ── Helper: kirim email OTP ───────────────────────────────────────────────────
const kirimEmailOTP = async (email, otpCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ModalIn" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Kode Verifikasi ModalIn",
    html: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8f9ff; border-radius: 12px;">
        <h2 style="color: #006b55; margin-bottom: 8px;">Kode Verifikasi ModalIn</h2>
        <p style="color: #44464f; margin-bottom: 24px;">Gunakan kode berikut untuk mereset password akun Anda:</p>
        <div style="background: #00d4aa; color: white; font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 16px 24px; border-radius: 8px; margin-bottom: 24px;">
          ${otpCode}
        </div>
        <p style="color: #757680; font-size: 14px;">Kode berlaku selama <strong>10 menit</strong>. Jangan bagikan kode ini kepada siapapun.</p>
        <p style="color: #757680; font-size: 14px;">Jika Anda tidak meminta kode ini, abaikan email ini.</p>
      </div>
    `,
  });
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/auth/register
// ══════════════════════════════════════════════════════════════════════════════
exports.register = async (req, res) => {
  try {
    const { nik, nama, email, password } = req.body;

    // Validasi input
    if (!nik || !nama || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "NIK, nama, email, dan password wajib diisi.",
      });
    }
    if (nik.length !== 16) {
      return res.status(400).json({ status: "error", message: "NIK harus 16 digit." });
    }
    if (password.length < 8) {
      return res.status(400).json({ status: "error", message: "Password minimal 8 karakter." });
    }

    // Cek duplikat NIK atau email
    const sudahAda = await User.findOne({ $or: [{ nik }, { email }] });
    if (sudahAda) {
      const field = sudahAda.nik === nik ? "NIK" : "Email";
      return res.status(409).json({
        status: "error",
        message: `${field} sudah terdaftar.`,
      });
    }

    // Buat user baru
    const user = await User.create({ nik, nama, email, password });
    const token = buatToken(user._id);

    res.status(201).json({
      status: "success",
      message: "Akun berhasil dibuat!",
      data: {
        token,
        user: {
          id: user._id,
          nik: user.nik,
          nama: user.nama,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/auth/login
// ══════════════════════════════════════════════════════════════════════════════
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: "error", message: "Email dan password wajib diisi." });
    }

    // Cari user + ambil password (select: false di model)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ status: "error", message: "Email atau password salah." });
    }

    const passwordCocok = await user.checkPassword(password);
    if (!passwordCocok) {
      return res.status(401).json({ status: "error", message: "Email atau password salah." });
    }

    const token = buatToken(user._id);

    res.json({
      status: "success",
      message: "Login berhasil!",
      data: {
        token,
        user: {
          id: user._id,
          nik: user.nik,
          nama: user.nama,
          email: user.email,
          telepon: user.telepon,
          alamat: user.alamat,
          identitasUsaha: user.identitasUsaha,
          namaPemilik: user.namaPemilik,
          jenisUsaha: user.jenisUsaha,
          alamatUsaha: user.alamatUsaha,
          lamaBerdiri: user.lamaBerdiri,
          omzetBulanan: user.omzetBulanan,
          pengeluaranBulanan: user.pengeluaranBulanan,
          totalHutang: user.totalHutang,
          totalAset: user.totalAset,
          frekuensiTransaksi: user.frekuensiTransaksi,
           fotoProfil: user.fotoProfil || "",
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/auth/forgot-password
// ══════════════════════════════════════════════════════════════════════════════
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ status: "error", message: "Email wajib diisi." });
    }

    const user = await User.findOne({ email });
    // Selalu kirim respons sukses meski email tidak ada (keamanan)
    if (!user) {
      return res.json({
        status: "success",
        message: "Jika email terdaftar, kode OTP telah dikirim.",
      });
    }

    // Buat OTP 6 digit
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 menit

    user.otpCode = otpCode;
    user.otpExpires = otpExpires;
    await user.save({ validateBeforeSave: false });

    // Kirim email
    await kirimEmailOTP(email, otpCode);

    res.json({
      status: "success",
      message: "Kode OTP telah dikirim ke email Anda.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ status: "error", message: "Gagal mengirim email. Coba lagi." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/auth/verify-otp
// ══════════════════════════════════════════════════════════════════════════════
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ status: "error", message: "Email dan kode OTP wajib diisi." });
    }

    const user = await User.findOne({ email }).select("+otpCode +otpExpires");
    if (!user || user.otpCode !== otp) {
      return res.status(400).json({ status: "error", message: "Kode OTP tidak valid." });
    }
    if (user.otpExpires < new Date()) {
      return res.status(400).json({ status: "error", message: "Kode OTP sudah kadaluarsa." });
    }

    // OTP benar - buat token sementara untuk reset password
    const resetToken = buatToken(user._id);

    res.json({
      status: "success",
      message: "Kode OTP valid.",
      data: { resetToken },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/auth/reset-password
// ══════════════════════════════════════════════════════════════════════════════
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) {
      return res.status(400).json({ status: "error", message: "Token dan password baru wajib diisi." });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ status: "error", message: "Password minimal 8 karakter." });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("+otpCode +otpExpires");
    if (!user) {
      return res.status(400).json({ status: "error", message: "Token tidak valid." });
    }

    // Update password dan hapus OTP
    user.password = newPassword;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ status: "success", message: "Password berhasil diubah. Silakan login." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};
