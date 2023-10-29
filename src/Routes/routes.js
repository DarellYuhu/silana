import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";
import BuatSuratTugas from "../Pages/BuatSuratTugas";
import AktifitasSurat from "../Pages/AktifitasSurat";
import SuratTugas from "../Pages/SuratTugas";
import SuratPerjalananDinas from "../Pages/SuratPerjalananDinas";
import Nominatif from "../Pages/Nominatif";
import Perincian from "../Pages/Perincian";
import Kwitansi from "../Pages/Kwitansi";
import EditSuratTugas from "../Pages/EditSuratTugas";
import EditSuratPerjalananDinas from "../Pages/EditSuratPerjalananDinas";

const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/surat-tugas" />,
  },
  { path: "/surat-tugas", component: <SuratTugas /> },
  { path: "/surat-tugas/:id", component: <EditSuratTugas /> },
  { path: "/buat-surat", component: <BuatSuratTugas /> },
  { path: "/surat-perjalanan-dinas", component: <SuratPerjalananDinas /> },
  {
    path: "/surat-perjalanan-dinas/:id",
    component: <EditSuratPerjalananDinas />,
  },
  { path: "/nominatif", component: <Nominatif /> },
  { path: "/perincian", component: <Perincian /> },
  { path: "/kwitansi", component: <Kwitansi /> },

  // Profile
  { path: "/userprofile", component: <UserProfile /> },
  { path: "/aktifitas-surat", component: <AktifitasSurat /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
