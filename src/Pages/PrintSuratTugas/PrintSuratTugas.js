import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logoBkkbnDark from "../../assets/images/logo-bkkbn-dark.png";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const PrintSuratTugas = () => {
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
            }}
          >
            <img src={logoBkkbnDark} style={{ width: "2.8cm" }} />
            <p style={{ fontSize: 10, marginRight: 29 }}>Sulawesi Utara</p>
            <div
              style={{
                width: "5.3cm",
                backgroundColor: "red",
                height: "0.4cm",
              }}
            />
            <h1 style={{ fontSize: "14pt", fontWeight: "bold", margin: 0 }}>
              SURAT TUGAS
            </h1>
            <p style={{ fontSize: "10pt", margin: 0 }}>
              Manado, 1 Augustus 2023
            </p>
          </div>

          {/* body */}
          <div style={{ fontSize: "10pt" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={styles.label}>Nomor</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>2788/RT.01/J2/2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.label}>Beban</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    DIPA Perwakilan BKKBN Provinsi Sulawesi Utara
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.label}>Mata Anggaran</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    3331.UBA.002.256.A.524111
                  </TableCell>
                </TableRow>
              </TableBody>
              <div style={{ height: 20 }} />
              <TableBody>
                <TableRow>
                  <TableCell sx={styles.label}>Menimbang</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    <TableRow>
                      <TableCell sx={styles.seperator2}>a.</TableCell>
                      <TableCell sx={styles.item}>
                        Dalam rangka pelaksanaan kegiatan Pemberdayaan Kelompok
                        Masyarakat di Kampung Keluarga Berkualitas (KB) dalam
                        rangka Percepatan Penurunan Stunting di Kabupaten
                        Kepulauan Sangihe
                      </TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell sx={styles.seperator2}>b.</TableCell>
                      <TableCell sx={styles.item}>
                        Bahwa sehubungan dengan hal tersebut diatas, perlu
                        dibuatkan surat tugas
                      </TableCell>
                    </TableRow> */}
                  </TableCell>
                </TableRow>
                <div style={{ height: 8 }} />
                <TableRow>
                  <TableCell sx={styles.label}>Dasar</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    <TableRow>
                      <TableCell sx={styles.seperator2}>a.</TableCell>
                      <TableCell sx={styles.item}>
                        Undang-undang Nomor 52 Tahun 2009 tentang Perkembangan
                        Kependudukan dan Pembangunan Keluarga.
                      </TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell sx={styles.seperator2}>b.</TableCell>
                      <TableCell sx={styles.item}>
                        Peraturan Pemerintah Nomor 87 Tahun 2014 tentang
                        Perkembangan Kependudukan dan Pembangunan Keluarga,
                        Keluarga Berencana dan Sistem Informasi Keluarga.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.seperator2}>c.</TableCell>
                      <TableCell sx={styles.item}>
                        Instruksi Presiden Nomor 3 Tahun 2022 tentang
                        Optimalisasi Penyelenggaraan Kampung Keluarga
                        Berkualitas
                      </TableCell>
                    </TableRow> */}
                  </TableCell>
                </TableRow>
              </TableBody>
              <div style={{ height: 8 }} />
              <TableBody>
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
              <TableBody>
                <TableRow>
                  <TableCell sx={styles.label}>Kepada</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    <TableRow>
                      <TableCell sx={styles.seperator2}>1.</TableCell>
                      <TableCell sx={styles.item}>
                        Ir. Ronny Sumilat
                        <br />
                        Penata KKB Ahli Madya <br />
                        NIP. 196505301991031003
                      </TableCell>
                    </TableRow>
                    {/* <TableRow>
                      <TableCell sx={styles.seperator2}>2.</TableCell>
                      <TableCell sx={styles.item}>
                        Ir. Ronny Sumilat
                        <br />
                        Penata KKB Ahli Madya <br />
                        NIP. 196505301991031003
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.seperator2}>3.</TableCell>
                      <TableCell sx={styles.item}>
                        Ir. Ronny Sumilat
                        <br />
                        Penata KKB Ahli Madya <br />
                        NIP. 196505301991031003
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.seperator2}>4.</TableCell>
                      <TableCell sx={styles.item}>
                        Ir. Ronny Sumilat
                        <br />
                        Penata KKB Ahli Madya <br />
                        NIP. 196505301991031003
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={styles.seperator2}>5.</TableCell>
                      <TableCell sx={styles.item}>
                        Ir. Ronny Sumilat
                        <br />
                        Penata KKB Ahli Madya <br />
                        NIP. 196505301991031003
                      </TableCell>
                    </TableRow> */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.label}>Untuk</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    Melaksanakan perjalanan dinas Pemberdayaan Kelompok
                    Masyarakat di Kampung KB dalam rangka Percepatan Penurunan
                    Stunting di Kabupaten Kepulauan Sangihe
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={styles.label}>Tanggal</TableCell>
                  <TableCell sx={styles.seperator}>:</TableCell>
                  <TableCell sx={styles.item}>
                    6 Agustus 2023 s/d 8 Agustus 2023
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                <h4
                  style={{
                    width: "100%",
                    fontSize: "11pt",
                    fontWeight: "bold",
                  }}
                >
                  Kepala,
                </h4>
                <div style={{ height: "1.8cm" }} />
                <h4
                  style={{
                    width: "100%",
                    fontSize: "11pt",
                    fontWeight: "bold",
                  }}
                >
                  Ir. Diano Tino Tandjau, M.Erg
                </h4>
                <p style={{ fontSize: "10pt", margin: 0 }}>
                  NIP. 196603301988031004
                </p>
              </div>
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
