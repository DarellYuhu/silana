const SidebarData = [
  {
    label: "Menu",
    isMainMenu: true,
  },
  // {
  //   label: "Buat Surat",
  //   icon: "mdi mdi-email-plus-outline",
  //   url: "/buat-surat",
  //   isHasArrow: true,
  // },
  // {
  //   label: "Aktivitas Surat",
  //   icon: "mdi mdi-email-multiple-outline",
  //   url: "/aktifitas-surat",
  //   isHasArrow: true,
  // },
  {
    label: "Perjalanan Dinas",
    icon: "mdi mdi-note-text-outline",
    subItem: [
      { sublabel: "Surat Tugas", link: "/surat-tugas" },
      { sublabel: "Surat Perjalanan Dinas", link: "/surat-perjalanan-dinas" },
      { sublabel: "Nominatif", link: "/nominatif" },
      { sublabel: "Perincian", link: "/perincian" },
      { sublabel: "Kwitansi", link: "/kwitansi" },
    ],
  },
  {
    label: "Pengelolaan",
    icon: "mdi mdi-domain",
    subItem: [
      { sublabel: "Data Karyawan", link: "/data-karyawan" },
      { sublabel: "Anggaran", link: "/anggaran" },
      { sublabel: "Nomor Surat", link: "/nomor-surat" },
    ],
  },
];
export default SidebarData;
