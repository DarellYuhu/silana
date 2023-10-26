import DataTable from "react-data-table-component";
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
    cell: () => {
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
            <DropdownItem href="#!">
              <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
              Depan
            </DropdownItem>
            <DropdownItem className="remove-item-btn">
              {" "}
              <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
              Belakang{" "}
            </DropdownItem>
            <div
              className="dropdown-divider"
              style={{ height: "2px", backgroundColor: "darkgrey" }}
            ></div>
            <DropdownItem className="edit-item-btn">
              <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
              Edit
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    },
  },
];

export default Datatables;
