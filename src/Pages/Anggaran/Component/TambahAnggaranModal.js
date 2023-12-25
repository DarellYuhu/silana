import { Form, Formik } from "formik";
import { Col, Input, Modal, Row } from "reactstrap";
import axiosClient from "../../../helpers/axiosClient";
import * as Yup from "yup";
import { ErrorText } from "../../../components/Custom";
import Swal from "sweetalert2";

const AnggaranSchema = Yup.object().shape({
  id: Yup.string().required("Kode Anggaran harus diisi!"),
  description: Yup.string().required("Deskripsi harus diisi!"),
  amount: Yup.number()
    .required("Jumlah Anggaran harus diisi!")
    .positive("Jumlah Anggaran harus positif!"),
});

const TambaAnggaranModal = ({ modal, onSuccess = () => {} }) => {
  return (
    <Modal
      centered
      isOpen={modal.value}
      toggle={() => (modal.value = false)}
      scrollable={true}
    >
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">TAMBAH ANGGARAN</h5>
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
      <Formik
        initialValues={{ id: "", description: "", amount: 0 }}
        onSubmit={async (values, { setSubmitting }) => {
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
            await axiosClient.post("budgets", {
              ...values,
            });
            modal.value = false;
            Swal.fire({
              title: "Success!",
              text: "Data berhasil ditambahkan.",
              icon: "success",
              timer: 4000,
            });
            onSuccess();
          } catch (error) {
            console.log(error.message);
            if (error.response?.status === 409) {
              Swal.fire({
                title: "Error!",
                text: "Kode anggaran sudah ada!",
                icon: "error",
                timer: 4000,
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                timer: 4000,
              });
            }
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={AnggaranSchema}
      >
        {({
          handleChange,
          isSubmitting,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div>
                <i>Silahkan isi data anggaran di bawah ini.</i>

                <div className="d-grid gap-3 py-3">
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Kode Anggaran
                    </Col>
                    <Col md={9}>
                      <Input
                        name="id"
                        placeholder="Masukan Kode Anggaran"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <ErrorText errors={errors.id} touched={touched.id} />

                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Deskripsi
                    </Col>
                    <Col md={9}>
                      <Input
                        name="description"
                        type="textarea"
                        placeholder="Masukan Deskripsi"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <ErrorText
                    errors={errors.description}
                    touched={touched.description}
                  />

                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Jumlah Anggaran
                    </Col>
                    <Col md={9}>
                      <Input
                        name="amount"
                        placeholder="Masukan Anggaran"
                        type="number"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(values.amount) ?? "-"}
                  <ErrorText errors={errors.amount} touched={touched.amount} />
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
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default TambaAnggaranModal;
