import React, { createContext, useContext, useEffect, useState } from "react";
import { getAppointmentsByLawyerId } from "../services/appointmentService";
import { lawyerAvailability } from "../services/lawyerService";
import { AuthUser } from "../utils/storage";
import { get_lawyer_cases } from "../services/caseService";
import { getDocumentByLawyer } from "../services/documentService";

export const LawyerContext = createContext({
  lawyerAppointment: [],
  cases: [],
  documents: [],
  lawyerAvailabilities: [],
  getLawyerAppointments: () => {},
  getCases: () => {},
  getDocuments: () => {},
  getLawyerAvailibility(){}
});

const LawyerContextProvider = LawyerContext.Provider;

export const LawyerProviderAPI = ({ children }) => {
  const [appointments, setLawyerAppointments] = useState([]);
  const [cases, setcases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [lawyerAvailabilities, setLawyerAvailabilities] = useState([]);

  const getLawyerAppointments = async () => {
    try {
      const lawyerId = AuthUser() ? AuthUser()?.["lawyerId"] : null;
      const response = await getAppointmentsByLawyerId(parseInt(lawyerId));
      const { status, data } = await response.data;

      if (status === "OK") {
        setLawyerAppointments(data);
        return data;
      } else {
        setLawyerAppointments([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCases = async () => {
    try {
      const lawyerId = AuthUser() ? AuthUser()?.["lawyerId"] : null;
      const response = await get_lawyer_cases(parseInt(lawyerId));
      const { status, data } = await response.data;

      if (status === "success") {
        setcases(data);
        return data;
      } else {
        setcases([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDocuments = async () => {
    try {
      const lawyerId = AuthUser() ? AuthUser()?.["lawyerId"] : null;
      const response = await getDocumentByLawyer(
        parseInt(lawyerId),
        AuthUser()?.["role"]
      );
      const { status, data } = await response.data;

      console.log(data);

      if (status === "OK") {
        setDocuments(data);
        return data;
      } else {
        setDocuments([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLawyerAvailibility = async () => {
    try {
      const lawyerId = AuthUser() ? AuthUser()?.["lawyerId"] : null;
      const response = await lawyerAvailability(parseInt(lawyerId));
      const { status, data } = await response.data;

      if (status === "OK") {
        setLawyerAvailabilities(data);
        return data;
      } else {
        setLawyerAvailabilities([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLawyerAppointments();
    getCases();
    getDocuments();
  }, [appointments?.length, cases.length, documents?.length]);

  return (
    <React.Fragment>
      <LawyerContextProvider
        value={{
          lawyerAppointment: appointments,
          cases,
          documents,
          lawyerAvailabilities,
          getCases,
          getLawyerAppointments,
          getDocuments,
          getLawyerAvailibility
        }}
      >
        {children}
      </LawyerContextProvider>
    </React.Fragment>
  );
};

export const useLawyer = () => useContext(LawyerContext);
