const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // ── Informasi Pribadi ─────────────────────────────
    nik: {
      type: String,
      required: [true, "NIK wajib diisi"],
      unique: true,
      length: 16,
    },
    nama: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi"],
      minlength: 8,
      select: false, // tidak ikut serta saat query biasa
    },
    telepon: { type: String, default: "" },
    alamat: { type: String, default: "" },
    fotoProfil: { type: String, default: "" },

    // ── Informasi Bisnis ──────────────────────────────
    identitasUsaha: { type: String, default: "" },
    namaPemilik: { type: String, default: "" },
    jenisUsaha: { type: String, default: "" },
    alamatUsaha: { type: String, default: "" },
    lamaBerdiri: { type: String, default: "" },

    // ── Informasi Keuangan ────────────────────────────
    omzetBulanan: { type: String, default: "" },
    pengeluaranBulanan: { type: String, default: "" },
    totalHutang: { type: String, default: "" },
    totalAset: { type: String, default: "" },
    frekuensiTransaksi: { type: String, default: "" },

    // ── Reset Password OTP ────────────────────────────
    otpCode: { type: String, select: false },
    otpExpires: { type: Date, select: false },
  },
  {
    timestamps: true, // createdAt dan updatedAt otomatis
  }
);

// Hash password sebelum disimpan
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method untuk cek password
userSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
