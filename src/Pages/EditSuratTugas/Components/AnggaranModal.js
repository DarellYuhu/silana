import DataTable from "react-data-table-component";
import { Modal } from "reactstrap";

const AnggaranModal = ({
  open,
  setOpen = () => {},
  handleRowClick = () => {},
  data,
}) => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No.</span>,
      selector: (_, index) => index + 1,
      sortable: true,
      width: "50px",
    },
    {
      name: <span className="font-weight-bold fs-13">Kode Anggaran</span>,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Deskripsi</span>,
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Anggaran Tersedia</span>,
      selector: (row) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(row.amount),
      sortable: true,
    },
  ];

  return (
    <Modal
      isOpen={open}
      size="lg"
      toggle={() => setOpen(false)}
      scrollable={true}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">Tabel Anggaran Perjalanan Dinas</h5>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <DataTable
          onRowClicked={handleRowClick}
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
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AnggaranModal;
