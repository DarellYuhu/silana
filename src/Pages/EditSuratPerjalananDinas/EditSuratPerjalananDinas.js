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
import axios from "axios";
import { capitalizeString } from "../../Utility";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  commitmentMaker: Yup.string().required("PPB harus dipilih"),
  placeOfDeparture: Yup.string().required("Tempat berangkat harus dipilih"),
  destination: Yup.array().min(1, "Pilih minimal 1 tujuan"),
  dateOfLetter: Yup.string().required("Tanggal surat harus diisi"),
});

const EditSuratPerjalananDinas = () => {
  const [employees, setEmployees] = useState([]);
  const [checked, setChecked] = useState(false);
  const datePickerRef = useRef(null);

  const filteredDistricts = Object.keys(DISTRICT)
    .filter((key) => key.startsWith("71"))
    .map((key) => ({
      value: DISTRICT[key],
      label: DISTRICT[key],
    }));

  console.log(filteredDistricts);

  useEffect(() => {
    axios
      .get("http://localhost:2000/employees")
      .then((res) => {
        const normalized = res.map((employee) => ({
          value: employee.name,
          label: employee.name,
        }));
        setEmployees(normalized);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              commitmentMaker: "",
              placeOfDeparture: "",
              destination: [],
              dateOfLetter: new Date().toISOString(),
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const normalized = {
                ...values,
                placeOfDeparture: capitalizeString(values.placeOfDeparture),
                destination: values.destination.map((item) =>
                  capitalizeString(item)
                ),
              };
              setTimeout(() => {
                console.log(values);
                setSubmitting(false);
              }, 2000);
            }}
          >
            {({ setFieldValue, isSubmitting, errors, touched }) => (
              <Form>
                <Card>
                  <CardBody>
                    <CardTitle>PEJABAT PEMBUAT KOMITMEN</CardTitle>
                    <CardBody className="p-0 px-4">
                      <div className="mb-3">
                        <Select
                          onChange={(option) => {
                            console.log(option);
                            setFieldValue("commitmentMaker", option.value);
                          }}
                          options={employees}
                          classNamePrefix="select2-selection"
                          aria-errormessage="commitmentMaker"
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
                          // value={selectedGroup}
                          onChange={(newValue) => {
                            setFieldValue("placeOfDeparture", newValue.value);
                          }}
                          classNamePrefix="select2-selection"
                          options={filteredDistricts}
                        />
                        <Error
                          touched={touched.placeOfDeparture}
                          message={errors.placeOfDeparture}
                        />
                      </div>
                      <div className="mb-3">
                        <Label>Tempat Tujuan</Label>
                        <Creatable
                          onChange={(option) => {
                            console.log(option);
                            setFieldValue(
                              "destination",
                              option.map((item) => item.value)
                            );
                          }}
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
                          defaultValue="today"
                          className="form-control d-block"
                          placeholder="dd M, yyyy"
                          options={{
                            altInput: true,
                            altFormat: "F j, Y",
                            dateFormat: "Y-m-d",
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
                            <i className="fa fa-calendar" aria-hidden="true" />
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
                        checked={checked}
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
            )}
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
