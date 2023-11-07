import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/UserProfile";
import BuatSuratTugas from "../Pages/BuatSuratTugas";
import AktifitasSurat from "../Pages/AktifitasSurat";
import SuratTugas from "../Pages/SuratTugas";
import SuratPerjalananDinas from "../Pages/SuratPerjalananDinas";
import Nominatif from "../Pages/Nominatif";
import Perincian from "../Pages/Perincian";
import Kwitansi from "../Pages/Kwitansi";
import EditSuratTugas from "../Pages/EditSuratTugas";
import EditSuratPerjalananDinas from "../Pages/EditSuratPerjalananDinas";
import EditNominatif from "../Pages/EditNominatif";
import EditPerincian from "../Pages/EditPerincian";
import EditKwitansi from "../Pages/EditKwitansi";
import DataKaryawan from "../Pages/DataKaryawan";
import Anggaran from "../Pages/Anggaran";
import PrintSuratTugas from "../Pages/PrintSuratTugas";

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
  { path: "/surat-tugas/buat-surat", component: <BuatSuratTugas /> },
  { path: "/surat-perjalanan-dinas", component: <SuratPerjalananDinas /> },
  {
    path: "/surat-perjalanan-dinas/:id",
    component: <EditSuratPerjalananDinas />,
  },
  { path: "/nominatif", component: <Nominatif /> },
  { path: "/nominatif/:id", component: <EditNominatif /> },
  { path: "/perincian", component: <Perincian /> },
  { path: "/perincian/:id", component: <EditPerincian /> },
  { path: "/kwitansi", component: <Kwitansi /> },
  { path: "/kwitansi/:id", component: <EditKwitansi /> },

  // Profile
  // { path: "/userprofile", component: <UserProfile /> },
  { path: "/user-profile", component: <UserProfile /> },
  { path: "/aktifitas-surat", component: <AktifitasSurat /> },
  { path: "/data-karyawan", component: <DataKaryawan /> },
  { path: "/anggaran", component: <Anggaran /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
  { path: "/surat-tugas/:id/print", component: <PrintSuratTugas /> },
];

export { authProtectedRoutes, publicRoutes };
