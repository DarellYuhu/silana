import { Fragment, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables } from "./Component";
import axiosClient from "../../helpers/axiosClient";
import { debounce } from "lodash";
import Swal from "sweetalert2";

const NomorSurat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const filteredData = () => {
    return data?.filter(
      (item) =>
        item.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.letters?.assignedTo
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
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
      const { data } = await axiosClient.get("/references");
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid>
          <Col>
            <h2 className="page-title-box mb-0 font-size-18">
              DATA NOMOR SURAT
            </h2>
          </Col>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto d-flex align-items-center">
                        <h2 className="mb-0 font-size-14 fw-bold ">
                          Tabel Data Nomor Surat
                        </h2>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end gap-2">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              onChange={handleSearch}
                              className="form-control search"
                              placeholder="Search..."
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
    </Fragment>
  );
};

export default NomorSurat;
