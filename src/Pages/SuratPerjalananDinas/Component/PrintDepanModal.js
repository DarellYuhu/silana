import React from "react";
import { Button, Col, Input, Modal, Row } from "reactstrap";

const data = [
  {
    name: "Daniel Hamonangan, S.Kom, M.Sc",
  },
  {
    name: "Ir. Ronny Sumilat",
  },
  {
    name: "Frans Besauw",
  },
  {
    name: "Edwin Hati",
  },
  {
    name: "Daniel Hamonangan, S.Kom, M.Sc",
  },
];

const PrintDepanModal = ({ open, setOpen }) => {
  return (
    <Modal
      centered
      isOpen={open}
      toggle={() => setOpen(!open)}
      scrollable={true}
    >
      <div className="modal-header d-flex justify-content-center bg-info">
        <h5 className="modal-title mt-0 text-white">PRINT SPD DEPAN</h5>
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
          {data.map((item, index) => (
            <button key={index} className="m-2 btn btn-rounded btn-primary">
              {item.name}
            </button>
          ))}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PrintDepanModal;
