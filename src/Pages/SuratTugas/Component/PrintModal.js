import { Col, Input, Modal, Row } from "reactstrap";
import Select from "react-select";
import { computed, effect, signal, useSignal } from "@preact/signals-react";
import { useEffect } from "react";

const noSurat = signal("");
const kodeSurat = signal("");
const kompSurat = signal("");
const tahunSurat = signal("");
const surat = signal("");

effect(() => {
  surat.value = `${noSurat.value}/${kodeSurat.value}/${kompSurat.value}/${tahunSurat.value}`;
});

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
              Nomor Surat
            </Col>
            <Col md={1}>:</Col>
            <Col md={8}>
              <Input
                placeholder="089"
                onChange={(e) => {
                  noSurat.value = e.target.value;
                }}
              />
            </Col>
          </Row>

          <h6 className="text-danger">
            *nomor surat yang anda masukan sudah digunakan
          </h6>

          <Row md={2}>
            <Col md={3} className="d-flex align-items-center">
              Kode Surat
            </Col>
            <Col md={1}>:</Col>
            <Col md={8}>
              <Input
                placeholder="RT.01"
                onChange={(e) => {
                  kodeSurat.value = e.target.value;
                }}
              />
            </Col>
          </Row>

          <Row md={2} style={{ marginTop: 8 }}>
            <Col md={3} className="d-flex align-items-center">
              Komp Surat
            </Col>
            <Col md={1}>:</Col>
            <Col md={8}>
              <Select
                onChange={(e) => {
                  kompSurat.value = e.value;
                }}
                placeholder="J2"
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

          <Row md={2} style={{ marginTop: 8 }}>
            <Col md={3} className="d-flex align-items-center">
              Tahun Surat
            </Col>
            <Col md={1}>:</Col>
            <Col md={8}>
              <Input
                placeholder="2023"
                onChange={(e) => {
                  tahunSurat.value = e.target.value;
                }}
              />
            </Col>
          </Row>

          <div className="py-3">
            <h6>
              Berikut ini daftar nomor yang anda bisa gunakan, selain nomor
              diatas :
            </h6>
            <ul>
              <li>83</li>
              <li>85</li>
              <li>87</li>
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
