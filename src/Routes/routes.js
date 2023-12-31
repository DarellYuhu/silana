import React from "react";
import { Navigate } from "react-router-dom";

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
import PrintSuratTugas from "../Pages/PrintSuratTugas";
import PrintSpdDepan from "../Pages/PrintSpdDepan";
import PrintSpdBelakang from "../Pages/PrintSpdBelakang";
import PrintNominatif from "../Pages/PrintNominatif";
import PrintKwitansi from "../Pages/PrintKwitansi";
import PrintPerincian from "../Pages/PrintPerincian";
import Anggaran from "../Pages/Anggaran/Anggaran";
import EditSuratPerjalananDinasBelakang from "../Pages/EditSuratPerjalananDinasBelakang";
import NomorSurat from "../Pages/NomorSurat";

const authProtectedRoutes = [
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
  {
    path: "/surat-perjalanan-dinas/:id/belakang",
    component: <EditSuratPerjalananDinasBelakang />,
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
  { path: "/nomor-surat", component: <NomorSurat /> },

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
  {
    path: "/surat-perjalanan-dinas/:id/print-depan",
    component: <PrintSpdDepan />,
  },
  {
    path: "/surat-perjalanan-dinas/:id/print-belakang",
    component: <PrintSpdBelakang />,
  },
  {
    path: "/nominatif/:id/print",
    component: <PrintNominatif />,
  },
  {
    path: "/kwitansi/:id/print",
    component: <PrintKwitansi />,
  },
  {
    path: "/perincian/:id/print",
    component: <PrintPerincian />,
  },
];

export { authProtectedRoutes, publicRoutes };
