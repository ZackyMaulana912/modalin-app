const path = require("path");
const Upload = require("../models/Upload");
const User = require("../models/User");
const pdfParse = require("pdf-parse");

// ══════════════════════════════════════════════════════════════════════════════
// Helper: ekstrak angka dari teks PDF
// ══════════════════════════════════════════════════════════════════════════════
const extractAngka = (text) => {
  const cariAngka = (patterns) => {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const angka = match[1].replace(/[.,]/g, "");
        return parseInt(angka) || 0;
      }
    }
    return null;
  };

   const hitungFrekuensi = (text) => {
    const baris = text.split('\n');
    let count = 0;
    for (const b of baris) {
      if (/\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/.test(b) && /[0-9]{3,}/.test(b)) {
        count++;
      }
    }
    return count > 0 ? count : null;
  };

  return {
    omzet: cariAngka([
      /omzet[^0-9]*([0-9.,]+)/i,
      /total\s*pemasukan[^0-9]*([0-9.,]+)/i,
      /pendapatan[^0-9]*([0-9.,]+)/i,
      /penjualan[^0-9]*([0-9.,]+)/i,
      /kredit[^0-9]*([0-9.,]+)/i,
    ]),
    pengeluaran: cariAngka([
      /pengeluaran[^0-9]*([0-9.,]+)/i,
      /total\s*pengeluaran[^0-9]*([0-9.,]+)/i,
      /biaya[^0-9]*([0-9.,]+)/i,
      /debet[^0-9]*([0-9.,]+)/i,
    ]),
    aset: cariAngka([
      /aset[^0-9]*([0-9.,]+)/i,
      /total\s*aset[^0-9]*([0-9.,]+)/i,
      /kekayaan[^0-9]*([0-9.,]+)/i,
    ]),
    hutang: cariAngka([
      /hutang[^0-9]*([0-9.,]+)/i,
      /total\s*hutang[^0-9]*([0-9.,]+)/i,
      /liabilitas[^0-9]*([0-9.,]+)/i,
      /pinjaman[^0-9]*([0-9.,]+)/i,
    ]),
  };
};

// ══════════════════════════════════════════════════════════════════════════════
// POST /api/upload/data  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.uploadData = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Tidak ada file yang diupload.",
      });
    }

    const filesSaved = [];
    let dataTerekstrak = {};

    for (const file of req.files) {
      const ext = path.extname(file.originalname).replace(".", "").toLowerCase();

      // Simpan info file ke database
      const upload = await Upload.create({
        userId: req.user._id,
        namaFile: file.originalname,
        namaDisimpan: file.filename,
        tipeFile: ext,
        ukuranFile: file.size,
        path: file.path,
        status: "uploaded",
      });

      filesSaved.push({
        id: upload._id,
        namaFile: upload.namaFile,
        tipeFile: upload.tipeFile,
        ukuranFile: `${(upload.ukuranFile / 1024).toFixed(1)} KB`,
        status: upload.status,
        uploadedAt: upload.createdAt,
      });

      // Parsing PDF untuk ekstrak data keuangan
      if (ext === "pdf") {
        try {
          const fs = require("fs");
          const buffer = fs.readFileSync(file.path);
          const parsed = await pdfParse(buffer);
          const hasil = extractAngka(parsed.text);

          // Kumpulkan data yang berhasil diekstrak
          if (hasil.omzet)       dataTerekstrak.omzetBulanan       = String(hasil.omzet);
          if (hasil.pengeluaran) dataTerekstrak.pengeluaranBulanan = String(hasil.pengeluaran);
          if (hasil.aset)        dataTerekstrak.totalAset          = String(hasil.aset);
          if (hasil.hutang)      dataTerekstrak.totalHutang        = String(hasil.hutang);
          if (hasil.frekuensi)   dataTerekstrak.frekuensiTransaksi = String(hasil.frekuensi); 

          console.log(`📄 Ekstrak dari ${file.originalname}:`, hasil);
        } catch (parseErr) {
          console.warn(`⚠️ Gagal parse PDF ${file.originalname}:`, parseErr.message);
        }
      }
    }

    // Update data bisnis user jika ada data yang berhasil diekstrak
    if (Object.keys(dataTerekstrak).length > 0) {
      await User.findByIdAndUpdate(req.user._id, dataTerekstrak);
      console.log(`✅ Data bisnis user diupdate:`, dataTerekstrak);
    }

    res.status(201).json({
      status: "success",
      message: `${req.files.length} file berhasil diupload!`,
      data: {
        files: filesSaved,
        dataTerekstrak: Object.keys(dataTerekstrak).length > 0
          ? dataTerekstrak
          : null,
        pesan: Object.keys(dataTerekstrak).length > 0
          ? "Data keuangan berhasil diekstrak dari PDF dan diperbarui otomatis."
          : "File tersimpan. Data bisnis tidak otomatis diperbarui (isi form manual).",
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat upload.",
    });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// GET /api/upload/riwayat  (butuh login)
// ══════════════════════════════════════════════════════════════════════════════
exports.getRiwayat = async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      data: {
        total: uploads.length,
        files: uploads.map((u) => ({
          id: u._id,
          namaFile: u.namaFile,
          tipeFile: u.tipeFile,
          ukuranFile: `${(u.ukuranFile / 1024).toFixed(1)} KB`,
          status: u.status,
          uploadedAt: u.createdAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server.",
    });
  }
};