import { api } from "./client";
import type { HasilScoringResponse, ScoringRiwayatResponse } from "./types";

export const scoringApi = {
  getHasilScoring: (): Promise<HasilScoringResponse> =>
    api.get("/scoring"),

  getRiwayat: (page = 1, limit = 10): Promise<ScoringRiwayatResponse> =>
    api.get(`/scoring/riwayat?page=${page}&limit=${limit}`),

  getShap: (): Promise<unknown> =>
    api.post("/scoring/shap", {}),

  getAdvisor: (): Promise<unknown> =>
    api.post("/scoring/advisor", {}),
};
