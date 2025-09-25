// src/pages/Admin/Users.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  _toggleStatus,
  deleteUser,
  getUsers,
  updateUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import { useAdmin } from "../../hooks/useAdminContext";

export default function AdminUsers() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const { users, setUsers, fetchUsers, _deleteUser, toggleStatus } = useAdmin();

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Open modal with user data
  const viewUser = (user) => {
    setSelectedUser(user);
    setFormData({ ...user });
    setEditMode(false);
  };

  // Save edited user
  const saveUser = async () => {
    try {
      const resp = await updateUser(formData?.id, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
      const { status, message } = await resp.data;

      if (status === "success") {
        toast.success(message);
        const users = await fetchUsers();
        setUsers(users.map((u) => (u.id === formData.id ? formData : u)));
        setSelectedUser(formData);
        setEditMode(true); // discard modal
      } else {
        console.log(message);
      }
    } catch (error) {
      const e = error?.response?.data?.message;
      toast.error(e);
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Manage Users</h2>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full md:w-1/3 p-3 rounded-lg bg-gray-700 text-white outline-none mb-4"
      />

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto"
      >
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <tr
                key={user.id}
                className={`border-b border-gray-700 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td
                  className={`p-4 font-semibold ${
                    user.status === "Active" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {user.status}
                </td>
                <td className="p-4 space-x-2">
                  <button
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => viewUser(user)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 px-3 py-1 rounded-lg"
                    onClick={() => toggleStatus(user)}
                  >
                    {setButton(user.status)}
                  </button>
                  <button
                    className="bg-red-600 cursor-pointer hover:bg-red-700 px-3 py-1 rounded-lg"
                    onClick={() => _deleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* User Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md relative"
            >
              <X
                className="absolute top-4 right-4 cursor-pointer text-gray-300"
                onClick={() => setSelectedUser(null)}
              />

              {!editMode ? (
                <>
                  <h3 className="text-xl font-bold mb-4">
                    {selectedUser.name}
                  </h3>
                  <p className="mb-2">
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p className="mb-2">
                    <strong>Role:</strong> {selectedUser.role}
                  </p>
                  <p className="mb-4">
                    <strong>Status:</strong> {selectedUser.status}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg flex-1"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex-1"
                      onClick={() => _deleteUser(selectedUser)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4">Edit User</h3>
                  <input
                    type="text"
                    className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  />
                  <select
                    className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex-1"
                      onClick={saveUser}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg flex-1"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export // update button name
const setButton = (status) => {
  return status === "Active" ? "Deactivate" : "Activate";
};
