import { Fragment, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables } from "./Component";
import axiosClient from "../../helpers/axiosClient";
import { AxiosAlert, TableSkeleton } from "../../components/Custom";
import { signal } from "@preact/signals-react";
import { debounce } from "lodash";

const error = signal(null);

const Perincian = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const filteredData = () => {
    return data?.filter(
      (item) =>
        item.dictum[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.letterNumber?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = useMemo(() => {
    return debounce(handleChange, 300);
  });

  const getData = async () => {
    try {
      const { data } = await axiosClient.get("nominative");
      setData(data);
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      setLoading(false);
    }
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
              <h2 className="page-title-box mb-0 font-size-18">PERINCIAN</h2>
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
                          Tabel Perincian
                        </h2>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end gap-2">
                          <div className="search-box ms-2">
                            {/* <i className="ri-search-line search-icon"></i> */}
                            <input
                              type="text"
                              onChange={handleSearch}
                              className="form-control search"
                              placeholder="Cari No Surat/Ketua..."
                              aria-label="Search"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={12}>
                        <Card>
                          <CardBody>
                            <Datatables item={filteredData()} />
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
        message={error.value}
        open={error.value && true}
        severity={"error"}
        setOpen={(val) => (error.value = val)}
      />
    </Fragment>
  );
};

export default Perincian;
