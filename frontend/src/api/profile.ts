import { api } from "./client";
import type {
  ProfileResponse,
  UpdatePersonalRequest,
  UpdateBusinessRequest,
  UploadPhotoResponse,
} from "./types";

export const profileApi = {
  getProfile: (): Promise<ProfileResponse> =>
    api.get("/profile"),

  updatePersonal: (data: UpdatePersonalRequest): Promise<ProfileResponse> =>
    api.put("/profile/personal", data),

  updateBusiness: (data: UpdateBusinessRequest): Promise<ProfileResponse> =>
    api.put("/profile/business", data),

  uploadPhoto: async (file: File): Promise<UploadPhotoResponse> => {
    const formData = new FormData();
    formData.append("photo", file);
    return api.upload("/profile/photo", formData);
  },
};
