import { CardContent, Grid } from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import axiosClient from "../../helpers/axiosClient";

const EditSuratPerjalananDinasBelakang = () => {
  const [employees, setEmployees] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  const data = useLocation().state;
  const navigate = useNavigate();
  console.log(data);

  const getEmployees = async () => {
    try {
      const res = await axiosClient.get("employees");
      console.log(res);
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
              tiba: {
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
              berangkat: {
                ke: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
            },
            {
              tiba: {
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
              berangkat: {
                ke: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
            },
            {
              tiba: {
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
              berangkat: {
                ke: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
            },
            {
              berangkat: {
                ke: "",
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
              tiba: {
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
            },
            {
              tiba: {
                tanggal: "",
                jabatan: "",
                nama: "",
                nipNik: "",
              },
            },
          ]}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 400);
            navigate(`/surat-perjalanan-dinas/${id}/print-belakang`, {
              state: { data, values, isPrintOnly: true },
            });
          }}
        >
          {({ values, handleChange, isSubmitting }) => {
            return (
              <Form>
                <Card>
                  <CardHeader style={styles.headerBackground}>
                    <h5 style={styles.header}>KOLOM I</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col
                        xs={12}
                        md={6}
                        className="d-grid gap-2"
                        style={{ visibility: "hidden" }}
                      >
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Tiba di
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            <Input
                              type="text"
                              placeholder="Masukan Lokasi"
                              name="[0].tiba.tibaDi"
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
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[0].tiba.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[0].tiba.jabatan"
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
                              name="[0].tiba.nama"
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
                              name="[0].tiba.nipNik"
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
                          <Col xs={7}>{data?.travel?.departure}</Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Ke
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>{data?.travel?.destination[0]}</Col>
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
                <Card>
                  <CardHeader style={styles.headerBackground}>
                    <h5 style={styles.header}>KOLOM II</h5>
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
                              readOnly
                              value={data?.travel?.destination[0]}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Pada Tanggal
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[0].tiba.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[0].tiba.jabatan"
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
                              name="[0].tiba.nama"
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
                              name="[0].tiba.nipNik"
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
                              readOnly
                              value={data?.travel?.destination[0]}
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
                              name="[0].berangkat.ke"
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
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[0].berangkat.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[0].berangkat.jabatan"
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
                              name="[0].berangkat.nama"
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
                              name="[0].berangkat.nipNik"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader style={styles.headerBackground}>
                    <h5 style={styles.header}>KOLOM III</h5>
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
                              readOnly
                              value={values[0].berangkat.ke}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Pada Tanggal
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[1].tiba.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[1].tiba.jabatan"
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
                              name="[1].tiba.nama"
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
                              name="[1].tiba.nipNik"
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
                              readOnly
                              value={values[0].berangkat.ke}
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
                              name="[1].berangkat.ke"
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
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[1].berangkat.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[1].berangkat.jabatan"
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
                              name="[1].berangkat.nama"
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
                              name="[1].berangkat.nipNik"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader style={styles.headerBackground}>
                    <h5 style={styles.header}>KOLOM IV</h5>
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
                              readOnly
                              value={values[1].berangkat.ke}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Pada Tanggal
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[2].tiba.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[2].tiba.jabatan"
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
                              name="[2].tiba.nama"
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
                              name="[2].tiba.nipNik"
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
                              readOnly
                              value={values[1].berangkat.ke}
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
                              name="[2].berangkat.ke"
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
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[2].berangkat.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[2].berangkat.jabatan"
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
                              name="[2].berangkat.nama"
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
                              name="[2].berangkat.nipNik"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader style={styles.headerBackground}>
                    <h5 style={styles.header}>KOLOM V</h5>
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
                              readOnly
                              value={values[2].berangkat.ke}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4} style={styles.label}>
                            Pada Tanggal
                          </Col>
                          <Col xs={1}>:</Col>
                          <Col xs={7}>
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[3].tiba.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[3].tiba.jabatan"
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
                              name="[3].tiba.nama"
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
                              name="[3].tiba.nipNik"
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
                              readOnly
                              value={values[2].berangkat.ke}
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
                              name="[3].berangkat.ke"
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
                            <Input
                              type="text"
                              placeholder="Masukan Tanggal"
                              name="[3].berangkat.tanggal"
                              onChange={handleChange}
                            />
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
                              name="[3].berangkat.jabatan"
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
                              name="[3].berangkat.nama"
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
                              name="[3].berangkat.nipNik"
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
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
