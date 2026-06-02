// Stub API service — replace these with real fetch calls once backend is ready.
// Base URL is read from VITE_API_BASE_URL in .env.local

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function post<T>(path: string, body: unknown): Promise<T> {
  const token = localStorage.getItem("modelin_token");
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return json as T;
}

async function put<T>(path: string, body: unknown): Promise<T> {
  const token = localStorage.getItem("modelin_token");
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return json as T;
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

export async function apiUpdatePersonal(data: {
  nik: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
}) {
  return put<{ message: string }>("/profile/personal", data);
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
  return put<{ message: string }>("/profile/business", data);
}

export async function apiChangePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  return put<{ message: string }>("/auth/change-password", data);
}

// ── Scoring ───────────────────────────────────────────────────────────────────

export async function apiGetScoring(): Promise<{ skor_kredit: number; status: string }> {
  const token = localStorage.getItem("modelin_token");
  const res = await fetch(`${BASE}/scoring`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return json as { skor_kredit: number; status: string };
}

// ── Anomali Arus Kas ──────────────────────────────────────────────────────────

export async function apiGetAnomali(): Promise<{ anomali: unknown[] }> {
  const token = localStorage.getItem("modelin_token");
  const res = await fetch(`${BASE}/anomali`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return json as { anomali: unknown[] };
}

// ── Rekomendasi ───────────────────────────────────────────────────────────────

export async function apiGetRekomendasi(): Promise<unknown> {
  const token = localStorage.getItem("modelin_token");
  const res = await fetch(`${BASE}/rekomendasi`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return json;
}

export async function apiUploadFiles(formData: FormData) {
  const token = localStorage.getItem("modelin_token");
  const res = await fetch(`${BASE}/profile/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message ?? `HTTP ${res.status}`);
  return json as { photoUrl: string };
}
