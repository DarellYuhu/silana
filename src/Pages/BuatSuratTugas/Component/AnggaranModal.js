import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Modal } from "reactstrap";

const AnggaranModal = ({
  open,
  setOpen = () => {},
  handleRowClick = () => {},
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:2000/budgets");
      setData(res);
    };
    fetchData();
  }, []);
  return (
    <Modal
      isOpen={open}
      size="lg"
      toggle={() => setOpen(!open)}
      scrollable={true}
    >
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

export default AnggaranModal;
