import React from "react";
import { Col, Input, Modal, Row } from "reactstrap";

const EditKaryawanModal = ({ modal }) => {
  return (
    <Modal
      centered
      isOpen={modal.value}
      toggle={() => (modal.value = false)}
      scrollable={true}
    >
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">EDIT KARYAWAN</h5>
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
          <i>Silahkan isi data karyawan di bawah ini.</i>

          <div className="d-grid gap-3 py-3">
            <Row md={2}>
              <Col md={3} className="d-flex align-items-center">
                Nama
              </Col>
              <Col md={9}>
                <Input placeholder="Masukan Nama" disabled />
              </Col>
            </Row>
            <Row md={2}>
              <Col md={3} className="d-flex align-items-center">
                NIP
              </Col>
              <Col md={9}>
                <Input placeholder="Masukan NIP" disabled />
              </Col>
            </Row>
            <Row md={2}>
              <Col md={3} className="d-flex align-items-center">
                Golongan
              </Col>
              <Col md={9}>
                <Input placeholder="Masukan Golongan" />
              </Col>
            </Row>
            <Row md={2}>
              <Col md={3} className="d-flex align-items-center">
                Jabatan
              </Col>
              <Col md={9}>
                <Input placeholder="Masukan Jabatan" />
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

export default EditKaryawanModal;
