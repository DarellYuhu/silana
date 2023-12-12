import { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logoBkkbnDark from "../../assets/images/logo-bkkbn-dark.png";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axiosClient from "../../helpers/axiosClient";
import { formatLetterNumber } from "../../Utility";

const PrintSuratTugas = () => {
  const [employees, setEmployees] = useState([]);
  const printRef = useRef();
  const { state } = useLocation();

  console.log(state);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const getEmployeesData = async () => {
    try {
      const res = await axiosClient.get("employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeesData();
  }, []);

  if (!state) {
    return <div>404 Not Found</div>;
  }

  if (employees.length === 0) {
    return <div>Loading...</div>;
  }

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
          }}
        >
          {/* header */}
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              visibility: state.isPrintNoOnly ? "hidden" : "visible",
            }}
          >
            <img src={logoBkkbnDark} style={{ width: "4cm" }} />
            <p style={{ fontSize: 10, marginRight: 29 }}>Sulawesi Utara</p>
            <div
              style={{
                width: "5.3cm",
                backgroundColor: state.barColor,
                height: "0.4cm",
              }}
            />
            <h1 style={{ fontSize: "14pt", fontWeight: "bold", margin: 0 }}>
              SURAT TUGAS
            </h1>
            <p style={{ fontSize: "10pt", margin: 0 }}>{`Manado, ${moment(
              state.dateOftravel
            ).format("DD MMMM YYYY")}`}</p>
          </div>

          {/* body */}
          <div style={{ fontSize: "10pt" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={[
                      styles.label,
                      {
                        visibility: state.isPrintNoOnly ? "hidden" : "visible",
                      },
                    ]}
                  >
                    Nomor
                  </TableCell>
                  <TableCell
                    sx={[
                      styles.seperator,
                      {
                        visibility: state.isPrintNoOnly ? "hidden" : "visible",
                      },
                    ]}
                  >
                    :
                  </TableCell>
                  <TableCell sx={styles.item}>
                    {formatLetterNumber(state.letterNumber)}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    visibility: state.isPrintNoOnly ? "hidden" : "visible",
                  }}
                >
                  <TableCell sx={styles.label}>Beban</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>{state.burden}</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    visibility: state.isPrintNoOnly ? "hidden" : "visible",
                  }}
                >
                  <TableCell sx={styles.label}>Mata Anggaran</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>{state.budgetId}</TableCell>
                </TableRow>
              </TableBody>
              <div style={{ height: 20 }} />
              <TableBody
                sx={{ visibility: state.isPrintNoOnly ? "hidden" : "visible" }}
              >
                <TableRow>
                  <TableCell sx={styles.label}>Menimbang</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    {state.considerans?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={styles.seperator2}>
                          {String.fromCharCode(97 + index)}
                        </TableCell>
                        <TableCell sx={styles.item}>{item}</TableCell>
                      </TableRow>
                    ))}
                  </TableCell>
                </TableRow>
                <div style={{ height: 8 }} />
                <TableRow>
                  <TableCell sx={styles.label}>Dasar</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    {state.desideratum?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={styles.seperator2}>
                          {String.fromCharCode(97 + index)}
                        </TableCell>
                        <TableCell sx={styles.item}>{item}</TableCell>
                      </TableRow>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
              <div style={{ height: 8 }} />
              <TableBody
                sx={{ visibility: state.isPrintNoOnly ? "hidden" : "visible" }}
              >
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{
                      padding: 1,
                      borderBottom: "transparent",
                    }}
                  >
                    <h3
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "11pt",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      Memberikan Tugas
                    </h3>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody
                sx={{ visibility: state.isPrintNoOnly ? "hidden" : "visible" }}
              >
                <TableRow>
                  <TableCell sx={styles.label}>Kepada</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    {state.dictum?.map((item, index) => {
                      const person = employees.find(
                        (person) => person.name === item
                      );
                      return (
                        <TableRow key={index}>
                          <TableCell sx={styles.seperator2}>
                            {index + 1}.
                          </TableCell>
                          <TableCell sx={styles.item}>
                            {person?.name}
                            <br />
                            {person?.jobTitle} <br />
                            {`NIP. ${person?.id}`}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
              <div style={{ height: 8 }} />
              <TableBody
                sx={{ visibility: state.isPrintNoOnly ? "hidden" : "visible" }}
              >
                <TableRow>
                  <TableCell sx={styles.label}>Untuk</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>{state.assignedTo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.label}>Tanggal</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    {`${moment(state.startDateOftravel).format(
                      "DD MMMM YYYY"
                    )} s/d ${moment(state.endDateOftravel).format(
                      "DD MMMM YYYY"
                    )}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                visibility: state.isPrintNoOnly ? "hidden" : "visible",
                marginTop: 30,
              }}
            >
              <Assignor
                id={state.assignorId}
                employees={employees}
                title={state.assignorTitle}
              />
            </div>
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              justifyContent: "flex-end",
              flex: 1,
              visibility: state.isPrintNoOnly ? "hidden" : "visible",
            }}
          >
            <h4
              style={{
                fontSize: "10pt",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              Perwakilan BKKBN Provinsi Sulawesi Utara
            </h4>
            <p style={{ fontSize: "8pt", margin: 0 }}>
              Jln. 17 Agustus Wanea, Manado, Sulawesi Utara 95117
            </p>
            <p style={{ fontSize: "8pt", margin: 0 }}>
              T:(0431) 862504, 841093, 866466 | F:(0431) 855663 | E:
              prov.sulut@bkkbn.go.id
            </p>
            <p style={{ fontSize: "8pt", margin: 0 }}>sulut.bkkbn.go.id</p>
          </div>
        </div>
        <button onClick={handlePrint}>Print PDF</button>
      </div>
    </Fragment>
  );
};

const Assignor = ({ id, employees, title }) => {
  const person = employees.find((person) => person.id === id);
  return (
    <div
      style={{
        textAlign: "start",
      }}
    >
      <div style={{ minWidth: 180 }}>
        <h4
          style={{
            width: "100%",
            fontSize: "11pt",
            fontWeight: "bold",
          }}
        >
          {`${title},`}
        </h4>
        <div style={{ height: "1.8cm" }} />
        <h4
          style={{
            width: "100%",
            fontSize: "11pt",
            fontWeight: "bold",
            borderBottom: "1px solid black",
            marginBottom: 0,
          }}
        >
          {person?.name}
        </h4>
        <p style={{ fontSize: "10pt", margin: 0 }}>{`NIP. ${person?.id}`}</p>
      </div>
    </div>
  );
};

const styles = {
  label: {
    padding: 0,
    whiteSpace: "nowrap",
    borderBottom: "none",
    verticalAlign: "top",
  },
  seperator: {
    padding: "0 0.2cm",
    borderBottom: "none",
    verticalAlign: "top",
  },
  seperator2: {
    padding: "0 0.2cm",
    display: "flex",
    alignItems: "flex-start",
    borderBottom: "none",
  },
  item: {
    padding: 0,
    borderBottom: "none",
  },
};

export default PrintSuratTugas;
