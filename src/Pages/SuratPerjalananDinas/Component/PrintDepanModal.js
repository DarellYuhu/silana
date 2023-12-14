import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "reactstrap";

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

const PrintDepanModal = ({ open, setOpen, data }) => {
  const navigate = useNavigate();
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
          {data?.dictum?.map((item, index) => (
            <Link
              key={index}
              target="_blank"
              to={`/surat-perjalanan-dinas/${data.id}/print-depan`}
              onClick={() =>
                localStorage.setItem(
                  "printSpdDepan",
                  JSON.stringify({ data, selectedPerson: item })
                )
              }
              className="m-2 btn btn-rounded btn-primary"
            >
              {item}
            </Link>
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
