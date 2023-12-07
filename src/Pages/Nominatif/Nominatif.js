import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables } from "./Component";
import axiosClient from "../../helpers/axiosClient";
import { AxiosAlert, TableSkeleton } from "../../components/Custom";

const Nominatif = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const getLetters = async () => {
    try {
      const res = await axiosClient.get("/nominative");
      setData(res.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLetters();
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
              <h2 className="page-title-box mb-0 font-size-18">NOMINATIF</h2>
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
                          Tabel Surat Nominatif
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
                            <Datatables item={data} />
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

export default Nominatif;
