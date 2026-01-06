// api/admin.js (recommended)
import api from "../api/axios";

export const getAdminDashboardStats = () => {
  return api.get("/api/admin/dashboard/stats");
};
