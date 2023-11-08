import React, { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logoMkri from "../../assets/images/logo-mkri.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const PrintSpdDepan = () => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    // pageStyle: `
    //   @page {
    //     size: A4;
    //     margin: 0;
    //   }
    //   @media print {
    //     html, body {
    //       width: 210mm;
    //       height: 297mm;
    //     }
    //   }
    // `,
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
            padding: "19px 1.5cm",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* header */}
          <div>
            <div className="container">
              <div className="row">
                <div className="col-sm-5" />
                <div
                  className="col-sm-2"
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={logoMkri} style={{ width: "1.04in" }} />
                  <p style={{ fontSize: "9pt", margin: 0 }}>
                    MENTERI KEUANGAN
                    <br />
                    REPUBLIK INDONESIA
                  </p>
                </div>
                <div
                  className="col-sm-5"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: "7pt", margin: 0 }}>
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
            </div>
          </div>

          {/* body */}
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <p style={{ fontSize: "8px", fontWeight: "bold", margin: 0 }}>
                  KEMENTERIAN NEGARA / LEMBAGA NEGARA :
                </p>
                <p style={{ fontSize: "8px", fontWeight: "bold", margin: 0 }}>
                  PERWAKILAN BADAN KEPENDUDUKAN DAN KELUARGA BERENCANA NASIONAL
                </p>
              </div>
              <div className="col-sm-5">
                <div className="row">
                  <p
                    className="col-sm-3"
                    style={{ fontSize: "8px", margin: 0 }}
                  >
                    LEMBAR KE
                  </p>
                  <p
                    className="col-sm-1"
                    style={{ fontSize: "8px", margin: 0 }}
                  >
                    :
                  </p>
                  <p
                    className="col-sm-8"
                    style={{ fontSize: "8px", margin: 0 }}
                  ></p>
                </div>
                <div className="row">
                  <p className="col-sm-3" style={styles.text1}>
                    Kode No.
                  </p>
                  <p className="col-sm-1" style={styles.text1}>
                    :
                  </p>
                  <p className="col-sm-8" style={styles.text1}></p>
                </div>
                <div className="row">
                  <p className="col-sm-3" style={styles.text1}>
                    Nomor
                  </p>
                  <p className="col-sm-1" style={styles.text1}>
                    :
                  </p>
                  <p className="col-sm-8" style={styles.text1}></p>
                </div>
              </div>
            </div>
            <div className="row">
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
            <div className="row">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={styles.cell1}>1</TableCell>
                    <TableCell sx={styles.cell1}>
                      Pejabat Pembuat Komitmen
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      Koba L.A. Paul, S.Farm., Apt.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>2</TableCell>
                    <TableCell sx={styles.cell1}>
                      Nama/NIP Pegawai yang melaksanakan perjalanan dinas
                    </TableCell>
                    <TableCell sx={styles.cell1}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>3</TableCell>
                    <TableCell sx={styles.cell1}>
                      a. pangkat dan golongan <br />
                      b. Jabatan / Instansi <br />
                      c. Tingkat Biaya Perjalanan Dinas
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      a. <br />
                      b. <br />
                      c.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>4</TableCell>
                    <TableCell sx={styles.cell1}>
                      Maksud Perjalanan Dinas
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      Melaksanakan Perjalanan Dinas dalam rangka Kegiatan
                      Fasilitasi dan Pembinaan Teknis Sekolah Siaga Kependudukan
                      di tingkat Provinsi dan Kabupaten/Kota di Kabupaten
                      Kepulauan Siau Tagulandang Biaro.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>5</TableCell>
                    <TableCell sx={styles.cell1}>
                      Alat angkutan yang dipergunakan
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      Angkutan Laut (Kapal)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>6</TableCell>
                    <TableCell sx={styles.cell1}>
                      a. Tempat Berangkat
                      <br />
                      b. Tempat Tujuan
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      a. <br /> b.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>7</TableCell>
                    <TableCell sx={styles.cell1}>
                      a. Lama Perjalanan Dinas
                      <br />
                      b. Tanggal Berangkat
                      <br />
                      c. Tanggal harus kembali/tiba di tempat baru
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      a. 3 (Tiga) Hari
                      <br />
                      b. 26 Juli
                      <br />
                      c. 28 Juli
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={styles.cell1}>8</TableCell>
                    <TableCell sx={styles.cell1}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={styles.cell1}>Pengikut:</TableCell>
                          <TableCell sx={styles.cell1}>Nama</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={styles.cell1}>1.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>2.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>3.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>4.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>6.</TableCell>
                        </TableRow>
                      </TableBody>
                    </TableCell>
                    <TableCell sx={styles.cell1}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={styles.cell1}>Tanggal Lahir</TableCell>
                          <TableCell sx={styles.cell1}>Keterangan</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow></TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>1.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>2.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>3.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>4.</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={styles.cell1}>6.</TableCell>
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
                    <TableCell sx={styles.cell1}>
                      <br />
                      a. <br />
                      b.
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
              flex: 1,
              alignItems: "flex-end",
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
                    <div className="col-sm-7">29 Agustus 2001</div>
                  </div>
                </div>
              </div>
              <div style={{ marginRight: 108 }}>
                <h4
                  style={{ margin: 0, fontSize: "11.5px", fontWeight: "bold" }}
                >
                  Pejabat Pembuat Komitmen,
                </h4>
                <div
                  style={{
                    marginTop: 60,
                    height: "2px",
                    backgroundColor: "black",
                    width: "100%",
                  }}
                />
                <h5
                  style={{ margin: 0, fontSize: "11.5px", fontWeight: "bold" }}
                >
                  Koba L.A. Paul, S.Farm., Apt.
                </h5>
                <p style={{ margin: 0, fontSize: "11.5px" }}>
                  NIP. 198605182014021004
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
    paddingY: 0,
    fontSize: "11.5px",
    border: "1px solid black",
  },
};

export default PrintSpdDepan;
