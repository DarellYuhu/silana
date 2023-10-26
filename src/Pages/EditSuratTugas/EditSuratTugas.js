import { Fragment, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Container,
  Col,
  Row,
  Label,
  Input,
  FormGroup,
  InputGroup,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const EditSuratTugas = () => {
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
  const datePickerRef = useRef(null);
  const dateRangePickerRef = useRef(null);

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Surat Tugas" breadcrumbItem="Edit Surat" />
          <Card>
            <CardBody>
              <CardBody className="p-0 px-1">
                <div className="mb-3">
                  <Label>Warna Bar</Label>
                  <Select
                    // value={selectedGroup}
                    // onChange={() => {
                    //   handleSelectGroup();
                    // }}
                    options={warnaOption}
                    classNamePrefix="select2-selection"
                  />
                </div>
              </CardBody>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Col md={12} className="d-grid gap-3">
                <CardBody className="p-0 px-1">
                  <CardTitle>Beban</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="text"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder="ex..DIPA Perwakilan BKKBN Provinsi Sulawesi Utara"
                    />
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>Tahun Anggaran</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="text"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder="ex..2023"
                    />
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>Mata Anggaran</CardTitle>
                  <CardBody className="p-0">
                    <div className="mb-3">
                      <Select
                        // value={selectedGroup}
                        // onChange={() => {
                        //   handleSelectGroup();
                        // }}
                        options={anggaranOption}
                        classNamePrefix="select2-selection"
                      />
                    </div>
                  </CardBody>
                </CardBody>
              </Col>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Col md={12} className="d-grid gap-3">
                <CardBody className="p-0 px-1">
                  <Label>Kendaraan</Label>
                  <Select
                    // value={selectedGroup}
                    // onChange={() => {
                    //   handleSelectGroup();
                    // }}
                    options={kendaraanOption}
                    classNamePrefix="select2-selection"
                  />
                </CardBody>
                <CardBody className="p-0 px-1">
                  <FormGroup className="mb-4">
                    <Label>Tanggal Surat</Label>
                    <InputGroup>
                      <Flatpickr
                        ref={datePickerRef}
                        defaultValue="today"
                        className="form-control d-block"
                        placeholder="dd M, yyyy"
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "Y-m-d",
                        }}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary docs-datepicker-trigger"
                          onClick={() =>
                            datePickerRef.current.flatpickr.toggle()
                          }
                        >
                          <i className="fa fa-calendar" aria-hidden="true" />
                        </button>
                      </div>
                    </InputGroup>
                  </FormGroup>
                </CardBody>
              </Col>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Col md={12} className="d-grid gap-3">
                <CardBody className="p-0 px-1">
                  <FormGroup className="mb-4">
                    <Label>Tanggal Surat</Label>
                    <InputGroup>
                      <Flatpickr
                        ref={dateRangePickerRef}
                        className="form-control d-block"
                        placeholder="dd M, yyyy"
                        options={{
                          mode: "range",
                          dateFormat: "Y-m-d",
                        }}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary docs-datepicker-trigger"
                          onClick={() =>
                            dateRangePickerRef.current.flatpickr.toggle()
                          }
                        >
                          <i className="fa fa-calendar" aria-hidden="true" />
                        </button>
                      </div>
                    </InputGroup>
                  </FormGroup>
                </CardBody>
              </Col>
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
                    <div className="mb-3 col-md-10">
                      <Select
                        // value={selectedGroup}
                        // onChange={() => {
                        //   handleSelectGroup();
                        // }}
                        options={anggaranOption}
                        classNamePrefix="select2-selection"
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
            <CardHeader className="bg-transparent">
              <h5 className="my-0">Pemberi Tugas</h5>
            </CardHeader>

            {/* <CardTitle>Kepada</CardTitle> */}
            <CardBody>
              <CardBody className="pt-0 d-grid gap-3">
                <Row>
                  <Col md={2} className="d-flex align-items-center">
                    Jabatan
                  </Col>
                  <Col md={10}>
                    <Select
                      // value={selectedGroup}
                      // onChange={() => {
                      //   handleSelectGroup();
                      // }}
                      options={anggaranOption}
                      classNamePrefix="select2-selection"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={2} className="d-flex align-items-center">
                    Nama
                  </Col>
                  <Col md={10}>
                    <Select
                      // value={selectedGroup}
                      // onChange={() => {
                      //   handleSelectGroup();
                      // }}
                      options={anggaranOption}
                      classNamePrefix="select2-selection"
                    />
                  </Col>
                </Row>
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

const warnaOption = [
  {
    options: [
      { label: "Merah", value: "Merah" },
      { label: "Hijau", value: "Hijau" },
      { label: "Biru", value: "Biru" },
    ],
  },
];

const anggaranOption = [
  {
    options: [
      {
        label: "3331.UBA.002.256.A.524111",
        value: "3331.UBA.002.256.A.524111",
      },
      {
        label: "3331.UBA.002.256.A.524111",
        value: "3331.UBA.002.256.A.524111",
      },
      {
        label: "3331.UBA.002.256.A.524111",
        value: "3331.UBA.002.256.A.524111",
      },
    ],
  },
];

const kendaraanOption = [
  {
    options: [
      {
        label: "Angkutan Darat (Umum)",
        value: "Angkutan Darat (Umum)",
      },
      {
        label: "Angkutan Darat (Mobil Unit Penerangan)",
        value: "Angkutan Darat (Mobil Unit Penerangan)",
      },
      {
        label: "Angkutan Darat (Kendaraan Dinas)",
        value: "Angkutan Darat (Kendaraan Dinas)",
      },
      {
        label: "Angkutan Laut (Kapal)",
        value: "Angkutan Laut (Kapal)",
      },
      {
        label: "Angkutan Udara (Pesawat)",
        value: "Angkutan Udara (Pesawat)",
      },
    ],
  },
];

export default EditSuratTugas;
