// src/pages/Admin/LawyersApproval.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAdmin } from "../../hooks/useAdminContext";
import { approveRejectLawyer } from "../../services/lawyerService";
import { toast } from "react-toastify";

export default function LawyersApproval() {
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      specialty: "Family Law",
      status: "Pending",
    },
  ]);
  const { lawyers: lawyersList, getAllLawyers } = useAdmin();

  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [choice, setChoice] = useState(null)

  useEffect(() => {
    if (lawyersList && lawyersList.length > 0) {
      setLawyers(lawyersList);
    }
  }, [lawyersList?.length]);



  // Approve lawyer
  const approveLawyer = async (id) => {
    try {
      const response = await approveRejectLawyer(parseInt(id), true);
      const result = await response.data;

      if (result?.status === "success") {
        toast.success(result?.message);
        setSelectedLawyer(null);
        const lawyers = await getAllLawyers()
        setLawyers(lawyers)
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Reject lawyer
  const rejectLawyer = async (id) => {
    try {
      const response = await approveRejectLawyer(parseInt(id), false);
      const result = await response.data;

      if (result?.status === "success") {
        toast.error(result?.message);
        setSelectedLawyer(null);
        const lawyers = await getAllLawyers()
        setLawyers(lawyers)
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Pending Lawyer Approvals</h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto"
      >
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Specialty</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.map((lawyer, i) => (
              <tr
                key={lawyer.id}
                className={`border-b border-gray-700 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="p-4">{lawyer.name}</td>
                <td className="p-4">{lawyer.email}</td>
                <td className="p-4">{lawyer.specialty}</td>
                <td
                  className={`p-4 font-semibold ${
                    lawyer.approved === "0"
                      ? "text-yellow-400"
                      : lawyer.approved === "1"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {lawyer.approved === "0" ? "Pending" : "Approved"}
                </td>
                <td className="p-4 space-x-2">
                  {lawyer.approved === "0" && (
                    <button
                      className="bg-blue-600 cursor-pointer  hover:bg-blue-700 px-3 py-1 rounded-lg"
                      onClick={() => setSelectedLawyer(lawyer)}
                    >
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedLawyer && (
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
              <X
                className="absolute top-4 right-4 cursor-pointer text-gray-300"
                onClick={() => setSelectedLawyer(null)}
              />

              <h3 className="text-xl font-bold mb-4">{selectedLawyer.name}</h3>
              <p className="mb-2">
                <strong>Email:</strong> {selectedLawyer.email}
              </p>
              <p className="mb-2">
                <strong>Specialty:</strong> {selectedLawyer.specialty}
              </p>
              <p className="mb-4">
                <strong>Status:</strong> {selectedLawyer.status}
              </p>

              <div className="flex space-x-2">
                <button
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg flex-1"
                  onClick={() => approveLawyer(selectedLawyer.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex-1"
                  onClick={() => rejectLawyer(selectedLawyer.id)}
                >
                  Reject
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
