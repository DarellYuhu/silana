import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

const PrintPerincian = () => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
      }
    `,
  });
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
            backgroundColor: "yellow",
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
              SURAT PERJALANAN DINAS (SPD)
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
                <TableCell sx={styles.cell1}> / RT.01 / J2 / 2023</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={[styles.cell1, { width: "25%" }]}>
                  Tanggal
                </TableCell>
                <TableCell sx={styles.cell1}>:</TableCell>
                <TableCell sx={styles.cell1}> 25 Juli 2023</TableCell>
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
                  <TableCell sx={styles.cell1}>975.000</TableCell>
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
                  <TableCell sx={styles.cell1}>3 Hari</TableCell>
                  <TableCell sx={styles.cell1}>x</TableCell>
                  <TableCell sx={styles.cell1}>Rp 325.000</TableCell>
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
                  <TableCell sx={styles.cell1}>975.000</TableCell>
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
                  <TableCell sx={styles.cell1}>Rp 325.000</TableCell>
                  <TableCell sx={styles.cell1} />
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.cell1}>b. Pesawat</TableCell>
                  <TableCell sx={styles.cell1}>Rp</TableCell>
                  <TableCell sx={styles.cell1} />
                  <TableCell sx={styles.cell1}>Rp 325.000</TableCell>
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
                  <TableCell sx={styles.cell1}>975.000</TableCell>
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
                  <TableCell sx={styles.cell1}>2 Malam</TableCell>
                  <TableCell sx={styles.cell1}>x</TableCell>
                  <TableCell sx={styles.cell1}>Rp 325.000</TableCell>
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
                  2.475.000
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
                  <i>Dua Juta Empat Ratus Tujuh Pulu Lima Ribu Rupiah</i>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* footer */}
          <div style={{ fontSize: "10pt", marginTop: 10, color: "black" }}>
            <p style={{ textAlign: "end" }}>Manado, 8 November 2023</p>

            {/* row 1 */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: 0 }}>Telah dibayar sejumlah</p>
                <p style={{ margin: 0 }}>
                  Rp<span style={{ marginLeft: 30 }}>2.475.000</span>
                </p>
              </div>
              <div>
                <p style={{ margin: 0 }}>Telah menerima jumlah uang sebesar</p>
                <p style={{ margin: 0 }}>
                  Rp<span style={{ marginLeft: 30 }}>2.475.000</span>
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
                  Livia C. Manoppo, SE
                </h2>
                <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
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
                  Livia C. Manoppo, SE
                </h2>
                <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
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
                      <TableCell sx={styles.cell1}>2.475.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.cell1}>Yang tentang</TableCell>
                      <TableCell sx={styles.cell1}>Rp</TableCell>
                      <TableCell sx={styles.cell1}>2.475.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.cell1}>
                        Ditetapkan sejumlah
                      </TableCell>
                      <TableCell sx={styles.cell1}>Rp</TableCell>
                      <TableCell sx={styles.cell1}>2.475.000</TableCell>
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
                  Livia C. Manoppo, SE
                </h2>
                <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
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
