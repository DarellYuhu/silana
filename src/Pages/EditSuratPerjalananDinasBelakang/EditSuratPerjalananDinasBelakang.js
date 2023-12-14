import { Form, Formik } from "formik";
import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  InputGroup,
} from "reactstrap";
import axiosClient from "../../helpers/axiosClient";
import Flatpickr from "react-flatpickr";

const EditSuratPerjalananDinasBelakang = () => {
  const [employees, setEmployees] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const datePickerRef = useRef(null);
  const data = useLocation().state;
  const { id } = useParams();

  const getEmployees = async () => {
    try {
      const res = await axiosClient.get("employees");
      setEmployees(res.data);
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
        <h2 style={{ marginBottom: "0" }}>
          EDIT SURAT PERJALANAN DINAS BELAKANG
        </h2>
        <p>
          <i>
            Laman dikhususkan hanya untuk mengedit Surat Perjalanan Dinas, yang
            sudah selesai ditandatangani oleh pihak yang sudah di tentukan.
          </i>
        </p>
        <Formik
          initialValues={[
            {
              berangkat: {
                ke: "",
              },
            },
            {
              tiba: {
                di: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
              berangkat: {
                dari: "",
                ke: "",
                tanggal: "",
              },
            },
            {
              tiba: {
                di: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
              berangkat: {
                dari: "",
                ke: "",
                tanggal: "",
              },
            },
            {
              tiba: {
                di: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
              berangkat: {
                dari: "",
                ke: "",
                tanggal: "",
              },
            },
            {
              tiba: {
                di: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
            },
          ]}
          onSubmit={(values, { setSubmitting }) => {
            localStorage.setItem(
              "printSpdBelakang",
              JSON.stringify({ data, values, isPrintOnly: true })
            );
            window.open(
              `/surat-perjalanan-dinas/${id}/print-belakang`,
              "_blank"
            );
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, isSubmitting, setFieldValue }) => {
            return (
              <Form>
                <Card>
                  <CardHeader style={styles.headerBackground}>
                    <h5 style={styles.header}>KOLOM 1</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col
                        xs={12}
                        md={6}
                        className="d-grid gap-2"
                        style={{ visibility: "hidden" }}
                      >
                        hidden
                      </Col>
                      <Col xs={12} md={6} className="d-grid gap-2">
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Berangkat dari
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>{data?.travel?.departure}</Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Ke
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            <Input
                              type="text"
                              placeholder="Masukan Lokasi"
                              name="[0].berangkat.ke"
                              onChange={(e) => {
                                setFieldValue(
                                  "[0].berangkat.ke",
                                  e.target.value
                                );
                                setFieldValue("[1].tiba.di", e.target.value);
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Pada Tanggal
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            {moment(data?.travel?.startDateOftravel)
                              .locale("id")
                              .format("DD MMMM")}
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Jabatan
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>Pejabat Pembuat Komitmen</Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Nama
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>{data?.travel?.commitmentMaker}</Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            NIP/NIK
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            {
                              employees.find(
                                (item) =>
                                  item.name === data?.travel?.commitmentMaker
                              )?.id
                            }
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {Array.from(Array(4).keys()).map((_, index) => (
                  <Card key={index}>
                    <CardHeader style={styles.headerBackground}>
                      <h5 style={styles.header}>{`KOLOM ${index + 2}`}</h5>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col xs={12} md={6} className="d-grid gap-2">
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Tiba di
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                placeholder="Masukan Lokasi"
                                name={`[${index + 1}].tiba.di`}
                                value={values[index + 1].tiba.di}
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Pada Tanggal
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <InputGroup>
                                <Flatpickr
                                  ref={datePickerRef}
                                  className="form-control d-block"
                                  placeholder="dd M yyyy"
                                  options={{
                                    altInput: true,
                                    altFormat: "j F Y",
                                  }}
                                  onChange={(date) => {
                                    setFieldValue(
                                      `[${index + 1}].tiba.tanggal`,
                                      date[0].toISOString()
                                    );
                                  }}
                                />
                                <div className="input-group-append">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary docs-datepicker-trigger"
                                    style={{ zIndex: 0 }}
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
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Jabatan
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                placeholder="Masukan Jabatan"
                                name={`[${index + 1}].tiba.jabatan`}
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Nama
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                placeholder="Masukan Nama"
                                name={`[${index + 1}].tiba.nama`}
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              NIP/NIK
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                placeholder="Masukan NIP/NIK"
                                name={`[${index + 1}].tiba.nipNik`}
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={12} md={6} className="d-grid gap-2">
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Berangkat dari
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                placeholder="Masukan Lokasi"
                                name={`[${index + 1}].berangkat.dari`}
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Ke
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                placeholder="Masukan Lokasi"
                                name={`[${index + 1}].berangkat.ke`}
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Pada Tanggal
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <InputGroup>
                                <Flatpickr
                                  ref={datePickerRef}
                                  className="form-control d-block"
                                  placeholder="dd M yyyy"
                                  options={{
                                    altInput: true,
                                    altFormat: "j F Y",
                                  }}
                                  onChange={(date) => {
                                    setFieldValue(
                                      `[${index + 1}].berangkat.tanggal`,
                                      date[0].toISOString()
                                    );
                                  }}
                                />
                                <div className="input-group-append">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary docs-datepicker-trigger"
                                    style={{ zIndex: 0 }}
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
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Jabatan
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                readOnly
                                value={values[index + 1].tiba.jabatan}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              Nama
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                readOnly
                                value={values[index + 1].tiba.nama}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={4} style={styles.label}>
                              NIP/NIK
                            </Col>
                            <Col xs={1}>:</Col>
                            <Col xs={7}>
                              <Input
                                type="text"
                                readOnly
                                value={values[index + 1].tiba.nipNik}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                ))}

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
              </Form>
            );
          }}
        </Formik>
      </div>
    </Fragment>
  );
};

const styles = {
  label: { fontWeight: "bold" },
  headerBackground: {
    backgroundColor: "white",
    borderBottom: "1px solid #DDDDDD",
  },
  header: { fontWeight: "bold", margin: 0 },
};

export default EditSuratPerjalananDinasBelakang;
