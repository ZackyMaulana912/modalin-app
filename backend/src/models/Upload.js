const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    namaFile: { type: String, required: true },   // nama asli dari user
    namaDisimpan: { type: String, required: true }, // nama file di server
    tipeFile: { type: String, required: true },    // pdf / csv / xlsx
    ukuranFile: { type: Number, required: true },  // dalam bytes
    path: { type: String, required: true },
    status: {
      type: String,
      enum: ["uploaded", "processing", "done", "error"],
      default: "uploaded",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);
