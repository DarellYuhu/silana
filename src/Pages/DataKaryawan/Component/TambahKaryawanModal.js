import { Form, Formik } from "formik";
import React from "react";
import { Col, Input, Modal, Row } from "reactstrap";
import axiosClient from "../../../helpers/axiosClient";

const TambahKaryawanModal = ({ modal }) => {
  return (
    <Modal
      centered
      isOpen={modal.value}
      toggle={() => (modal.value = false)}
      scrollable={true}
    >
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">TAMBAH KARYAWAN</h5>
        <button
          type="button"
          onClick={() => (modal.value = false)}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Formik
          initialValues={{
            id: "",
            name: "",
            jobTitle: "",
            classRank: "",
            password: "12345",
            roles: ["user"],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axiosClient.post("employees", {
                ...values,
              });
              modal.value = false;
            } catch (error) {
              console.log(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <div>
                <i>Silahkan isi data karyawan di bawah ini.</i>

                <div className="d-grid gap-3 py-3">
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Nama
                    </Col>
                    <Col md={9}>
                      <Input
                        name="name"
                        placeholder="Masukan Nama"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      NIP
                    </Col>
                    <Col md={9}>
                      <Input
                        name="id"
                        placeholder="Masukan NIP"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Golongan
                    </Col>
                    <Col md={9}>
                      <Input
                        name="classRank"
                        placeholder="Masukan Golongan"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Jabatan
                    </Col>
                    <Col md={9}>
                      <Input
                        name="jobTitle"
                        placeholder="Masukan Jabatan"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-rounded btn-secondary"
                  onClick={() => (modal.value = false)}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="btn btn-rounded btn-success"
                  disabled={isSubmitting}
                >
                  Selesai
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default TambahKaryawanModal;
