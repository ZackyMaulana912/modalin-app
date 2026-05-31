// ============================================================
// api.ts — Semua pemanggilan ke ModalIn Backend
// Base URL backend - set via environment variable VITE_API_URL
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || "https://modalin-app-production.up.railway.app/api";

// ── Helper: ambil token dari localStorage ───────────────────
const getToken = () => localStorage.getItem("modalin_token");

// ── Helper: request dengan JSON ─────────────────────────────
async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (data.status === "error") throw new Error(data.message);
  return data;
}

// ── Helper: request multipart (untuk upload file) ───────────
async function requestForm(path: string, formData: FormData, method = "POST") {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method: method,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await res.json();
  if (data.status === "error") throw new Error(data.message);
  return data;
}

// ══════════════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════════════

export async function apiRegister(payload: {
  nik: string;
  nama: string;
  email: string;
  password: string;
}) {
  const data = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  localStorage.setItem("modalin_token", data.data.token);
  return data.data.user;
}

export async function apiLogin(payload: { email: string; password: string }) {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  localStorage.setItem("modalin_token", data.data.token);
  return data.data.user; // berisi semua data profil user
}

export async function apiForgotPassword(email: string) {
  return request("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function apiVerifyOTP(email: string, otp: string) {
  const data = await request("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
  // Simpan reset token sementara untuk dipakai di halaman new-password
  localStorage.setItem("modalin_reset_token", data.data.resetToken);
  return data;
}

export async function apiResetPassword(resetToken: string, newPassword: string) {
  const data = await request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ resetToken, newPassword }),
  });
  localStorage.removeItem("modalin_reset_token");
  return data;
}

// ══════════════════════════════════════════════════════════════
// USER PROFILE
// ══════════════════════════════════════════════════════════════

export async function apiGetProfile() {
  const data = await request("/user/profile");
  return data.data.user;
}

export async function apiUpdatePersonal(payload: {
  nik: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}) {
  const data = await request("/user/profile/personal", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.data.user;
}

export async function apiUpdateBusiness(payload: {
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
}) {
  const data = await request("/user/profile/business", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data.data.user;
}

export async function apiChangePassword(passwordLama: string, passwordBaru: string) {
  return request("/user/profile/password", {
    method: "PUT",
    body: JSON.stringify({ passwordLama, passwordBaru }),
  });
}

// ══════════════════════════════════════════════════════════════
// UPLOAD FILE
// ══════════════════════════════════════════════════════════════

export async function apiUploadFiles(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return requestForm("/upload/data", formData);
}

// ══════════════════════════════════════════════════════════════
// SCORING
// ══════════════════════════════════════════════════════════════

export async function apiGetScoring() {
  const data = await request("/scoring");
  return data.data;
}

export async function apiGetAnomali() {
  const data = await request("/scoring/anomali");
  return data.data;
}

export async function apiGetRekomendasi() {
  const data = await request("/scoring/rekomendasi");
  return data.data;
}

// ══════════════════════════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════════════════════════

export function logout() {
  localStorage.removeItem("modalin_token");
  localStorage.removeItem("modalin_reset_token");
}

export function isLoggedIn() {
  return !!localStorage.getItem("modalin_token");
}

export async function apiUploadFoto(file: File) {
  const formData = new FormData();
  formData.append("foto", file);
  return requestForm("/user/profile/photo", formData, "PUT");
}

export async function apiHapusFoto() {
  return request("/user/profile/photo", {
    method: "DELETE",
  });
}

export async function apiGetUploadCount(): Promise<number> {
  const token = localStorage.getItem("modalin_token");
  const res = await fetch(`${BASE_URL}/upload/count`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal fetch upload count");
  const data = await res.json();
  return data.count ?? 0;
}