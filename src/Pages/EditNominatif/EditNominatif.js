import { Fragment, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";

const data = [
  {
    name: "Daniel Hamonangan, S.Kom, M.Sc",
  },
  {
    name: "Dinar Ariana Viestri, S.Si",
  },
  {
    name: "Ir. Ronny Sumilat",
  },
];

const EditNominatif = () => {
  const [type, setType] = useState("");

  const toRender = type === "Perorangan" ? data : data.slice(0, 1);
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Nominatif"
            breadcrumbItem="Nominatif (Rincian Transport)"
          />
          <Card>
            <CardBody>
              <CardBody className="p-0 px-1">
                <div className="mb-3">
                  <Label>Transport</Label>
                  <Select
                    // value={selectedGroup}
                    onChange={(newValue) => {
                      console.log();
                      setType(newValue.value);
                    }}
                    options={transportType}
                    classNamePrefix="select2-selection"
                  />
                </div>
              </CardBody>
            </CardBody>
          </Card>
          {toRender.map((item, index) => (
            <Card key={index}>
              <CardHeader className="bg-transparent border-bottom ">
                <h5 className="my-0">{item.name}</h5>
              </CardHeader>
              <CardBody>
                <CardTitle>TRANSPORT</CardTitle>
                <CardBody className="p-0 px-4">
                  <h6 className="card-title">
                    <i>
                      Lokal <i className="mdi mdi-car" />
                    </i>
                  </h6>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Label>Pergi</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                    <Col md={6}>
                      <Label>Pulang</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                  </Row>
                  <h6 className="card-title">
                    <i>
                      Pesawat <i className="mdi mdi-airplane" /> / Kapal{" "}
                      <i className="bx bxs-ship" />
                    </i>
                  </h6>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Label>Pergi</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                    <Col md={6}>
                      <Label>Pergi</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </CardBody>
              <CardBody className="pt-0">
                <CardTitle>LUMPSUM</CardTitle>
                <CardBody className="p-0 px-4">
                  <Row className="mb-3">
                    <Col md={6}>
                      <Label>Hari</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                    <Col md={6}>
                      <Label>Uang</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </CardBody>
              <CardBody className="pt-0">
                <CardTitle>PENGINAPAN</CardTitle>
                <CardBody className="p-0 px-4">
                  <Row className="mb-3">
                    <Col md={6}>
                      <Label>Hari</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                    <Col md={6}>
                      <Label>Uang</Label>
                      <Input
                        type="text"
                        className="colorpicker-default"
                        // value={color}
                        // onClick={() => {
                        //   setsimple_color(!simple_color);
                        // }}
                        // readOnly
                        placeholder="50000"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </CardBody>
            </Card>
          ))}
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
                className="btn btn-primary btn-rounded btn-lg waves-effect waves-light"
              >
                Cetak Surat
              </button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

const transportType = [
  {
    options: [
      { label: "Tim", value: "Tim" },
      { label: "Perorangan", value: "Perorangan" },
    ],
  },
];

export default EditNominatif;
