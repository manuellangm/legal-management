// src/pages/Admin/Appointments.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAdmin } from "../../hooks/useAdminContext";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: "Jane Doe",
      lawyer: "John Doe",
      date: "2025-09-25",
      time: "10:00 AM",
      status: "Confirmed",
    },
  ]);
  const { appointments: data, getAllAppointments } = useAdmin();
  console.log(data)

  const [filter, setFilter] = useState("all"); // all | upcoming | past
  const [search, setSearch] = useState("");
  const today = new Date("2025-09-22"); // mock today

  useEffect(() => {
    getAllAppointments();
  }, [data?.length]);

  useEffect(() => {
    if (data && data.length > 0) {
      setAppointments(data);
    }
  }, [data?.length]);

  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "Cancelled" } : appt
      )
    );
  };

  const filteredAppointments = appointments
    .filter((appt) => {
      const apptDate = new Date(appt?.appointment_date);
      if (filter === "upcoming") return apptDate >= today;
      if (filter === "past") return apptDate < today;
      return true;
    })
    .filter(
      (appt) =>
        appt?.client_name?.toLowerCase().includes(search.toLowerCase()) ||
        appt?.lawyer_name?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">All Appointments</h2>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
        <input
          type="text"
          placeholder="Search by client or lawyer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 text-white w-full md:w-1/3 outline-none"
        />
        <div className="flex space-x-3">
          {["all", "upcoming", "past"].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="overflow-x-auto"
      >
        {filteredAppointments.length > 0 ? (
          <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-4">Client</th>
                <th className="p-4">Lawyer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt, i) => (
                <tr
                  key={appt.id}
                  className={`border-b border-gray-700 ${
                    i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  }`}
                >
                  <td className="p-4">{appt?.client_name}</td>
                  <td className="p-4">{appt?.lawyer_name}</td>
                  <td className="p-4">{new Date(appt?.appointment_date).toLocaleDateString()}</td>
                  <td className="p-4">{appt.appointment_time?.slice(0,5)}</td>
                  <td
                    className={`p-4 font-semibold ${
                      appt.status === "Confirmed"
                        ? "text-green-400"
                        : appt.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {appt.status}
                  </td>
                  <td className="p-4">
                    {appt.status !== "Cancelled" ? (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="bg-gray-600 px-4 py-2 rounded-lg"
                        disabled
                      >
                        N/A
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No appointments found.</p>
        )}
      </motion.div>
    </div>
  );
}
