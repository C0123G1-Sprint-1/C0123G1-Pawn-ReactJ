import { Formik, Form, Field, ErrorMessage } from "formik";
import * as customerService from "../../service/CustomerSaveService";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import React from "react";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export function CreateCustomer() {
  let navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          birthday: "",
          gender: "",
          phoneNumber: "",
          email: "",
          address: "",
          citizenCode: "",
          image: "",
          frontCitizen: "",
          backCitizen: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Không được để trống"),
          birthday: Yup.string().required("Không được để trống"),
          gender: Yup.number().required("Không được để trống"),
          phoneNumber: Yup.string().required("Không được để trống"),
          email: Yup.string().required("Không được để trống"),
          address: Yup.string().required("Không được để trống"),
          citizenCode: Yup.string().required("Không được để trống"),
          image: Yup.string().required("Không được để trống"),
          frontCitizen: Yup.string().required("Không được để trống"),
          backCitizen: Yup.string().required("Không được để trống"),
        })}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            await customerService.save(values);
            resetForm();
            setSubmitting(false);
            await Swal.fire({
              icon: "success",
              title: "Thành công",
            });
            navigate("/");
          } catch (e) {
            await Swal.fire({
              icon: "error",
              title: "Thất bại",
            });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <div className="container mt-5 mb-5">
            <div className="row height d-flex justify-content-center align-items-center">
              <div className="col-md-8 col-sm-12">
                <div className="card px-5 py-4">
                  <div
                    className="m-2"
                    style={{
                      textAlign: "center",
                      backgroundColor: "#00833e",
                      color: "white",
                    }}
                  >
                    <h1 id="title-h1">Thêm thông tin khách hàng</h1>
                  </div>
                  <Form>
                    <div className="row">
                      <div
                        className="col-md-4"
                        style={{ textAlign: "center", display: "block" }}
                      >
                        <img
                          id="avatar-img"
                          src="https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png"
                          width="60%"
                          alt="avatar"
                        />
                        <label
                          className="mt-2"
                          style={{ textAlign: "center", display: "block" }}
                        >
                          Ảnh chân dung
                        </label>
                        {/* Avatar file input */}
                        <label
                          htmlFor="file-upload-avatar"
                          className="custom-file-upload mt-4"
                        >
                          Thêm ảnh chân dung{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          type="file"
                          hidden
                          id="avatar-file"
                          name="image"
                        />
                        <label htmlFor="avatar-file" id="selected-avatar">
                          chưa có ảnh
                        </label>
                        <hr />

                        {/* Front/Back Citizen file inputs */}
                        <div className="mb-3 mt-3">
                          <button
                            id="file-upload-label"
                            className="btn btn-sm btn-danger"
                          >
                            Thêm căn cước <i className="bi bi-person-vcard" />
                          </button>
                        </div>
                        <div id="front-back-upload" className="hidden">
                          <div className="mb-3">
                            <label
                              htmlFor="front-upload"
                              className="custom-file-upload"
                            >
                              Tải lên mặt trước{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Field
                              type="file"
                              hidden
                              id="front-citizen-file"
                              name="frontCitizen"
                              accept=".jpg, .jpeg, .png"
                            />
                            <label
                              htmlFor="front-citizen-file"
                              id="selected-front"
                            >
                              chưa có ảnh
                            </label>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="back-upload"
                              className="custom-file-upload"
                            >
                              Tải lên mặt sau{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Field
                              type="file"
                              hidden
                              id="back-citizen-file"
                              name="backCitizen"
                              accept=".jpg, .jpeg, .png"
                            />
                            <label
                              htmlFor="back-citizen-file"
                              id="selected-back"
                            >
                              chưa có ảnh
                            </label>
                          </div>
                          <div className="mt-3">
                            <button
                              id="show-alert-button"
                              className="btn btn-sm btn-success"
                            >
                              Phân tích hình ảnh lấy dữ liệu
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="mt-2">
                          <label htmlFor="f-name">
                            Họ và tên <span style={{ color: "red" }}>*</span>
                          </label>
                          <Field
                            id="f-name"
                            className="form-control"
                            type="text"
                            required
                          />
                        </div>
                        <div className="mt-2">
                          <label htmlFor="f-dateOfBirth">
                            Ngày sinh <span style={{ color: "red" }}>*</span>
                          </label>
                          <Field
                            id="f-dateOfBirth"
                            className="form-control"
                            type="date"
                            required
                          />
                        </div>
                        <div className="mt-2 row">
                          <div className="col-md-3">
                            <label htmlFor="gender" className="form-label">
                              Giới tính:
                            </label>
                            <div>
                              <label>
                                <Field type="radio" name="gender" value={0} />
                                Nam
                              </label>
                            </div>
                            <div>
                              <label>
                                <Field type="radio" name="gender" value={1} />
                                Nữ
                              </label>
                            </div>
                            <div>
                              <label>
                                <Field type="radio" name="gender" value={2} />
                                Khác
                              </label>
                            </div>
                            <ErrorMessage
                              component="span"
                              name="gender"
                              className="error-flag"
                            />
                          </div>
                        </div>
                        <div className="mt-2">
                          <label htmlFor="f-email">
                            Email <span style={{ color: "red" }}>*</span>
                          </label>
                          <Field
                            id="f-email"
                            className="form-control"
                            type="text"
                            required
                          />
                        </div>
                        <div className="mt-2">
                          <label htmlFor="f-phone">
                            Số điện thoại{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <Field
                            id="f-phone"
                            className="form-control"
                            type="text"
                            required
                          />
                        </div>
                        <div className="mt-2">
                          <label htmlFor="f-idCard">
                            Số căn cước <span style={{ color: "red" }}>*</span>
                          </label>
                          <Field
                            id="f-idCard"
                            className="form-control"
                            type="text"
                            required
                          />
                        </div>
                        <div className="mt-2">
                          <label htmlFor="f-country">
                            Nơi thường trú{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <Field
                            id="f-country"
                            className="form-control"
                            type="text"
                            required
                          />
                        </div>

                        {isSubmitting ? (
                          <Oval
                            height={80}
                            width={80}
                            color="#4fa94d"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                          />
                        ) : (
                          <div>
                            <div className="text-center ms-2 mt-3">
                              <div className="d-flex justify-content-center">
                                <div className="text-center ms-lg-3 ms-md-2 ms-sm-2">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                  >
                                    <b className="text-center">Quay lại</b>
                                  </button>
                                </div>
                                <div className="text-center ms-lg-3 ms-md-2 ms-sm-2">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                  >
                                    <b className="text-center">Cập nhật</b>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
