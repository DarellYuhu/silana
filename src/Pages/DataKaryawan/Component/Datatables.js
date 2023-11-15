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
      width: "50px",
    },
    {
      name: <span className="font-weight-bold fs-13">Nama</span>,
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">NIP</span>,
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
    },
    {
      name: <span className="font-weight-bold fs-13">Golongan</span>,
      selector: (row) => row.classRank,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Jabatan</span>,
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: false,
      width: "80px",
      cell: (item, index) => {
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                onClick={() => handleEditClick(item)}
                className="edit-item-btn"
              >
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
