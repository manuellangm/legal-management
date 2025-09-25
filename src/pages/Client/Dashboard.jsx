// src/pages/Client/Dashboard.jsx
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useClient } from "../../context/UserProvider";
import { useEffect } from "react";

export default function ClientDashboard() {
  const { caseData, fetchCases, monthlyAppointments, fetchMonthlyAppointment } =
    useClient();
  const activeCases =
    caseData?.filter((c) => c?.status === "Active")?.length || 0;
  const closeCases =
    caseData?.filter((c) => c?.status === "Closed")?.length || 0;
  const mockStats = {
    totalCases: caseData?.length || 0,
    activeCases: activeCases,
    closedCases: closeCases,
  };

  useEffect(() => {
    fetchMonthlyAppointment()
  }, [monthlyAppointments?.length]);

  useEffect(() => {
    fetchCases();
  }, [caseData?.length]);

  const pieData = [
    { name: "Active", value: activeCases },
    { name: "Closed", value: closeCases },
  ];

  const COLORS = ["#34D399", "#F87171"]; // green for active, red for closed
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Client Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <h3 className="text-lg">Closed Cases</h3>
          <p className="text-3xl font-bold text-red-400">
            {mockStats.closedCases}
          </p>
        </motion.div>
      </div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-lg mb-4">Cases Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
        className="bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-lg mb-4">Appointments per Month</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyAppointments}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="appointments" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
