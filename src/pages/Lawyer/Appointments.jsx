import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLawyer } from "../../context/LawyerContext";
import { updateAppointmentStatus } from "../../services/appointmentService";
import { toast } from "react-toastify";

export default function LawyerAppointments() {
  const { lawyerAppointment, getLawyerAppointments } = useLawyer()
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    if(lawyerAppointment && Array.isArray(lawyerAppointment)) {
      setAppointments(lawyerAppointment)
    } else {
      setAppointments([])
    }
  }, [
    lawyerAppointment?.length
  ])

  const handleConfirm = async (id) => {
    try {
      const { data } = await updateAppointmentStatus({
        id: parseInt(id),
        status: 'Confirmed'
      })

      if(data?.status === 'success'){
        toast.success(data.message)
        const result = await getLawyerAppointments()
        setAppointments(result)
      } else {
        console.log(data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error)
    }
  };

  const handleCancel = async (id) => {
    try {
      const { data } = await updateAppointmentStatus({
        id: parseInt(id),
        status: 'Cancelled'
      })

      if(data?.status === 'success'){
        toast.success(data.message)
        const result = await getLawyerAppointments()
        setAppointments(result)
      } else {
        console.log(data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(error)
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
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
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? lawyerAppointment.map((appt, i) => (
              <tr
                key={appt.id}
                className={`border-b border-gray-700 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="p-4">{appt.client_name}</td>
                <td className="p-4">{appt.date}</td>
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
                <td className="p-4 space-x-2">
                  {appt.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleConfirm(appt.id)}
                        className="bg-green-600 cursor-pointer hover:bg-green-700 px-3 py-1 rounded-lg"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="bg-red-600 cursor-pointer hover:bg-red-700 px-3 py-1 rounded-lg"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-3 py-1 rounded-lg">
                    Chat
                  </button>
                </td>
              </tr>
            )) : <div className="p-5 text-center">
                 <span>No appointment yet</span>
              </div>}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
