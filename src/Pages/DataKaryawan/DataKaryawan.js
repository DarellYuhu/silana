import { Fragment, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import {
  Datatables,
  EditKaryawanModal,
  TambahKaryawanModal,
} from "./Component";
import { signal } from "@preact/signals-react";
import axiosClient from "../../helpers/axiosClient";
import { TableSkeleton } from "../../components/Custom";
import { debounce } from "lodash";
import Swal from "sweetalert2";

const tambahModal = signal(false);
const editModal = signal(false);
const editData = signal({});

const DataKaryawan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const filteredData = () => {
    return data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.classRank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
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
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEmployees();
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
                            <Datatables
                              item={filteredData()}
                              handleEditClick={(user) => {
                                editData.value = user;
                                editModal.value = true;
                              }}
                              handleDeleteClick={async (user) => {
                                try {
                                  const alertRes = await Swal.fire({
                                    title: "Apakah anda yakin ingin menghapus?",
                                    text: "Data karyawan yang dihapus tidak dapat dikembalikan!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Ya, hapus",
                                    cancelButtonText: "Batal",
                                  });
                                  if (!alertRes.isConfirmed) {
                                    return;
                                  }
                                  Swal.fire({
                                    title: "Loading...",
                                    text: "Sedang memproses data",
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    didOpen: () => {
                                      Swal.showLoading();
                                    },
                                  });
                                  await axiosClient.delete(
                                    `employees/${user.id}`
                                  );
                                  Swal.fire({
                                    title: "Sukses!",
                                    text: "Karyawan berhasil dihapus",
                                    icon: "success",
                                  });
                                  getEmployees();
                                } catch (error) {
                                  console.log(err);
                                  Swal.fire({
                                    title: "Error!",
                                    text: err.message,
                                    icon: "error",
                                  });
                                }
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
            Swal.fire({
              title: "Sukses!",
              text: "Karyawan berhasil ditambahkan",
              icon: "success",
            });
            getEmployees();
          }}
          onError={(err) => {
            Swal.fire({
              title: "Error!",
              text: err,
              icon: "error",
            });
          }}
        />
        <EditKaryawanModal
          modal={editModal}
          data={editData}
          onSuccess={(message) => {
            Swal.fire({
              title: "Sukses!",
              text: message,
              icon: "success",
            });
            getEmployees();
          }}
          onError={(message) =>
            Swal.fire({
              title: "Error!",
              text: message,
              icon: "error",
            })
          }
        />
      </div>
    </Fragment>
  );
};

export default DataKaryawan;
