import { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { TableBody, TableCell, TableRow } from "@mui/material";
import axiosClient from "../../helpers/axiosClient";
import moment from "moment";
import { signal } from "@preact/signals-react";
import angkaTerbilangJs from "@develoka/angka-terbilang-js";
import capitalizeString from "../../Utility/capitalizeString";
import { Row } from "reactstrap";
import { formatLetterNumber } from "../../Utility";

const recipient = signal();
const nominative = signal();
const treasurer = signal();
const treasurerAssistant = signal();
const commitmentMaker = signal();

window.onunload = () => {
  localStorage.removeItem("printKwitansi");
};

const PrintKwitansi = () => {
  const [employees, setEmployees] = useState();
  const data = JSON.parse(localStorage.getItem("printKwitansi"));
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
      }
    `,
    onBeforePrint: () => {
      document.title = `Kwitansi an. ${
        data?.values?.pelaksana ?? "-"
      }, ${moment(data?.values?.dateOfLetter).format("DD-MM-YYYY")}`;
    },
    onAfterPrint: () => {
      document.title = docTitle;
    },
  });
  const docTitle = document.title;

  const getEmployees = async () => {
    try {
      const { data } = await axiosClient.get("/employees");
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const normalizePeople = () => {
    const filteredRecipient = employees.find(
      (employee) => employee.name === data?.values?.pelaksana
    );
    recipient.value = filteredRecipient;

    const filteredNominative = data?.data?.nominative.helpers?.find(
      (item) => item.employeeId === filteredRecipient.id
    );
    nominative.value = filteredNominative;

    const filteredTreasurer = employees.find(
      (employee) => employee.id === data?.values?.bp
    );
    treasurer.value = filteredTreasurer;

    const filteredTreasurerAssistant = employees.find(
      (employee) => employee.id === data?.values?.bpp
    );
    treasurerAssistant.value = filteredTreasurerAssistant;

    const filteredCommitmentMaker = employees.find(
      (employee) => employee.name === data?.data?.travel?.commitmentMaker
    );
    commitmentMaker.value = filteredCommitmentMaker;
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (employees) normalizePeople();
  }, [employees]);

  const total =
    nominative.value?.lumpsumAmount * nominative.value?.lumpsumDuration +
    nominative.value?.planeShipDearture +
    nominative.value?.planeShipReturn +
    nominative.value?.transportDeparture +
    nominative.value?.transportReturn +
    nominative.value?.lodgingAmount * nominative.value?.lodgingDuration;

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
            display: "grid",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <Row style={{ border: "1px solid black" }}>
            {/* header */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <h1 style={{ fontSize: "13pt", fontWeight: "bold" }}>
                KWITANSI / BUKTI PEMBAYARAN
              </h1>
            </div>

            {/* body */}

            <TableBody>
              <TableRow>
                <TableCell sx={styles.cell1}>Sudah Terima dari</TableCell>
                <TableCell sx={[styles.cell1, { paddingX: 1 }]}>:</TableCell>
                <TableCell sx={styles.cell1}>
                  Pejabat Pembuat Komitmen Satker Perwakilan BKKBN Prov. Sulut
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.cell1}>Jumlah Uang</TableCell>
                <TableCell sx={[styles.cell1, { paddingX: 1 }]}>:</TableCell>
                <TableCell sx={[styles.cell1, { fontWeight: "bold" }]}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(total) ?? "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.cell1}>Terbilang</TableCell>
                <TableCell sx={[styles.cell1, { paddingX: 1 }]}>:</TableCell>
                <TableCell sx={styles.cell1}>
                  <i>{`${capitalizeString(angkaTerbilangJs(total))} Rupiah`}</i>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={[styles.cell1, { whiteSpace: "nowrap" }]}>
                  Untuk Pembayaran
                </TableCell>
                <TableCell sx={[styles.cell1, { paddingX: 1 }]}>:</TableCell>
                <TableCell sx={styles.cell1}>
                  {`Biaya perjalanan dalam rangka ${
                    data?.data.assignedTo
                  } sesuai ST/SPD
                  Nomor: ${
                    data?.data?.letterNumber &&
                    formatLetterNumber(data?.data?.letterNumber)
                  } tanggal ${moment(data?.data?.dateOfletter).format(
                    "D MMMM YYYY"
                  )} selama ${
                    moment(data?.data?.endDateOftravel).diff(
                      data?.data?.startDateOftravel,
                      "days"
                    ) + 1
                  } hari, ${moment(data?.data?.startDateOftravel).format(
                    "D MMMM YYYY"
                  )}
                  s/d ${moment(data?.data?.endDateOftravel).format(
                    "D MMMM YYYY"
                  )}`}
                </TableCell>
              </TableRow>
            </TableBody>

            {/* sign 1 */}
            <div
              style={{
                fontSize: "10pt",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15,
                paddingTop: 6,
                paddingBottom: 6,
                textAlign: "center",
                color: "black",
              }}
            >
              <div>
                <p>
                  {`Manado, ${moment(data?.values?.dateOfLetter).format(
                    "D MMMM YYYY"
                  )}`}
                  <br />
                  Yang Menerima,
                </p>
                <div style={{ height: 80 }} />
                <h1
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    borderBottomWidth: "1px",
                    borderBottomColor: "black",
                    borderBottomStyle: "solid",
                    marginBottom: 0,
                  }}
                >
                  {recipient.value?.name}
                </h1>
                <p style={{ margin: 0 }}>{`NIP. ${recipient.value?.id}`}</p>
              </div>
            </div>
          </Row>

          <Row style={{ border: "1px solid black" }}>
            {/* sign 2 */}
            <p
              style={{
                fontSize: "10pt",
                marginBottom: 10,
                textAlign: "center",
                marginTop: 20,
                color: "black",
              }}
            >
              {`Lunas dibayar tanggal : ${moment(
                data?.values?.dateOfPaid
              ).format("D MMMM YYYY")}`}
            </p>
            <div
              style={{
                fontSize: "10pt",
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: 6,
                paddingBottom: 6,
                textAlign: "center",
                justifyContent: "space-between",
                color: "black",
              }}
            >
              <div>
                <p>Bendahara pengeluaran,</p>
                <div style={{ height: 80 }} />
                <h1
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    borderBottomWidth: "1px",
                    borderBottomColor: "black",
                    borderBottomStyle: "solid",
                    marginBottom: 0,
                  }}
                >
                  {treasurer.value?.name}
                </h1>
                <p style={{ margin: 0 }}>{`NIP. ${treasurer.value?.id}`}</p>
              </div>
              <div>
                <p>Bendahara pengeluaran pembantu,</p>
                <div style={{ height: 80 }} />
                <h1
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    borderBottomWidth: "1px",
                    borderBottomColor: "black",
                    borderBottomStyle: "solid",
                    marginBottom: 0,
                  }}
                >
                  {treasurerAssistant.value?.name}
                </h1>
                <p
                  style={{ margin: 0 }}
                >{`NIP. ${treasurerAssistant.value?.id}`}</p>
              </div>
            </div>
          </Row>

          <Row style={{ border: "1px solid black" }}>
            {/* sign 3 */}
            <div
              style={{
                fontSize: "10pt",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
                paddingTop: 6,
                paddingBottom: 6,
                textAlign: "center",
                justifyContent: "space-between",
                color: "black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  Barang/Pekerjaan tersebut diterima/
                  <br />
                  diselesaikan dengan lengkap dan baik
                </p>
                <div>
                  <h1
                    style={{
                      fontSize: "10pt",
                      fontWeight: "bold",
                      borderBottomWidth: "1px",
                      borderBottomColor: "black",
                      borderBottomStyle: "solid",
                      marginBottom: 0,
                    }}
                  >
                    {recipient.value?.name}
                  </h1>
                  <p style={{ margin: 0 }}>{`NIP. ${recipient.value?.id}`}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  Setuju dibebankan pada Mata <br />
                  Anggaran berkenaan An. Kuasa <br />
                  Pengguna Anggaran: <br />
                  Pejabat Pembuat Komitmen
                </p>
                <div>
                  <h1
                    style={{
                      fontSize: "10pt",
                      fontWeight: "bold",
                      borderBottomWidth: "1px",
                      borderBottomColor: "black",
                      borderBottomStyle: "solid",
                      marginBottom: 0,
                    }}
                  >
                    {data?.data?.travel?.commitmentMaker}
                  </h1>
                  <p style={{ margin: 0 }}>{`NIP. ${
                    employees?.find(
                      (item) =>
                        item.name === data?.data?.travel?.commitmentMaker
                    )?.id
                  }`}</p>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <button onClick={handlePrint}>Print PDF</button>
      </div>
    </Fragment>
  );
};

const styles = {
  cell1: {
    fontSize: "10pt",
    paddingX: 0,
    paddingY: 0.5,
    border: "transparent",
    verticalAlign: "top",
  },
};

export default PrintKwitansi;
