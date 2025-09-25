import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthUser } from "../../utils/storage";

export default function ClientProfile() {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "",
  });
  const user = AuthUser() ? AuthUser() : null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (mock)");
  };

  useEffect(() => {
     if(user && user !== null){
      setProfile({
        name: user?.name,
        email: user?.email,
        role: user?.role
      })
     }
  }, [])

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            readOnly
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
          Update Profile
        </button>
      </form>
    </motion.div>
  );
}
