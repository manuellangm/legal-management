// src/pages/Client/Appointments.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClient } from "../../context/UserProvider";
import { cancelAppointmentByClient } from "../../services/appointmentService";
import { toast } from "react-toastify";

export default function ClientAppointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("upcoming"); // all | upcoming | past
  const [appointments, setAppointments] = useState([]);
  const { appointmentData, fetchAppointments } = useClient();

  useEffect(() => {
    fetchAppointments();
  }, [appointmentData?.length]);

  useEffect(() => {
    if (appointmentData.length > 0) {
      setAppointments(appointmentData);
    }
  }, [appointmentData?.length]);

  const mockLawyers = ["John Doe", "Jane Smith", "Michael Brown"];
  const today = new Date("2025-09-22"); // mock today (replace with new Date() in real app)

  // Cancel appointment
  const handleCancel = async (appt) => {
    try {
      const response = await cancelAppointmentByClient(appt);
      const { status, message } = await response.data;

      if (status === "success") {
        toast.success(message);
        await fetchAppointments();
      }
    } catch (error) {
      const e = error?.response?.data?.message;
      toast.error(e);
      console.log(error.message);
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt?.date?.split(" ")[0]);
    if (filter === "all") return true;
    if (filter === "upcoming") return apptDate >= today;
    if (filter === "past") return apptDate < today;
    return true;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>

      {/* Filter buttons */}
      <div className="flex space-x-3 mb-6">
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

      {/* Table of appointments */}
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
                  <td className="p-4">{appt.lawyer_name}</td>
                  <td className="p-4">{appt.date.split(" ")[0]}</td>
                  <td className="p-4">{appt.time}</td>
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
                    {appt.status === "Pending" ? (
                      <button
                        className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-lg"
                        onClick={() => handleCancel(appt)}
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
          <p className="text-gray-400">
            No appointments found for this filter.
          </p>
        )}
      </motion.div>

      {/* Book new appointment */}
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Book New Appointment
        </motion.button>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">Book Appointment</h3>

              <form className="space-y-4">
                {/* Lawyer Dropdown */}
                <div>
                  <label className="block text-sm mb-1">Choose Lawyer</label>
                  <select className="w-full p-2 rounded bg-gray-800 border border-gray-700">
                    {mockLawyers.map((lawyer, i) => (
                      <option key={i}>{lawyer}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm mb-1">Select Date</label>
                  <input
                    type="date"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm mb-1">Select Time</label>
                  <input
                    type="time"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
