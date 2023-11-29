import { TablePagination } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { PrintModal } from "./Component";
import axios from "axios";
import moment from "moment";

const SuratTugas = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [letterNumber, setLetterNumber] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePrintNoSurat = (item) => {
    setOpen(!open);
    setLetterNumber(item);
  };

  const getData = () => {
    axios
      .get("http://localhost:2000/letters")
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
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
                          {/* <i className="ri-search-line search-icon"></i> */}
                          <input
                            type="text"
                            className="form-control search"
                            placeholder="Search..."
                          />
                        </div>
                        {/* <div className="btn-group" role="group">
                          <ButtonDropdown
                            isOpen={isDropdownOpen}
                            toggle={() => {
                              setIsDropdownOpen(!isDropdownOpen);
                            }}
                          >
                            <DropdownToggle outline color="primary">
                              <i className="mdi mdi-sort-ascending"></i> Sort by{" "}
                              <i className="mdi mdi-chevron-down"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>Dropdown link</DropdownItem>
                              <DropdownItem>Dropdown link</DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </div> */}
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
                                axios
                                  .delete(`http://localhost:2000/letters/${id}`)
                                  .then((_) => {
                                    getData();
                                  })
                                  .catch((err) => {
                                    console.log(err);
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
        <PrintModal
          open={open}
          setOpen={setOpen}
          item={letterNumber}
          setItem={setLetterNumber}
        />
      </div>
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
  const navigate = useNavigate();
  return (
    <tr>
      <td className="no">{index + 1 + rowsPerPage * page}</td>
      <td className="author">{item.dictum[0]}</td>
      <td className="noSurat">
        {item.letterNumber ? item.letterNumber : "Belum dicetak"}
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
