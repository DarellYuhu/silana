import DataTable from "react-data-table-component";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Datatables = ({
  item,
  handleEditClick = () => {},
  handleDeleteClick = () => {},
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
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">Deskripsi</span>,
      selector: (row) => row.description,
      sortable: true,
      // width: "300px",
      wrap: true,
      style: {
        padding: "10px 0px",
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Jumlah Anggaran</span>,
      selector: (row) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(row.amount),
      sortable: true,
      width: "150px",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      sortable: false,
      width: "80px",
      cell: (item, _) => {
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
              <DropdownItem
                onClick={() => handleDeleteClick(item)}
                className="edit-item-btn"
              >
                <i className="mdi mdi-delete-outline align-bottom me-2 text-muted"></i>
                Delete
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
