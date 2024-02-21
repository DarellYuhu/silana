import { debounce } from "lodash";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Modal } from "reactstrap";

const AnggaranModal = ({
  open,
  setOpen = () => {},
  handleRowClick = () => {},
  data,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = () => {
    return data?.filter(
      (item) =>
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = useMemo(() => {
    return debounce(handleChange, 300);
  });

  const handleClose = () => {
    setOpen(!open);
    setSearchQuery("");
  };

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
    <Modal isOpen={open} size="lg" toggle={handleClose} scrollable={true}>
      <div className="modal-header">
        <h5 className="modal-title mt-0">Tabel Anggaran Perjalanan Dinas</h5>
        <div className="d-flex justify-content-sm-end gap-2 me-4">
          <div className="search-box ms-2">
            <input
              type="text"
              onChange={handleSearch}
              className="form-control search"
              placeholder="Cari Kode/Deskripsi"
              aria-label="Search"
            />
          </div>
        </div>
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
        <DataTable
          onRowClicked={(data) => {
            handleRowClick(data);
            setSearchQuery("");
          }}
          pointerOnHover
          highlightOnHover
          columns={columns}
          data={filteredData()}
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
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AnggaranModal;
