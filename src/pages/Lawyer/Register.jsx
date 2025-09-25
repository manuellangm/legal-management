// src/pages/Lawyer/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LawyerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialty: "",
    phone: "",
    licenseNumber: "",
    documents: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Mock API call
    setTimeout(() => {
      setSubmitting(false);
      alert(
        "Your registration has been submitted! Admin will review and approve your account."
      );
      navigate("/"); // redirect to landing or login page
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Become a Lawyer</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 outline-none"
        />

        <input
          type="text"
          name="specialty"
          placeholder="Specialty (e.g., Family Law)"
          value={formData.specialty}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 outline-none"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 outline-none"
        />

        <input
          type="text"
          name="licenseNumber"
          placeholder="Law License Number"
          value={formData.licenseNumber}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 outline-none"
        />

        <label className="block">
          <span className="text-gray-300 mb-1">Upload License / Documents</span>
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold mt-2"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Registration"}
        </button>
      </motion.form>
    </div>
  );
}
