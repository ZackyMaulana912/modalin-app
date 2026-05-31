const User = require("../models/User");
const path = require("path");

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/user/profile  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// PUT /api/user/profile/personal  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.updatePersonal = async (req, res) => {
  try {
    const { nik, nama, email, telepon, alamat } = req.body;

    if (email || nik) {
      const kondisi = [];
      if (email) kondisi.push({ email });
      if (nik) kondisi.push({ nik });
      const userLain = await User.findOne({
        $or: kondisi,
        _id: { $ne: req.user._id },
      });
      if (userLain) {
        const field = userLain.email === email ? "Email" : "NIK";
        return res.status(409).json({ status: "error", message: `${field} sudah dipakai akun lain.` });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { nik, nama, email, telepon, alamat },
      { new: true, runValidators: true }
    );

    res.json({
      status: "success",
      message: "Informasi pribadi berhasil diperbarui.",
      data: { user },
    });
  } catch (error) {
    console.error("Update personal error:", error);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// PUT /api/user/profile/business  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.updateBusiness = async (req, res) => {
  try {
    const {
      identitasUsaha, namaPemilik, jenisUsaha, alamatUsaha, lamaBerdiri,
      omzetBulanan, pengeluaranBulanan, totalHutang, totalAset, frekuensiTransaksi,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        identitasUsaha, namaPemilik, jenisUsaha, alamatUsaha, lamaBerdiri,
        omzetBulanan, pengeluaranBulanan, totalHutang, totalAset, frekuensiTransaksi,
      },
      { new: true, runValidators: true }
    );

    res.json({
      status: "success",
      message: "Informasi bisnis berhasil diperbarui.",
      data: { user },
    });
  } catch (error) {
    console.error("Update business error:", error);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// PUT /api/user/profile/password  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.changePassword = async (req, res) => {
  try {
    const { passwordLama, passwordBaru } = req.body;
    if (!passwordLama || !passwordBaru) {
      return res.status(400).json({ status: "error", message: "Password lama dan baru wajib diisi." });
    }
    if (passwordBaru.length < 8) {
      return res.status(400).json({ status: "error", message: "Password baru minimal 8 karakter." });
    }

    const user = await User.findById(req.user._id).select("+password");
    const cocok = await user.checkPassword(passwordLama);
    if (!cocok) {
      return res.status(401).json({ status: "error", message: "Password lama tidak sesuai." });
    }

    user.password = passwordBaru;
    await user.save();

    res.json({ status: "success", message: "Password berhasil diubah." });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// PUT /api/user/profile/photo  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.uploadFoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "Tidak ada foto yang diupload." });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fotoProfil: req.file.filename },
      { new: true }
    );

    res.json({
      status: "success",
      message: "Foto profil berhasil diupdate.",
      data: {
        fotoProfil: user.fotoProfil,
        fotoUrl: `/uploads/${user.fotoProfil}`,
      },
    });
  } catch (error) {
    console.error("Upload foto error:", error);
    res.status(500).json({ status: "error", message: "Gagal upload foto." });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// DELETE /api/user/profile/photo  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.hapusFoto = async (req, res) => {
  try {
    const fs = require("fs");
    const user = await User.findById(req.user._id);

    // Hapus file dari disk jika ada
    if (user.fotoProfil) {
      const filePath = path.join(__dirname, "../../uploads", user.fotoProfil);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Hapus dari database
    await User.findByIdAndUpdate(req.user._id, { fotoProfil: "" });

    res.json({
      status: "success",
      message: "Foto profil berhasil dihapus.",
    });
  } catch (error) {
    console.error("Hapus foto error:", error);
    res.status(500).json({ status: "error", message: "Gagal menghapus foto." });
  }
};
