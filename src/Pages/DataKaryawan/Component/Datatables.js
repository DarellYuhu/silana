import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Datatables = ({ item, handleEditClick = () => {} }) => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No.</span>,
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Nama</span>,
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">NIP</span>,
      selector: (row) => row.nip,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Golongan</span>,
      selector: (row) => row.golongan,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jabatan</span>,
      selector: (row) => row.jabatan,
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
              <DropdownItem onClick={handleEditClick} className="edit-item-btn">
                <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
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

export default Datatables;
