import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Datatables = ({ item, handleEditClick = () => {} }) => {
  const navigate = useNavigate();
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No.</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: "50px",
    },
    {
      name: <span className="font-weight-bold fs-13">Ketua Tim</span>,
      selector: (row) => row.ketuaTim,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">Nomor Surat</span>,
      selector: (row) => row.noSurat,
      sortable: true,
      width: "150px",
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal</span>,
      selector: (row) => row.tanggal,
      sortable: true,
      width: "260px",
    },
    {
      name: <span className="font-weight-bold fs-13">Tugas</span>,
      selector: (row) => row.tugas,
      sortable: true,
      width: "300px",
      wrap: true,
      style: {
        padding: "10px 0px",
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: false,
      cell: (_, index) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <div className="dropdown-header noti-title">
                <h5 className="font-size-13 text-muted text-truncate mn-0">
                  Cetak
                </h5>
              </div>
              <DropdownItem onClick={handleEditClick} href="#!">
                <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
                Depan
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  navigate(`/surat-perjalanan-dinas/${index}/print-belakang`)
                }
                className="remove-item-btn"
              >
                {" "}
                <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
                Belakang{" "}
              </DropdownItem>
              <div
                className="dropdown-divider"
                style={{ height: "2px", backgroundColor: "darkgrey" }}
              ></div>
              <EditButton path={index} />
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={item}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="500px"
      customStyles={{
        cells: {
          style: {
            width: 100,
          },
        },
      }}
    />
  );
};

const EditButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <DropdownItem
      onClick={() => navigate(`/surat-perjalanan-dinas/${path}`)}
      className="edit-item-btn"
    >
      <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
      Edit
    </DropdownItem>
  );
};

export default Datatables;
