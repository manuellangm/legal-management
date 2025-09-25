// src/pages/Auth/Register.jsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../services/authService";
import { toast } from "react-toastify";

export default function Register() {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const response = await register({email, password, name, role})
      const { status, message,  } = await response.data 

      if(status === 'success'){
        toast.success(message)
        setEmail('')
        setPassword('')
        setRole('client')
        setName('')
       setTimeout(() => {
         navigate('/login')
       }, 2000)
      } else {
        console.log(message)
        setTimeout(() => setLoading(false), 2000)
      }
    } catch (error) {
      const e = error?.response?.data?.message
      toast.error(e)
      console.log('Registration failed')
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />

          {/* Role selection */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={() => setRole("client")}
              />
              <span>Client</span>
            </label>
            {/* <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="lawyer"
                checked={role === "lawyer"}
                onChange={() => setRole("lawyer")}
              />
              <span>Lawyer</span>
            </label> */}
          </div>

          <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
            {role === "lawyer" ? "Apply as Lawyer" : "Register as Client"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
