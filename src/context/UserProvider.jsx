import { createContext, useContext, useState } from "react";
import {
  getClientAppointments,
  getClientCases,
  getClientMonthlyAppointmentStats,
} from "../services/userService";
import { AuthUser } from "../utils/storage";

const UserContext = createContext({
  appointmentData: [],
  monthlyAppointments: [],
  caseData: [],
  fetchAppointments() {},
  fetchCases() {},
  fetchMonthlyAppointment() {},
});

const user = AuthUser() ? AuthUser() : null;

const UserContextProvider = UserContext.Provider;

export const UserProviderAPI = ({ children }) => {
  const [appointments, setAppointment] = useState([]);
  const [cases, setCases] = useState([]);
  const [monthly, setMonthly] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await getClientAppointments(user["id"]);
      const { status, message, data } = await response.data;

      if (status === "OK") {
        setAppointment(data);
      } else {
        console.log(message);
        setAppointment([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchCases = async () => {
    try {
      const response = await getClientCases(user["id"]);
      const { status, message, data } = await response.data;

      if (status === "success") {
        setCases(data);
      } else {
        console.log(message);
        setCases([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchMonthlyAppointment = async () => {
    try {
      const response = await getClientMonthlyAppointmentStats(user["id"]);
      const { status, message, data } = await response.data;

      if (status === "OK") {
        const filterData = data.map((app) => {
          let date = new Date(app.date).toLocaleDateString("en-Us", {
            month: "short",
          });
          return {
            month: date,
            appointments: app.appointments,
          };
        });
        setMonthly(filterData);
      } else {
        console.log(message);
        setMonthly([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <UserContextProvider
        value={{
          appointmentData: appointments,
          caseData: cases,
          monthlyAppointments: monthly,
          fetchAppointments,
          fetchCases,
          fetchMonthlyAppointment,
        }}
      >
        {children}
      </UserContextProvider>
    </>
  );
};

export const useClient = () => useContext(UserContext);
