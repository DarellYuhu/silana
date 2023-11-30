import { Col, Input, Modal, Row } from "reactstrap";
import Select from "react-select";
import { computed, effect, signal, useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../../helpers/axiosClient";

const noSurat = signal("");
const kodeSurat = signal("");
const kompSurat = signal("");
const tahunSurat = signal("");
const surat = signal("");

effect(() => {
  surat.value = `${noSurat.value}/${kodeSurat.value}/${kompSurat.value}/${tahunSurat.value}`;
});

const PrintModal = ({ open, setOpen, item, setItem }) => {
  const navigate = useNavigate();

  const handlePrint = async () => {
    if (item.letterNumber) {
      navigate(`/surat-tugas/${item.id}/print`, {
        state: { letterNumber: item.letterNumber, isPrintNoOnly: true },
      });
      console.log(item);
      return;
    }
    try {
      const res = await axiosClient.patch(`letters/${item.id}`, {
        letterNumber: surat.value,
      });
      console.log(res);
      navigate(`/surat-tugas/${item.id}/print`, {
        state: { letterNumber: res.letterNumber, isPrintNoOnly: true },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(!open);
    setItem(null);
  };

  if (item?.letterNumber) {
    const parts = item?.letterNumber?.split("/");
    noSurat.value = parts[0];
    kodeSurat.value = parts[1];
    kompSurat.value = parts[2];
    tahunSurat.value = parts[3];
  }

  return (
    <Modal centered isOpen={open} toggle={handleClose} scrollable={true}>
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
        <div>
          <i>
            Berikut ini adalah nomor surat yang telah di rekomendasikan oleh
            sistem :
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
                value={noSurat.value}
                onChange={(e) => {
                  noSurat.value = e.target.value;
                }}
              />
            </Col>
          </Row>

          {/* <h6 className="text-danger">
            *nomor surat yang anda masukan sudah digunakan
          </h6> */}

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
                value={kodeSurat.value}
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
                value={{ value: kompSurat.value, label: kompSurat.value }}
                onChange={(e) => {
                  kompSurat.value = e.value;
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
                value={tahunSurat.value}
                onChange={(e) => {
                  tahunSurat.value = e.target.value;
                }}
              />
            </Col>
          </Row>

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
            type="button"
            className="btn btn-success"
            onClick={handlePrint}
          >
            Print No. Surat
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PrintModal;
