import { Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axiosClient from "../../helpers/axiosClient";
import { effect, signal } from "@preact/signals-react";
import angkaTerbilangJs from "@develoka/angka-terbilang-js";
import { capitalizeString, formatLetterNumber } from "../../Utility";

const nominative = signal();
const recipient = signal();
const treasurer = signal();
const commitmentMaker = signal();

const PrintPerincian = () => {
  const [employees, setEmployees] = useState([]);
  const { data, values } = useLocation().state;
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
      }
    `,
  });

  const getEmployees = async () => {
    try {
      const { data } = await axiosClient("/employees");
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const total =
    nominative.value?.lumpsumAmount * nominative.value?.lumpsumDuration +
    nominative.value?.planeShipDearture +
    nominative.value?.planeShipReturn +
    nominative.value?.transportDeparture +
    nominative.value?.transportReturn +
    nominative.value?.lodgingAmount * nominative.value?.lodgingDuration;

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (employees) {
      const filteredEmployee = employees.find(
        (item) => item.name === values.recipient
      );
      recipient.value = filteredEmployee;

      const filteredNominative = data.nominative.helpers.find(
        (item) => item.employeeId === filteredEmployee?.id
      );
      nominative.value = filteredNominative;

      const filteredTreasurer = employees.find(
        (item) => item.id === values.treasurer
      );
      treasurer.value = filteredTreasurer;

      const filteredCommitmentMaker = employees.find(
        (item) => item.name === data.travel.commitmentMaker
      );
      commitmentMaker.value = filteredCommitmentMaker;
    }
  }, [employees]);
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
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "13pt", fontWeight: "bold" }}>
              PERINCIAN BIAYA PERJALANAN DINAS
            </h1>
          </div>

          {/* content */}
          <Table sx={{ marginTop: 2 }}>
            <TableBody>
              <TableRow>
                <TableCell sx={[styles.cell1, { width: "25%" }]}>
                  Lampiran ST Nomor
                </TableCell>
                <TableCell sx={styles.cell1}>:</TableCell>
                <TableCell sx={styles.cell1}>
                  {formatLetterNumber(data.letterNumber)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={[styles.cell1, { width: "25%" }]}>
                  Tanggal
                </TableCell>
                <TableCell sx={styles.cell1}>:</TableCell>
                <TableCell sx={styles.cell1}>
                  {moment(data.dateOfletter).format("D MMMM YYYY")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table sx={{ marginTop: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={[styles.cell1, { border: "1px solid black" }]}>
                  NO
                </TableCell>
                <TableCell
                  colSpan={4}
                  sx={[styles.cell1, { border: "1px solid black" }]}
                >
                  PERINCIAN BIAYA
                </TableCell>
                <TableCell
                  colSpan={2}
                  sx={[styles.cell1, { border: "1px solid black" }]}
                />
                <TableCell sx={[styles.cell1, { border: "1px solid black" }]}>
                  KETERANGAN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* first row */}
              <>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    sx={[
                      styles.cell1,
                      {
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      },
                    ]}
                  >
                    1
                  </TableCell>
                  <TableCell sx={styles.cell1}>Uang Harian:</TableCell>
                  <TableCell colSpan={3} sx={styles.cell1} />
                  <TableCell
                    rowSpan={2}
                    sx={[styles.cell1, { borderLeft: "1px solid black" }]}
                  >
                    Rp
                  </TableCell>
                  <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 0,
                    }).format(
                      nominative.value?.lumpsumAmount *
                        nominative.value?.lumpsumDuration
                    ) ?? "-"}
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    sx={[
                      styles.cell1,
                      {
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      },
                    ]}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.cell1} />
                  <TableCell
                    sx={styles.cell1}
                  >{`${nominative.value?.lumpsumDuration} Hari`}</TableCell>
                  <TableCell sx={styles.cell1}>x</TableCell>
                  <TableCell sx={styles.cell1}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(nominative.value?.lumpsumAmount) ?? "-"}
                  </TableCell>
                  <TableCell sx={styles.cell1} />
                </TableRow>
              </>

              {/* second row */}
              <>
                <TableRow>
                  <TableCell
                    rowSpan={3}
                    sx={[
                      styles.cell1,
                      {
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      },
                    ]}
                  >
                    2
                  </TableCell>
                  <TableCell sx={styles.cell1}>
                    Transport Pergi Pulang:
                  </TableCell>
                  <TableCell colSpan={3} sx={styles.cell1} />
                  <TableCell
                    rowSpan={3}
                    sx={[styles.cell1, { borderLeft: "1px solid black" }]}
                  >
                    Rp
                  </TableCell>
                  <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 0,
                    }).format(
                      nominative.value?.planeShipDearture +
                        nominative.value?.planeShipReturn +
                        nominative.value?.transportDeparture +
                        nominative.value?.transportReturn
                    ) ?? "-"}
                  </TableCell>
                  <TableCell
                    rowSpan={3}
                    sx={[
                      styles.cell1,
                      {
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      },
                    ]}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.cell1}>a. Lokal</TableCell>
                  <TableCell sx={styles.cell1}>Rp</TableCell>
                  <TableCell sx={styles.cell1} />
                  <TableCell sx={styles.cell1}>
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 0,
                    }).format(
                      nominative.value?.transportDeparture +
                        nominative.value?.transportReturn
                    ) ?? "-"}
                  </TableCell>
                  <TableCell sx={styles.cell1} />
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.cell1}>b. Pesawat / Kapal</TableCell>
                  <TableCell sx={styles.cell1}>Rp</TableCell>
                  <TableCell sx={styles.cell1} />
                  <TableCell sx={styles.cell1}>
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 0,
                    }).format(
                      nominative.value?.planeShipDearture +
                        nominative.value?.planeShipReturn
                    ) ?? "-"}
                  </TableCell>
                  <TableCell sx={styles.cell1} />
                </TableRow>
              </>

              {/* Third row */}
              <>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    sx={[
                      styles.cell1,
                      {
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      },
                    ]}
                  >
                    3
                  </TableCell>
                  <TableCell sx={styles.cell1}>Penginapan:</TableCell>
                  <TableCell colSpan={3} sx={styles.cell1} />
                  <TableCell
                    rowSpan={2}
                    sx={[styles.cell1, { borderLeft: "1px solid black" }]}
                  >
                    Rp
                  </TableCell>
                  <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 0,
                    }).format(
                      nominative.value?.lodgingAmount *
                        nominative.value?.lodgingDuration
                    ) ?? "-"}
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    sx={[
                      styles.cell1,
                      {
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                      },
                    ]}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.cell1} />
                  <TableCell
                    sx={styles.cell1}
                  >{`${nominative.value?.lodgingDuration} Malam`}</TableCell>
                  <TableCell sx={styles.cell1}>x</TableCell>
                  <TableCell sx={styles.cell1}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(nominative.value?.lodgingAmount) ?? "-"}
                  </TableCell>
                  <TableCell sx={styles.cell1} />
                </TableRow>
              </>

              {/* footer row */}
              <TableRow>
                <TableCell
                  sx={[
                    styles.cell1,
                    {
                      borderTop: "1px solid black",
                      borderLeft: "1px solid black",
                    },
                  ]}
                  colSpan={4}
                />
                <TableCell
                  sx={[styles.cell1, { borderTop: "1px solid black" }]}
                >
                  Jumlah
                </TableCell>
                <TableCell
                  sx={[styles.cell1, { borderTop: "1px solid black" }]}
                >
                  Rp
                </TableCell>
                <TableCell
                  colSpan={2}
                  sx={[
                    styles.cell1,
                    {
                      borderTop: "1px solid black",
                      borderRight: "1px solid black",
                    },
                  ]}
                >
                  {new Intl.NumberFormat("id-ID", {
                    minimumFractionDigits: 0,
                  }).format(total) ?? "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={[
                    styles.cell1,
                    {
                      borderLeft: "1px solid black",
                      borderBottom: "1px solid black",
                    },
                  ]}
                />
                <TableCell
                  sx={[
                    styles.cell1,
                    {
                      borderBottom: "1px solid black",
                    },
                  ]}
                  colSpan={2}
                >
                  Terbilang:
                </TableCell>
                <TableCell
                  sx={[
                    styles.cell1,
                    {
                      whiteSpace: "normal",
                      borderBottom: "1px solid black",
                      borderRight: "1px solid black",
                    },
                  ]}
                  colSpan={5}
                >
                  <i>{`${capitalizeString(angkaTerbilangJs(total))} Rupiah`}</i>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* footer */}
          <div style={{ fontSize: "10pt", marginTop: 10, color: "black" }}>
            <p style={{ textAlign: "end" }}>{`Manado, ${moment(
              values.dateOfletter
            ).format("D MMMM YYYY")}`}</p>

            {/* row 1 */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: 0 }}>Telah dibayar sejumlah</p>
                <p style={{ margin: 0 }}>
                  Rp
                  <span style={{ marginLeft: 30 }}>
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 0,
                    }).format(values.paidNominal) ?? "-"}
                  </span>
                </p>
              </div>
              <div>
                <p style={{ margin: 0 }}>Telah menerima jumlah uang sebesar</p>
                <p style={{ margin: 0 }}>
                  Rp
                  <span style={{ marginLeft: 30 }}>
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 0,
                    }).format(values.paidNominal) ?? "-"}
                  </span>
                </p>
              </div>
            </div>

            {/* row 2 */}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "space-between",
                marginTop: 20,
                paddingBottom: 10,
                borderBottom: "1px solid black",
              }}
            >
              <div>
                <p>Bendahara Pengeluaran,</p>
                <div style={{ height: 60 }} />
                <h2
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    color: "black",
                    margin: 0,
                    borderBottom: "1px solid black",
                  }}
                >
                  {treasurer.value?.name ?? "-"}
                </h2>
                <p style={{ margin: 0 }}>{`NIP. ${
                  treasurer.value?.id ?? "-"
                }`}</p>
              </div>
              <div>
                <p>Yang menerima,</p>
                <div style={{ height: 60 }} />
                <h2
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    color: "black",
                    margin: 0,
                    borderBottom: "1px solid black",
                  }}
                >
                  {recipient.value?.name ?? "-"}
                </h2>
                <p style={{ margin: 0 }}>{`NIP. ${
                  recipient.value?.id ?? "-"
                }`}</p>
              </div>
            </div>

            {/* row 3 */}
            <div
              style={{
                display: "flex",
                textAlign: "center",
                marginTop: 3,
                paddingTop: 10,
                borderTop: "1px solid black",
                flexDirection: "column",
              }}
            >
              <p style={{ marginBottom: 5 }}>PERHITUNGAN RAMPUNG</p>
              <div style={{ marginLeft: 150, marginRight: 150 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={styles.cell1}>
                        Ditetapkan sejumlah
                      </TableCell>
                      <TableCell sx={styles.cell1}>Rp</TableCell>
                      <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                        {new Intl.NumberFormat("id-ID", {
                          minimumFractionDigits: 0,
                        }).format(total) ?? "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.cell1}>
                        Yang telah dibayar semula
                      </TableCell>
                      <TableCell sx={styles.cell1}>Rp</TableCell>
                      <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                        {new Intl.NumberFormat("id-ID", {
                          minimumFractionDigits: 0,
                        }).format(values.paidNominal) ?? "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.cell1}>
                        Sisa kurang / lebih
                      </TableCell>
                      <TableCell sx={styles.cell1}>Rp</TableCell>
                      <TableCell sx={[styles.cell1, { textAlign: "right" }]}>
                        {new Intl.NumberFormat("id-ID", {
                          minimumFractionDigits: 0,
                        }).format(values.paidNominal - total) ?? "-"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* sign */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
                textAlign: "center",
                color: "black",
              }}
            >
              <div>
                <p>Pejabat Pembuat Komitmen,</p>
                <div style={{ height: 60 }} />
                <h2
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    color: "black",
                    margin: 0,
                    borderBottom: "1px solid black",
                  }}
                >
                  {commitmentMaker.value?.name ?? "-"}
                </h2>
                <p style={{ margin: 0 }}>{`NIP. ${
                  commitmentMaker.value?.id ?? "-"
                }`}</p>
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
  cell1: {
    fontSize: "9pt",
    paddingX: 1,
    paddingY: 0.5,
    whiteSpace: "nowrap",
    border: "transparent",
    verticalAlign: "top",
  },
};

export default PrintPerincian;
