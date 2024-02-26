import moment from "moment";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { formatLetterNumber } from "../../../Utility";
import { NoLetterNumber } from "../../../components/Custom";

const Datatables = ({ item }) => {
  return (
    <DataTable
      columns={columns}
      fixedHeader
      fixedHeaderScrollHeight="500px"
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

const columns = [
  {
    name: <span className="font-weight-bold fs-13">No.</span>,
    selector: (row, index) => index + 1,
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
    selector: (row) =>
      row.letterNumber ? (
        formatLetterNumber(row.letterNumber)
      ) : (
        <NoLetterNumber />
      ),
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
    width: "260px",
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
      return (
        <UncontrolledDropdown className="dropdown d-inline-block">
          <DropdownToggle
            className="btn btn-soft-secondary btn-sm"
            tag="button"
          >
            <i className="ri-more-fill align-middle"></i>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <Link
              to={`/nominatif/${row.id}/print`}
              target="_blank"
              onClick={() =>
                localStorage.setItem("printNominative", JSON.stringify(row))
              }
            >
              <DropdownItem>
                <i className="mdi mdi-printer align-bottom me-2 text-muted"></i>
                Cetak
              </DropdownItem>
            </Link>
            <Link to={`/nominatif/${row.id}`} state={row}>
              <DropdownItem className="edit-item-btn">
                <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
                Edit
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    },
  },
];

export default Datatables;
