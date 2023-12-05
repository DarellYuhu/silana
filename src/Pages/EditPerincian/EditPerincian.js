import { Fragment, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import axiosClient from "../../helpers/axiosClient";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  paidNominal: Yup.number().required("Required"),
  treasurer: Yup.string().required("Required"),
  recipient: Yup.string().required("Required"),
  dateOfLetter: Yup.string().required("Required"),
});

const EditPerincian = () => {
  const [employees, setEmployees] = useState([]);
  const [checked, setChecked] = useState();
  const datePickerRef = useRef(null);
  const data = useLocation().state;
  const navigate = useNavigate();
  const { id } = useParams();

  const recipientOption = data.dictum.map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  const getEmployees = async () => {
    try {
      const { data } = await axiosClient.get("/employees");
      const normalized = data.map((employee) => {
        return {
          value: employee.id,
          label: employee.name,
        };
      });
      console.log(normalized);
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
              paidNominal: "",
              treasurer: "",
              recipient: "",
              dateOfLetter: new Date().toISOString(),
            }}
            onSubmit={(values, { setSubmitting }) => {
              navigate(`/perincian/${id}/print`, {
                state: { values, data },
              });
              setSubmitting(false);
            }}
            validationSchema={ValidationSchema}
          >
            {({
              handleChange,
              setFieldValue,
              touched,
              errors,
              isSubmitting,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Card>
                  <CardBody>
                    <CardTitle>Yang Telah Dibayar Semula</CardTitle>
                    <CardBody className="p-0 px-1">
                      <div className="mb-3 d-flex">
                        <Input
                          type="number"
                          className="colorpicker-default"
                          placeholder="cth.. 50000"
                          name="paidNominal"
                          onChange={handleChange}
                        />
                        <Button disabled>Rupiah</Button>
                      </div>
                      <CustomeError
                        error={errors.paidNominal}
                        touched={touched.paidNominal}
                      />
                    </CardBody>
                  </CardBody>
                  <CardBody className="pt-0">
                    <CardBody className="pt-0 d-grid gap-3">
                      <Row>
                        <Col md={2} className="d-flex align-items-center">
                          Bendahara
                        </Col>
                        <Col md={10}>
                          <Select
                            classNamePrefix="select2-selection"
                            options={employees}
                            onChange={(newValue) => {
                              setFieldValue("treasurer", newValue.value);
                            }}
                          />
                          <CustomeError
                            error={errors.treasurer}
                            touched={touched.treasurer}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={2} className="d-flex align-items-center">
                          Penerima
                        </Col>
                        <Col md={10}>
                          <Select
                            options={recipientOption}
                            classNamePrefix="select2-selection"
                            onChange={(newValue) => {
                              setFieldValue("recipient", newValue.value);
                            }}
                          />
                          <CustomeError
                            error={errors.recipient}
                            touched={touched.recipient}
                          />
                        </Col>
                      </Row>
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
                      <CustomeError
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
                      disabled={!checked || isSubmitting}
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

const CustomeError = ({ error, touched }) => {
  return (
    <div className="text-danger">
      {touched && error ? <div>{error}</div> : null}
    </div>
  );
};

export default EditPerincian;
