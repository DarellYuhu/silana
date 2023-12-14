import { Breadcrumbs } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  InputGroup,
  Row,
  Tooltip,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import axiosClient from "../../helpers/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const KwitansiSchema = Yup.object().shape({
  bp: Yup.string().required("Required"),
  bpp: Yup.string().required("Required"),
  pelaksana: Yup.string().required("Required"),
  dateOfLetter: Yup.string().required("Required"),
  dateOfPaid: Yup.string().required("Required"),
});

const EditKwitansi = () => {
  const [bpTooltip, setBpTooltip] = useState(false);
  const [bppTooltip, setBppTooltip] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [checked, setChecked] = useState(false);
  const datePickerRef = useRef(null);
  const data = useLocation().state;
  const navigate = useNavigate();

  const getEmployees = async () => {
    try {
      const { data } = await axiosClient.get("employees");
      const normalized = data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setEmployees(normalized);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Perincian" breadcrumbItem="Edit Perincian" />
          <Formik
            initialValues={{
              bp: "",
              bpp: "",
              pelaksana: "",
              dateOfLetter: new Date().toISOString(),
              dateOfPaid: new Date().toISOString(),
            }}
            validationSchema={KwitansiSchema}
            onSubmit={(values, { setSubmitting }) => {
              localStorage.setItem(
                "printKwitansi",
                JSON.stringify({ data, values })
              );
              window.open(`/kwitansi/${data.id}/print`, "_blank");
              setSubmitting(false);
            }}
          >
            {({ setFieldValue, errors, touched, isSubmitting }) => (
              <Form>
                <Card>
                  <CardBody>
                    <CardBody className="py-0 d-grid gap-3">
                      <Row>
                        <Tooltip
                          placement="top"
                          isOpen={bpTooltip}
                          target="bp"
                          toggle={() => {
                            setBpTooltip(!bpTooltip);
                          }}
                        >
                          Bendahara Pengeluaran
                        </Tooltip>
                        <Col md={2} className="d-flex align-items-center">
                          BP
                        </Col>
                        <Col md={10}>
                          <Select
                            options={employees}
                            classNamePrefix="select2-selection"
                            id="bp"
                            onChange={(e) => {
                              setFieldValue("bp", e.value);
                            }}
                          />
                        </Col>
                      </Row>
                      <CustomError error={errors.bp} touched={touched.bp} />
                      <Row>
                        <Tooltip
                          placement="top"
                          isOpen={bppTooltip}
                          target="bpp"
                          toggle={() => {
                            setBppTooltip(!bppTooltip);
                          }}
                        >
                          Bendahara Pengeluaran Pembantu
                        </Tooltip>
                        <Col md={2} className="d-flex align-items-center">
                          BPP
                        </Col>
                        <Col md={10}>
                          <Select
                            options={employees}
                            classNamePrefix="select2-selection"
                            id="bpp"
                            onChange={(e) => {
                              setFieldValue("bpp", e.value);
                            }}
                          />
                        </Col>
                      </Row>
                      <CustomError error={errors.bpp} touched={touched.bpp} />
                      <Row>
                        <Col md={2} className="d-flex align-items-center">
                          Pelaksana
                        </Col>
                        <Col md={10}>
                          <Select
                            options={data?.dictum?.map((item) => ({
                              value: item,
                              label: item,
                            }))}
                            classNamePrefix="select2-selection"
                            onChange={(e) => {
                              setFieldValue("pelaksana", e.value);
                            }}
                          />
                        </Col>
                      </Row>
                      <CustomError
                        error={errors.pelaksana}
                        touched={touched.pelaksana}
                      />
                    </CardBody>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
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
                          onChange={(date) => {
                            setFieldValue(
                              "dateOfLetter",
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
                            <i className="fa fa-calendar" aria-hidden="true" />
                          </button>
                        </div>
                      </InputGroup>
                      <CustomError
                        error={errors.dateOfLetter}
                        touched={touched.dateOfLetter}
                      />
                    </CardBody>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>TANGGAL LUNAS</CardTitle>
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
                          onChange={(date) => {
                            setFieldValue("dateOfPaid", date[0].toISOString());
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
                      <CustomError
                        error={errors.dateOfLetter}
                        touched={touched.dateOfLetter}
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
                      SUBMIT
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

const CustomError = ({ error, touched }) => {
  return (
    <div className="text-danger">
      {touched && error ? <div>{error}</div> : null}
    </div>
  );
};

export default EditKwitansi;
