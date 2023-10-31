import { Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";

const EditPerincian = () => {
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Perincian" breadcrumbItem="Edit Perincian" />
          <Card>
            <CardBody>
              <CardTitle>Yang Telah Dibayar Semula</CardTitle>
              <CardBody className="p-0 px-1">
                <div className="mb-3 d-flex">
                  {/* <Label>Warna Bar</Label> */}
                  <Input
                    type="text"
                    className="colorpicker-default"
                    // value={color}
                    // onClick={() => {
                    //   setsimple_color(!simple_color);
                    // }}
                    // readOnly
                    placeholder="50000"
                    // disabled
                  />
                  <Button disabled>Rupiah</Button>
                </div>
              </CardBody>
            </CardBody>
            <CardBody className="pt-0">
              <CardBody className="pt-0 d-grid gap-3">
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

export default EditPerincian;
