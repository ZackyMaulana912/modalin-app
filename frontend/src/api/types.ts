// ── Auth ─────────────────────────────────────────────────────────────────────

export interface RegisterRequest {
  nik: string;
  nama: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface MessageResponse {
  message: string;
}

// ── User & Profile ────────────────────────────────────────────────────────────

export interface UserResponse {
  id: string;
  nik: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  photoUrl: string | null;
  isPersonalComplete: boolean;
  isBusinessComplete: boolean;
  createdAt: string;
}

export interface UpdatePersonalRequest {
  nik: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}

export interface BusinessInfo {
  identitasUsaha: string;
  namaPemilik: string;
  jenisUsaha: string;
  alamatUsaha: string;
  lamaBerdiri: string;
  omzetBulanan: string;
  pengeluaranBulanan: string;
  totalHutang: string;
  totalAset: string;
  frekuensiTransaksi: string;
}

export interface UpdateBusinessRequest extends BusinessInfo {}

export interface ProfileResponse extends UserResponse, BusinessInfo {}

export interface UploadPhotoResponse {
  photoUrl: string;
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export interface DashboardStats {
  butuhModal: {
    jumlah: number;
    tenor: number;
  };
  bayarTagihan: {
    totalTagihan: number;
    jatuhTempo: string;
  };
  scoringTerakhir: {
    skor: number;
    status: "Layak" | "Review" | "Tidak Layak";
    tanggal: string;
  };
  tips: DashboardTip[];
}

export interface DashboardTip {
  id: string;
  judul: string;
  deskripsi: string;
}

// ── Scoring ───────────────────────────────────────────────────────────────────

export interface FiveCScore {
  label: string;
  score: number;
  deskripsi: string;
}

export interface HasilScoringResponse {
  skorTotal: number;
  kategori: "Layak" | "Review" | "Tidak Layak";
  tanggal: string;
  fiveC: FiveCScore[];
}

export interface ScoringRiwayatItem {
  id: string;
  tanggal: string;
  skor: number;
  status: "Layak" | "Review" | "Tidak Layak";
}

export interface ScoringRiwayatResponse {
  data: ScoringRiwayatItem[];
  total: number;
}

// ── Anomali Arus Kas ──────────────────────────────────────────────────────────

export interface AnomaliBulananItem {
  bulan: string;
  pemasukan: number;
  pengeluaran: number;
}

export interface AnomaliItem {
  id: string;
  tanggal: string;
  deskripsi: string;
  kategori: "Pemasukan" | "Pengeluaran";
  jumlah: number;
  tingkat: "Rendah" | "Sedang" | "Tinggi";
}

export interface AnomaliArusKasResponse {
  totalPemasukan: number;
  totalPengeluaran: number;
  arusBersih: number;
  jumlahAnomali: number;
  persentasePemasukan: number;
  persentasePengeluaran: number;
  riwayatBulanan: AnomaliBulananItem[];
  anomaliItems: AnomaliItem[];
}

// ── Rekomendasi ───────────────────────────────────────────────────────────────

export interface RekomendasiItem {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: "Keuangan" | "Operasional" | "Pemasaran" | "SDM";
  prioritas: "Tinggi" | "Sedang" | "Rendah";
}

export interface PlatformItem {
  id: string;
  nama: string;
  deskripsi: string;
  logoUrl: string | null;
  url: string;
}

export interface RekomendasiResponse {
  rekomendasi: RekomendasiItem[];
  platform: PlatformItem[];
}
