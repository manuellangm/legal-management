import api from "./api";

export const getDocumentByLawyer = (id, role) => api.get("/index.php?action=document_lawyer&id="+id, {role: role});
export const getDocumentById = (id) => api.get(`/documents/${id}`);
export const uploadDocumentApi = (formData) =>
  api.post("/index.php?action=documents", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteDocument = (id) => api.delete(`/index.php?action=deleteDoc&id=${id}`);
