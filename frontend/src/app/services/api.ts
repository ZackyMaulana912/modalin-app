// API service — all requests go through BASE_URL/api/...
// Base URL is read from VITE_API_BASE_URL in .env / Vercel env vars

const BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/api$/, "");

async function request<T>(method: string, path: string, body?: unknown, isFormData = false): Promise<T> {
  const token = localStorage.getItem("modelin_token");
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers,
    body: isFormData ? (body as FormData) : body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return json as T;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>("POST", path, body);
}

async function put<T>(path: string, body: unknown): Promise<T> {
  return request<T>("PUT", path, body);
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function apiRegister(data: {
  nik: string;
  nama: string;
  email: string;
  password: string;
}) {
  return post<{ token: string; user: unknown }>("/auth/register", data);
}

export async function apiLogin(data: { email: string; password: string }) {
  return post<{ token: string; user: unknown }>("/auth/login", data);
}

export async function apiForgotPassword(data: { email: string }) {
  return post<{ message: string }>("/auth/forgot-password", data);
}

export async function apiVerifyOTP(data: { email: string; otp: string }) {
  return post<{ message: string }>("/auth/verify-otp", data);
}

export async function apiResetPassword(data: {
  email: string;
  otp: string;
  newPassword: string;
}) {
  return post<{ message: string }>("/auth/reset-password", data);
}

// ── Profile ───────────────────────────────────────────────────────────────────

export async function apiGetProfile() {
  return request<unknown>("GET", "/user/profile");
}

export async function apiUpdatePersonal(data: {
  nik: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}) {
  return put<{ message: string }>("/user/profile/personal", data);
}

export async function apiUpdateBusiness(data: {
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
  return put<{ message: string }>("/user/profile/business", data);
}

export async function apiChangePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  return put<{ message: string }>("/user/profile/password", {
    passwordLama: data.oldPassword,
    passwordBaru: data.newPassword,
  });
}

// ── Upload ────────────────────────────────────────────────────────────────────

export async function apiUploadFiles(formData: FormData) {
  return request<{ message: string }>("POST", "/upload/data", formData, true);
}

export async function apiGetRiwayatUpload() {
  return request<unknown>("GET", "/upload/riwayat");
}

// ── Scoring ───────────────────────────────────────────────────────────────────

export async function apiGetScoring() {
  return request<{ skor_kredit: number; status: string; data: unknown }>("GET", "/scoring");
}

// ── Anomali ───────────────────────────────────────────────────────────────────

export async function apiGetAnomali() {
  return request<{ data: unknown }>("GET", "/scoring/anomali");
}

// ── Rekomendasi ───────────────────────────────────────────────────────────────

export async function apiGetRekomendasi() {
  return request<unknown>("GET", "/scoring/rekomendasi");
}

// ── SHAP & AI Advisor ─────────────────────────────────────────────────────────

export async function apiGetShap() {
  return post<unknown>("/scoring/shap", {});
}

export async function apiGetAdvisor() {
  return post<unknown>("/scoring/advisor", {});
}
