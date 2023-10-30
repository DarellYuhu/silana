import { Col, Input, Modal, Row } from "reactstrap";

const PrintModal = ({ open, setOpen }) => {
  return (
    <Modal
      centered
      isOpen={open}
      toggle={() => setOpen(!open)}
      scrollable={true}
    >
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">NOMOR SURAT TUGAS</h5>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div>
          <i>
            Berikut ini adalah nomor surat yang telah di rekomendasikan oleh
            sistem :
          </i>

          <Row md={2}>
            <Col md={3} className="d-flex align-items-center">
              Nomor Surat:
            </Col>
            <Col md={9}>
              <Input placeholder="089/RT.01/J2/2023" />
            </Col>
          </Row>

          <h6 className="text-danger">
            *nomor surat yang anda masukan sudah digunakan
          </h6>

          <div className="py-3">
            <h6>
              Berikut ini daftar nomor yang anda bisa gunakan, selain nomor
              diatas :
            </h6>
            <ul>
              <li>123456789</li>
              <li>123456789</li>
              <li>123456789</li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            // onClick={() => setOpen(!open)}
          >
            Print No. Surat
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PrintModal;
