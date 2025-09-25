import api from "./api";

export const getLawyers = () => api.get("/index.php?action=lawyers");
export const getLawyerById = (id) => api.get(`/lawyers/${id}`);
export const updateLawyer = (id, data) => api.put(`/lawyers/${id}`, data);
export const approveRejectLawyer = (id, choice) => api.patch(`/index.php?action=aprove_reject_lawyer&id=${id}`, {approve: choice});
export const deleteLawyer = (id) => api.delete(`/lawyers/${id}`);
export const lawyersBySpecialty = () => api.get('/index.php?action=lawyers_by_specialty')
export const setLawyerAvailability = (data) => api.post('/index.php?action=set_availability', data)
export const lawyerAvailability = (id) => api.get(`/index.php?action=get_availability&id=${id}`)
export const deleteLawyerAvailability = (data) => api.post('/index.php?action=delete_availability', data)
export const lawyerRequestAccount = (data) => api.post('/index.php?action=lawyer_request_account', data)
