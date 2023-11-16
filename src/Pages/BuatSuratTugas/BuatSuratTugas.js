import { Fragment, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  FormGroup,
  InputGroup,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { AnggaranModal } from "./Component";
import { Form, Formik } from "formik";
import axios from "axios";

const BuatSuratTugas = () => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const dateRangePickerRef = useRef(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:2000/employees")
      .then((res) => {
        const options = res.map((item) => {
          return {
            value: item.name,
            label: item.name,
          };
        });
        setEmployees(options);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <div className="page-content">
        <Formik
          initialValues={{
            barColor: "",
            burden: "",
            fiscalYear: 0,
            budgetLineitem: "",
            vehicleType: "",
            dateOfletter: new Date().toISOString(),
            dateOftravel: "",
            considerans: [""],
            desideratum: [""],
            dictum: [""],
            assignor: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({ values, setFieldValue, handleChange, isSubmitting }) => {
            return (
              <Form>
                <Container fluid={true}>
                  <Breadcrumbs
                    title="Surat Tugas"
                    breadcrumbItem="Buat Surat"
                  />
                  <Card>
                    <CardBody>
                      <CardBody className="p-0 px-1">
                        <div className="mb-3">
                          <Label>Warna Bar</Label>
                          <Select
                            name="barColor"
                            onChange={(value) => {
                              setFieldValue("barColor", value.value);
                            }}
                            options={warnaOptions}
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
                              placeholder="cth..DIPA Perwakilan BKKBN Provinsi Sulawesi Utara"
                              name="burden"
                              onChange={handleChange}
                            />
                          </CardBody>
                        </CardBody>
                        <CardBody className="p-0 px-1">
                          <CardTitle>Tahun Anggaran</CardTitle>
                          <CardBody className="p-0">
                            <Input
                              type="number"
                              className="colorpicker-default"
                              placeholder="cth..2023"
                              name="fiscalYear"
                              onChange={handleChange}
                            />
                          </CardBody>
                        </CardBody>
                        <CardBody className="p-0 px-1">
                          <CardTitle>Mata Anggaran</CardTitle>
                          <CardBody className="p-0">
                            <Input
                              value={values.budgetLineitem}
                              type="text"
                              className="colorpicker-default"
                              placeholder="cth.. 3331.UBA.002.256.A.524111"
                              readOnly
                              onClick={() => setOpen(!open)}
                            />
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
                            name="vehicleType"
                            onChange={(value) => {
                              setFieldValue("vehicleType", value.value);
                            }}
                            options={kendaraanOptions}
                            classNamePrefix="select2-selection"
                          />
                        </CardBody>
                        <CardBody className="p-0 px-1">
                          <FormGroup className="mb-4">
                            <Label>Tanggal Surat</Label>
                            <InputGroup>
                              <Flatpickr
                                ref={datePickerRef}
                                name="dateOfletter"
                                defaultValue="today"
                                className="form-control d-block"
                                placeholder="dd M, yyyy"
                                options={{
                                  altInput: true,
                                  altFormat: "F j, Y",
                                }}
                                onChange={(date) => {
                                  setFieldValue(
                                    "dateOfletter",
                                    date[0].toISOString()
                                  );
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
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  />
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
                            <Label>Waktu / Tanggal (Perjalanan Dinas)</Label>
                            <InputGroup>
                              <Flatpickr
                                name="dateOftravel"
                                ref={dateRangePickerRef}
                                className="form-control d-block"
                                placeholder="dd M, yyyy"
                                options={{
                                  mode: "range",
                                  altInput: true,
                                  altFormat: "F j, Y",
                                }}
                                onChange={(date) => {
                                  console.log(date);
                                  const newRangeDate = `${date[0].toISOString()} - ${date[1].toISOString()}`;
                                  setFieldValue("dateOftravel", newRangeDate);
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
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  />
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
                        {values.considerans.map((item, index) => (
                          <Row key={index} className="my-2">
                            <label
                              htmlFor="example-text-input"
                              className="col-md-1 col-form-label d-flex align-items-center justify-content-center"
                            >
                              {String.fromCharCode(97 + index)}
                            </label>
                            <div className="col-md-10">
                              <textarea
                                className="form-control"
                                rows="3"
                                value={item}
                                onChange={(e) => {
                                  const newConsiderans = [
                                    ...values.considerans,
                                  ];
                                  newConsiderans[index] = e.target.value;
                                  setFieldValue("considerans", newConsiderans);
                                }}
                              />
                            </div>
                            <div className="col-md-1 d-flex align-items-center justify-content-center">
                              <button
                                type="button"
                                className="btn btn-danger waves-effect waves-light"
                                onClick={() => {
                                  const newConsiderans = [
                                    ...values.considerans,
                                  ];
                                  newConsiderans.splice(index, 1);
                                  console.log(newConsiderans);
                                  setFieldValue("considerans", newConsiderans);
                                }}
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
                        name="considerans"
                        type="button"
                        className="btn btn-outline-light waves-effect"
                        onClick={() =>
                          setFieldValue("considerans", [
                            ...values.considerans,
                            "",
                          ])
                        }
                      >
                        Tambah baris baru{" "}
                        <i className="mdi mdi-playlist-plus" />
                      </button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>Dasar</CardTitle>
                      <CardBody className="py-0">
                        {values.desideratum.map((item, index) => (
                          <Row key={index} className="my-2">
                            <label
                              htmlFor="example-text-input"
                              className="col-md-1 col-form-label d-flex align-items-center justify-content-center"
                            >
                              {String.fromCharCode(97 + index)}
                            </label>
                            <div className="col-md-10">
                              <textarea
                                className="form-control"
                                rows="3"
                                value={item}
                                onChange={(e) => {
                                  const newDesideratum = [
                                    ...values.desideratum,
                                  ];
                                  newDesideratum[index] = e.target.value;
                                  setFieldValue("desideratum", newDesideratum);
                                }}
                              />
                            </div>
                            <div className="col-md-1 d-flex align-items-center justify-content-center">
                              <button
                                type="button"
                                className="btn btn-danger waves-effect waves-light"
                                onClick={() => {
                                  const newDesideratum = [
                                    ...values.desideratum,
                                  ];
                                  newDesideratum.splice(index, 1);
                                  console.log(newDesideratum);
                                  setFieldValue("desideratum", newDesideratum);
                                }}
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
                        onClick={() => {
                          setFieldValue("desideratum", [
                            ...values.desideratum,
                            "",
                          ]);
                        }}
                      >
                        Tambah baris baru{" "}
                        <i className="mdi mdi-playlist-plus" />
                      </button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="bg-transparent">
                      <h5 className="my-0">Memberikan Tugas</h5>
                    </CardHeader>
                    <CardBody>
                      <CardTitle>Kepada</CardTitle>
                      <CardBody className="p-0">
                        {values.dictum.map((item, index) => (
                          <Row key={index} className="my-2">
                            <label
                              htmlFor="example-text-input"
                              className="col-md-1 col-form-label d-flex align-items-center justify-content-center"
                            >
                              {String.fromCharCode(97 + index)}
                            </label>
                            <div className="col-md-10">
                              <Select
                                options={employees}
                                value={item}
                                onChange={(value) => {
                                  const newDictum = [...values.dictum];
                                  newDictum[index] = value;
                                  setFieldValue("dictum", newDictum);
                                }}
                                classNamePrefix="select2-selection"
                              />
                            </div>
                            <div className="col-md-1 d-flex align-items-center justify-content-center">
                              <button
                                type="button"
                                className="btn btn-danger waves-effect waves-light"
                                onClick={() => {
                                  const newDictum = [...values.dictum];
                                  newDictum.splice(index, 1);
                                  console.log(newDictum);
                                  setFieldValue("dictum", newDictum);
                                }}
                              >
                                <i className="mdi mdi-delete-outline"></i>
                              </button>
                            </div>
                          </Row>
                        ))}
                        {/* <Select
                          isMulti
                          name="dictum"
                          options={employees}
                          onChange={(newValue) => {
                            const value = newValue.map((item) => item.value);
                            setFieldValue("dictum", value);
                          }}
                          classNamePrefix="select2-selection"
                        /> */}
                      </CardBody>
                    </CardBody>
                    <CardFooter className="bg-transparent">
                      <button
                        type="button"
                        className="btn btn-outline-light waves-effect"
                        onClick={() => {
                          setFieldValue("dictum", [...values.dictum, ""]);
                        }}
                      >
                        Tambah baris baru{" "}
                        <i className="mdi mdi-playlist-plus" />
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
                              name="assignor"
                              onChange={(value) => {
                                setFieldValue("assignor", value.value);
                              }}
                              options={jabatanOptions}
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
                              name="assignor"
                              onChange={(newValue) => {
                                setFieldValue("assignor", newValue.value);
                              }}
                              options={employees}
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
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          Pastikan data yang anda masukan sudah benar{" "}
                          <span className="mdi mdi-information-outline"></span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-rounded btn-lg waves-effect waves-light"
                        disabled={isSubmitting}
                      >
                        Cetak Surat
                      </button>
                    </CardBody>
                  </Card>
                </Container>
                <AnggaranModal
                  open={open}
                  setOpen={setOpen}
                  handleRowClick={(row) => {
                    setFieldValue("budgetLineitem", row.id);
                    setOpen(!open);
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Fragment>
  );
};

const kendaraanOptions = [
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
];

const warnaOptions = [
  { label: "Merah", value: "red" },
  { label: "Hijau", value: "green" },
  { label: "Biru", value: "blue" },
  { label: "Kuning", value: "yellow" },
];

const jabatanOptions = [
  {
    value: "KEPALA",
    label: "KEPALA",
  },
  {
    value: "Plt. KEPALA",
    label: "Plt. KEPALA",
  },
  {
    value: "Plh. KEPALA",
    label: "Plh. KEPALA",
  },
];

export default BuatSuratTugas;
