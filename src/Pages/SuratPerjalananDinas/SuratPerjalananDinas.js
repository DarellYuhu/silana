import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables, PrintDepanModal } from "./Component";
import axiosClient from "../../helpers/axiosClient";
import { AxiosAlert, TableSkeleton } from "../../components/Custom";

const SuratPerjalananDinas = () => {
  const [selectedData, setSelectedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = () => {
    axiosClient
      .get("travels")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

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
                              handleDepanClick={(item) => {
                                setSelectedData(item);
                                setOpen(!open);
                              }}
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <PrintDepanModal open={open} setOpen={setOpen} data={selectedData} />
      </div>

      <AxiosAlert
        message={error}
        open={error}
        severity={"error"}
        setOpen={setError}
      />
    </Fragment>
  );
};

export default SuratPerjalananDinas;
