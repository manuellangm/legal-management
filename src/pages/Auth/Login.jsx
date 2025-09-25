import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await login({ email, password });
      const { status, message } = response.data;

      if (status === "OK") {
        toast.success(message);
        localStorage.setItem("token", response.data?.token);
        localStorage.setItem("user", JSON.stringify(response.data?.user));
        setLoading(false);

        const role = response.data?.user["role"];

        setEmail('')
        setPassword('')

        if (role === "client") {
          navigate("/client/dashboard");
        } else if (role === "lawyer") {
          navigate("/lawyer/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashbaord");
        } else {
          console.log("Invalid role");
        }
      } 
    } catch (error) {
      const e = error?.response?.data?.message;
      setTimeout(() => {
        setLoading(false)
        toast.error(e);
      }, 2000)
      console.log("Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
          <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-blue-400">
            Forgot Password?
          </Link>
          <Link to="/register" className="text-blue-400">
            Create Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
