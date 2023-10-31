import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Datatables = ({ item }) => {
  return (
    <DataTable
      columns={columns}
      data={item}
      pagination
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

const columns = [
  {
    name: <span className="font-weight-bold fs-13">No.</span>,
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Ketua Tim</span>,
    selector: (row) => row.ketuaTim,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Nomor Surat</span>,
    selector: (row) => row.noSurat,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Tanggal</span>,
    selector: (row) => row.tanggal,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Tugas</span>,
    selector: (row) => row.tugas,
    sortable: true,
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
            <DropdownItem href="#!">
              <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
              Cetak
            </DropdownItem>
            <EditButton path={index} />
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    },
  },
];

const EditButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <DropdownItem
      onClick={() => navigate(`/kwitansi/${path}`)}
      className="edit-item-btn"
    >
      <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
      Edit
    </DropdownItem>
  );
};

export default Datatables;
