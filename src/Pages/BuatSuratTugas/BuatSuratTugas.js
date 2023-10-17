import { Fragment, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const BuatSuratTugas = () => {
  const [surat, setSurat] = useState({
    beban: "",
    mataAnggaran: "",
    kendaraan: "",
    menimbang: [{ label: "a", value: "" }],
    dasar: [{ label: "a", value: "" }],
    kepada: [{ label: "1", value: "" }],
    untuk: "",
    tanggalBerangkat: "",
    tanggalKembali: "",
    yangMemberiTugas: "",
    tujuanKegiatan: "",
    sasaranKegiatan: "",
    outputYangDiharapkan: "",
    mengetahui: "",
    ketuaTim: "",
    menyetujui: "",
    pejabatPembuatKomitment: "",
    tempatBerangkat: "",
    tempatTujuan: "",
    bendaharaPengeluaran: "",
    bendaharaPengeluaranPembantu: "",
    pemastian: false,
  });

  // const handleAddField = () => {
  //   // add the field label alphabetically
  //   const lastLabel = menimbang[menimbang.length - 1].label;
  //   const newLabel = String.fromCharCode(lastLabel.charCodeAt(0) + 1);
  //   const newField = { label: newLabel, value: "" };
  //   setMenimbang([...menimbang, newField]);
  // };

  // const handleAddFieldDasar = () => {
  //   // add the field label alphabetically
  //   const lastLabel = dasar[dasar.length - 1].label;
  //   const newLabel = String.fromCharCode(lastLabel.charCodeAt(0) + 1);
  //   const newField = { label: newLabel, value: "" };
  //   setDasar([...dasar, newField]);
  // };

  // const handleDeleteField = (label) => {
  //   // remove the field
  //   const newMenimbang = menimbang.filter((item) => item.label !== label);
  //   // update label
  //   newMenimbang.forEach((item, index) => {
  //     item.label = String.fromCharCode(97 + index);
  //   });
  //   setMenimbang(newMenimbang);
  // };

  // const handleDeleteFieldDasar = (label) => {
  //   // remove the field
  //   const newDasar = dasar.filter((item) => item.label !== label);
  //   // update label
  //   newDasar.forEach((item, index) => {
  //     item.label = String.fromCharCode(97 + index);
  //   });
  //   setDasar(newDasar);
  // };

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Silana" breadcrumbItem="Buat Surat" />
          <Card>
            <CardBody>
              <Row md={3}>
                <CardBody className="p-0 px-1">
                  <CardTitle>Beban</CardTitle>
                  <CardBody className="p-0">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Beban"
                    />
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>Mata Anggaran</CardTitle>
                  <CardBody className="p-0">
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Mata Anggaran</em>
                      </option>
                      <option>3331.UBA.002.256.A.524111</option>
                      <option>3331.UBA.002.256.A.524111</option>
                      <option>3331.UBA.002.256.A.524111</option>
                    </select>
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>Kendaraan</CardTitle>
                  <CardBody className="p-0">
                    <select className="form-control">
                      <option value={""}>Pilih Kendaraan</option>
                      <option>Mobil</option>
                      <option>Kapal</option>
                      <option>Pesawat</option>
                    </select>
                  </CardBody>
                </CardBody>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="bg-transparent">
              <h5 className="my-0">Isi Surat</h5>
            </CardHeader>
            <CardBody>
              <CardTitle>Menimbang</CardTitle>
              <CardBody className="py-0">
                {surat.menimbang.map((item, index) => (
                  <Row key={index} className="my-2">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-1 col-form-label d-flex align-items-center justify-content-center"
                    >
                      {item.label}
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        rows="3"
                        // value={item.value}
                        // onChange={(e) => {
                        //   const newMenimbang = [...menimbang];
                        //   newMenimbang[index].value = e.target.value;
                        //   setMenimbang(newMenimbang);
                        // }}
                      />
                    </div>
                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light"
                        // onClick={() => handleDeleteField(item.label)}
                      >
                        <i className="mdi mdi-delete-outline"></i>
                      </button>
                    </div>
                  </Row>
                ))}
              </CardBody>
            </CardBody>
            <CardFooter className="bg-transparent">
              <button
                type="button"
                className="btn btn-outline-light waves-effect"
                // onClick={handleAddField}
              >
                Tambah baris baru <i className="mdi mdi-playlist-plus" />
              </button>
            </CardFooter>
          </Card>

          <Card>
            <CardBody>
              <CardTitle>Dasar</CardTitle>
              <CardBody className="py-0">
                {surat.dasar.map((item, index) => (
                  <Row key={index} className="my-2">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-1 col-form-label d-flex align-items-center justify-content-center"
                    >
                      {item.label}
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        rows="3"
                        // value={item.value}
                        // onChange={(e) => {
                        //   const newDasar = [...dasar];
                        //   newDasar[index].value = e.target.value;
                        //   setDasar(newDasar);
                        // }}
                      />
                    </div>
                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light"
                        // onClick={() => handleDeleteFieldDasar(item.label)}
                      >
                        <i className="mdi mdi-delete-outline"></i>
                      </button>
                    </div>
                  </Row>
                ))}
              </CardBody>
            </CardBody>
            <CardFooter className="bg-transparent">
              <button
                type="button"
                className="btn btn-outline-light waves-effect"
                // onClick={handleAddFieldDasar}
              >
                Tambah baris baru <i className="mdi mdi-playlist-plus" />
              </button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="bg-transparent">
              <h5 className="my-0">Memberikan Tugas</h5>
            </CardHeader>
            <CardBody>
              <CardTitle>Kepada</CardTitle>
              <CardBody className="py-0">
                {surat.kepada.map((item, index) => (
                  <Row key={index} className="my-2">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-1 col-form-label d-flex align-items-center justify-content-center"
                    >
                      {item.label}
                    </label>
                    <div className="col-md-10">
                      <select className="form-control">
                        <option value={""}>
                          <em>Pilih Anggota</em>
                        </option>
                        <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                        <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                        <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                      </select>
                    </div>
                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light"
                        // onClick={() => handleDeleteField(item.label)}
                      >
                        <i className="mdi mdi-delete-outline"></i>
                      </button>
                    </div>
                  </Row>
                ))}
              </CardBody>
            </CardBody>
            <CardFooter className="bg-transparent">
              <button
                type="button"
                className="btn btn-outline-light waves-effect"
                // onClick={handleAddField}
              >
                Tambah baris baru <i className="mdi mdi-playlist-plus" />
              </button>
            </CardFooter>
          </Card>

          <Card>
            <CardBody>
              <div className="d-grid gap-3">
                <Col>
                  <CardTitle>Untuk</CardTitle>
                  <textarea
                    className="form-control"
                    rows="3"
                    // value={item.value}
                    // onChange={(e) => {
                    //   const newDasar = [...dasar];
                    //   newDasar[index].value = e.target.value;
                    //   setDasar(newDasar);
                    // }}
                  />
                </Col>
                <Row>
                  <label
                    htmlFor="example-date-input"
                    className="col-md-2 col-form-label"
                  >
                    Tanggal Berangkat
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="date"
                      // defaultValue="2019-08-19"
                      id="example-date-input"
                    />
                  </div>
                </Row>
                <Row>
                  <label
                    htmlFor="example-date-input"
                    className="col-md-2 col-form-label"
                  >
                    Tanggal Kembali
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="date"
                      // defaultValue="2019-08-19"
                      id="example-date-input"
                    />
                  </div>
                </Row>
                <Col>
                  <CardTitle>Yang Memberi tugas</CardTitle>
                  <select className="form-control">
                    <option value={""}>
                      <em>Pilih Anggota</em>
                    </option>
                    <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                    <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                    <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                  </select>
                </Col>
              </div>
            </CardBody>
          </Card>

          <h4 className="page-title-box mb-0 font-size-18">
            TERM OF REFERANCE
          </h4>
          <Card>
            <CardBody className="d-grid gap-4">
              <div>
                <CardTitle className="fw-bold">
                  LEMBAR PENGAJUAN PERJALANAN DINAS
                </CardTitle>
                <CardBody className="d-grid gap-3 py-0">
                  <Row>
                    <label
                      htmlFor="example-date-input"
                      className="col-md-2 col-form-label d-flex align-items-center justify-content-start"
                    >
                      Tujuan Kegiatan
                    </label>
                    <div className="col-md-10">
                      <textarea className="form-control" rows="3" />
                    </div>
                  </Row>
                  <Row>
                    <label
                      htmlFor="example-date-input"
                      className="col-md-2 col-form-label d-flex align-items-center justify-content-start"
                    >
                      Sasaran Kegiatan
                    </label>
                    <div className="col-md-10">
                      <textarea className="form-control" rows="3" />
                    </div>
                  </Row>
                  <Row>
                    <label
                      htmlFor="example-date-input"
                      className="col-md-2 col-form-label d-flex align-items-center justify-content-start"
                    >
                      Output yang diharapkan
                    </label>
                    <div className="col-md-10">
                      <textarea className="form-control" rows="3" />
                    </div>
                  </Row>
                </CardBody>
              </div>
              <div>
                <CardTitle className="fw-bold">YANG BERTANDA TANGAN</CardTitle>
                <CardBody className="d-grid gap-3 py-2">
                  <Col>
                    <CardTitle>Mengetahui</CardTitle>
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Anggota</em>
                      </option>
                      <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                      <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                      <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                    </select>
                  </Col>
                  <Col>
                    <CardTitle>Ketua Tim</CardTitle>
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Anggota</em>
                      </option>
                      <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                      <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                      <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                    </select>
                  </Col>
                  <Col>
                    <CardTitle>Menyetujui</CardTitle>
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Anggota</em>
                      </option>
                      <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                      <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                      <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                    </select>
                  </Col>
                </CardBody>
              </div>
            </CardBody>
          </Card>

          <h4 className="page-title-box mb-0 font-size-18">
            {`SPD (SURAT PERJALANAN DINAS)`}
          </h4>
          <Card>
            <CardBody className="d-grid gap-4">
              <div>
                <CardTitle className="fw-bold">
                  PIHAK PEMBUAT KOMITMEN
                </CardTitle>
                <CardBody className="d-grid gap-3 py-2">
                  <Col>
                    <CardTitle>Pejabat Pembuat Komitmen</CardTitle>
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Anggota</em>
                      </option>
                      <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                      <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                      <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                    </select>
                  </Col>
                </CardBody>
              </div>
              <div>
                <CardTitle className="fw-bold">
                  KEBERANGKATAN & DESTINASI
                </CardTitle>
                <CardBody className="d-grid gap-3 py-2">
                  <Col>
                    <CardTitle>Tempat Berangkat</CardTitle>
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Tempat Berangkat</em>
                      </option>
                      <option>{`Manado, Sulawesi Utara`}</option>
                      <option>{`Kabupaten Minahasa`}</option>
                    </select>
                  </Col>
                  <Col>
                    <CardTitle>Tempat Tujuan</CardTitle>
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Tempat Tujuan</em>
                      </option>
                      <option>{`Manado, Sulawesi Utara`}</option>
                      <option>{`Kabupaten Minahasa`}</option>
                    </select>
                  </Col>
                </CardBody>
              </div>
            </CardBody>
          </Card>

          <h4 className="page-title-box mb-0 font-size-18">
            {`PERINCIAN BIAYA PERJALANAN DINAS`}
          </h4>
          <Card>
            <CardBody className="d-grid gap-4">
              <CardTitle className="fw-bold">PIHAK BENDAHARA</CardTitle>
              <CardBody className="d-grid gap-3 py-2">
                <Col>
                  <CardTitle>Bendahara Pengeluaran</CardTitle>
                  <select className="form-control">
                    <option value={""}>
                      <em>Pilih Anggota</em>
                    </option>
                    <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                    <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                    <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                  </select>
                </Col>
                <Col>
                  <CardTitle>Bendahara Pengeluaran Pembantu</CardTitle>
                  <select className="form-control">
                    <option value={""}>
                      <em>Pilih Anggota</em>
                    </option>
                    <option>{`Sidonia Ani Matindas (NIP. 196804081988032001)`}</option>
                    <option>{`Jumria Sriwahyuni, S.Sos (NIP. 199105172019022009)`}</option>
                    <option>{`Dinar Ariana Viestri, S.Si (NIP. 199103042019022003)`}</option>
                  </select>
                </Col>
              </CardBody>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Pastikan data yang anda masukan sudah benar{" "}
                  <span className="mdi mdi-information-outline"></span>
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-rounded btn-lg waves-effect waves-light"
              >
                Cetak Surat
              </button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

export default BuatSuratTugas;
