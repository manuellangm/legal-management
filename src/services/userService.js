import api from "./api";

export const getUsers = () => api.get("/index.php?action=users");
export const getClientAppointments = (id) => api.get(`/index.php?action=getClientAppointment&id=${id}`);
export const getClientMonthlyAppointmentStats = (id) => api.get(`/index.php?action=clientMonthlyAppointment&id=${id}`);
export const getClientCases = (id) => api.get(`/index.php?action=getClientCases&id=${id}`);
export const getUserById = (id) => api.get(`/index.php?/users/${id}`);
export const updateUser = (id, data) => api.put(`/index.php?action=updateUser&id=${Number(id)}`, data);
export const deleteUser = (id, role) => api.delete(`/index.php?action=deleteUser&id=${id}&role=${role}`);
export const _toggleStatus = (id, data) => api.patch(`/index.php?action=toggleStatus&id=${id}`, data)