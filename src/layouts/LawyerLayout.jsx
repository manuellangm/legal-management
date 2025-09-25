import { createContext, useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const AdminContext = createContext({users: []})

const AdminProvider = AdminContext.Provider

export const useAdmin = () => useContext(Adm)

export default function LawyerLayout() {
  const links = [
    { to: "/lawyer/dashboard", label: "Dashboard" },
    { to: "/lawyer/cases", label: "Assigned Cases" },
    { to: "/lawyer/appointments", label: "Appointments" },
    { to: "/lawyer/profile", label: "Profile" },
    { to: "/lawyer/documents", label: "Documents" },
    // { to: "/lawyer/chat", label: "Chat with Clients" },
    { to: "/lawyer/availability", label: "Manage Availabilities" },
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
        <h2 className="text-xl font-bold mb-4">Lawyer Area</h2>
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-purple-600 hover:text-white ${
                  isActive ? "bg-purple-700 text-white" : "text-gray-300"
                }`
              }
            >
              <motion.div whileHover={{ scale: 1.05 }}>{link.label}</motion.div>
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-gray-700 p-4 shadow-md flex justify-between">
          <h1 className="text-lg font-semibold">Lawyer Dashboard</h1>
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
