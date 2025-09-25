// src/pages/Lawyer/Profile.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthUser } from "../../utils/storage";
import image from "../../assets/flutter.PNG";

export default function LawyerProfile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@lawfirm.com",
    role: "",
    specialization: "Family Law",
    barLicense: "BL123456",
  });
  const [profilePic, setProfilePic] = useState(null);

  const user = AuthUser() ? AuthUser() : null;

  useEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name || profile.name,
        email: user.email || profile.email,
        role: user.role || profile.role,
        specialization: user.specialization || profile.specialization,
        barLicense: user.barLicense || profile.barLicense,
      });
      setProfilePic(user.profilePic || image);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (mock)");
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6">Lawyer Profile</h2>

      {/* Profile Top Section */}
      <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <img
            src={
              profilePic ||
              "https://via.placeholder.com/150?text=Profile+Picture"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
          />
          <input
            type="file"
            onChange={handlePicChange}
            className="absolute bottom-0 right-0 w-10 h-10 opacity-0 cursor-pointer"
          />
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer">
            +
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xl font-semibold">{profile.name}</p>
          <p className="text-gray-400">{profile.specialization}</p>
          <p className="text-gray-400">Bar License: {profile.barLicense}</p>
        </div>
      </div>

      {/* Editable Info Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            name="phone"
            value={profile.role}
            // onChange={handleChange}
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
