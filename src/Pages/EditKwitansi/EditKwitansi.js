import { Breadcrumbs } from "@mui/material";
import { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Select from "react-select";

const EditKwitansi = () => {
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
                    Bendahara
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
                    Penerima
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
