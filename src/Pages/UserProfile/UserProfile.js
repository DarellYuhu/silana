import { Fragment, useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  CardHeader,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getLoggedinUser } from "../../helpers/api_helper";
import axiosClient from "../../helpers/axiosClient";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ErrorText, TableSkeleton } from "../../components/Custom";
import Swal from "sweetalert2";

const ChangePassSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string().min(5, "Minimal 5 karakter").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});
const PersonalizationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  id: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
});

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const user = getLoggedinUser();
  const formik = useRef();

  const handleResetData = async () => {
    try {
      Swal.fire({
        title: "Apakah anda yakin ingin mereset data surat?",
        showDenyButton: true,
        confirmButtonText: "Ya",
        denyButtonText: `Tidak`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Masukan password anda",
            input: "password",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Reset",
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
              return axiosClient
                .delete(`letters/reset/all?password=${password}&id=${user.uid}`)
                .then((response) => {
                  if (response.status === 200) {
                    return response.data;
                  }
                })
                .catch((error) => {
                  Swal.showValidationMessage(
                    `Request failed: ${error?.response?.data?.message ?? error}`,
                  );
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `Berhasil!`,
                html: `Data surat berhasil direset!`,
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    }
  };

  const getUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosClient.get(`employees/${user.uid}`);
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (data.name) {
      formik.current.setFieldValue("name", data.name);
      formik.current.setFieldValue("id", data.id);
      formik.current.setFieldValue("jobTitle", data.jobTitle);
    }
  }, [data]);

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Pengaturan" breadcrumbItem="Pengaturan Akun" />

          <Card>
            <CardBody>
              <Formik
                innerRef={formik}
                initialValues={{
                  name: "",
                  id: "",
                  jobTitle: "",
                }}
                validationSchema={PersonalizationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    Swal.fire({
                      title: "Loading...",
                      text: "Sedang mengubah personalisasi...",
                      allowEscapeKey: false,
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    await axiosClient.patch(`employees/${user.uid}`, values);
                    Swal.fire({
                      title: "Berhasil!",
                      text: "Berhasil mengubah personalisasi. Tolong login ulang untuk melihat perubahan",
                      icon: "success",
                    });
                  } catch (err) {
                    console.log(err);
                    Swal.fire({
                      title: "Error!",
                      text: err.message,
                      icon: "error",
                    });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ handleChange, errors, touched, values }) => (
                  <Form>
                    <CardHeader className="bg-transparent px-0 py-2">
                      <h5 className="fs-3">Ubah Personalisasi</h5>
                    </CardHeader>
                    <Col md={12} className="d-grid gap-3">
                      <CardBody className="p-0 px-1">
                        <CardTitle>Nama Lengkap</CardTitle>
                        <CardBody className="p-0">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            placeholder=""
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                          />
                          <ErrorText
                            errors={errors.name}
                            touched={touched.name}
                          />
                        </CardBody>
                      </CardBody>
                      <CardBody className="p-0 px-1">
                        <CardTitle>NIP</CardTitle>
                        <CardBody className="p-0">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            name="id"
                            onChange={handleChange}
                            value={values.id}
                            placeholder=""
                          />
                          <ErrorText errors={errors.id} touched={touched.id} />
                        </CardBody>
                      </CardBody>
                      <CardBody className="p-0 px-1">
                        <CardTitle>Jabatan</CardTitle>
                        <CardBody className="p-0">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            name="jobTitle"
                            onChange={handleChange}
                            value={values.jobTitle}
                            placeholder=""
                          />
                          <ErrorText
                            errors={errors.jobTitle}
                            touched={touched.jobTitle}
                          />
                        </CardBody>
                      </CardBody>
                    </Col>
                    <button className="btn btn-info mt-4" type="submit">
                      Simpan Perubahan
                    </button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const { confirmPassword, ...payload } = values;
                  try {
                    Swal.fire({
                      title: "Loading...",
                      text: "Sedang mengubah password...",
                      allowEscapeKey: false,
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    await axiosClient.patch(
                      `employees/${user.uid}/change-password`,
                      payload,
                    );
                    Swal.fire({
                      title: "Berhasil!",
                      text: "Berhasil mengubah sandi. Tolong login ulang untuk melihat perubahan",
                      icon: "success",
                    });
                  } catch (err) {
                    console.log(err);
                    if (err.response.status === 401) {
                      Swal.fire({
                        title: "Error!",
                        text: "Sandi lama salah",
                        icon: "error",
                      });
                      return;
                    }
                    Swal.fire({
                      title: "Error!",
                      text: err.message,
                      icon: "error",
                    });
                  } finally {
                    setSubmitting(false);
                  }
                }}
                validationSchema={ChangePassSchema}
              >
                {({ errors, touched, handleChange, isSubmitting }) => (
                  <Form>
                    <CardHeader className="bg-transparent px-0 py-2">
                      <h5 className="fs-3">Ubah Sandi</h5>
                    </CardHeader>
                    <Col md={12} className="d-grid gap-3">
                      <CardBody className="p-0 px-1">
                        <CardTitle>Sandi Lama</CardTitle>
                        <CardBody className="p-0">
                          <Input
                            type="password"
                            className="colorpicker-default"
                            name="oldPassword"
                            placeholder=""
                            onChange={handleChange}
                          />
                          <ErrorText
                            errors={errors.oldPassword}
                            touched={touched.oldPassword}
                          />
                        </CardBody>
                      </CardBody>
                      <CardBody className="p-0 px-1">
                        <CardTitle>Sandi Baru</CardTitle>
                        <CardBody className="p-0">
                          <Input
                            type="password"
                            className="colorpicker-default"
                            name="newPassword"
                            placeholder=""
                            onChange={handleChange}
                          />
                          <ErrorText
                            errors={errors.newPassword}
                            touched={touched.newPassword}
                          />
                        </CardBody>
                      </CardBody>
                      <CardBody className="p-0 px-1">
                        <CardTitle>Konfirmasi Sandi Baru</CardTitle>
                        <CardBody className="p-0">
                          <Input
                            type="password"
                            className="colorpicker-default"
                            name="confirmPassword"
                            placeholder=""
                            onChange={handleChange}
                          />
                          <ErrorText
                            errors={errors.confirmPassword}
                            touched={touched.confirmPassword}
                          />
                        </CardBody>
                      </CardBody>
                    </Col>
                    <button
                      className="btn btn-info mt-4"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Simpan Perubahan
                    </button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>

          {user?.roles?.includes("admin") && (
            <Card>
              <CardBody>
                <h5 className="text-danger">Danger Zone</h5>
                <button
                  className="btn btn-danger"
                  // disabled={isSubmitting}
                  onClick={handleResetData}
                >
                  Reset Data Surat
                </button>
              </CardBody>
            </Card>
          )}
        </Container>
      </div>
    </Fragment>
  );
};

export default UserProfile;
