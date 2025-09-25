import api from "./api";

export const getAdminProfile = () => api.get("/admin/profile");
export const updateAdminProfile = (data) =>
  api.put("/admin/profile", data, { headers: { "Content-Type": "multipart/form-data" } });
