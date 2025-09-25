import api from "./api";

export const get_lawyer_cases = (id) => api.get(`/index.php?action=lawyer_cases&id=${id}`)
export const updateCase_Status = (id, data) => api.put(`/index.php?action=caseUpdate&id=${id}`, data)
export const deleteCase = (id) => api.delete(`/index.php?action=deleteCase&id=${id}`)
export const createCase = (data) => api.post(`/index.php?action=createCase`, data)