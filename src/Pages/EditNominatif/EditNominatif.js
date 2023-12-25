import { Fragment, useEffect, useRef, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axiosClient from "../../helpers/axiosClient";
import axios from "axios";
import { signal, useSignalEffect } from "@preact/signals-react";
import { extractGrade } from "../../Utility";
import Swal from "sweetalert2";

const NominativeSchema = Yup.object().shape({
  tranportType: Yup.string().required("Required"),
  data: Yup.array().of(
    Yup.object().shape({
      lumpsumDuration: Yup.number().nullable().required("Required"),
      lumpsumAmount: Yup.number().nullable().required("Required"),
      lodgingDuration: Yup.number().nullable().required("Required"),
      lodgingAmount: Yup.number().nullable().required("Required"),
    })
  ),
});

const allowances = signal(null);
const employees = signal(null);

const EditNominatif = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dataExample = useLocation().state;
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const formik = useRef();

  const getEmployees = async () => {
    const { data } = await axiosClient.get("employees");
    employees.value = data;
  };

  const getAllowance = async () => {
    const { data } = await axiosClient.get("allowances");
    allowances.value = data;
  };

  useEffect(() => {
    Promise.all([getAllowance(), getEmployees()]).catch((err) => {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
  }, []);

  useSignalEffect(() => {
    if (
      allowances.value &&
      employees.value &&
      !dataExample.nominative?.helpers
    ) {
      dataExample.dictum.map((name, index) => {
        const rank = employees?.value.find(
          (item) => item.name === name
        )?.classRank;
        const employeeGrade = extractGrade(rank);
        console.log(employeeGrade);
        const allowance = allowances.value.find(
          (item) => item.class === employeeGrade
        );
        console.log(allowance);
        formik.current.setFieldValue(
          `data[${index}].lumpsumAmount`,
          allowance.lumpsum
        );
        formik.current.setFieldValue(
          `data[${index}].lodgingAmount`,
          allowance.lodging
        );
      });
    }
  });
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Nominatif"
            breadcrumbItem="Nominatif (Rincian Transport)"
          />
          <Formik
            innerRef={formik}
            initialValues={{
              tranportType: dataExample.nominative?.tranportType ?? "",
              dateOfLetter:
                dataExample.nominative?.dateOfLetter ?? moment().toISOString(),
              letterId: dataExample.nominative?.letterId ?? dataExample.id,
              data:
                dataExample.nominative?.helpers ??
                dataExample.dictum.map((item) => ({
                  name: item,
                  transportDeparture: null,
                  transportReturn: null,
                  planeShipDearture: null,
                  planeShipReturn: null,
                  lumpsumDuration:
                    moment(dataExample.endDateOftravel).diff(
                      dataExample.startDateOftravel,
                      "days"
                    ) + 1 ?? null,
                  lumpsumAmount: null,
                  lodgingDuration:
                    moment(dataExample.endDateOftravel).diff(
                      dataExample.startDateOftravel,
                      "days"
                    ) ?? null,
                  lodgingAmount: null,
                })),
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const nominativePayload = {
                letterId: values.letterId,
                dateOfLetter: values.dateOfLetter,
                tranportType: values.tranportType,
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
                if (dataExample.nominative) {
                  await axiosClient.patch(
                    `nominative/${dataExample.nominative.id}`,
                    nominativePayload
                  );
                  await axios.all(
                    values.data.map((item) =>
                      axiosClient.patch(`helpers/${item.nominativeId}`, item)
                    )
                  );

                  const oldAmount = dataExample.nominative?.helpers?.reduce(
                    (acc, curr) => {
                      const personalTransport =
                        curr.transportDeparture +
                        curr.transportReturn +
                        curr.planeShipDearture +
                        curr.planeShipReturn;
                      const lumpsum = curr.lumpsumDuration * curr.lumpsumAmount;
                      const lodging = curr.lodgingDuration * curr.lodgingAmount;
                      const total = personalTransport + lumpsum + lodging;
                      return acc + total;
                    },
                    0
                  );

                  const newAmount = values?.data?.reduce((acc, curr) => {
                    const personalTransport =
                      curr.transportDeparture +
                      curr.transportReturn +
                      curr.planeShipDearture +
                      curr.planeShipReturn;
                    const lumpsum = curr.lumpsumDuration * curr.lumpsumAmount;
                    const lodging = curr.lodgingDuration * curr.lodgingAmount;
                    const total = personalTransport + lumpsum + lodging;
                    return acc + total;
                  }, 0);

                  const amount = newAmount - oldAmount;

                  await axiosClient.patch(
                    `budgets/${dataExample.budgetId}/budget`,
                    { amount }
                  );

                  await Swal.fire({
                    title: "Success!",
                    text: "Data berhasil disimpan",
                    icon: "success",
                  });
                  navigate("/nominatif");
                  return;
                }
                const res = await axiosClient.post(
                  "nominative",
                  nominativePayload
                );
                const helperPayload = values.data.map((item) => ({
                  ...item,
                  nominativeId: res.data.id,
                  employeeId: employees.value.find(
                    (employee) => employee.name === item.name
                  ).id,
                }));
                helperPayload.map((item) => delete item.name);
                await axiosClient.post("helpers", helperPayload);

                const amount = await helperPayload?.reduce((acc, curr) => {
                  const personalTransport =
                    curr.transportDeparture +
                    curr.transportReturn +
                    curr.planeShipDearture +
                    curr.planeShipReturn;
                  const lumpsum = curr.lumpsumDuration * curr.lumpsumAmount;
                  const lodging = curr.lodgingDuration * curr.lodgingAmount;
                  const total = personalTransport + lumpsum + lodging;
                  return acc + total;
                }, 0);

                await axiosClient.patch(
                  `budgets/${dataExample.budgetId}/budget`,
                  { amount }
                );

                console.log(amount);
                console.log(helperPayload);
                await Swal.fire({
                  title: "Success!",
                  text: "Data berhasil disimpan",
                  icon: "success",
                });
                navigate("/nominatif");
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
            validationSchema={NominativeSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              values,
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
                              setFieldValue("tranportType", newValue.value);
                              if (newValue.value === "Tim") {
                                values.data.map((item, index) => {
                                  if (index !== 0) {
                                    item.transportDeparture = null;
                                    item.transportReturn = null;
                                    item.planeShipDearture = null;
                                    item.planeShipReturn = null;
                                  }
                                });
                              }
                            }}
                            value={{
                              label: values.tranportType,
                              value: values.tranportType,
                            }}
                            options={transportType}
                            classNamePrefix="select2-selection"
                          />
                          {errors.tranportType && touched.tranportType ? (
                            <div className="invalid-feedback d-block">
                              {errors.tranportType}
                            </div>
                          ) : null}
                        </div>
                      </CardBody>
                    </CardBody>
                  </Card>
                  {dataExample.dictum.map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="bg-transparent border-bottom ">
                        <h5 className="my-0">{item}</h5>
                      </CardHeader>

                      {values.tranportType === "Tim" && index !== 0 ? null : (
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
                                <Label>
                                  Pergi:{" "}
                                  <span style={{ fontWeight: "normal" }}>
                                    {` ${
                                      new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                      }).format(
                                        values.data[index]?.transportDeparture
                                      ) ?? "-"
                                    }`}
                                  </span>
                                </Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].transportDeparture`}
                                  onChange={handleChange}
                                  value={values.data[index]?.transportDeparture}
                                />
                              </Col>
                              <Col md={6}>
                                <Label>
                                  Pulang:{" "}
                                  <span style={{ fontWeight: "normal" }}>
                                    {` ${
                                      new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                      }).format(
                                        values.data[index]?.transportReturn
                                      ) ?? "-"
                                    }`}
                                  </span>
                                </Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].transportReturn`}
                                  onChange={handleChange}
                                  value={values.data[index]?.transportReturn}
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
                                <Label>
                                  Pergi:{" "}
                                  <span style={{ fontWeight: "normal" }}>
                                    {` ${
                                      new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                      }).format(
                                        values.data[index]?.planeShipDearture
                                      ) ?? "-"
                                    }`}
                                  </span>
                                </Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].planeShipDearture`}
                                  onChange={handleChange}
                                  value={values.data[index]?.planeShipDearture}
                                />
                              </Col>
                              <Col md={6}>
                                <Label>
                                  Pulang:{" "}
                                  <span style={{ fontWeight: "normal" }}>
                                    {` ${
                                      new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                      }).format(
                                        values.data[index]?.planeShipReturn
                                      ) ?? "-"
                                    }`}
                                  </span>
                                </Label>
                                <Input
                                  type="number"
                                  className="colorpicker-default"
                                  name={`data[${index}].planeShipReturn`}
                                  onChange={handleChange}
                                  value={values.data[index]?.planeShipReturn}
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
                                name={`data[${index}].lumpsumDuration`}
                                value={values.data[index]?.lumpsumDuration}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lumpsumDuration &&
                                  touched?.data?.[index]?.lumpsumDuration
                                }
                              />
                            </Col>
                            <Col md={6}>
                              <Label>
                                Uang:{" "}
                                <span style={{ fontWeight: "normal" }}>
                                  {` ${
                                    new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                      minimumFractionDigits: 0,
                                    }).format(
                                      values.data[index]?.lumpsumAmount
                                    ) ?? "-"
                                  }`}
                                </span>
                              </Label>
                              <Input
                                type="number"
                                className="colorpicker-default"
                                name={`data[${index}].lumpsumAmount`}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lumpsumAmount &&
                                  touched?.data?.[index]?.lumpsumAmount
                                }
                                value={values.data[index]?.lumpsumAmount}
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
                                name={`data[${index}].lodgingDuration`}
                                value={values.data[index]?.lodgingDuration}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lodgingDuration &&
                                  touched?.data?.[index]?.lodgingDuration
                                }
                              />
                            </Col>
                            <Col md={6}>
                              <Label>
                                Uang:{" "}
                                <span style={{ fontWeight: "normal" }}>
                                  {` ${
                                    new Intl.NumberFormat("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                      minimumFractionDigits: 0,
                                    }).format(
                                      values.data[index]?.lodgingAmount
                                    ) ?? "-"
                                  }`}
                                </span>
                              </Label>
                              <Input
                                type="number"
                                className="colorpicker-default"
                                name={`data[${index}].lodgingAmount`}
                                onChange={handleChange}
                                invalid={
                                  errors?.data?.[index]?.lodgingAmount &&
                                  touched?.data?.[index]?.lodgingAmount
                                }
                                value={values.data[index]?.lodgingAmount}
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
                            value={values.dateOfLetter}
                            onChange={(date) => {
                              setFieldValue(
                                "dateOfLetter",
                                moment(date[0]).toISOString()
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
