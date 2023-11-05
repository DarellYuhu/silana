import { Fragment } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables, EditAnggaranModal, TambaAnggaranModal } from "./Component";
import { signal } from "@preact/signals-react";

const data = [...Array(17).keys()].map((item) => ({
  kodeAnggaran: "3331.FBA.002.248.A.524111",
  deskripsi: "Penguatan Tata kelola Rumah Data Kependudukan",
  jumlahAnggaran: "200000",
}));

const tambahModal = signal(false);
const editModal = signal(false);

const Anggaran = () => {
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <h2 className="page-title-box mb-0 font-size-18">
                DATA ANGGARAN
              </h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-info btn-lg waves-effect waves-light"
                onClick={() => (tambahModal.value = true)}
              >
                Tambah Anggaran
              </button>
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
                          Tabel Data Anggaran
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
                              handleEditClick={() => (editModal.value = true)}
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
        <TambaAnggaranModal modal={tambahModal} />
        <EditAnggaranModal modal={editModal} />
      </div>
    </Fragment>
  );
};

export default Anggaran;
