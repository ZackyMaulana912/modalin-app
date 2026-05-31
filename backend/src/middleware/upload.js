const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Format: userId_timestamp_namafile
    const userId = req.user?._id || "unknown";
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${userId}_${timestamp}${ext}`);
  },
});

// Filter tipe file yang diizinkan
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const allowedExts = /pdf|csv|xls|xlsx|jpg|jpeg|png|gif|webp/i;

  const extOk = allowedExts.test(path.extname(file.originalname));
  const mimeOk = allowedTypes.includes(file.mimetype);

  if (extOk || mimeOk) {
    cb(null, true);
  } else {
    cb(new Error("Format file tidak didukung. Gunakan PDF, CSV, atau XLS/XLSX."), false);
  }
};

// Konfigurasi multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    files: 5, // maksimal 5 file sekaligus
  },
});

module.exports = upload;
