// src/pages/Auth/ForgotPassword.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
            Send Verification Code
          </button>
        </form>

        <p className="mt-4 text-sm">
          Back to{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
