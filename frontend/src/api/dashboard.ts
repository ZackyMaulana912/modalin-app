import { api } from "./client";
import type { DashboardStats } from "./types";

export const dashboardApi = {
  getStats: (): Promise<DashboardStats> =>
    api.get("/dashboard"),
};
