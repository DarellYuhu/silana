import { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import logoMkri from "../../assets/images/logo-mkri.png";
import moment from "moment";
import axiosClient from "../../helpers/axiosClient";

window.onunload = function () {
  localStorage.removeItem("printSpdBelakang");
};

const PrintSpdBelakang = () => {
  const [employees, setEmployees] = useState([]);
  const printRef = useRef();
  const state = JSON.parse(localStorage.getItem("printSpdBelakang"));
  console.log(state);
  const docTitle = document.title;
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
      }
    `,
    onBeforePrint: () => {
      document.title = `${
        state?.isPrintOnly ? "SPD-Belakang-Blank" : "SPD-Belakang"
      } ${moment(state?.data?.dateOfletter).format("DD-MM-YYYY")}`;
    },
    onAfterPrint: () => {
      document.title = docTitle;
    },
  });

  console.log(state?.values);

  const getEmployees = async () => {
    try {
      const res = await axiosClient.get("employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const hiddenStyle = { visibility: state?.isPrintOnly ? "hidden" : "visible" };

  return (
    <Fragment>
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
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              visibility: state?.isPrintOnly ? "hidden" : "visible",
            }}
          >
            <img src={logoMkri} alt="garuda" />
            <h3 style={{ fontSize: "9pt", margin: 0 }}>
              MENTERI KEUANGAN
              <br />
              REPUBLIK INDONESIA
              <br />- 2 -
            </h3>
          </div>

          {/* body */}
          <Table>
            <TableBody>
              {/* first row */}
              <TableRow>
                <TableCell
                  sx={[
                    styles.cellContainer,
                    { borderColor: state?.isPrintOnly ? "white" : "black" },
                  ]}
                ></TableCell>
                <TableCell
                  sx={[
                    styles.cellContainer,
                    {
                      borderColor: state?.isPrintOnly ? "white" : "black",
                      visibility: state?.isPrintOnly ? "hidden" : "visible",
                    },
                  ]}
                >
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                        },
                      ]}
                    >
                      I. Berangkat dari
                    </TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}>
                      {state?.data?.travel?.departure}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                        },
                      ]}
                    >
                      (Tempat Kedudukan)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                        },
                      ]}
                    >
                      Ke
                    </TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          visibility: state?.isPrintOnly ? "visible" : "hidden",
                        },
                      ]}
                    >
                      {state?.isPrintOnly && state?.values[0]?.berangkat?.ke}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                        },
                      ]}
                    >
                      Pada Tanggal
                    </TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}>
                      {moment(state?.data?.startDateOftravel)
                        .locale("id")
                        .format("D MMMM")}
                    </TableCell>
                  </TableRow>

                  <div style={styles.signContainer}>
                    <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                    <div style={styles.signHeight} />
                    <h3 style={styles.text1}>
                      {state?.data?.travel?.commitmentMaker}
                    </h3>

                    <p style={styles.signId}>{`NIP. ${
                      employees.find(
                        (item) =>
                          item.name === state?.data?.travel?.commitmentMaker
                      )?.id
                    }`}</p>
                  </div>
                </TableCell>
              </TableRow>

              {/* second row */}
              {Array.from(Array(4)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={[
                      styles.cellContainer,
                      {
                        verticalAlign: "top",
                        borderColor: state?.isPrintOnly ? "white" : "black",
                      },
                    ]}
                  >
                    <TableRow>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        II.
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        Tiba di
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>:</TableCell>
                      <TableCell sx={styles.cell1}>
                        {state?.values[index + 1]?.tiba?.di ?? <>&nbsp;</>}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={[styles.cell1, hiddenStyle]}></TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        Pada Tanggal
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>:</TableCell>
                      <TableCell sx={styles.cell1}>
                        {state?.values[index + 1]?.tiba?.tanggal &&
                        state?.isPrintOnly ? (
                          moment(
                            state?.values[index + 1]?.tiba?.tanggal
                          ).format("D MMMM YYYY")
                        ) : (
                          <>&nbsp;</>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ visibility: "hidden" }}>
                      <TableCell sx={styles.cell1}>:</TableCell>
                    </TableRow>
                    <div
                      style={{
                        visibility: state?.values[index + 1]?.tiba?.nama
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      <div style={styles.signContainer}>
                        <h3 style={styles.text1}>
                          {state?.values[index + 1]?.tiba?.jabatan ?? (
                            <>&nbsp;</>
                          )}
                        </h3>
                        <div style={styles.signHeight} />
                        <h3 style={styles.text1}>
                          {state?.values[index + 1]?.tiba?.nama ?? <>&nbsp;</>}
                        </h3>

                        <p style={styles.signId}>
                          NIP.{" "}
                          {state?.values[index + 1]?.tiba?.nipNik ?? (
                            <>&nbsp;</>
                          )}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell
                    sx={[
                      styles.cellContainer,
                      { borderColor: state?.isPrintOnly ? "white" : "black" },
                    ]}
                  >
                    <TableRow>
                      <TableCell
                        sx={[
                          styles.cell1,
                          {
                            whiteSpace: "nowrap",
                            width: 138,
                          },
                          hiddenStyle,
                        ]}
                      >
                        Berangkat dari
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>:</TableCell>
                      <TableCell sx={styles.cell1}>
                        {state?.values[index + 1]?.berangkat?.dari ?? (
                          <>&nbsp;</>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={[
                          styles.cell1,
                          {
                            whiteSpace: "nowrap",
                          },
                          hiddenStyle,
                        ]}
                      >
                        Ke
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>:</TableCell>
                      <TableCell sx={styles.cell1}>
                        {state?.values[index + 1]?.berangkat?.ke ?? <>&nbsp;</>}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={[
                          styles.cell1,
                          {
                            whiteSpace: "nowrap",
                          },
                          hiddenStyle,
                        ]}
                      >
                        Pada Tanggal
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>:</TableCell>
                      <TableCell sx={styles.cell1}>
                        {state?.values[index + 1]?.berangkat?.tanggal &&
                        state?.isPrintOnly ? (
                          moment(
                            state?.values[index + 1]?.berangkat?.tanggal
                          ).format("D MMMM YYYY")
                        ) : (
                          <>&nbsp;</>
                        )}
                      </TableCell>
                    </TableRow>

                    <div
                      style={{
                        visibility: state?.values[index + 1]?.tiba?.nama
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      <div style={styles.signContainer}>
                        <h3 style={styles.text1}>
                          {state?.values[index + 1]?.tiba?.jabatan ?? (
                            <>&nbsp;</>
                          )}
                        </h3>
                        <div style={styles.signHeight} />
                        <h3 style={styles.text1}>
                          {state?.values[index + 1]?.tiba?.nama ?? <>&nbsp;</>}
                        </h3>

                        <p style={styles.signId}>
                          NIP.{" "}
                          {state?.values[index + 1]?.tiba?.nipNik ?? (
                            <>&nbsp;</>
                          )}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {/* sixth row */}
              <TableRow>
                <TableCell
                  sx={[
                    styles.cellContainer,
                    {
                      verticalAlign: "top",
                      borderColor: state?.isPrintOnly ? "white" : "black",
                    },
                  ]}
                >
                  <div>
                    <TableRow>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        VI.
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        Tiba di
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>:</TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        {state?.data?.travel?.departure}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={[styles.cell1, hiddenStyle]}></TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        Pada Tanggal
                      </TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>:</TableCell>
                      <TableCell sx={[styles.cell1, hiddenStyle]}>
                        {moment(state?.data?.endDateOftravel)
                          .locale("id")
                          .format("D MMMM")}
                      </TableCell>
                    </TableRow>
                  </div>
                  <div style={{ height: 18 }} />
                  <div
                    style={{
                      visibility: state?.isPrintOnly ? "hidden" : "visible",
                    }}
                  >
                    <div style={styles.signContainer}>
                      <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                      <div style={styles.signHeight} />
                      <h3 style={styles.text1}>
                        {state?.data?.travel?.commitmentMaker}
                      </h3>

                      <p style={styles.signId}>{`NIP. ${
                        employees.find(
                          (item) =>
                            item.name === state?.data?.travel?.commitmentMaker
                        )?.id
                      }`}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  sx={[
                    styles.cellContainer,
                    {
                      borderColor: state?.isPrintOnly ? "white" : "black",
                      visibility: state?.isPrintOnly ? "hidden" : "visible",
                    },
                  ]}
                >
                  <p style={{ fontSize: "8pt", margin: 0 }}>
                    Telah diperiksa dengan keterangan bahwa perjalanan tersebut
                    atas perintahnya dan semata-mata untuk kepentingan jabatan
                    dalam waktu yang sesingkat-singkatnya
                  </p>

                  <div style={styles.signContainer}>
                    <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                    <div style={styles.signHeight} />
                    <h3 style={styles.text1}>
                      {state?.data?.travel?.commitmentMaker}
                    </h3>

                    <p style={styles.signId}>{`NIP. ${
                      employees.find(
                        (item) =>
                          item.name === state?.data?.travel?.commitmentMaker
                      )?.id
                    }`}</p>
                  </div>
                </TableCell>
              </TableRow>

              {/* seventh row */}
              <TableRow
                sx={{ visibility: state?.isPrintOnly ? "hidden" : "visible" }}
              >
                <TableCell
                  colSpan={2}
                  sx={[
                    styles.cellContainer,
                    { borderColor: state?.isPrintOnly ? "white" : "black" },
                  ]}
                >
                  <TableCell sx={styles.cell1}>VII.</TableCell>
                  <TableCell sx={styles.cell1}>Catatan lain-lain</TableCell>
                </TableCell>
              </TableRow>

              {/* eight row */}
              <TableRow
                sx={{ visibility: state?.isPrintOnly ? "hidden" : "visible" }}
              >
                <TableCell
                  colSpan={2}
                  sx={[
                    styles.cellContainer,
                    { borderColor: state?.isPrintOnly ? "white" : "black" },
                  ]}
                >
                  <TableCell sx={[styles.cell1, { verticalAlign: "top" }]}>
                    VII.
                  </TableCell>
                  <TableCell sx={styles.cell1}>
                    PERHATIAN:
                    <br />
                    Pejabat yang berwenang menerbitkan SPD, pegawai yang
                    melakukan perjalanan dinas, para pejabat yang mengesahkan
                    tanggal berangkat/tiba, serta bendahara pengeluaran
                    bertanggung jawab berdasarkan peraturan-peraturan Keuangan
                    Negara apabila negara menderiata rugi akibat kesalahan,
                    kelalaian, dan kealpaannya.
                  </TableCell>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <button onClick={handlePrint}>Print PDF</button>
      </div>
    </Fragment>
  );
};

const styles = {
  cellContainer: {
    width: "50%",
    paddingX: 1,
    paddingY: 1,
    borderWidth: "1px",
  },
  cell1: {
    paddingY: 0,
    paddingX: 0.5,
    border: "transparent",
    fontSize: "7pt",
  },
  text1: {
    fontSize: "8pt",
    margin: 0,
    fontWeight: "bold",
  },
  signContainer: {
    marginTop: 8.5,
    marginLeft: 4,
    marginRight: 4,
    display: "inline-block",
    flexDirection: "col",
  },
  signHeight: { height: 35 },
  signLine: {
    height: "1px",
    backgroundColor: "black",
    width: "100%",
  },
  signId: { fontSize: "7pt", margin: 0, borderTop: "1px solid black" },
};

export default PrintSpdBelakang;
