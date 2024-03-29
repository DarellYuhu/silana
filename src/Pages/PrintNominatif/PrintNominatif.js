import { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import axiosClient from "../../helpers/axiosClient";
import angkaTerbilangJs from "@develoka/angka-terbilang-js";
import { formatLetterNumber } from "../../Utility";
import { signal } from "@preact/signals-react";

window.onunload = function () {
  localStorage.removeItem("printNominative");
};

const checked = signal(false);

const PrintNominatif = () => {
  const [employees, setEmployees] = useState([]);
  const printRef = useRef();
  const data = JSON.parse(localStorage.getItem("printNominative"));
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: landscape;
      }
    `,
    onBeforePrint: () => {
      document.title = `Nominatif an. ${data.dictum[0] ?? "-"}, ${moment(
        data.dateOfletter
      ).format("DD-MM-YYYY")}`;
    },
    onAfterPrint: () => {
      document.title = docTitle;
    },
  });
  const docTitle = document.title;

  const getEmployees = async () => {
    try {
      const res = await axiosClient.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <Fragment>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          ref={printRef}
          style={{
            height: "210mm",
            width: "297mm",
            padding: "0.2cm 1.5cm",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          {/* header */}
          <div>
            <p
              style={{
                fontSize: "9pt",
                color: "black",
                visibility: checked.value ? "hidden" : "visible",
              }}
            >
              DEPARTEMEN/LEMBAGA
              <br />
              SATKER: PERWAKILAN BKKBN PROVINSI SULAWESI UTARA
            </p>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "10pt",
                  margin: 0,
                  fontWeight: "bold",
                  visibility: checked.value ? "hidden" : "visible",
                }}
              >
                DAFTAR NOMINATIF/RINCIAN PERJALANAN DINAS
              </h1>
              <h2
                style={{
                  fontSize: "9pt",
                  margin: 0,
                  fontWeight: "bold",
                  visibility: checked.value ? "hidden" : "visible",
                }}
              >{`${data?.assignedTo}`}</h2>
              <h2
                style={{
                  fontSize: "9pt",
                  margin: 0,
                  fontWeight: "bold",
                  visibility: checked.value ? "hidden" : "visible",
                }}
              >
                sesuai ST No:{" "}
                <span
                  style={{
                    width: 140,
                    display: "inline-flex",
                    textAlign: "end",
                    justifyContent: "center",
                    visibility: "visible",
                  }}
                >
                  {data?.letterNumber && formatLetterNumber(data?.letterNumber)}
                </span>{" "}
                tanggal {moment(data?.dateOfletter).format("D MMMM YYYY")}
              </h2>
              <h2
                style={{
                  fontSize: "9pt",
                  margin: 0,
                  fontWeight: "bold",
                  visibility: checked.value ? "hidden" : "visible",
                }}
              >
                {`Tanggal: ${moment(data?.startDateOftravel).format(
                  "D MMMM"
                )} s/d ${moment(data?.endDateOftravel).format("D MMMM YYYY")}`}
              </h2>
            </div>
          </div>

          {/* table */}
          <Table
            sx={{
              marginTop: 2,
              visibility: checked.value ? "hidden" : "visible",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  sx={[styles.headCell, { paddingX: 0.5 }]}
                >
                  NO
                </TableCell>
                <TableCell rowSpan={2} sx={styles.headCell}>
                  NAMA
                </TableCell>
                <TableCell rowSpan={2} sx={styles.headCell}>
                  NIP/GOL
                </TableCell>
                <TableCell rowSpan={2} sx={styles.headCell}>
                  TANGGAL BERANGKAT
                </TableCell>
                <TableCell rowSpan={2} sx={styles.headCell}>
                  LAMA (HARI)
                </TableCell>
                <TableCell rowSpan={2} sx={styles.headCell}>
                  TUJUAN
                </TableCell>
                <TableCell colSpan={4} sx={styles.headCell}>
                  BIAYA
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.headCell}>
                  TRANSPORT
                  <br />
                  {data?.nominative?.tranportType?.toUpperCase()}
                </TableCell>
                <TableCell sx={styles.headCell}>LUMPSUM</TableCell>
                <TableCell sx={styles.headCell}>PENGINAPAN</TableCell>
                <TableCell sx={styles.headCell}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.nominative?.helpers.map((item, index) => {
                const tripDuration =
                  moment(data.endDateOftravel).diff(
                    data.startDateOftravel,
                    "days"
                  ) + 1;
                const personalTransport =
                  item.transportDeparture +
                  item.transportReturn +
                  item.planeShipDearture +
                  item.planeShipReturn;
                const lumpsum = item.lumpsumDuration * item.lumpsumAmount;
                const lodging = item.lodgingDuration * item.lodgingAmount;
                const total = personalTransport + lumpsum + lodging;
                return (
                  <TableRow key={index}>
                    <TableCell sx={styles.cell1}>{index + 1}</TableCell>
                    <TableCell sx={[styles.cell1, { textAlign: "start" }]}>
                      {
                        employees?.find(
                          (employee) => employee.id === item.employeeId
                        )?.name
                      }
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      {
                        employees?.find(
                          (employee) => employee.id === item.employeeId
                        )?.id
                      }
                      <br />
                      {
                        employees?.find(
                          (employee) => employee.id === item.employeeId
                        )?.classRank
                      }
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      {moment(data.startDateOftravel).format("D MMMM")}
                    </TableCell>
                    <TableCell
                      sx={styles.cell1}
                    >{`${tripDuration} (${angkaTerbilangJs(
                      tripDuration
                    )})`}</TableCell>
                    <TableCell
                      sx={[
                        styles.cell1,
                        { whiteSpace: "break-spaces", height: "50px" },
                      ]}
                    >
                      {data?.travel?.destination?.join("\n")}
                    </TableCell>
                    <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(personalTransport) ?? "-"}
                    </TableCell>
                    <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(lumpsum) ?? "-"}
                    </TableCell>
                    <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(lodging) ?? "-"}
                    </TableCell>
                    <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(total) ?? "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell
                  colSpan={8}
                  sx={[styles.cell1, { borderRightWidth: "0px" }]}
                />
                <TableCell
                  sx={[
                    styles.cell1,
                    { borderRightWidth: "0px", borderLeftWidth: "0px" },
                  ]}
                >
                  TOTAL
                </TableCell>
                <TableCell
                  sx={[
                    styles.cell1,
                    { borderLeftWidth: "0px", textAlign: "right" },
                  ]}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(
                    data?.nominative?.helpers?.reduce((acc, curr) => {
                      const personalTransport =
                        curr.transportDeparture +
                        curr.transportReturn +
                        curr.planeShipDearture +
                        curr.planeShipReturn;
                      const lumpsum = curr.lumpsumDuration * curr.lumpsumAmount;
                      const lodging = curr.lodgingDuration * curr.lodgingAmount;
                      const total = personalTransport + lumpsum + lodging;
                      return acc + total;
                    }, 0)
                  ) ?? "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* footer */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              fontSize: "9pt",
              color: "black",
              marginTop: 50,
              visibility: checked.value ? "hidden" : "visible",
            }}
          >
            <div>
              <p>
                {`Manado, ${moment(data?.nominative?.dateOfLetter).format(
                  "D MMMM YYYY"
                )}`}
                <br />
                Pejabat Pembuat Komitmen,
              </p>
              <div style={{ height: 60 }} />
              <h2
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: 0,
                  borderBottomWidth: "1px",
                  borderBottomColor: "black",
                  borderBottomStyle: "solid",
                }}
              >
                {
                  employees?.find(
                    (employee) =>
                      employee.name === data?.travel?.commitmentMaker
                  )?.name
                }
              </h2>
              <p>{`NIP. ${
                employees?.find(
                  (employee) => employee.name === data?.travel?.commitmentMaker
                )?.id
              }`}</p>
            </div>
          </div>
        </div>
        <div>
          <button onClick={handlePrint}>Print PDF</button>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => (checked.value = event.target.checked)}
              />
            }
            label="Print nomor surat"
            sx={{
              marginLeft: 1,
              border: "2px solid black",
              paddingRight: 2,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

const styles = {
  cell1: {
    padding: 0.5,
    textAlign: "center",
    fontSize: "7pt",
    borderWidth: "1px",
    borderColor: "black",
  },
  headCell: {
    padding: 0,
    textAlign: "center",
    fontSize: "7pt",
    borderWidth: "1px",
    borderColor: "black",
  },
};

export default PrintNominatif;
