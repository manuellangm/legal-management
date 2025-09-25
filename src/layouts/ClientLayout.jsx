// src/layouts/ClientLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function ClientLayout() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gray-800 p-4 space-y-4 hidden md:block"
      >
        <h2 className="text-xl font-bold mb-4">Client Area</h2>
        <nav className="flex flex-col space-y-2">
          {[
            { name: "Dashboard", path: "/client/dashboard" },
            { name: "My Cases", path: "/client/cases" },
            { name: "Appointments", path: "/client/appointments" },
            { name: "Documents", path: "/client/documents" },
            { name: "Profile", path: "/client/profile" },
            // { name: "Chat with Lawyer", path: "/client/chat" },
          ].map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-lg"
                      : "hover:bg-gray-700 text-gray-200"
                  }`}
                >
                  {item.name}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-700 p-4 shadow-md flex justify-between">
          <h1 className="text-lg font-semibold">Client Dashboard</h1>
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
