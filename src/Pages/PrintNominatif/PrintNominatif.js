import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logoBkkbnDark from "../../assets/images/logo-bkkbn-dark.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const PrintNominatif = () => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: landscape;
      }
    `,
  });
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
            <p style={{ fontSize: "9pt", margin: 0 }}>
              DEPARTEMEN/LEMBAGA
              <br />
              SATKER: PERWAKILAN BKKBN PROVINSI SULAWESI UTARA
            </p>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "10pt", margin: 0, fontWeight: "bold" }}>
                DAFTAR NOMINATIF/RINCIAN PERJALANAN DINAS
              </h1>
              <h2 style={{ fontSize: "9pt", margin: 0, fontWeight: "bold" }}>
                Melaksanakan Perjalanan Dinas dalam rangka Kegiatan Fasilitasi
                dan Pembinaan Teknis Sekolah Siaga Kependudukan di tingkat
                Provinsi dan Kabupaten/Kota di Kabupaten Kepulauan Siau
                Tagulandang Biaro.
                <br />
                sesuai ST No: / RT.01 / J2 / 2023 tanggal 25 Juli 2023
                <br />
                Tanggal: 26 Juli s/d 28 Juli 2023
              </h2>
            </div>
          </div>

          {/* table */}
          <Table sx={{ marginTop: 2 }}>
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
                  PERORANGAN
                </TableCell>
                <TableCell sx={styles.headCell}>LUMPSUM</TableCell>
                <TableCell sx={styles.headCell}>PENGINAPAN</TableCell>
                <TableCell sx={styles.headCell}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(Array(5).keys()).map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={styles.cell1}>{index + 1}</TableCell>
                  <TableCell sx={[styles.cell1, { textAlign: "start" }]}>
                    Daniel Hamonangan, S.Kom, M.Sc
                  </TableCell>
                  <TableCell sx={styles.cell1}>
                    198405222010121002
                    <br />
                    Penata, III/c
                  </TableCell>
                  <TableCell sx={styles.cell1}>28 Juli</TableCell>
                  <TableCell sx={styles.cell1}>3 (Tiga)</TableCell>
                  <TableCell sx={styles.cell1}>
                    Kabupaten Kepulauan Sitaro
                  </TableCell>
                  <TableCell sx={styles.cell1}>Rp 800.000</TableCell>
                  <TableCell sx={styles.cell1}>Rp 975.000</TableCell>
                  <TableCell sx={styles.cell1}>Rp 700.000</TableCell>
                  <TableCell sx={styles.cell1}>Rp 2.475.000</TableCell>
                </TableRow>
              ))}
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
                <TableCell sx={[styles.cell1, { borderLeftWidth: "0px" }]}>
                  Rp 7.879.000
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
            }}
          >
            <div>
              <p>
                Manado, 24 November 2023
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
                Koba L.A. Paul, S.Farm., Apt.
              </h2>
              <p>NIP. 198605182014021004</p>
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
