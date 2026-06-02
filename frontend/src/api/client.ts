const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getToken(): string | null {
  return localStorage.getItem("modelin_token");
}

export function setToken(token: string): void {
  localStorage.setItem("modelin_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("modelin_token");
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  isFormData = false,
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isFormData
      ? (body as FormData)
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  if (res.status === 401) {
    clearToken();
    window.dispatchEvent(new Event("modelin:unauthorized"));
  }

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      json?.message ?? `HTTP ${res.status}`,
      json,
    );
  }

  return json as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
  upload: <T>(path: string, formData: FormData) =>
    request<T>("POST", path, formData, true),
};
