import { Fragment } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DataTable from "react-data-table-component";

const mailStatus = [
  {
    label: "On Process",
    value: 124,
  },
  {
    label: "Cancaled",
    value: 15,
  },
  {
    label: "Success",
    value: 50,
  },
];

const AktifitasSurat = () => {
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Silana" breadcrumbItem="Aktifitas Surat" />
          <Row md={3} className="">
            {mailStatus.map((status, index) => (
              <StatusCard key={index} item={status} />
            ))}
          </Row>
          <Card>
            <CardBody>
              <DataTable columns={columns} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

const StatusCard = ({ item }) => {
  let color;

  switch (item.label) {
    case "On Process":
      color = "text-info";
      break;
    case "Cancaled":
      color = "error";
      break;
    case "Success":
      color = "text-success";
      break;

    default:
      color = "";
  }
  return (
    <Col>
      <Card className="">
        <CardBody>
          <CardTitle>{`${item.label}`}</CardTitle>
          <h4 className={`${color}`}>{`${item.value}`}</h4>
          <h6>Surat</h6>
        </CardBody>
      </Card>
    </Col>
  );
};

const columns = [
  {
    name: <span className="font-weight-bold fs-13">No.</span>,
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Author</span>,
    selector: (row) => row.author,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Nomor Surat</span>,
    selector: (row) => row.nomorSurat,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Tanggal</span>,
    selector: (row) => row.tanggal,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Tujuan</span>,
    selector: (row) => row.tujuan,
    sortable: true,
  },
  {
    name: <span className="font-weight-bold fs-13">Status</span>,
    sortable: true,
    selector: (cell) => {
      switch (cell.status) {
        case "Re-open":
          return <span className="badge badge-soft-info"> {cell.status} </span>;
        case "On-Hold":
          return (
            <span className="badge badge-soft-secondary"> {cell.status} </span>
          );
        case "Closed":
          return (
            <span className="badge badge-soft-danger"> {cell.status} </span>
          );
        case "Inprogress":
          return (
            <span className="badge badge-soft-warning"> {cell.status} </span>
          );
        case "Open":
          return (
            <span className="badge badge-soft-primary"> {cell.status} </span>
          );
        case "New":
          return (
            <span className="badge badge-soft-success"> {cell.status} </span>
          );
        default:
          return (
            <span className="badge badge-soft-success"> {cell.status} </span>
          );
      }
    },
  },
  {
    name: <span className="font-weight-bold fs-13">Action</span>,
    sortable: true,

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
            <DropdownItem href="#!">
              <i className="ri-eye-fill align-bottom me-2 text-muted"></i>View
            </DropdownItem>
            <DropdownItem className="edit-item-btn">
              <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
              Edit
            </DropdownItem>
            <DropdownItem className="remove-item-btn">
              {" "}
              <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
              Delete{" "}
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    },
  },
];

export default AktifitasSurat;
