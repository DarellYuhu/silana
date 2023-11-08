import { Breadcrumbs } from "@mui/material";
import { Fragment, useRef } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  InputGroup,
  Row,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

const EditKwitansi = () => {
  const datePickerRef = useRef(null);
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Perincian" breadcrumbItem="Edit Perincian" />
          <Card>
            <CardBody>
              <CardBody className="py-0 d-grid gap-3">
                <Row>
                  <Col md={2} className="d-flex align-items-center">
                    BPP
                  </Col>
                  <Col md={10}>
                    <Select
                      // value={selectedGroup}
                      // onChange={() => {
                      //   handleSelectGroup();
                      // }}
                      // options={anggaranOption}
                      classNamePrefix="select2-selection"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={2} className="d-flex align-items-center">
                    Pelaksana
                  </Col>
                  <Col md={10}>
                    <Select
                      // value={selectedGroup}
                      // onChange={() => {
                      //   handleSelectGroup();
                      // }}
                      // options={anggaranOption}
                      classNamePrefix="select2-selection"
                    />
                  </Col>
                </Row>
              </CardBody>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle>TANGGAL SURAT</CardTitle>
              <CardBody className="p-0 px-4">
                <InputGroup>
                  <Flatpickr
                    ref={datePickerRef}
                    defaultValue="today"
                    className="form-control d-block"
                    placeholder="dd M, yyyy"
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary docs-datepicker-trigger"
                      onClick={() => datePickerRef.current.flatpickr.toggle()}
                    >
                      <i className="fa fa-calendar" aria-hidden="true" />
                    </button>
                  </div>
                </InputGroup>
              </CardBody>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Pastikan data yang anda masukan sudah benar{" "}
                  <span className="mdi mdi-information-outline"></span>
                </label>
              </div>
              <button
                type="button"
                className="btn btn-info btn-rounded btn-lg waves-effect waves-light"
              >
                SUBMIT
              </button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

export default EditKwitansi;
