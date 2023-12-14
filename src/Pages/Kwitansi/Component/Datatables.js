import moment from "moment";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { formatLetterNumber } from "../../../Utility";

const Datatables = ({ item }) => {
  return (
    <DataTable
      columns={columns}
      data={item}
      fixedHeader
      fixedHeaderScrollHeight="500px"
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
    selector: (row) => formatLetterNumber(row.letterNumber),
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
    name: <span className="font-weight-bold fs-13">Cetak</span>,
    sortable: false,
    cell: (row, index) => {
      return (
        <Link to={`/kwitansi/${row.id}`} state={row}>
          <button
            type="button"
            className="btn btn-outline-info waves-effect waves-light"
          >
            <i className="mdi mdi-printer align-bottom"></i>
          </button>
        </Link>
      );
    },
  },
];

export default Datatables;
