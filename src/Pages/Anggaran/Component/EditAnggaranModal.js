import { Form, Formik } from "formik";
import { Col, Input, Modal, Row } from "reactstrap";
import axiosClient from "../../../helpers/axiosClient";
import * as Yup from "yup";
import { ErrorText } from "../../../components/Custom";
import Swal from "sweetalert2";

const AnggaranSchema = Yup.object().shape({
  description: Yup.string().required("Deskripsi harus diisi!"),
  amount: Yup.number()
    .required("Jumlah Anggaran harus diisi!")
    .positive("Jumlah Anggaran harus positif!"),
});

const EditAnggaranModal = ({
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
        <h5 className="modal-title mt-0 text-white">EDIT ANGGARAN</h5>
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
      <Formik
        initialValues={data.value}
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
            await axiosClient.patch(`budgets/${values.id}`, {
              ...values,
            });
            modal.value = false;
            onSuccess("Anggaran berhasil diubah!");
          } catch (error) {
            console.log(error);
            if (error.response?.data?.message) {
              onError(error.response.data.message);
            }
            onError(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={AnggaranSchema}
      >
        {({
          handleChange,
          handleSubmit,
          isSubmitting,
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
                      <Input defaultValue={data.value.id} disabled />
                    </Col>
                  </Row>
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Deskripsi
                    </Col>
                    <Col md={9}>
                      <Input
                        name="description"
                        defaultValue={data.value.description}
                        type="textarea"
                        placeholder="Masukan Deskripsi"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <ErrorText
                    errors={errors.description}
                    touched={errors.description}
                  />
                  <Row md={2}>
                    <Col md={3} className="d-flex align-items-center">
                      Jumlah Anggaran
                    </Col>
                    <Col md={9}>
                      <Input
                        name="amount"
                        defaultValue={data.value.amount}
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
                  <ErrorText errors={errors.amount} touched={errors.amount} />
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
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditAnggaranModal;
