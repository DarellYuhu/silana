import { Fragment, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import {
  Datatables,
  EditKaryawanModal,
  TambahKaryawanModal,
} from "./Component";
import { signal } from "@preact/signals-react";
import axiosClient from "../../helpers/axiosClient";
import { AxiosAlert } from "../../components/Custom";
import { debounce } from "lodash";

const tambahModal = signal(false);
const editModal = signal(false);
const editData = signal({});
const success = signal(null);
const error = signal(null);

const DataKaryawan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const filteredData = () => {
    return data?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = useMemo(() => {
    return debounce(handleChange, 300);
  });

  const getEmployees = async () => {
    try {
      const { data } = await axiosClient.get("employees");
      setData(data);
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <h2 className="page-title-box mb-0 font-size-18">
                DATA KARYAWAN
              </h2>
            </Col>
            <Col className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-info btn-lg waves-effect waves-light"
                onClick={() => (tambahModal.value = true)}
              >
                Tambah Karyawan
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
                          Tabel Data Karyawan
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
                              placeholder="Cari berdasarkan nama"
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
                            <Datatables
                              item={filteredData()}
                              handleEditClick={(user) => {
                                editData.value = user;
                                editModal.value = true;
                              }}
                              handleDeleteClick={(user) => {
                                axiosClient
                                  .delete(`employees/${user.id}`)
                                  .then((res) => {
                                    success.value = "Karyawan berhasil dihapus";
                                    getEmployees();
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
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
        <TambahKaryawanModal
          modal={tambahModal}
          onSuccess={() => {
            success.value = "Karyawan berhasil ditambahkan";
            getEmployees();
          }}
          onError={(err) => {
            error.value = err;
          }}
        />
        <EditKaryawanModal
          modal={editModal}
          data={editData}
          onSuccess={(message) => {
            success.value = message;
            getEmployees();
          }}
          onError={(message) => (error.value = message)}
        />
        <AxiosAlert
          message={success.value}
          open={success.value && true}
          severity={"success"}
          setOpen={(value) => (success.value = value)}
        />
        <AxiosAlert
          message={error.value}
          open={error.value && true}
          severity={"error"}
          setOpen={(value) => (error.value = value)}
        />
      </div>
    </Fragment>
  );
};

export default DataKaryawan;
