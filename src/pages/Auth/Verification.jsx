
import { motion } from "framer-motion";

export default function Verification() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
          <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold">
            Verify
          </button>
        </form>
      </motion.div>
    </div>
  );
}
