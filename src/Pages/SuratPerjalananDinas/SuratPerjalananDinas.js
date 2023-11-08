import { Fragment, useRef, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables, PrintDepanModal } from "./Component";

const data = [...Array(17).keys()].map((item) => ({
  ketuaTim: "Mary Cousar",
  noSurat: "089/RT.01/J2/2023",
  tanggal: "6 Agustus 2023 s/d 8 Agustus 2023",
  tugas:
    "Melaksanakan perjalanan dinas Pemberdayaan Kelompok Masyarakat di Kampung KB dalam rangka Percepatan  Penurunan Stunting di Kabupaten Kepulauan Sangihe",
}));

const SuratPerjalananDinas = () => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <h2 className="page-title-box mb-0 font-size-18">
                SURAT PERJALANAN DINAS
              </h2>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto d-flex align-items-center">
                        <h2 className="mb-0 font-size-14 fw-bold ">
                          Tabel Surat Perjalanan Dinas
                        </h2>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end gap-2">
                          <div className="search-box ms-2">
                            {/* <i className="ri-search-line search-icon"></i> */}
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <Card>
                          <CardBody>
                            <Datatables
                              item={data}
                              handleEditClick={() => setOpen(!open)}
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    {/* <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <PrintDepanModal open={open} setOpen={setOpen} />
      </div>
    </Fragment>
  );
};

export default SuratPerjalananDinas;
