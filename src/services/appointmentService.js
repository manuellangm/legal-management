import api from "./api";

export const getAppointments = () => api.get("/index.php?action=appointments");
export const getAppointmentById = (id) => api.get(`/appointments/${id}`);
export const getAppointmentsByLawyerId = (id) =>
  api.get(`/index.php?action=lawyerAppointment&id=${id}`);
export const createAppointment = (data) => api.post("/appointments", data);
export const updateAppointmentStatus = (data) =>
  api.patch(`/index.php?action=appointment_status`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);
export const cancelAppointmentByClient = (ids) =>
  api.delete(
    `/index.php?action=cancelAppointment&id=${ids.id}&clientId=${ids.client_id}&lawyerId=${ids.lawyer_id}`
  );
export const getAppointmentByMonth = () =>
  api.get("/index.php?action=appointment_by_month");
