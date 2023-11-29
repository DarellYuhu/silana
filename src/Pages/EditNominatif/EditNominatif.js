import { Fragment, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  InputGroup,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const data = [
  {
    name: "Daniel Hamonangan, S.Kom, M.Sc",
  },
  {
    name: "Dinar Ariana Viestri, S.Si",
  },
  {
    name: "Ir. Ronny Sumilat",
  },
];

const NominativeSchema = Yup.object().shape({
  type: Yup.string().required("Required"),
  data: Yup.array().of(
    Yup.object().shape({
      lumpsumDay: Yup.number().nullable().required("Required"),
      lumpsumAmount: Yup.number().nullable().required("Required"),
      lodgingDay: Yup.number().nullable().required("Required"),
      lodgingAmount: Yup.number().nullable().required("Required"),
    })
  ),
});

const EditNominatif = () => {
  const [type, setType] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const datePickerRef = useRef(null);
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Nominatif"
            breadcrumbItem="Nominatif (Rincian Transport)"
          />
          <Formik
            initialValues={{
              type: "",
              data: data.map((item) => ({
                name: item.name,
                localTransportDeparture: null,
                localTransportReturn: null,
                planeShipDeparture: null,
                planeShipReturn: null,
                lumpsumDay: null,
                lumpsumAmount: null,
                lodgingDay: null,
                lodgingAmount: null,
              })),
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                setSubmitting(false);
              }, 400);
            }}
            validationSchema={NominativeSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleChange,
              setFieldValue,
              isSubmitting,
              errors,
              touched,
              handleSubmit,
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Card>
                    <CardBody>
                      <CardBody className="p-0 px-1">
                        <div className="mb-3">
                          <Label>Transport</Label>
                          <Select
                            onChange={(newValue) => {
                              setType(newValue.value);
                              setFieldValue("type", newValue.value);
                            }}
                            options={transportType}
                            classNamePrefix="select2-selection"
                          />
                          {errors.type && touched.type ? (
                            <div className="invalid-feedback d-block">
                              {errors.type}
                            </div>
                          ) : null}
                        </div>
                      </CardBody>
                    </CardBody>
                  </Card>
                  {data.map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="bg-transparent border-bottom ">
                        <h5 className="my-0">{item.name}</h5>
                      </CardHeader>

                      {type === "Tim" && index !== 0 ? null : (
                        <CardBody>
                          <CardTitle>TRANSPORT</CardTitle>
                          <CardBody className="p-0 px-4">
                            <h6 className="card-title">
                              <i>
                                Lokal <i className="mdi mdi-car" />
                              </i>
                            </h6>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Label>Pergi</Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].localTransportDeparture`}
                                  onChange={handleChange}
                                />
                              </Col>
                              <Col md={6}>
                                <Label>Pulang</Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].localTransportReturn`}
                                  onChange={handleChange}
                                />
                              </Col>
                            </Row>
                            <h6 className="card-title">
                              <i>
                                Pesawat <i className="mdi mdi-airplane" /> /
                                Kapal <i className="bx bxs-ship" />
                              </i>
                            </h6>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Label>Pergi</Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].planeShipDeparture`}
                                  onChange={handleChange}
                                />
                              </Col>
                              <Col md={6}>
                                <Label>Pulang</Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].planeShipReturn`}
                                  onChange={handleChange}
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </CardBody>
                      )}
                      <CardBody className="pt-0">
                        <CardTitle>LUMPSUM</CardTitle>
                        <CardBody className="p-0 px-4">
                          <Row className="mb-3">
                            <Col md={6}>
                              <Label>Hari</Label>
                              <Input
                                type="number"
                                className="colorpicker-default"
                                name={`data[${index}].lumpsumDay`}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lumpsumDay &&
                                  touched?.data?.[index]?.lumpsumDay
                                }
                              />
                            </Col>
                            <Col md={6}>
                              <Label>Uang</Label>
                              <Input
                                type="number"
                                className="colorpicker-default"
                                name={`data[${index}].lumpsumAmount`}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lumpsumAmount &&
                                  touched?.data?.[index]?.lumpsumAmount
                                }
                              />
                            </Col>
                          </Row>
                        </CardBody>
                      </CardBody>
                      <CardBody className="pt-0">
                        <CardTitle>PENGINAPAN</CardTitle>
                        <CardBody className="p-0 px-4">
                          <Row className="mb-3">
                            <Col md={6}>
                              <Label>Hari</Label>
                              <Input
                                type="number"
                                className="colorpicker-default"
                                name={`data[${index}].lodgingDay`}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lodgingDay &&
                                  touched?.data?.[index]?.lodgingDay
                                }
                              />
                            </Col>
                            <Col md={6}>
                              <Label>Uang</Label>
                              <Input
                                type="number"
                                className="colorpicker-default"
                                name={`data[${index}].lodgingAmount`}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lodgingAmount &&
                                  touched?.data?.[index]?.lodgingAmount
                                }
                              />
                            </Col>
                          </Row>
                        </CardBody>
                      </CardBody>
                    </Card>
                  ))}
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
                          onChange={(e) => setIsChecked(e.target.checked)}
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
                        disabled={!isChecked || isSubmitting}
                      >
                        Cetak Surat
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

const transportType = [
  {
    options: [
      { label: "Tim", value: "Tim" },
      { label: "Perorangan", value: "Perorangan" },
    ],
  },
];

export default EditNominatif;
