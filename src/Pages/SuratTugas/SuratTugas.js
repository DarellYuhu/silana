import { TablePagination } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { PrintModal } from "./Component";
import moment from "moment";
import axiosClient from "../../helpers/axiosClient";
import { AxiosAlert, TableSkeleton } from "../../components/Custom";
import { signal } from "@preact/signals-react";

const error = signal(null);
const success = signal(null);

const SuratTugas = () => {
  const [letterNumber, setLetterNumber] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePrintNoSurat = (item) => {
    setLetterNumber(item);
    setOpen(true);
  };

  const getData = () => {
    axiosClient
      .get("letters")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        error.value = err.message;
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
        <Row className="mb-3">
          <Col>
            <h2 className="page-title-box mb-0 font-size-18">SURAT TUGAS</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-info btn-lg waves-effect waves-light"
              onClick={() => navigate("/surat-tugas/buat-surat")}
            >
              Buat Surat
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
                        TABLE SURAT TUGAS
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

                  <div className="table-responsive table-card mt-3 mb-1">
                    <table
                      className="table align-middle table-nowrap"
                      id="customerTable"
                    >
                      <thead className="table-light">
                        <tr>
                          <th className="sort" data-sort="customer_name">
                            No.
                          </th>
                          <th className="sort" data-sort="email">
                            Ketua Tim
                          </th>
                          <th className="sort" data-sort="phone">
                            Nomor Surat
                          </th>
                          <th className="sort" data-sort="date">
                            Tanggal
                          </th>
                          <th className="sort" data-sort="status">
                            Tugas
                          </th>
                          <th className="sort" data-sort="action">
                            Action
                          </th>
                          <th className="sort" data-sort="action">
                            Print
                          </th>
                          <th className="sort" data-sort="action">
                            No. surat
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list form-check-all">
                        {data
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <TableItem
                              item={item}
                              index={index}
                              key={index}
                              page={page}
                              rowsPerPage={rowsPerPage}
                              handlePrintNoSurat={handlePrintNoSurat}
                              handleDeleteSurat={(id) => {
                                axiosClient
                                  .delete(`letters/${id}`)
                                  .then((_) => {
                                    getData();
                                    success.value = "Berhasil menghapus surat";
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    error.value = err.message;
                                  });
                              }}
                            />
                          ))}
                      </tbody>
                    </table>
                    <div className="noresult" style={{ display: "none" }}>
                      <div className="text-center">
                        <lord-icon
                          src="https://cdn.lordicon.com/msoeawqm.json"
                          trigger="loop"
                          colors="primary:#121331,secondary:#08a88a"
                          style={{ width: "75px", height: "75px" }}
                        ></lord-icon>
                        <h5 className="mt-2">Sorry! No Result Found</h5>
                        <p className="text-muted mb-0">
                          We've searched more than 150+ Orders We did not find
                          any orders for you search.
                        </p>
                      </div>
                    </div>
                  </div>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <PrintModal
          open={open}
          setOpen={setOpen}
          item={letterNumber}
          setItem={setLetterNumber}
          onError={(item) => (error.value = item)}
        />
      </div>

      <AxiosAlert
        message={error.value}
        open={error.value && true}
        severity={"error"}
        setOpen={(val) => (error.value = val)}
      />
      <AxiosAlert
        message={success.value}
        open={success.value && true}
        severity={"success"}
        setOpen={(val) => (success.value = val)}
      />
    </Fragment>
  );
};

const TableItem = ({
  item,
  index,
  page,
  rowsPerPage,
  handlePrintNoSurat = () => {},
  handleDeleteSurat = () => {},
}) => {
  return (
    <tr>
      <td className="no">{index + 1 + rowsPerPage * page}</td>
      <td className="author">{item.dictum[0]}</td>
      <td className="noSurat" style={{ color: !item?.letterNumber && "red" }}>
        {item?.letterNumber ? item?.letterNumber : "Belum dicetak"}
      </td>
      <td className="tanggal">
        {`${moment(item.startDateOftravel).format("DD MMMM YYYY")} s/d ${moment(
          item.endDateOftravel
        ).format("DD MMMM YYYY")}`}
      </td>
      <td
        className="tugas"
        style={{
          width: 500,
          whiteSpace: "break-spaces",
          display: "flex",
        }}
      >
        {item.assignedTo}
      </td>
      <td>
        <div className="d-flex gap-2">
          <div className="edit">
            <Link to={`/surat-tugas/${item.id}`} state={item}>
              <button
                className="btn btn-sm btn-outline-info edit-item-btn"
                data-bs-toggle="modal"
                data-bs-target="#showModal"
              >
                <i className="mdi mdi-pencil-outline fs-5"></i>
              </button>
            </Link>
          </div>
          <div className="remove">
            <button
              className="btn btn-sm btn-outline-danger remove-item-btn"
              data-bs-toggle="modal"
              data-bs-target="#deleteRecordModal"
              onClick={() => handleDeleteSurat(item.id)}
            >
              <i className="mdi mdi-delete-outline fs-5"></i>
            </button>
          </div>
        </div>
      </td>
      <td>
        <Link to={`/surat-tugas/${item.id}/print`} state={item}>
          <button
            className="btn btn-sm btn-outline-primary print-item-btn"
            data-bs-toggle="modal"
            data-bs-target="#showModal"
          >
            <i className="mdi mdi-printer fs-5"></i>
          </button>
        </Link>
      </td>
      <td>
        <button
          className="btn btn-sm btn-outline-warning mail-item-btn"
          data-bs-toggle="modal"
          data-bs-target="#showModal"
          onClick={() =>
            handlePrintNoSurat({ letterNumber: item.letterNumber, id: item.id })
          }
        >
          <i className="mdi mdi-email-check-outline fs-5"></i>
        </button>
      </td>
    </tr>
  );
};

export default SuratTugas;
