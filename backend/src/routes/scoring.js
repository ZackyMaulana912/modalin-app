const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getScoring, getAnomali, getRekomendasi } = require("../controllers/scoringController");

router.use(protect);

// GET /api/scoring         — hasil credit scoring
router.get("/", getScoring);

// GET /api/scoring/anomali — deteksi anomali arus kas
router.get("/anomali", getAnomali);

// GET /api/scoring/rekomendasi — rekomendasi pinjaman
router.get("/rekomendasi", getRekomendasi);

module.exports = router;
