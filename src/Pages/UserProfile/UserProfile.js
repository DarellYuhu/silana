import { Fragment } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  Label,
  CardHeader,
  CardFooter,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

const UserProfile = () => {
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Pengaturan" breadcrumbItem="Pengaturan Akun" />

          <Card>
            <CardBody>
              <CardHeader className="bg-transparent px-0 py-2">
                <h5 className="fs-3">Ubah Personalisasi</h5>
              </CardHeader>
              <Col md={12} className="d-grid gap-3">
                <CardBody className="p-0 px-1">
                  <CardTitle>Nama Lengkap</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="text"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder=""
                    />
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>NIP</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="text"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder=""
                    />
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>Jabatan</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="text"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder=""
                      // disabled
                      //   onClick={() => setOpen(!open)}
                    />
                  </CardBody>
                </CardBody>
              </Col>
              <button className="btn btn-info mt-4">Simpan Perubahan</button>
            </CardBody>
            <div style={{ height: 0.5, backgroundColor: "darkgray" }} />
            <CardBody>
              <CardHeader className="bg-transparent px-0 py-2">
                <h5 className="fs-3">Ubah Sandi</h5>
              </CardHeader>
              <Col md={12} className="d-grid gap-3">
                <CardBody className="p-0 px-1">
                  <CardTitle>Sandi Lama</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="password"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder=""
                    />
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>Sandi Baru</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="password"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder=""
                    />
                  </CardBody>
                </CardBody>
                <CardBody className="p-0 px-1">
                  <CardTitle>Konfirmasi Sandi Baru</CardTitle>
                  <CardBody className="p-0">
                    <Input
                      type="password"
                      className="colorpicker-default"
                      // value={color}
                      // onClick={() => {
                      //   setsimple_color(!simple_color);
                      // }}
                      // readOnly
                      placeholder=""
                      // disabled
                      //   onClick={() => setOpen(!open)}
                    />
                  </CardBody>
                </CardBody>
              </Col>
              <button className="btn btn-info mt-4">Simpan Perubahan</button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

export default UserProfile;
