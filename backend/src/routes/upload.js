const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadData, getRiwayat } = require("../controllers/uploadController");

router.use(protect);

// POST /api/upload/data  — upload file (max 5 file sekaligus)
router.post("/data", upload.array("files", 5), (err, req, res, next) => {
  // Error handler khusus multer
  if (err) {
    return res.status(400).json({ status: "error", message: err.message });
  }
  next();
}, uploadData);

// GET /api/upload/riwayat  — riwayat file yang sudah diupload
router.get("/riwayat", getRiwayat);

module.exports = router;

// GET /api/upload/count  — jumlah total file yang diupload user
router.get("/count", async (req, res) => {
  try {
    const Upload = require("../models/Upload");
    const total = await Upload.countDocuments({ userId: req.user._id });
    res.json({ status: "success", count: total });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Terjadi kesalahan server." });
  }
});