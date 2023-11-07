import React from "react";
import DataTable from "react-data-table-component";
import { Modal } from "reactstrap";

const data = [...Array(17).keys()].map((item) => ({
  kodeAnggaran: "Mary Cousar",
  deskripsi: "089/RT.01/J2/2023",
}));

const AnggaranModal = ({ open, setOpen = () => {} }) => {
  return (
    <Modal isOpen={open} toggle={() => setOpen(!open)} scrollable={true}>
      <div className="modal-header">
        <h5 className="modal-title mt-0">Tabel Anggaran Perjalanan Dinas</h5>
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
        <DataTable
          onRowClicked={(row) => console.log(row)}
          pointerOnHover
          highlightOnHover
          columns={columns}
          data={data}
          pagination
          customStyles={{
            cells: {
              style: {
                width: 100,
              },
            },
          }}
        />
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setOpen(!open)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const columns = [
  {
    name: <span className="font-weight-bold fs-13">No.</span>,
    selector: (row, index) => index + 1,
    sortable: true,
    width: "50px",
  },
  {
    name: <span className="font-weight-bold fs-13">Kode Anggaran</span>,
    selector: (row) => row.kodeAnggaran,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Deskripsi</span>,
    selector: (row) => row.deskripsi,
    sortable: true,
  },
];

export default AnggaranModal;
