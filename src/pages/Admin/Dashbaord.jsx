// src/pages/Admin/Dashboard.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAdmin } from "../../hooks/useAdminContext";

export default function AdminDashboard() {
  const { users, groupAppointment, lawyersSpecialtyData, lawyers } = useAdmin();
  const pendingApprovals = lawyers
    ? lawyers.filter((l) => l.approved === "0").length
    : 0;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Total Users</h3>
          <p className="text-3xl font-bold">{users?.length || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Total Lawyers</h3>
          <p className="text-3xl font-bold">{lawyers.length || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg">Pending Approvals</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {pendingApprovals}
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Appointments Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Appointments Per Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={groupAppointment}>
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="total" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lawyers Specialty Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">Lawyers by Specialty</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={lawyersSpecialtyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {lawyersSpecialtyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
