import { Col, Input, Modal, Row } from "reactstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../helpers/axiosClient";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { AxiosAlert, ErrorText } from "../../../components/Custom";

const KodeSuratSchema = Yup.object().shape({
  noSurat: Yup.string().required("Nomor Surat harus diisi"),
  kodeSurat: Yup.string().required("Kode Surat harus diisi"),
  kompSurat: Yup.string().required("Komp Surat harus diisi"),
  tahunSurat: Yup.string().required("Tahun Surat harus diisi"),
});

const PrintModal = ({ open, setOpen, item, setItem }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formik = useRef();

  const handleClose = () => {
    setOpen(!open);
    setItem(null);
  };

  return (
    <Modal
      centered
      isOpen={open}
      toggle={handleClose}
      scrollable={true}
      onOpened={() => {
        if (item.letterNumber) {
          const split = item.letterNumber.split("/");
          formik.current.setFieldValue("noSurat", split[0]);
          formik.current.setFieldValue("kodeSurat", split[1]);
          formik.current.setFieldValue("kompSurat", split[2]);
          formik.current.setFieldValue("tahunSurat", split[3]);
        }
      }}
    >
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">NOMOR SURAT TUGAS</h5>
        <button
          type="button"
          onClick={handleClose}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Formik
          innerRef={formik}
          initialValues={{
            noSurat: "",
            kodeSurat: "",
            kompSurat: "",
            tahunSurat: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const noSurat = `${values.noSurat}/${values.kodeSurat}/${values.kompSurat}/${values.tahunSurat}`;

            if (item.letterNumber) {
              navigate(`/surat-tugas/${item.id}/print`, {
                state: { letterNumber: item.letterNumber, isPrintNoOnly: true },
              });
              console.log(item);
              return;
            }
            try {
              await axiosClient.post(`references/${item.id}`, {
                code: noSurat,
              });
              navigate(`/surat-tugas/${item.id}/print`, {
                state: { letterNumber: noSurat, isPrintNoOnly: true },
              });
            } catch (error) {
              console.log(error);
              if (error.response.status === 409) {
                setError(error.response.data.message);
              } else {
                setError(error.message);
              }
            }
          }}
          validationSchema={KodeSuratSchema}
        >
          {({
            handleChange,
            setFieldValue,
            isSubmitting,
            errors,
            touched,
            values,
          }) => (
            <Form>
              <div>
                <i>
                  Berikut ini adalah nomor surat yang telah di rekomendasikan
                  oleh sistem :
                </i>

                <Row md={2}>
                  <Col md={3} className="d-flex align-items-center">
                    Nomor Surat
                  </Col>
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    :
                  </Col>
                  <Col md={8}>
                    <Input
                      name="noSurat"
                      onChange={handleChange}
                      value={values.noSurat}
                    />
                  </Col>
                </Row>
                <ErrorText errors={errors.noSurat} touched={touched.noSurat} />

                <Row md={2} style={{ marginTop: 8 }}>
                  <Col md={3} className="d-flex align-items-center">
                    Kode Surat
                  </Col>
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    :
                  </Col>
                  <Col md={8}>
                    <Input
                      name="kodeSurat"
                      onChange={handleChange}
                      value={values.kodeSurat}
                    />
                  </Col>
                </Row>
                <ErrorText
                  errors={errors.kodeSurat}
                  touched={touched.kodeSurat}
                />

                <Row md={2} style={{ marginTop: 8 }}>
                  <Col md={3} className="d-flex align-items-center">
                    Komp Surat
                  </Col>
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    :
                  </Col>
                  <Col md={8}>
                    <Select
                      name="kompSurat"
                      onChange={(newValue) =>
                        setFieldValue("kompSurat", newValue.value)
                      }
                      value={{
                        value: values.kompSurat,
                        label: values.kompSurat,
                      }}
                      options={[
                        { value: "J1", label: "J1" },
                        { value: "J2", label: "J2" },
                        { value: "J3", label: "J3" },
                        { value: "J4", label: "J4" },
                        { value: "J5", label: "J5" },
                        { value: "J6", label: "J6" },
                      ]}
                    />
                  </Col>
                </Row>
                <ErrorText
                  errors={errors.kompSurat}
                  touched={touched.kompSurat}
                />

                <Row md={2} style={{ marginTop: 8 }}>
                  <Col md={3} className="d-flex align-items-center">
                    Tahun Surat
                  </Col>
                  <Col
                    md={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    :
                  </Col>
                  <Col md={8}>
                    <Input
                      name="tahunSurat"
                      onChange={handleChange}
                      value={values.tahunSurat}
                    />
                  </Col>
                </Row>
                <ErrorText
                  errors={errors.tahunSurat}
                  touched={touched.tahunSurat}
                />

                {/* <div className="py-3">
            <h6>
              Berikut ini daftar nomor yang anda bisa gunakan, selain nomor
              diatas :
            </h6>
            <ul>
              <li>83</li>
              <li>85</li>
              <li>87</li>
            </ul>
          </div> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  Print No. Surat
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <AxiosAlert
        message={error}
        open={error}
        severity={"error"}
        setOpen={setError}
      />
    </Modal>
  );
};

export default PrintModal;
