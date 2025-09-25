import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLawyer } from "../../context/LawyerContext";
import { toast } from "react-toastify";
import {
  createCase,
  deleteCase,
  updateCase_Status,
} from "../../services/caseService";
import { Plus, X } from "lucide-react";
import { AuthUser } from "../../utils/storage";

export default function LawyerCases() {
  // Context API data
  const { cases, getCases, lawyerAppointment } = useLawyer();

  const [clients, setClients] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [lawyerCases, setLawyercases] = useState([]);
  const [status, setStatus] = useState("Active");
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [editModal, setEditModal] = useState({
    open: false,
    selectedCase: null,
  });
  const [createModal, setCreateModal] = useState(false);

  const handleChat = (c) => {
    alert(`Open chat with ${c.client} (mock)`);
  };

  useEffect(() => {
    if (lawyerAppointment && Array.isArray(lawyerAppointment)) {
      // should return unique client name and id only
      const uniqueClients = [
        ...new Map(
          lawyerAppointment.map((item) => [item["client_id"], item])
        ).values(),
      ];
      setClients(uniqueClients);
    }
  }, [lawyerAppointment?.length]);
  console.log(clients);

  // Updates case status
  const updateCaseStatus = async (id) => {
    try {
      const response = await updateCase_Status(id, {
        id,
        status,
        title,
        description,
      });
      const { status: resp, message } = await response.data;

      if (resp === "success") {
        toast.success(message);
        resetForm();
        setEditModal({ open: false, selectedCase: null });
        const results = await getCases();
        setLawyercases(results);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  // Deletes a case
  const destroyCase = async (caseId) => {
    try {
      const response = await deleteCase(caseId);
      const { status, message } = await response.data;

      if (status === "success") {
        toast.success(message);
        const results = await getCases();
        setLawyercases(results);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  // Create a new case
  const handleCaseCreate = async (e) => {
    e.preventDefault();
    const user = AuthUser() ? AuthUser() : null;
    try {
      const response = await createCase({
        client_id: client,
        title,
        description,
        status,
        lawyer_id: parseInt(user["lawyerId"]),
      });
      const { status: resp, message } = await response.data;
      if (resp === "success") {
        toast.success(message);
        resetForm();
        setCreateModal(false);
        const results = await getCases();
        setLawyercases(results);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Active");
  };

  useEffect(() => {
    if (cases && Array.isArray(cases)) {
      setLawyercases(cases);
    }
  }, [cases.length]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">My Cases</h2>
        <button
          className="bg-blue-600 text-white flex justify-center items-center gap-2 p-2 rounded-md cursor-pointer"
          onClick={() => setCreateModal(true)}
        >
          <Plus />
          <span>Create</span>
        </button>
      </div>

      {/* Cases Table */}
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
              <th className="p-4">Case Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Update</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawyerCases.map((c, i) => (
              <tr
                key={c.id}
                className={`border-b border-gray-700 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="p-4">{c.client_name}</td>
                <td className="p-4">{c.title}</td>
                <td
                  className={`p-4 font-semibold ${
                    c.status === "Active" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {c.status}
                </td>
                <td className="p-4">
                  {new Date(c.last_update).toLocaleDateString()}
                </td>
                <td className="p-4 space-x-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => setSelectedCase(c)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-blue cursor-pointer hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => handleChat(c)}
                  >
                    Chat
                  </button>
                  <button
                    className="bg-green-600 cursor-pointer hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() =>
                      setEditModal({ open: true, selectedCase: c })
                    }
                  >
                    Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* View Case Modal */}
      <AnimatePresence>
        {selectedCase && (
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
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md relative"
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                onClick={() => setSelectedCase(null)}
              >
                <X />
              </button>
              <h3 className="text-xl font-bold mb-2">{selectedCase.title}</h3>
              <p className="text-gray-300 mb-4">
                <strong>Client:</strong> {selectedCase.client_name}
              </p>
              <p className="text-gray-300 mb-4">{selectedCase.description}</p>
              <p className="mb-4">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    selectedCase.status === "Active"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedCase.status}
                </span>
              </p>
              <p className="text-gray-400 mb-6">
                Last Update: {selectedCase.last_update}
              </p>
              <button
                className="bg-red-600 cursor-pointer mb-2 hover:bg-red-700 px-6 py-2 rounded-lg w-full"
                onClick={() => destroyCase(selectedCase.id)}
              >
                Delete Case
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case edit Modal */}
      <AnimatePresence>
        {editModal.open && (
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
              <div className="flex justify-between px-4 items-center">
                <h3 className="text-xl font-bold mb-4">
                  Case: {editModal.selectedCase?.title}
                </h3>
                <button
                  onClick={() =>
                    setEditModal({ open: false, selectedCase: null })
                  }
                >
                  <X />
                </button>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={title}
                  placeholder="New case title..."
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 w-full outline-0 border border-gray-700 indent-2"
                />
              </div>

              <div className="mb-4">
                <textarea
                  value={description}
                  placeholder="Case description (max 200 words)"
                  maxLength={200}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-20 py-2 outline-0 w-full border border-gray-700 indent-2"
                />
              </div>

              <select
                name="status"
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-12 border-2 mb-6 text-gray-400"
              >
                <option value="" disabled>
                  Update case status
                </option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
              <button
                className="bg-blue-600 cursor-pointer h-12 hover:bg-blue-700 px-6 mt-4 py-2 rounded-lg w-full"
                onClick={() => updateCaseStatus(editModal.selectedCase.id)}
              >
                Submit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Case Modal */}
      <AnimatePresence>
        {createModal && (
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
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md relative"
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                onClick={() => {
                  setCreateModal(false);
                  resetForm();
                }}
              >
                <X />
              </button>
              <h3 className="text-xl font-bold mb-4">Create New Case</h3>

              <select
                name="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                id=""
                className="h-12 mb-4 w-full outline-0 border bg-gray-900 border-gray-700 indent-2"
              >
                {clients.map((c, i) => (
                  <option key={i} value={c.client_id} className="text-slate-50">
                    {c.client_name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={title}
                placeholder="Case title..."
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 mb-4 w-full outline-0 border border-gray-700 indent-2"
              />

              <textarea
                value={description}
                placeholder="Case description (max 200 words)"
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
                className="h-20 mb-4 py-2 outline-0 w-full border border-gray-700 indent-2"
              />

              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-12 border-2 mb-6 text-gray-400"
              >
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>

              <button
                type="submit"
                className="bg-blue-600 cursor-pointer h-12 hover:bg-blue-700 px-6 mt-4 py-2 rounded-lg w-full"
                onClick={handleCaseCreate}
              >
                Create
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
