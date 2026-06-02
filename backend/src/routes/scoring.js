const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getScoring, getAnomali, getRekomendasi, getShap, getAdvisor } = require("../controllers/scoringController");

router.use(protect);

// GET /api/scoring         — hasil credit scoring
router.get("/", getScoring);

// GET /api/scoring/anomali — deteksi anomali arus kas
router.get("/anomali", getAnomali);

// GET /api/scoring/rekomendasi — rekomendasi pinjaman
router.get("/rekomendasi", getRekomendasi);

// POST /api/scoring/shap   — SHAP Explainable AI
router.post("/shap", getShap);

// POST /api/scoring/advisor — Generative AI Advisor
router.post("/advisor", getAdvisor);

module.exports = router;
