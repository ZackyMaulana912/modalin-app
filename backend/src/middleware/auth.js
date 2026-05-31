const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Akses ditolak. Silakan login terlebih dahulu.",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Cari user berdasarkan ID dari token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User tidak ditemukan.",
      });
    }

    // 4. Simpan user ke request agar bisa dipakai di controller
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token tidak valid atau sudah kadaluarsa.",
    });
  }
};

module.exports = { protect };
