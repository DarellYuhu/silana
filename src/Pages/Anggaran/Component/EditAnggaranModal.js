import { Col, Input, Modal, Row } from "reactstrap";

const EditAnggaranModal = ({ modal }) => {
  return (
    <Modal
      centered
      isOpen={modal.value}
      toggle={() => (modal.value = false)}
      scrollable={true}
    >
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">EDIT ANGGARAN</h5>
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
        <div>
          <i>Silahkan isi data anggaran di bawah ini.</i>

          <div className="d-grid gap-3 py-3">
            <Row md={2}>
              <Col md={3} className="d-flex align-items-center">
                Kode Anggaran
              </Col>
              <Col md={9}>
                <Input placeholder="Masukan Kode Anggaran" disabled />
              </Col>
            </Row>
            <Row md={2}>
              <Col md={3} className="d-flex align-items-center">
                Deskripsi
              </Col>
              <Col md={9}>
                <Input type="textarea" placeholder="Masukan Deskripsi" />
              </Col>
            </Row>
            <Row md={2}>
              <Col md={3} className="d-flex align-items-center">
                Jumlah Anggaran
              </Col>
              <Col md={9}>
                <Input placeholder="Masukan Anggaran" type="number" />
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
            type="button"
            className="btn btn-rounded btn-success"
            // onClick={() => (modal.value = false)}
          >
            Selesai
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditAnggaranModal;
