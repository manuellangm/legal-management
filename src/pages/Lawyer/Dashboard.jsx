// src/pages/Lawyer/Dashboard.jsx
import { motion } from "framer-motion";
import { useLawyer } from "../../context/LawyerContext";

export default function LawyerDashboard() {
  const { cases, lawyerAppointment } = useLawyer()
  const mockStats = {
    totalCases: cases?.length || 0,
    activeCases: cases?.filter((c) => c.status === 'Active')?.length || 0,
    clients: lawyerAppointment?.length || 0,
    pendingAppointments: lawyerAppointment?.filter((a) => a.status === 'Pending')?.length || 0,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Lawyer Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Total Cases</h3>
          <p className="text-3xl font-bold">{mockStats.totalCases}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Active Cases</h3>
          <p className="text-3xl font-bold text-green-400">
            {mockStats.activeCases}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Clients</h3>
          <p className="text-3xl font-bold text-blue-400">
            {mockStats.clients}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Pending Appointments</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {mockStats.pendingAppointments}
          </p>
        </motion.div>
      </div>

      {/* Optional: Quick Links / Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        className="bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex space-x-4 flex-wrap">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
            View Cases
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
            View Clients
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg">
            View Appointments
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
            Chat with Client
          </button>
        </div>
      </motion.div>
    </div>
  );
}
