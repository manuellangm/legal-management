// src/App.jsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Public Pages
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Verification from "../pages/Auth/Verification";
import ResetPassword from "../pages/Auth/ResetPassword";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import LawyerLayout from "../layouts/LawyerLayout";

// Admin Pages
import AdminDashboard from "../pages/Admin/Dashbaord";
import ManageUsers from "../pages/Admin/Users";
import AdminAppointments from "../pages/Admin/Appointments";
import AdminProfile from "../pages/Admin/Profile";
import LawyersApproval from "../pages/Admin/LawyersApproval";

// Client Pages
import ClientDashboard from "../pages/Client/Dashboard";
import ClientCases from "../pages/Client/Cases";
import ClientChat from "../pages/Client/Chat";
import ClientAppointments from "../pages/Client/Appointment";
import ClientDocuments from "../pages/Client/Documents";
import ClientProfile from "../pages/Client/Profile";

// Lawyer Pages
import LawyerDashboard from "../pages/Lawyer/Dashboard";
import LawyerCases from "../pages/Lawyer/Cases";
import LawyerChat from "../pages/Lawyer/Chat";
import LawyerProfile from "../pages/Lawyer/Profile";
import LawyerAppointments from "../pages/Lawyer/Appointments";
import LawyerDocuments from "../pages/Lawyer/Documents";
import LawyerAvailability from "../pages/Lawyer/Availability";
import LawyerRegister from "../pages/Lawyer/Register";

// context providers
import { AdminProvider } from "../context/AdminContext";
import { LawyerProviderAPI } from "../context/LawyerContext";
import { UserProviderAPI } from "../context/UserProvider";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<LandingPage />}></Route>

      {/* Admin Routes with Nested Layout */}
      <Route
        path="/admin"
        element={
          <AdminProvider>
            <AdminLayout />
          </AdminProvider>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="lawyers-approval" element={<LawyersApproval />} />
      </Route>

      {/* Client Routes with Nested Layout */}
      <Route
        path="/client"
        element={
          <UserProviderAPI>
            <ClientLayout />
          </UserProviderAPI>
        }
      >
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="cases" element={<ClientCases />} />
        <Route path="chat" element={<ClientChat />} />
        <Route path="appointments" element={<ClientAppointments />} />
        <Route path="documents" element={<ClientDocuments />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>

      {/* Lawyer Routes with Nested Layout */}
      <Route
        path="/lawyer"
        element={
          <LawyerProviderAPI>
            <LawyerLayout />
          </LawyerProviderAPI>
        }
      >
        <Route path="dashboard" element={<LawyerDashboard />} />
        <Route path="cases" element={<LawyerCases />} />
        <Route path="chat" element={<LawyerChat />} />
        <Route path="profile" element={<LawyerProfile />} />
        <Route path="appointments" element={<LawyerAppointments />} />
        <Route path="documents" element={<LawyerDocuments />} />
        <Route path="profile" element={<LawyerProfile />} />
        <Route path="availability" element={<LawyerAvailability />} />
        <Route path="/lawyer/register" element={<LawyerRegister />} />
      </Route>
    </Route>
  )
);
