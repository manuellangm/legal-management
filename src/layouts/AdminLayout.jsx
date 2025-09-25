// src/layouts/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  // Define sidebar links in an array
  const sidebarLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Lawyers", path: "/admin/lawyers-approval" },
    { name: "Profile", path: "/admin/profile" },
    { name: "Appointments", path: "/admin/appointments" },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gray-800 p-4 space-y-4 hidden md:block"
      >
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-2 py-2 rounded transition-colors ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-700 p-4 shadow-md flex justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
