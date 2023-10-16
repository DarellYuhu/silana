import { Fragment, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const BuatSuratTugas = () => {
  const [menimbang, setMenimbang] = useState([{ label: "a", value: "" }]);

  const handleAddField = () => {
    // add the field label alphabetically
    const lastLabel = menimbang[menimbang.length - 1].label;
    const newLabel = String.fromCharCode(lastLabel.charCodeAt(0) + 1);
    const newField = { label: newLabel, value: "" };
    setMenimbang([...menimbang, newField]);
  };

  const handleDeleteField = (label) => {
    // remove the field
    const newMenimbang = menimbang.filter((item) => item.label !== label);
    // update label
    newMenimbang.forEach((item, index) => {
      item.label = String.fromCharCode(97 + index);
    });
    setMenimbang(newMenimbang);
  };
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Silana" breadcrumbItem="Buat Surat" />
          <Card>
            <CardBody>
              <Row md={3}>
                <Card>
                  <CardTitle>Beban</CardTitle>
                  <CardBody className="p-0">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Beban"
                    />
                  </CardBody>
                </Card>
                <Card>
                  <CardTitle>Mata Anggaran</CardTitle>
                  <CardBody className="p-0">
                    <select className="form-control">
                      <option value={""}>
                        <em>Pilih Mata Anggaran</em>
                      </option>
                      <option>3331.UBA.002.256.A.524111</option>
                      <option>3331.UBA.002.256.A.524111</option>
                      <option>3331.UBA.002.256.A.524111</option>
                    </select>
                  </CardBody>
                </Card>
                <Card>
                  <CardTitle>Kendaraan</CardTitle>
                  <CardBody className="p-0">
                    <select className="form-control">
                      <option value={""}>Pilih Kendaraan</option>
                      <option>Mobil</option>
                      <option>Kapal</option>
                      <option>Pesawat</option>
                    </select>
                  </CardBody>
                </Card>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="bg-transparent">
              <h5 className="my-0">Isi Surat</h5>
            </CardHeader>
            <CardBody>
              <CardTitle>Menimbang</CardTitle>
              <CardBody className="py-0">
                {menimbang.map((item, index) => (
                  <Row key={index} className="my-2">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-1 col-form-label d-flex align-items-center justify-content-center"
                    >
                      {item.label}
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        rows="3"
                        value={item.value}
                        onChange={(e) => {
                          const newMenimbang = [...menimbang];
                          newMenimbang[index].value = e.target.value;
                          setMenimbang(newMenimbang);
                        }}
                      />
                    </div>
                    <div className="col-md-1 d-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger waves-effect waves-light"
                        onClick={() => handleDeleteField(item.label)}
                      >
                        <i className="mdi mdi-delete-outline"></i>
                      </button>
                    </div>
                  </Row>
                ))}
              </CardBody>
            </CardBody>
            <CardFooter className="bg-transparent">
              <button
                type="button"
                className="btn btn-outline-light waves-effect"
                onClick={handleAddField}
              >
                Tambah baris baru <i className="mdi mdi-playlist-plus" />
              </button>
            </CardFooter>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

export default BuatSuratTugas;
