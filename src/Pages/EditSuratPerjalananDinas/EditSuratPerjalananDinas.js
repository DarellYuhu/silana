import { Fragment, useRef } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  InputGroup,
  Label,
} from "reactstrap";
import Creatable from "react-select/creatable";
import Select from "react-select";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Flatpickr from "react-flatpickr";
import DISTRICT from "@regions-of-indonesia/data/district";
import PROVINCE from "@regions-of-indonesia/data/province";

const EditSuratPerjalananDinas = () => {
  const datePickerRef = useRef(null);

  console.log(DISTRICT);
  console.log(PROVINCE);

  const filteredDistricts = [
    {
      options: Object.keys(DISTRICT)
        .filter((key) => key.startsWith("71"))
        .map((key) => ({
          value: key,
          label: DISTRICT[key],
        })),
    },
  ];

  // const filteredDistricts = [];

  // Iterate over the data and filter regions with 71 data
  // for (const key in data) {
  //   if (data.hasOwnProperty(key)) {
  //     if (key.startsWith("71.")) {
  //       filteredDistricts.push(data[key]);
  //     }
  //   }
  // }

  console.log(filteredDistricts);

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Surat Tugas"
            breadcrumbItem="Edit Surat Perjalanan Dinas"
          />
          <Card>
            <CardBody>
              <CardTitle>PEJABAT PEMBUAT KOMITMEN</CardTitle>
              <CardBody className="p-0 px-4">
                <div className="mb-3">
                  {/* <Label>Warna Bar</Label> */}
                  <Select
                    // value={selectedGroup}
                    // onChange={() => {
                    //   handleSelectGroup();
                    // }}
                    // options={warnaOption}
                    classNamePrefix="select2-selection"
                  />
                </div>
              </CardBody>
            </CardBody>
            <CardBody className="pt-0">
              <CardTitle>KEBERANGKATAN & DESTINASI</CardTitle>
              <CardBody className="p-0 px-4">
                <div className="mb-3">
                  <Label>Tempat Berangkat</Label>
                  <Select
                    // value={selectedGroup}
                    // onChange={() => {
                    //   handleSelectGroup();
                    // }}
                    // options={warnaOption}
                    classNamePrefix="select2-selection"
                  />
                </div>
                <div className="mb-3">
                  <Label>Tempat Tujuan</Label>
                  <Creatable
                    // value={selectedGroup}
                    // onChange={() => {
                    //   handleSelectGroup();
                    // }}
                    options={filteredDistricts}
                    classNamePrefix="select2-selection"
                  />
                </div>
              </CardBody>
            </CardBody>
            <CardBody className="pt-0">
              <CardTitle>TANGGAL SURAT</CardTitle>
              <CardBody className="p-0 px-4">
                <InputGroup>
                  <Flatpickr
                    ref={datePickerRef}
                    defaultValue="today"
                    className="form-control d-block"
                    placeholder="dd M, yyyy"
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary docs-datepicker-trigger"
                      onClick={() => datePickerRef.current.flatpickr.toggle()}
                    >
                      <i className="fa fa-calendar" aria-hidden="true" />
                    </button>
                  </div>
                </InputGroup>
              </CardBody>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Pastikan data yang anda masukan sudah benar{" "}
                  <span className="mdi mdi-information-outline"></span>
                </label>
              </div>
              <button
                type="button"
                className="btn btn-info btn-rounded btn-lg waves-effect waves-light"
              >
                SELESAI
              </button>
            </CardBody>
          </Card>
        </Container>
      </div>
    </Fragment>
  );
};

export default EditSuratPerjalananDinas;
