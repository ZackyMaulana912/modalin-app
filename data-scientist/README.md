# Capstone-Project-Data-Scientist
Pembuatan data dan melakukan EXDA &amp; EDA untuk aplikasi MODALLN

### Deskripsi Proyek: ModalIn (UMKM Credit Scoring Analytics)

**ModalIn** adalah sebuah sistem analitik penilaian kredit (*Credit Scoring*) berbasis data alternatif yang dirancang untuk memitigasi risiko penyaluran dana pinjaman kepada sektor UMKM (Usaha Mikro, Kecil, dan Menengah) di Indonesia. Proyek ini bertujuan untuk memecahkan masalah *thin-file*—kondisi di mana pelaku UMKM tidak memiliki riwayat kredit konvensional yang cukup untuk dinilai kelayakannya oleh lembaga keuangan tradisional.

Sebagai solusinya, sistem ini mengadopsi kerangka manajemen risiko **4C** yang dikuantifikasi menggunakan data operasional dan finansial UMKM:
1. **Character**: Menilai rekam jejak dan stabilitas bisnis melalui metrik umur usaha.
2. **Capacity**: Mengukur kemampuan bayar dan perputaran arus kas berdasarkan pendapatan kotor (omzet), beban operasional, dan frekuensi transaksi.
3. **Capital**: Mengevaluasi ketahanan finansial melalui rasio nilai aset terhadap total kewajiban (hutang).
4. **Condition**: Memetakan profil risiko sektoral berdasarkan kategori jenis usaha (misal: Bisnis Kuliner, Jasa, Digital, dll).

**Mekanisme dan Output Sistem:**
Seluruh variabel dari keempat parameter tersebut diolah, dibersihkan, dan diekstraksi (*Feature Engineering*) guna menghasilkan **Skor Kredit Terstandarisasi dalam rentang 0–900**. Algoritma *Gatekeeper* di dalam sistem kemudian menggunakan skor dan margin profil ini untuk mengambil keputusan otomatis:
1. **Status Kelayakan (Approval/Reject):** Menolak secara mutlak entitas bisnis yang memiliki arus kas negatif (Margin Laba <= 0%) atau skor di bawah ambang batas (*High Risk*).
2. **Distribusi Plafon Pinjaman:** Mengalokasikan batasan nominal pendanaan secara proporsional sesuai dengan klasifikasi tingkat risiko (*Risk Tier*), yang terbagi menjadi kelas Bronze, Silver, dan Gold.

**Dampak Bisnis:**
Implementasi analitik ini memungkinkan perusahaan *fintech* atau lembaga penyalur pinjaman untuk mengotomatisasi proses *underwriting*, menekan angka gagal bayar (*Non-Performing Loan* / NPL) secara *data-driven*, sekaligus memperluas inklusi keuangan bagi UMKM yang secara fundamental terbukti sehat (*creditworthy*).

[![Streamlit App](https://static.streamlit.io/badge_svg.svg)](https://capstone-project-modalln-data-scientist-ccxbzubf5armtd26gviehr.streamlit.app) 