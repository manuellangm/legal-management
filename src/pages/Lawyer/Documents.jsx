import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "react-router-dom";
import { useLawyer } from "../../context/LawyerContext";
import {
  deleteDocument,
  uploadDocumentApi,
} from "../../services/documentService";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { AuthUser } from "../../utils/storage";

export default function LawyerDocuments() {
  const [modal, setModal] = useState({
    open: false,
  });
  const [formData, setFormData] = useState({
    client_name: "",
    case: "",
    document: null,
    content: "",
  });
  const [documents, setDocuments] = useState([]);

  // Context API data
  const { cases, getDocuments, documents: docs } = useLawyer();

  useEffect(() => {
    if (docs && docs.length > 0) {
      setDocuments(docs);
    }
  }, [docs?.length]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files?.length > 0) {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [deleteDoc, setDeleteDoc] = useState(null); // for delete modal

  // Uplaod a new document
  const uploadDocument = async () => {
    const fd = new FormData();
    const lawyerId = AuthUser() ? AuthUser()?.["lawyerId"] : null;

    fd.append("client_id", formData.client_name);
    fd.append("lawyer_id", lawyerId);
    fd.append("case_id", formData.case);
    fd.append("document", formData.document);
    fd.append("content", formData.content);

    try {
      const response = await uploadDocumentApi(fd);
      const { status, message } = await response.data;

      if (status === "success") {
        toast.success(message);
        setDeleteDoc(null);

        setModal({
          open: false,
        });
        setFormData({
          client_name: "",
          case: "",
          document: null,
          content: "",
        });

        // upadate UI
        const docs = await getDocuments();
        setDocuments(docs);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Document upload failed");
      console.log(error);
    }
  };

  // Delete a document
  const confirmDelete = async () => {
    try {
      const response = await deleteDocument(deleteDoc.id);
      const { status, message } = await response.data;

      if (status === "success") {
        toast.success(message);
        setDeleteDoc(null);

        const docs = await getDocuments();
        setDocuments(docs);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  // Download a document
  const handleDownload = (doc) => {
    const blob = new Blob([doc.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = doc.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Documents</h2>

      {/* Upload Button */}
      <div className="mb-6">
        <label
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer text-white font-semibold"
          onClick={() => setModal({ open: true })}
        >
          Upload Document
        </label>
      </div>

      {/* Documents Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="overflow-x-auto"
      >
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-4">Client</th>
              <th className="p-4">Case</th>
              <th className="p-4">Document Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Upload Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc, i) => (
                <tr
                  key={doc.id}
                  className={`border-b border-gray-700 ${
                    i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  }`}
                >
                  <td className="p-4">{doc?.client_name}</td>
                  <td className="p-4">{doc?.case_title}</td>
                  <td className="p-4">{doc.name}</td>
                  <td className="p-4">{doc.type}</td>
                  <td className="p-4">{doc?.uploaded_at}</td>
                  <td className="p-4 space-x-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg"
                      onClick={() => handleDownload(doc)}
                    >
                      Download
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                      onClick={() => setDeleteDoc(doc)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className="p-4">
                <span>No Documents uploaded yet</span>
              </div>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Document View Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-2">{selectedDoc.name}</h3>
              <p className="text-gray-300 mb-4">
                <strong>Client:</strong> {selectedDoc.client_name}
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Case:</strong> {selectedDoc.case_title}
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Type:</strong> {selectedDoc.type}
              </p>
              <p className="text-gray-300 mb-4">
                <strong>Content Preview:</strong>
                <br />
                {selectedDoc.content}
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg w-full"
                onClick={() => setSelectedDoc(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteDoc && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm text-center"
            >
              <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <strong>{deleteDoc.name}</strong>?
              </p>
              <div className="flex justify-between space-x-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg flex-1"
                  onClick={() => setDeleteDoc(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex-1"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Create Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
            >
              <div className="mb-2 flex justify-between items-center px-1">
                <h2 className="text-white font-bold">New Document</h2>
                <span
                  className="cursor-pointer"
                  onClick={() => setModal({ open: false })}
                >
                  <X />
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="client_name" className="font-light">
                  Your Clients
                </label>
                <select
                  name="client_name"
                  onChange={handleChange}
                  value={formData.client_name}
                  className="w-full h-12 text-gray-700 outline-0 border rounded-sm border-[#ffffff17]"
                >
                  <option value="" disabled>
                    Select a client
                  </option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.client_id}>
                      {c.client_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="case" className="font-light">
                  Your Cases
                </label>
                <select
                  name="case"
                  value={formData.case}
                  onChange={handleChange}
                  className="w-full h-12 text-gray-700 outline-0 border rounded-sm border-[#ffffff17]"
                >
                  <option value="">Select a case</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <button className="w-40 rounded-md capitalize font-semibold h-8 bg-gray-700 text-slate-50 text-sm outline-0 border-[#ffffff17]">
                  <label
                    htmlFor="document"
                    className="cursor-pointer hover:text-purple-500"
                  >
                    upload file
                  </label>
                </button>
                <span className="ml-2">{formData.document?.name}</span>
                <input
                  type="file"
                  name="document"
                  id="document"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="font-light">
                  Description
                </label>
                <textarea
                  name="content"
                  onChange={handleChange}
                  value={formData.content}
                  maxLength={100}
                  placeholder="Document Decription content.."
                  className="w-full text-slate-50 py-2 indent-3 outline-0 border rounded-sm h-15 border-[#ffffff17]"
                />
              </div>
              <button
                className="bg-blue-600 h-[6vh] hover:bg-blue-700 px-6 py-2 rounded-lg w-full"
                onClick={uploadDocument}
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteDoc && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm text-center"
            >
              <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <strong>{deleteDoc.name}</strong>?
              </p>
              <div className="flex justify-between space-x-4">
                <button
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg flex-1"
                  onClick={() => setDeleteDoc(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex-1"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
