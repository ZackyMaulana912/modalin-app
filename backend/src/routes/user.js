const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getProfile,
  updatePersonal,
  updateBusiness,
  changePassword,
  uploadFoto,
  hapusFoto,
} = require("../controllers/userController");
const upload = require("../middleware/upload");

// Semua route di sini butuh login (protect)
router.use(protect);

// GET /api/user/profile
router.get("/profile", getProfile);

// PUT /api/user/profile/personal
router.put("/profile/personal", updatePersonal);

// PUT /api/user/profile/business
router.put("/profile/business", updateBusiness);

// PUT /api/user/profile/password
router.put("/profile/password", changePassword);

// PUT /api/user/profile/photo
router.put("/profile/photo", upload.single("foto"), uploadFoto);

// DELETE /api/user/profile/photo
router.delete("/profile/photo", hapusFoto);

module.exports = router;
