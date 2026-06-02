import { api } from "./client";
import type { RekomendasiResponse } from "./types";

export const rekomendasiApi = {
  getRekomendasi: (): Promise<RekomendasiResponse> =>
    api.get("/rekomendasi"),
};
