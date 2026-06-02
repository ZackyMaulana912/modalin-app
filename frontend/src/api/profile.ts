import { api } from "./client";
import type {
  ProfileResponse,
  UpdatePersonalRequest,
  UpdateBusinessRequest,
  UploadPhotoResponse,
} from "./types";

export const profileApi = {
  getProfile: (): Promise<ProfileResponse> =>
    api.get("/user/profile"),

  updatePersonal: (data: UpdatePersonalRequest): Promise<ProfileResponse> =>
    api.put("/user/profile/personal", data),

  updateBusiness: (data: UpdateBusinessRequest): Promise<ProfileResponse> =>
    api.put("/user/profile/business", data),

  changePassword: (data: { oldPassword: string; newPassword: string }): Promise<{ message: string }> =>
    api.put("/user/profile/password", data),

  uploadPhoto: async (file: File): Promise<UploadPhotoResponse> => {
    const formData = new FormData();
    formData.append("foto", file);
    return api.upload("/user/profile/photo", formData);
  },
};
