// src/pages/Lawyer/Availability.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  deleteLawyerAvailability,
  setLawyerAvailability,
} from "../../services/lawyerService";
import { AuthUser } from "../../utils/storage";
import { useLawyer } from "../../context/LawyerContext";

export default function LawyerAvailability() {
  const { lawyerAvailabilities, getLawyerAvailibility } = useLawyer();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];
  // Fetch existing availability on component mount
  
  useEffect(() => {
    getLawyerAvailibility();
  }, []); // only run once on mount
  
  useEffect(() => {
    if (lawyerAvailabilities) {
      const mapped = daysOfWeek.reduce((acc, day) => {
        acc[day] = [];
        return acc;
      }, {});
      
      const dayMap = {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
      };
      Object.keys(lawyerAvailabilities).forEach((shortDay) => {
        const fullDay = dayMap[shortDay];
        if (fullDay) {
          mapped[fullDay] = lawyerAvailabilities[shortDay];
        }
      });

      setAvailability(mapped);
    }
  }, [lawyerAvailabilities]);

  // State to store availability
  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );

  // Toggle time slot selection
  const toggleSlot = async (day, slot) => {
    const id = AuthUser() ? AuthUser()?.["lawyerId"] : null;
  
    // Map full day names -> short ones for backend
    const dayMap = {
      Monday: "Mon",
      Tuesday: "Tue",
      Wednesday: "Wed",
      Thursday: "Thu",
      Friday: "Fri",
    };
    

    // If slot is already selected → remove
    if (availability[day].includes(slot)) {
      try {
        const response = await deleteLawyerAvailability({
          lawyer_id: parseInt(id),
          day: dayMap[day], // backend expects short day e.g. "Tue"
          time_slot: slot,
        });
        const { status, message } = await response.data;
        if (status !== "success") {
          toast.error(message || "Failed to remove slot");
          return;
        }
        // Remove locally

        setAvailability((prev) => ({
          ...prev,
          [day]: prev[day].filter((s) => s !== slot),
        }));
        toast.success(message || "Availability removed");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to remove slot");
      }
    } else {
      // Else → add locally (will be saved when clicking "Save")
      setAvailability((prev) => ({
        ...prev,
        [day]: [...prev[day], slot],
      }));
    }
  };

  // Save availability to backend
  const handleSave = async () => {
    const id = AuthUser() ? AuthUser()?.["lawyerId"] : null;

    // Map full day names -> short ones for backend
    const dayMap = {
      Monday: "Mon",
      Tuesday: "Tue",
      Wednesday: "Wed",
      Thursday: "Thu",
      Friday: "Fri",
    };

    const formattedAvailability = Object.keys(availability).reduce(
      (acc, day) => {
        const shortDay = dayMap[day];
        acc[shortDay] = availability[day];
        return acc;
      },
      {}
    );

    try {
      const response = await setLawyerAvailability({
        lawyer_id: id,
        availability: formattedAvailability,
      });
      const { status, message } = await response.data;

      if (status === "success") {
        toast.success(message || "Availability saved successfully");
        getLawyerAvailibility();
      } else {
        console.log(message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error.message);
    }
  };

  const handleClear = () => {
    setAvailability(
      daysOfWeek.reduce((acc, day) => {
        acc[day] = [];
        return acc;
      }, {})
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Set Your Availability</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-4">Day / Time</th>
              {timeSlots.map((slot) => (
                <th key={slot} className="p-4 text-center text-sm">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => (
              <tr key={day} className="border-b border-gray-700">
                <td className="p-4 font-semibold">{day}</td>
                {timeSlots.map((slot) => (
                  <td key={slot} className="p-2 text-center">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSlot(day, slot)}
                      className={`w-10 h-10 rounded-full cursor-pointer transition-colors ${
                        availability[day].includes(slot)
                          ? "bg-green-500"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                    ></motion.button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          onClick={handleSave}
        >
          Save Availability
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
          onClick={handleClear}
        >
          Clear All
        </motion.button>
      </div>
    </div>
  );
}
