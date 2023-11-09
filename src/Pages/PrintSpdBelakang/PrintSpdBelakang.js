import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import logoMkri from "../../assets/images/logo-mkri.png";

const PrintSpdBelakang = () => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
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
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
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
                <TableCell sx={styles.cellContainer}></TableCell>
                <TableCell sx={styles.cellContainer}>
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
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>26 Juli</TableCell>
                  </TableRow>

                  <div style={{ marginTop: 10, marginLeft: 4, marginRight: 4 }}>
                    <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                    <div style={{ height: 40 }} />
                    <h3 style={styles.text1}>Koba L.A. Paul, S.Farm., Apt.</h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                      }}
                    />
                    <p style={{ fontSize: "8pt", margin: 0 }}>
                      NIP. 198605182014021004
                    </p>
                  </div>
                </TableCell>
              </TableRow>

              {/* second row */}
              <TableRow>
                <TableCell
                  sx={[styles.cellContainer, { verticalAlign: "top" }]}
                >
                  <TableRow>
                    <TableCell sx={styles.cell1}>II.</TableCell>
                    <TableCell sx={styles.cell1}>Tiba di</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}></TableCell>
                    <TableCell sx={styles.cell1}>Pada Tanggal</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                </TableCell>
                <TableCell sx={styles.cellContainer}>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                          width: 138,
                        },
                      ]}
                    >
                      Berangkat dari
                    </TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}>
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>26 Juli</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                          visibility: "hidden",
                        },
                      ]}
                    >
                      (Tempat Kedudukan)
                    </TableCell>
                  </TableRow>

                  <div
                    style={{
                      marginTop: 10,
                      marginLeft: 4,
                      marginRight: 4,
                      visibility: "hidden",
                    }}
                  >
                    <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                    <div style={{ height: 40 }} />
                    <h3 style={styles.text1}>Koba L.A. Paul, S.Farm., Apt.</h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                      }}
                    />
                    <p style={{ fontSize: "8pt", margin: 0 }}>
                      NIP. 198605182014021004
                    </p>
                  </div>
                </TableCell>
              </TableRow>

              {/* third row */}
              <TableRow>
                <TableCell
                  sx={[styles.cellContainer, { verticalAlign: "top" }]}
                >
                  <TableRow>
                    <TableCell sx={styles.cell1}>III.</TableCell>
                    <TableCell sx={styles.cell1}>Tiba di</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}></TableCell>
                    <TableCell sx={styles.cell1}>Pada Tanggal</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                </TableCell>
                <TableCell sx={styles.cellContainer}>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                          width: 138,
                        },
                      ]}
                    >
                      Berangkat dari
                    </TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}>
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>26 Juli</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                          visibility: "hidden",
                        },
                      ]}
                    >
                      (Tempat Kedudukan)
                    </TableCell>
                  </TableRow>

                  <div
                    style={{
                      marginTop: 10,
                      marginLeft: 4,
                      marginRight: 4,
                      visibility: "hidden",
                    }}
                  >
                    <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                    <div style={{ height: 40 }} />
                    <h3 style={styles.text1}>Koba L.A. Paul, S.Farm., Apt.</h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                      }}
                    />
                    <p style={{ fontSize: "8pt", margin: 0 }}>
                      NIP. 198605182014021004
                    </p>
                  </div>
                </TableCell>
              </TableRow>

              {/* forth row */}
              <TableRow>
                <TableCell
                  sx={[styles.cellContainer, { verticalAlign: "top" }]}
                >
                  <TableRow>
                    <TableCell sx={styles.cell1}>IV.</TableCell>
                    <TableCell sx={styles.cell1}>Tiba di</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}></TableCell>
                    <TableCell sx={styles.cell1}>Pada Tanggal</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                </TableCell>
                <TableCell sx={styles.cellContainer}>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                          width: 138,
                        },
                      ]}
                    >
                      Berangkat dari
                    </TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}>
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>
                      Manado, Sulawesi Utara
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
                    <TableCell sx={styles.cell1}>26 Juli</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={[
                        styles.cell1,
                        {
                          whiteSpace: "nowrap",
                          visibility: "hidden",
                        },
                      ]}
                    >
                      (Tempat Kedudukan)
                    </TableCell>
                  </TableRow>

                  <div
                    style={{
                      marginTop: 10,
                      marginLeft: 4,
                      marginRight: 4,
                      visibility: "hidden",
                    }}
                  >
                    <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                    <div style={{ height: 40 }} />
                    <h3 style={styles.text1}>Koba L.A. Paul, S.Farm., Apt.</h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                      }}
                    />
                    <p style={{ fontSize: "8pt", margin: 0 }}>
                      NIP. 198605182014021004
                    </p>
                  </div>
                </TableCell>
              </TableRow>

              {/* fifth row */}
              <TableRow>
                <TableCell
                  sx={[styles.cellContainer, { verticalAlign: "top" }]}
                >
                  <TableRow>
                    <TableCell sx={styles.cell1}>V.</TableCell>
                    <TableCell sx={styles.cell1}>Tiba di</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}></TableCell>
                    <TableCell sx={styles.cell1}>Pada Tanggal</TableCell>
                    <TableCell sx={styles.cell1}>:</TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                </TableCell>
                <TableCell sx={styles.cellContainer}>
                  <p style={{ fontSize: "9pt" }}>
                    Telah diperiksa dengan keterangan bahwa perjalanan tersebut
                    atas perintahnya dan semata-mata untuk kepentingan jabatan
                    dalam waktu yang sesingkat-singkatnya
                  </p>

                  <div
                    style={{
                      marginTop: 7,
                      marginLeft: 2,
                      marginRight: 2,
                    }}
                  >
                    <h3 style={styles.text1}>Pejabat Pembuat Komitmen,</h3>
                    <div style={{ height: 40 }} />
                    <h3 style={styles.text1}>Koba L.A. Paul, S.Farm., Apt.</h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "black",
                        width: "100%",
                      }}
                    />
                    <p style={{ fontSize: "8pt", margin: 0 }}>
                      NIP. 198605182014021004
                    </p>
                  </div>
                </TableCell>
              </TableRow>

              {/* sixth row */}
              <TableRow>
                <TableCell colSpan={2} sx={styles.cellContainer}>
                  <TableCell sx={styles.cell1}>VI.</TableCell>
                  <TableCell sx={styles.cell1}>Catatan lain-lain</TableCell>
                </TableCell>
              </TableRow>
              {/* sevent row */}
              <TableRow>
                <TableCell colSpan={2} sx={styles.cellContainer}>
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
    paddingY: 0.5,
    borderWidth: "1px",
    borderColor: "black",
  },
  cell1: {
    paddingY: 0,
    paddingX: 0.5,
    border: "transparent",
    fontSize: "8pt",
  },
  text1: {
    fontSize: "9pt",
    margin: 0,
    fontWeight: "bold",
  },
};

export default PrintSpdBelakang;
