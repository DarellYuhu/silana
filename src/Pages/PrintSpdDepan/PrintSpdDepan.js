import React, { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logoMkri from "../../assets/images/logo-mkri.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import localization from "moment/locale/id";
import angkaTerbilang from "@develoka/angka-terbilang-js";

const PrintSpdDepan = () => {
  const [employees, setEmployees] = useState([]);
  const printRef = useRef();
  const data = useLocation().state;
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
      }
    `,
  });

  console.log(data);

  const getEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:2000/employees");
      console.log(res);
      setEmployees(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Fragment>
      {/* <div className="page-content">Yuhu</div> */}
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          color: "black",
        }}
      >
        <div
          ref={printRef}
          style={{
            width: "210mm",
            height: "297mm",
            padding: "0.2cm 1.5cm",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "65px",
                textAlign: "center",
              }}
            >
              <img src={logoMkri} style={{ width: "1.04in" }} alt="garuda" />
              <p style={{ fontSize: "9pt", margin: 0 }}>
                MENTERI KEUANGAN
                <br />
                REPUBLIK INDONESIA
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ fontSize: "5.5pt", margin: 0 }}>
                LAMPIRAN 1<br />
                PERATURAN MENTERI KEUANGAN REPUBLIK INDONESIA <br />
                NOMOR 113/PMK.05/2012
                <br />
                TENTANG
                <br />
                PERJALANAN DINAS JABATAN DALAM NEGRI BAGI PEJABAT
                <br />
                NEGARA, PEGAWAI NEGRI, DAN PEGAWAI TIDAK TETAP
                <br />
              </p>
            </div>
          </div>

          {/* body */}
          <div>
            <Table style={{ paddingTop: 9, paddingBottom: 9 }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={[
                      styles.cell1,
                      {
                        paddingX: 0,
                        border: "transparent",
                        verticalAlign: "top",
                      },
                    ]}
                  >
                    <p
                      style={{ fontSize: "7pt", fontWeight: "bold", margin: 0 }}
                    >
                      KEMENTERIAN NEGARA / LEMBAGA NEGARA :
                    </p>
                    <p
                      style={{ fontSize: "7pt", fontWeight: "bold", margin: 0 }}
                    >
                      PERWAKILAN BADAN KEPENDUDUKAN DAN KELUARGA BERENCANA
                      NASIONAL
                    </p>
                  </TableCell>
                  <TableCell
                    sx={{ padding: 0, width: 250, border: "transparent" }}
                  >
                    <TableRow>
                      <TableCell sx={styles.cell2}>LEMBAR KE</TableCell>
                      <TableCell sx={[styles.cell2, { paddingX: 1 }]}>
                        :
                      </TableCell>
                      <TableCell
                        sx={[styles.cell2, { width: "100%" }]}
                      ></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.cell3}>Kode No</TableCell>
                      <TableCell sx={[styles.cell3, { paddingX: 1 }]}>
                        :
                      </TableCell>
                      <TableCell
                        sx={[styles.cell3, { width: "100%" }]}
                      ></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.cell3}>Nomor</TableCell>
                      <TableCell sx={[styles.cell3, { paddingX: 1 }]}>
                        :
                      </TableCell>
                      <TableCell
                        sx={[styles.cell3, { width: "100%" }]}
                      ></TableCell>
                    </TableRow>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <h3
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SURAT PERJALANAN DINAS (SPD)
              </h3>
            </div>
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={styles.cell1}>1</TableCell>
                    <TableCell sx={styles.cell1}>
                      Pejabat Pembuat Komitmen
                    </TableCell>
                    <TableCell
                      sx={[
                        styles.cell1,
                        { fontSize: "9pt", fontWeight: "bold", paddingY: 1 },
                      ]}
                    >
                      {data?.data?.travel?.commitmentMaker}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>2</TableCell>
                    <TableCell sx={styles.cell1}>
                      Nama/NIP Pegawai yang melaksanakan perjalanan dinas
                    </TableCell>
                    <TableCell
                      sx={[
                        styles.cell1,
                        { fontSize: "9pt", fontWeight: "bold", paddingY: 1 },
                      ]}
                    >
                      {data?.selectedPerson}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>3</TableCell>
                    <TableCell sx={styles.cell1}>
                      a. pangkat dan golongan <br />
                      b. Jabatan / Instansi <br />
                      c. Tingkat Biaya Perjalanan Dinas
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      a.{" "}
                      {
                        employees.find(
                          (item) => item.name === data?.selectedPerson
                        )?.classRank
                      }{" "}
                      <br />
                      b.{" "}
                      {
                        employees.find(
                          (item) => item.name === data?.selectedPerson
                        )?.jobTitle
                      }{" "}
                      <br />
                      c.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>4</TableCell>
                    <TableCell sx={styles.cell1}>
                      Maksud Perjalanan Dinas
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      {data?.data?.assignedTo}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>5</TableCell>
                    <TableCell sx={[styles.cell1, { whiteSpace: "nowrap" }]}>
                      Alat angkutan yang dipergunakan
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      {data?.data?.vehicleType}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>6</TableCell>
                    <TableCell sx={[styles.cell1, { verticalAlign: "top" }]}>
                      a. Tempat Berangkat
                      <br />
                      b. Tempat Tujuan
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      a. {data?.data?.travel?.departure} <br /> b.{" "}
                      {data?.data?.travel?.destination?.join(", dan ")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>7</TableCell>
                    <TableCell sx={[styles.cell1, { whiteSpace: "nowrap" }]}>
                      a. Lama Perjalanan Dinas
                      <br />
                      b. Tanggal Berangkat
                      <br />
                      c. Tanggal harus kembali/tiba di tempat baru
                    </TableCell>
                    <TableCell
                      sx={[styles.cell1, { whiteSpace: "break-spaces" }]}
                    >
                      {`a. ${moment(data?.data?.endDateOftravel).diff(
                        data?.data?.startDateOftravel,
                        "days"
                      )} (${angkaTerbilang(
                        moment(data?.data?.endDateOftravel).diff(
                          data?.data?.startDateOftravel,
                          "days"
                        )
                      )}) hari \nb. ${moment(
                        data?.data?.startDateOftravel
                      ).format("D MMMM")} \nc. ${moment(
                        data?.data?.endDateOftravel
                      ).format("D MMMM")}`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>8</TableCell>
                    <TableCell sx={[styles.cell1, { padding: 0 }]}>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell1,
                              { width: "10%", border: "transparent" },
                            ]}
                          >
                            Pengikut:
                          </TableCell>
                          <TableCell
                            sx={[
                              styles.cell1,
                              { width: "100%", border: "transparent" },
                            ]}
                          >
                            Nama
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderTop: "1px solid black",
                                paddingTop: "3px",
                              },
                            ]}
                          >
                            1.
                          </TableCell>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderTop: "1px solid black",
                                paddingTop: "3px",
                              },
                            ]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                              },
                            ]}
                          >
                            2.
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                              },
                            ]}
                          >
                            3
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                              },
                            ]}
                          >
                            4.
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                              },
                            ]}
                          >
                            5.
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                      </TableBody>
                    </TableCell>
                    <TableCell sx={[styles.cell1, { padding: 0 }]}>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell1,
                              {
                                width: "20%",
                                border: "transparent",
                              },
                            ]}
                          >
                            Tanggal Lahir
                          </TableCell>
                          <TableCell
                            sx={[
                              styles.cell1,
                              {
                                width: "20%",
                                border: "transparent",
                                borderLeft: "1px solid black",
                              },
                            ]}
                          >
                            Keterangan
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderTop: "1px solid black",
                                paddingTop: "3px",
                                borderRight: "1px solid black",
                                visibility: "hidden",
                              },
                            ]}
                          >
                            1.
                          </TableCell>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderTop: "1px solid black",
                                paddingTop: "3px",
                              },
                            ]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderRight: "1px solid black",
                                visibility: "hidden",
                              },
                            ]}
                          >
                            2.
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderRight: "1px solid black",
                                visibility: "hidden",
                              },
                            ]}
                          >
                            3
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderRight: "1px solid black",
                                visibility: "hidden",
                              },
                            ]}
                          >
                            4.
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={[
                              styles.cell4,
                              {
                                border: "1px solid white",
                                borderRight: "1px solid black",
                                visibility: "hidden",
                              },
                            ]}
                          >
                            5.
                          </TableCell>
                          <TableCell
                            sx={[styles.cell4, { border: "1px solid white" }]}
                          ></TableCell>
                        </TableRow>
                      </TableBody>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>9</TableCell>
                    <TableCell sx={styles.cell1}>
                      Pembebanan Anggaran <br />
                      a. Instansi <br />
                      b. Mata Anggaran
                    </TableCell>
                    <TableCell
                      sx={[styles.cell1, { whiteSpace: "break-spaces" }]}
                    >
                      {`\na. ${data?.data?.burden} \nb. ${data?.data?.budgetId}`}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>10</TableCell>
                    <TableCell sx={styles.cell1}>
                      Keterangan lain-lain
                    </TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <div>
              <div
                className="row"
                style={{ fontSize: "11.5px", whiteSpace: "nowrap" }}
              >
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-4">Dikeluarkan di</div>
                    <div className="col-sm-1">:</div>
                    <div className="col-sm-7">Manado</div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">Tanggal</div>
                    <div className="col-sm-1">:</div>
                    <div className="col-sm-7">
                      {moment().locale("id").format("DD MMMM YYYY")}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginRight: 108, marginTop: 20 }}>
                <h4
                  style={{ margin: 0, fontSize: "11.5px", fontWeight: "bold" }}
                >
                  Pejabat Pembuat Komitmen,
                </h4>
                <div
                  style={{
                    marginTop: 60,
                  }}
                />
                <h5
                  style={{ margin: 0, fontSize: "11.5px", fontWeight: "bold" }}
                >
                  {data?.data?.travel?.commitmentMaker}
                </h5>
                <div
                  style={{
                    height: "2px",
                    backgroundColor: "black",
                    width: "100%",
                  }}
                />
                <p style={{ margin: 0, fontSize: "11.5px" }}>
                  {`NIP. ${
                    employees.find(
                      (item) =>
                        item.name === data?.data?.travel?.commitmentMaker
                    )?.id
                  }`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handlePrint}>Print PDF</button>
      </div>
    </Fragment>
  );
};

const styles = {
  text1: { fontSize: "8px", margin: 0 },
  cell1: {
    paddingX: "8px",
    paddingY: 0.5,
    fontSize: "11.5px",
    border: "1px solid black",
  },
  cell2: {
    fontSize: "7pt",
    padding: 0,
    whiteSpace: "nowrap",
    border: "transparent",
  },
  cell3: {
    fontSize: "6.5pt",
    padding: 0,
    whiteSpace: "nowrap",
    border: "transparent",
  },
  cell4: {
    paddingX: "8px",
    paddingY: 0.5,
    fontSize: "11.5px",
    borderTop: "1px solid black",
    borderBottom: "transparent",
  },
};

export default PrintSpdDepan;
