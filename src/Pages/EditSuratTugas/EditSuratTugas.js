import { Fragment, useEffect, useRef, useState } from "react";
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
import AnggaranModal from "./Components/AnggaranModal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../helpers/axiosClient";
import { TableSkeleton } from "../../components/Custom";
import { signal } from "@preact/signals-react";
import Swal from "sweetalert2";

const CreateLetterSchema = Yup.object().shape({
  barColor: Yup.string().required("Required"),
  burden: Yup.string().required("Required"),
  fiscalYear: Yup.number().not([0], "Required").required("Required"),
  budgetId: Yup.string().required("Required"),
  vehicleType: Yup.string().required("Required"),
  dateOfletter: Yup.string().required("Required"),
  dateOftravel: Yup.string().required("Required"),
  assignedTo: Yup.string().required("Required"),
  considerans: Yup.array().min(1).required("Required"),
  desideratum: Yup.array().min(1).required("Required"),
  dictum: Yup.array().min(1).required("Required"),
  assignorId: Yup.string().required("Required"),
  assignorTitle: Yup.string().required("Required"),
});

const open = signal(false);

const EditSuratTugas = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [employees, setEmployees] = useState(null);
  const [budgets, setBudgets] = useState(null);
  const [loading, setLoading] = useState(true);
  const formik = useRef(null);
  const datePickerRef = useRef(null);
  const dateRangePickerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const fetchEmployees = async () => {
    const res = await axiosClient.get("employees");
    const options = res.data.map((item) => ({
      value: item.name,
      id: item.id,
      label: item.name,
    }));
    setEmployees(options);
  };

  const fetchData = async () => {
    const res = await axiosClient.get("budgets");
    setBudgets(res.data);
  };

  useEffect(() => {
    Promise.all([fetchEmployees(), fetchData()])
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Gagal!",
          text: err.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!state) {
    return (
      <Fragment>
        <div className="page-content">
          <h1>404 Not Found</h1>
        </div>
      </Fragment>
    );
  }

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <Fragment>
      <div className="page-content">
        <Formik
          innerRef={formik}
          initialValues={{
            barColor: state.barColor,
            burden: state.burden,
            fiscalYear: state.fiscalYear,
            budgetId: state.budgetId,
            vehicleType: state.vehicleType,
            dateOfletter: state.dateOfletter,
            dateOftravel: `${state.dateOftravel} - ${state.endDateOftravel}`,
            startDateOftravel: state.startDateOftravel,
            endDateOftravel: state.endDateOftravel,
            assignedTo: state.assignedTo,
            considerans: state.considerans,
            desideratum: state.desideratum,
            dictum: state.dictum,
            assignorId: state.assignorId,
            assignorTitle: state.assignorTitle,
          }}
          validationSchema={CreateLetterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const payload = { ...values };
            delete payload.dateOftravel;
            try {
              Swal.fire({
                title: "Mohon Tunggu!",
                html: "Surat Tugas sedang disimpan",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                  Swal.showLoading();
                },
                showConfirmButton: false,
              });
              await axiosClient.patch(`letters/${id}`, payload);
              await Swal.fire({
                title: "Berhasil!",
                text: "Surat Tugas berhasil diubah",
                icon: "success",
              });
              navigate("/surat-tugas");
            } catch (err) {
              console.log(err);
              Swal.fire({
                title: "Gagal!",
                text: err.message,
                icon: "error",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            isSubmitting,
            errors,
            touched,
            handleSubmit,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Container fluid={true}>
                  <Breadcrumbs
                    title="Surat Tugas"
                    breadcrumbItem="Edit Surat"
                  />
                  <Card>
                    <CardBody>
                      <CardBody className="p-0 px-1">
                        <div className="mb-3">
                          <Label>Warna Bar</Label>
                          <Select
                            name="barColor"
                            defaultValue={{
                              value: state.barColor,
                              label: warnaOptions.find(
                                (item) => item.value === state.barColor
                              ).label,
                            }}
                            onChange={(value) => {
                              setFieldValue("barColor", value.value);
                            }}
                            options={warnaOptions}
                            classNamePrefix="select2-selection"
                          />
                          {errors.barColor && touched.barColor ? (
                            <p className="text-danger">{`* ${errors.barColor}`}</p>
                          ) : null}
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
                              defaultValue={state.burden}
                              className="colorpicker-default"
                              placeholder="cth..DIPA Perwakilan BKKBN Provinsi Sulawesi Utara"
                              name="burden"
                              onChange={handleChange}
                            />
                            {errors.burden && touched.burden ? (
                              <p className="text-danger">{`* ${errors.burden}`}</p>
                            ) : null}
                          </CardBody>
                        </CardBody>
                        <CardBody className="p-0 px-1">
                          <CardTitle>Tahun Anggaran</CardTitle>
                          <CardBody className="p-0">
                            <Input
                              type="number"
                              defaultValue={state.fiscalYear}
                              className="colorpicker-default"
                              placeholder="cth..2023"
                              name="fiscalYear"
                              onChange={handleChange}
                            />
                            {errors.fiscalYear && touched.fiscalYear ? (
                              <p className="text-danger">{`* ${errors.fiscalYear}`}</p>
                            ) : null}
                          </CardBody>
                        </CardBody>
                        <CardBody className="p-0 px-1">
                          <CardTitle>Mata Anggaran</CardTitle>
                          <CardBody className="p-0">
                            <Input
                              value={values.budgetId}
                              type="text"
                              className="colorpicker-default"
                              placeholder="cth.. 3331.UBA.002.256.A.524111"
                              readOnly
                              onClick={() => (open.value = true)}
                            />
                            {errors.budgetId && touched.budgetId ? (
                              <p className="text-danger">{`* ${errors.budgetId}`}</p>
                            ) : null}
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
                            defaultValue={{
                              value: state.vehicleType,
                              label: kendaraanOptions.find(
                                (item) => item.value === state.vehicleType
                              ).label,
                            }}
                            onChange={(value) => {
                              setFieldValue("vehicleType", value.value);
                            }}
                            options={kendaraanOptions}
                            classNamePrefix="select2-selection"
                          />
                          {errors.vehicleType && touched.vehicleType ? (
                            <p className="text-danger">{`* ${errors.vehicleType}`}</p>
                          ) : null}
                        </CardBody>
                        <CardBody className="p-0 px-1">
                          <FormGroup className="mb-4">
                            <Label>Tanggal Surat</Label>
                            <InputGroup>
                              <Flatpickr
                                ref={datePickerRef}
                                name="dateOfletter"
                                defaultValue={state.dateOfletter}
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
                            {errors.dateOfletter && touched.dateOfletter ? (
                              <p className="text-danger">{`* ${errors.dateOfletter}`}</p>
                            ) : null}
                          </FormGroup>
                        </CardBody>
                      </Col>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Col md={12} className="d-grid ">
                        <CardBody className="p-0 px-1">
                          <FormGroup>
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
                                  defaultDate: [
                                    state.startDateOftravel,
                                    state.endDateOftravel,
                                  ],
                                }}
                                onChange={(date) => {
                                  const newRangeDate = `${date[0].toISOString()} - ${date[1].toISOString()}`;
                                  setFieldValue("dateOftravel", newRangeDate);
                                  setFieldValue(
                                    "startDateOftravel",
                                    date[0].toISOString()
                                  );
                                  setFieldValue(
                                    "endDateOftravel",
                                    date[1].toISOString()
                                  );
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
                            {errors.dateOftravel && touched.dateOftravel ? (
                              <p className="text-danger">{`* ${errors.dateOftravel}`}</p>
                            ) : null}
                          </FormGroup>
                        </CardBody>
                        <CardBody className="p-0 px-1">
                          <CardTitle>Ditugaskan untuk</CardTitle>
                          <CardBody className="p-0">
                            <Input
                              type="textarea"
                              defaultValue={state.assignedTo}
                              rows="3"
                              className="colorpicker-default"
                              name="assignedTo"
                              onChange={handleChange}
                            />
                            {errors.assignedTo && touched.assignedTo ? (
                              <p className="text-danger">{`* ${errors.assignedTo}`}</p>
                            ) : null}
                          </CardBody>
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
                      {errors.considerans && touched.considerans ? (
                        <p className="text-danger">{`* ${errors.considerans}`}</p>
                      ) : null}
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
                      {errors.desideratum && touched.desideratum ? (
                        <p className="text-danger">{`* ${errors.desideratum}`}</p>
                      ) : null}
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
                                defaultValue={{
                                  value: item,
                                  label: employees?.find(
                                    (option) => option.label === item
                                  )?.label,
                                }}
                                options={employees}
                                value={employees?.find(
                                  (option) => option.value === item
                                )}
                                onChange={(item) => {
                                  console.log(item);
                                  const newDictum = [...values.dictum];
                                  newDictum[index] = item.value;
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
                                  setFieldValue("dictum", newDictum);
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
                      {errors.dictum && touched.dictum ? (
                        <p className="text-danger">{`* ${errors.dictum}`}</p>
                      ) : null}
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
                    <CardBody>
                      <CardBody className="pt-0 d-grid gap-3">
                        <Row>
                          <Col md={2} className="d-flex align-items-center">
                            Jabatan
                          </Col>
                          <Col md={10}>
                            <Select
                              name="assignorTitle"
                              defaultValue={{
                                value: state.assignorTitle,
                                label: jabatanOptions.find(
                                  (item) => item.value === state.assignorTitle
                                )?.label,
                              }}
                              onChange={(newValue) => {
                                setFieldValue("assignorTitle", newValue.value);
                              }}
                              options={jabatanOptions}
                              classNamePrefix="select2-selection"
                            />
                          </Col>
                        </Row>
                        {errors.assignorTitle && touched.assignorTitle ? (
                          <p className="text-danger">{`* ${errors.assignorTitle}`}</p>
                        ) : null}
                        <Row>
                          <Col md={2} className="d-flex align-items-center">
                            Nama
                          </Col>
                          <Col md={10}>
                            <Select
                              defaultValue={{
                                value: state.assignorId,
                                id: state.assignorId,
                                label: employees?.find(
                                  (option) => option.id === state.assignorId
                                )?.label,
                              }}
                              name="assignorId"
                              onChange={(newValue) => {
                                setFieldValue("assignorId", newValue.id);
                              }}
                              options={employees}
                              classNamePrefix="select2-selection"
                            />
                          </Col>
                        </Row>
                        {errors.assignorId && touched.assignorId ? (
                          <p className="text-danger">{`* ${errors.assignorId}`}</p>
                        ) : null}
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
                          onChange={(e) => {
                            setIsChecked(e.target.checked);
                          }}
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
                        disabled={isSubmitting || !isChecked}
                      >
                        Cetak Surat
                      </button>
                    </CardBody>
                  </Card>
                </Container>
                <AnggaranModal
                  open={open.value}
                  data={budgets}
                  setOpen={(value) => (open.value = value)}
                  handleRowClick={(row) => {
                    setFieldValue("budgetId", row.id);
                    open.value = false;
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
  { label: "Ungu", value: "purple" },
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

export default EditSuratTugas;
