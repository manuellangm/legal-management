// src/pages/Admin/Profile.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    password: "",
    newPassword: "",
    confirmPassword: "",
    avatar: "https://i.pravatar.cc/150?img=12", // default avatar
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      profile.newPassword &&
      profile.newPassword !== profile.confirmPassword
    ) {
      alert("New password and confirmation do not match!");
      return;
    }
    // Mock API update
    alert("Profile updated successfully!");
    setProfile((prev) => ({
      ...prev,
      password: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Profile</h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <span className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full text-xs">
              Edit
            </span>
          </label>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role}
              disabled
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-400 outline-none cursor-not-allowed"
            />
          </div>

          <hr className="border-gray-700 my-4" />

          <h3 className="text-lg font-semibold mb-2">Change Password</h3>

          <div>
            <label className="block text-gray-300 mb-1">Current Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold mt-4"
          >
            Update Profile
          </button>
        </form>
      </motion.div>
    </div>
  );
}
