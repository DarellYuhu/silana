import { Fragment, useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Datatables, EditAnggaranModal, TambaAnggaranModal } from "./Component";
import { signal } from "@preact/signals-react";
import axiosClient from "../../helpers/axiosClient";
import { AxiosAlert } from "../../components/Custom";
import { debounce } from "lodash";

const tambahModal = signal(false);
const editModal = signal(false);
const editData = signal({});
const success = signal(null);
const error = signal(null);

const Anggaran = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
      error.value = err.message;
    }
  };

  useEffect(() => {
    getAnggaran();
  }, []);
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
                                await axiosClient
                                  .delete(`budgets/${item.id}`)
                                  .then((res) => {
                                    success.value =
                                      "Berhasil menghapus anggaran";
                                    getAnggaran();
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    error.value = err.message;
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
          onSuccess={() => {
            getAnggaran();
            success.value = "Berhasil membuat anggaran";
          }}
          onError={(err) => {
            error.value = err;
          }}
        />
        <EditAnggaranModal
          modal={editModal}
          data={editData}
          onError={(item) => (error.value = item)}
          onSuccess={(item) => {
            success.value = item;
            getAnggaran();
          }}
        />
      </div>
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
    </Fragment>
  );
};

export default Anggaran;
