import { createContext, useEffect, useState } from "react";
import { _toggleStatus, deleteUser, getUsers } from "../services/userService";
import { toast } from "react-toastify";
import { setButton } from "../pages/Admin/Users";
import { getAppointmentByMonth, getAppointments } from "../services/appointmentService";
import { getLawyers, lawyersBySpecialty } from "../services/lawyerService";

export const AdminContext = createContext({
  users: [],
  groupAppointment: [],
  lawyersSpecialtyData: [],
  lawyers: [],
  appointments: [],
  fetchUsers: () => {},
  setUsers: () => {},
  _deleteUser: (user) => {},
  toggleStatus: (user) => {},
  getAppointByMonth: (user) => {},
  getAllLawyers: () => {},
  getAllAppointments: () => {},
});

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [appointmentMonth, setAppointmentMonth] = useState([]);
  const [lawyersSpecialtyData, setLawyersSpecialtyData] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const resp = await response.data;

      if (response.status == 200) {
        setUsers(resp.users);
        return resp;
      } else {
        console.log(message);
        return;
      }
    } catch (error) {
      console.error("Server Error: ", error);
    }
  };

  // Toggle Active / Inactive status
  const toggleStatus = async (u) => {
    const button_name = setButton(u.status);
    let _status = "";

    if (button_name === "Activate") {
      _status = "Active";
    } else {
      _status = "Inactive";
    }
    try {
      const response = await _toggleStatus(parseInt(u.id), { status: _status });
      const { status, message } = await response.data;

      console.log("API Response: ", response.data);

      if (status === "success") {
        toast.success(message || "Status updated successfully");
        const users = await fetchUsers();

        if (Array.isArray(users)) {
          setTimeout(() => {
            setUsers(users);
          }, 4000);
        }
      } else {
        console.log(message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  // Delete user
  const _deleteUser = async (user) => {
    try {
      const response = await deleteUser(parseInt(user.id), user.role);
      const { status, message } = await response.data;

      if (status === "success") {
        toast.success(message);
        const users = await fetchUsers();

        if (Array.isArray(users)) {
          setTimeout(() => {
            setUsers(users);
          }, 2000);
        } else {
          console.log("failed to fetch users");
        }
      }
    } catch (error) {
      const e = error?.response?.data?.message;
      toast.error(e);
      console.log("Failed to perform DELETE request");
    }
  };

  // get appointment by month
  const getAppointByMonth = async () => {
    try {
      const resp = await getAppointmentByMonth();
      const { status, message } = await resp.data;

      if (status === "OK") {
        const result = resp.data.data.map((a) => {
          return {
            total: a.total,
            month: `${new Date(`${a.month}-10`).toLocaleDateString("en-Us", {
              month: "short",
            })}`,
          };
        });
        setAppointmentMonth(result);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // get all lawyers
  const getAllLawyers = async () => {
    try {
      const resp = await getLawyers();
      const { status, data, message } = await resp.data;

      if (status === "OK") {
        setLawyers(data);
        return data
      } else {
        console.error(message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // get lawyers by specialty
  const fetchLawyersBySpecialty = async () => {
    try {
      const resp = await lawyersBySpecialty();
      const { status, message } = await resp.data;

      if (status === "OK") {
        const result = resp?.data['data']?.map((l) => {
          return {value: parseInt(l.value), name: l.name}
        });
        setLawyersSpecialtyData(result);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

   // get appointment by month
   const getAllAppointments = async () => {
    try {
      const resp = await getAppointments();
      const { status, message } = await resp.data;

      if (status === "OK") {
        const result = resp.data.appointments
        setAppointments(result);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };



  /*** */
  useEffect(() => {
    fetchUsers();
  }, [users.length]);

  useEffect(() => {
    getAllAppointments();
  }, [appointments?.length]);

  useEffect(() => {
    getAllLawyers()
  }, [lawyers?.length])

  useEffect(() => {
    getAppointByMonth();
    fetchLawyersBySpecialty()
  }, []);

  // UI
  return (
    <AdminContext.Provider
      value={{
        users,
        groupAppointment: appointmentMonth,
        lawyersSpecialtyData,
        lawyers,
        appointments,
        setUsers,
        fetchUsers,
        _deleteUser,
        toggleStatus,
        getAllLawyers,
        getAllAppointments
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
