import { api, setToken, clearToken } from "./client";
import type {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  VerifyCodeRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  MessageResponse,
} from "./types";

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/register", data);
    setToken(res.token);
    return res;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/auth/login", data);
    setToken(res.token);
    return res;
  },

  logout: async (): Promise<void> => {
    await api.post<MessageResponse>("/auth/logout").catch(() => null);
    clearToken();
  },

  forgotPassword: (data: ForgotPasswordRequest): Promise<MessageResponse> =>
    api.post("/auth/forgot-password", data),

  verifyOtp: (data: VerifyCodeRequest): Promise<MessageResponse> =>
    api.post("/auth/verify-otp", data),

  verifyCode: (data: VerifyCodeRequest): Promise<MessageResponse> =>
    api.post("/auth/verify-otp", data),

  resetPassword: (data: ResetPasswordRequest): Promise<MessageResponse> =>
    api.post("/auth/reset-password", data),

  changePassword: (data: ChangePasswordRequest): Promise<MessageResponse> =>
    api.put("/auth/change-password", data),
};
