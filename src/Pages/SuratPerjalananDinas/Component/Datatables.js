import moment from "moment";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const Datatables = ({ item, handleDepanClick = () => {} }) => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No.</span>,
      selector: (_, index) => index + 1,
      sortable: true,
      width: "50px",
    },
    {
      name: <span className="font-weight-bold fs-13">Ketua Tim</span>,
      selector: (row) => row.dictum[0],
      sortable: true,
      width: "200px",
    },
    {
      name: <span className="font-weight-bold fs-13">Nomor Surat</span>,
      selector: (row) => row.letterNumber,
      sortable: true,
      width: "150px",
    },
    {
      name: <span className="font-weight-bold fs-13">Tanggal</span>,
      selector: (row) =>
        `${moment(row.startDateOftravel).format("DD MMMM YYYY")} s/d ${moment(
          row.endDateOftravel
        ).format("DD MMMM YYYY")}`,
      sortable: true,
      width: "300px",
    },
    {
      name: <span className="font-weight-bold fs-13">Tugas</span>,
      selector: (row) => row.assignedTo,
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
      cell: (row, index) => {
        console.log(row);
        return (
          <UncontrolledDropdown className="dropdown d-inline-block">
            <DropdownToggle
              className="btn btn-soft-secondary btn-sm"
              tag="button"
              caret
            >
              <i className="ri-more-fill align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <div className="dropdown-header noti-title">
                <h5 className="font-size-13 text-muted text-truncate mn-0">
                  Cetak
                </h5>
              </div>
              <DropdownItem onClick={() => handleDepanClick(row)}>
                <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
                Depan
              </DropdownItem>
              <Link
                to={`/surat-perjalanan-dinas/${row.id}/print-belakang`}
                state={{ data: row, isPrintOnly: false, values: [] }}
              >
                <DropdownItem className="remove-item-btn">
                  {" "}
                  <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
                  Belakang{" "}
                </DropdownItem>
              </Link>
              <div
                className="dropdown-divider"
                style={{ height: "2px", backgroundColor: "darkgrey" }}
              ></div>
              <Link to={`/surat-perjalanan-dinas/${row.id}`} state={row.travel}>
                <DropdownItem className="edit-item-btn">
                  <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
                  Edit Depan
                </DropdownItem>
              </Link>
              <Link
                to={`/surat-perjalanan-dinas/${row.id}/belakang`}
                state={row}
              >
                <DropdownItem className="edit-item-btn">
                  <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
                  Edit Belakang
                </DropdownItem>
              </Link>
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
        table: {
          style: {
            minHeight: "400px",
          },
        },
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
