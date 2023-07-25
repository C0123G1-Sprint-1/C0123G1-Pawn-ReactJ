import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ErrorMessage, Field, Form, Formik } from "formik";

export function ForgotPassword() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Lấy lại mật khẩu"; // Thay đổi title

            window.scrollTo(0,0)
    }, []);
    const loadSubmit = () => {
        Swal.fire({
            html: '<div className="loading-screen" style={{position: "fixed",\n' +
                '  top: "0;",\n' +
                '  left: "0",\n' +
                '  width: "100%",\n' +
                '  height: "100%",\n' +
                '  background-color: "rgba(0, 0, 0, 0.5)" }}/* Màu nền màn hình đen với độ mờ */></div>', // Sử dụng CSS để tạo màn hình đen.
            timer: 4000,
            title: "Vui lòng đợi chúng tôi xác nhận email!",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: async () => {
                await Swal.showLoading();
            },
            willClose: () => {
                // Thêm xử lý khi SweetAlert2 đóng (nếu cần thiết).
            }
        });
    };

    return (
        <>
            <div className="col-md-6 right-box">
                <div className="row align-items-center">
                    <div className="header-text mb-4">
                        <h2>Lấy lại mật khẩu</h2>
                    </div>
                    <Formik
                        initialValues={{
                            email: ""
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .required('Không được để trống'),


                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await loadSubmit()
                                const response = await axios.post('http://localhost:8080/api/user/checkEmail', values)
                            
                                navigate("/login/confirmCode", { state: { data: response.data } })
                            } catch (error) {
                                console.log(error.response.data)
                                toast.error(error.response.data);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        <Form action="">
                            <fieldset className="form-group position-relative has-icon-left ">
                                <Field
                                    name="email"
                                    type="text"
                                    id="txtUserName"
                                    className="form-control"
                                    placeholder="Email của bạn"
                                />
                                <ErrorMessage name="email" component="span" className="error-r mx-1" />

                            </fieldset>
                            <div className="input-group mb-3">
                                <button
                                    style={{ marginTop: "5%" }}
                                    type="submit"
                                    className="btn btn-success w-100 fs-6"

                                >
                                    Lấy mã
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="card-footer border-0">
                        <p className="float-sm-left text-center">
                            <NavLink to="/login" className="card-link blue">
                                Đăng nhập
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />



        </>
    )
}