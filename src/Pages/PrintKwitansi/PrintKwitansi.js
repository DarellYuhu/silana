import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logoBkkbnDark from "../../assets/images/logo-bkkbn-dark.png";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const PrintKwitansi = () => {
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
            backgroundColor: "white",
          }}
        >
          {/* header */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ fontSize: "13pt", fontWeight: "bold" }}>
              KWITANSI / BUKTI PEMBAYARAN
            </h1>
          </div>

          {/* body */}
          <Table sx={{ marginTop: 4 }}>
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
                  Rp 2.475.000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.cell1}>Terbilang</TableCell>
                <TableCell sx={[styles.cell1, { paddingX: 1 }]}>:</TableCell>
                <TableCell sx={styles.cell1}>
                  <i>Dua Juta Empat Ratus Tujuh Puluh Lima Ribu Rupiah</i>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={[styles.cell1, { whiteSpace: "nowrap" }]}>
                  Untuk Pembayaran
                </TableCell>
                <TableCell sx={[styles.cell1, { paddingX: 1 }]}>:</TableCell>
                <TableCell sx={styles.cell1}>
                  Biaya perjalanan dalam rangka Melaksanakan Perjalanan Dinas
                  dalam rangka Kegiatan Fasilitasi dan Pembinaan Teknis Sekolah
                  Siaga Kependudukan di tingkat Provinsi dan Kabupaten/Kota di
                  Kabupaten Kepulauan Siau Tagulandang Biaro. sesuai ST/SPD
                  Nomor: tanggal 25 Juli 2023 selama hari, mulai tanggal 26 Juli
                  s/d 28 Juli 2023
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* sign 1 */}
          <div
            style={{
              fontSize: "10pt",
              display: "flex",
              justifyContent: "flex-end",
              borderBottom: "2px solid black",
              marginTop: 15,
              paddingTop: 6,
              paddingBottom: 6,
              textAlign: "center",
              color: "black",
            }}
          >
            <div>
              <p>
                Manado, 08 November 2023
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
                Daniel Hamonangan S.Kom, M.Sc
              </h1>
              <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
            </div>
          </div>

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
            Lunas dibayar tanggal : 08 November 2023
          </p>
          <div
            style={{
              fontSize: "10pt",
              display: "flex",
              justifyContent: "flex-end",
              borderBottom: "2px solid black",
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
                Daniel Hamonangan S.Kom, M.Sc
              </h1>
              <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
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
                Daniel Hamonangan S.Kom, M.Sc
              </h1>
              <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
            </div>
          </div>

          {/* sign 3 */}
          <div
            style={{
              fontSize: "10pt",
              display: "flex",
              justifyContent: "flex-end",
              borderBottom: "2px solid black",
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
                  Daniel Hamonangan S.Kom, M.Sc
                </h1>
                <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
              </div>
            </div>
            <div>
              <p>
                Setuju dibebankan pada Mata <br /> Anggaran berkenaan An. Kuasa{" "}
                <br />
                Pengguna Anggaran: <br /> Pejabat Pembuat Komitmen
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
                Daniel Hamonangan S.Kom, M.Sc
              </h1>
              <p style={{ margin: 0 }}>NIP. 198605182014021004</p>
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
    fontSize: "10pt",
    paddingX: 0,
    paddingY: 0.5,
    border: "transparent",
    verticalAlign: "top",
  },
};

export default PrintKwitansi;
