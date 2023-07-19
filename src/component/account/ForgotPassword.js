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
                                const response = await axios.post('http://localhost:8080/api/user/checkEmail', values)
                                navigate("/confirmCode", { state: { data: response.data } })
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
                                <ErrorMessage name="email" component="span" className="error-r" />

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
                            <NavLink to="/" className="card-link blue">
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