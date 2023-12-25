import { Fragment, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables, EditAnggaranModal, TambaAnggaranModal } from "./Component";
import { signal } from "@preact/signals-react";
import axiosClient from "../../helpers/axiosClient";
import { TableSkeleton } from "../../components/Custom";
import { debounce } from "lodash";
import Swal from "sweetalert2";

const tambahModal = signal(false);
const editModal = signal(false);
const editData = signal({});

const Anggaran = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const filteredData = () => {
    return data?.filter(
      (item) =>
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = useMemo(() => {
    return debounce(handleChange, 300);
  });

  const getAnggaran = async () => {
    try {
      const { data } = await axiosClient.get("budgets");
      setData(data);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        timer: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnggaran();
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
                            <input
                              type="text"
                              onChange={handleSearch}
                              className="form-control search"
                              placeholder="Cari Kode/Deskripsi"
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
                              handleEditClick={(item) => {
                                editData.value = item;
                                editModal.value = true;
                              }}
                              handleDeleteClick={async (item) => {
                                Swal.fire({
                                  title:
                                    "Anda yakin ingin menghapus anggaran ini?",
                                  text: "Anda tidak dapat mengembalikan data yang telah dihapus!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then(async (result) => {
                                  if (result.isConfirmed) {
                                    Swal.showLoading();
                                    await axiosClient
                                      .delete(`budgets/${item.id}`)
                                      .then((res) => {
                                        Swal.fire({
                                          title: "Deleted!",
                                          text: "Your file has been deleted.",
                                          icon: "success",
                                          timer: 4000,
                                        });
                                        getAnggaran();
                                      })
                                      .catch((err) => {
                                        if (err.response?.status === 409) {
                                          Swal.fire({
                                            title: "Error!",
                                            text: "Anggaran tidak dapat dihapus karena sedang digunakan dalam surat!",
                                            icon: "error",
                                            timer: 4000,
                                          });
                                          return;
                                        }
                                        Swal.fire({
                                          title: "Error!",
                                          text: err.message,
                                          icon: "error",
                                          timer: 4000,
                                        });
                                      });
                                  }
                                });
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
        <TambaAnggaranModal
          modal={tambahModal}
          onSuccess={() => getAnggaran()}
        />
        <EditAnggaranModal
          modal={editModal}
          data={editData}
          onError={(item) =>
            Swal.fire({
              title: "Error!",
              text: item,
              icon: "error",
              timer: 4000,
            })
          }
          onSuccess={(item) => {
            getAnggaran();
            Swal.fire({
              title: "Success!",
              text: item,
              icon: "success",
              timer: 4000,
            });
          }}
        />
      </div>
    </Fragment>
  );
};

export default Anggaran;
