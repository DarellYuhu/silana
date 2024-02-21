import { Fragment, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  InputGroup,
  Label,
} from "reactstrap";
import Creatable from "react-select/creatable";
import Select from "react-select";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Flatpickr from "react-flatpickr";
import DISTRICT from "@regions-of-indonesia/data/district";
import { Form, Formik } from "formik";
import { capitalizeString } from "../../Utility";
import * as Yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../helpers/axiosClient";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  commitmentMaker: Yup.string().required("PPB harus dipilih"),
  departure: Yup.string().required("Tempat berangkat harus dipilih"),
  destination: Yup.array().min(1, "Pilih minimal 1 tujuan"),
  dateOfLetter: Yup.string().required("Tanggal surat harus diisi"),
});

const EditSuratPerjalananDinas = () => {
  const [employees, setEmployees] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const travel = useLocation().state;
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const filteredDistricts = Object.keys(DISTRICT)
    .filter((key) => key.startsWith("71"))
    .map((key) => ({
      value: DISTRICT[key],
      label: DISTRICT[key],
    }));

  const getEmployees = async () => {
    try {
      const res = await axiosClient.get("employees");
      const data = res.data.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      setEmployees(data);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Surat Tugas"
            breadcrumbItem="Edit Surat Perjalanan Dinas"
          />
          <Formik
            initialValues={{
              commitmentMaker: travel?.commitmentMaker || "",
              departure: travel?.departure || "",
              destination: travel?.destination || [],
              dateOfLetter: travel?.dateOfLetter || new Date().toISOString(),
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const normalized = {
                ...values,
                departure: capitalizeString(values.departure),
                destination: values.destination.map((item) =>
                  capitalizeString(item)
                ),
                letterId: id,
              };
              try {
                Swal.fire({
                  title: "Loading...",
                  text: "Sedang memproses data",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  didOpen: () => {
                    Swal.showLoading();
                  },
                });
                let res;
                if (travel) {
                  res = await axiosClient.patch(
                    `travels/${travel.id}`,
                    normalized
                  );
                } else {
                  res = await axiosClient.post("travels", normalized);
                }
                await Swal.fire({
                  title: "Success!",
                  text: "Data berhasil disimpan",
                  icon: "success",
                });
                navigate(`/surat-perjalanan-dinas`);
              } catch (err) {
                console.log(err);
                Swal.fire({
                  title: "Error!",
                  text: err.message,
                  icon: "error",
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, setFieldValue, isSubmitting, errors, touched }) => {
              return (
                <Form>
                  <Card>
                    <CardBody>
                      <CardTitle>PEJABAT PEMBUAT KOMITMEN</CardTitle>
                      <CardBody className="p-0 px-4">
                        <div className="mb-3">
                          <Select
                            onChange={(option) => {
                              setFieldValue("commitmentMaker", option.value);
                            }}
                            options={employees}
                            classNamePrefix="select2-selection"
                            aria-errormessage="commitmentMaker"
                            value={{
                              value: values.commitmentMaker,
                              label: values.commitmentMaker,
                            }}
                          />
                          <Error
                            touched={touched.commitmentMaker}
                            message={errors.commitmentMaker}
                          />
                        </div>
                      </CardBody>
                    </CardBody>
                    <CardBody className="pt-0">
                      <CardTitle>KEBERANGKATAN & DESTINASI</CardTitle>
                      <CardBody className="p-0 px-4">
                        <div className="mb-3">
                          <Label>Tempat Berangkat</Label>
                          <Select
                            value={{
                              value: values.departure.toUpperCase(),
                              label: values.departure.toUpperCase(),
                            }}
                            onChange={(newValue) => {
                              setFieldValue("departure", newValue.value);
                            }}
                            classNamePrefix="select2-selection"
                            options={filteredDistricts}
                          />
                          <Error
                            touched={touched.departure}
                            message={errors.departure}
                          />
                        </div>
                        <div className="mb-3">
                          <Label>Tempat Tujuan</Label>
                          <Creatable
                            onChange={(option) => {
                              setFieldValue(
                                "destination",
                                option.map((item) => item.value)
                              );
                            }}
                            value={values.destination.map((item) => ({
                              value: item.toUpperCase(),
                              label: item.toUpperCase(),
                            }))}
                            isMulti
                            options={filteredDistricts}
                            classNamePrefix="select2-selection"
                          />
                          <Error
                            touched={touched.destination}
                            message={errors.destination}
                          />
                        </div>
                      </CardBody>
                    </CardBody>
                    <CardBody className="pt-0">
                      <CardTitle>TANGGAL SURAT</CardTitle>
                      <CardBody className="p-0 px-4">
                        <InputGroup>
                          <Flatpickr
                            ref={datePickerRef}
                            defaultValue={values.dateOfLetter || "today"}
                            className="form-control d-block"
                            placeholder="dd M, yyyy"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d",
                            }}
                            onChange={(date) => {
                              setFieldValue(
                                "dateOfLetter",
                                date[0].toISOString()
                              );
                            }}
                          />
                          <div>
                            <button
                              type="button"
                              className="btn btn-outline-secondary docs-datepicker-trigger"
                              onClick={() =>
                                datePickerRef.current.flatpickr.toggle()
                              }
                              style={{ zIndex: 0 }}
                            >
                              <i
                                className="fa fa-calendar"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </InputGroup>
                        <Error
                          touched={touched.dateOfLetter}
                          message={errors.dateOfLetter}
                        />
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
                          onChange={(e) => setChecked(e.target.checked)}
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
                        className="btn btn-info btn-rounded btn-lg waves-effect waves-light"
                        disabled={isSubmitting || !checked}
                      >
                        SIMPAN
                      </button>
                    </CardBody>
                  </Card>
                </Form>
              );
            }}
          </Formik>
        </Container>
      </div>
    </Fragment>
  );
};

const Error = ({ touched, message }) => {
  if (message && touched) {
    return (
      <div className="form-message invalid" style={{ color: "red" }}>
        {message}
      </div>
    );
  } else return null;
};

export default EditSuratPerjalananDinas;
