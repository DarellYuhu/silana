import { Form, Formik } from "formik";
import React from "react";
import { Col, Input, Modal, Row } from "reactstrap";
import axiosClient from "../../../helpers/axiosClient";
import * as Yup from "yup";
import { ErrorText } from "../../../components/Custom";

const EditSchema = Yup.object().shape({
  classRank: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
});

const EditKaryawanModal = ({
  modal,
  data,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const handleClose = () => {
    modal.value = false;
    data.value = {};
  };
  return (
    <Modal centered isOpen={modal.value} toggle={handleClose} scrollable={true}>
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">EDIT KARYAWAN</h5>
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
          initialValues={data.value}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axiosClient.patch(`employees/${values.id}`, {
                ...values,
              });
              modal.value = false;
              onSuccess("Data karyawan berhasil diubah");
            } catch (error) {
              console.log(error);
              onError(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
          validationSchema={EditSchema}
        >
          {({ handleChange, isSubmitting, errors, touched }) => (
            <Form>
              <div>
                <i>Silahkan isi data karyawan di bawah ini.</i>

                <div className="d-grid gap-3 py-3">
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Nama
                    </Col>
                    <Col md={9}>
                      <Input defaultValue={data.value.name} disabled />
                    </Col>
                  </Row>
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      NIP
                    </Col>
                    <Col md={9}>
                      <Input defaultValue={data.value.id} disabled />
                    </Col>
                  </Row>
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Golongan
                    </Col>
                    <Col md={9}>
                      <Input
                        name="classRank"
                        defaultValue={data.value.classRank}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <ErrorText
                    errors={errors.classRank}
                    touched={touched.classRank}
                  />
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Jabatan
                    </Col>
                    <Col md={9}>
                      <Input
                        name="jobTitle"
                        defaultValue={data.value.jobTitle}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <ErrorText
                    errors={errors.jobTitle}
                    touched={touched.jobTitle}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-rounded btn-secondary"
                  onClick={handleClose}
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

export default EditKaryawanModal;
