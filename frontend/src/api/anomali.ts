import { api } from "./client";
import type { AnomaliArusKasResponse } from "./types";

export const anomaliApi = {
  getAnomali: (): Promise<AnomaliArusKasResponse> =>
    api.get("/scoring/anomali"),
};
