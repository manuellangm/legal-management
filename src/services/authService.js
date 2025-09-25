import api from "./api";

export const login = (data) => api.post("/index.php?action=login", data);
export const register = (data) => api.post("/index.php?action=register", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
export const updatePassword = (data) => api.post("/auth/update-password", data);
export const verifyEmail = (data) => api.post("/auth/verify-email", data);
