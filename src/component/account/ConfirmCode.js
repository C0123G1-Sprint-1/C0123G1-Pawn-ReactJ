import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup"
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ErrorMessage, Field, Form, Formik } from "formik";

export function ConfirmCode() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state && location.state.data;
    
    return (
        <>
            <div className="col-md-6 right-box">
                <div className="row align-items-center">
                    <div className="header-text mb-4">
                        <h2>Xác nhận</h2>
                    </div>
                    <Formik
                        initialValues={{
                            verificationCode: ""
                        }}
                        validationSchema={Yup.object({
                            verificationCode: Yup.number()
                                .required('Không được để trống'),


                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                values = {
                                    ...values,
                                    id: data
                                }
                                const response = await axios.post('http://localhost:8080/api/user/checkCode', values)
                                console.log(response)
                                navigate("/login/newPassword", { state: { data: response.data } })
                            } catch (error) {
                                console.log(error)
                                toast.error(error.response.data);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        <Form action="">
                            <fieldset className="form-group position-relative has-icon-left ">
                                <Field
                                    name="verificationCode"
                                    type="number"
                                    id="txtUserName"
                                    className="form-control"
                                    placeholder="Mã"
                                />
                                <ErrorMessage name="verificationCode" component="span" className="error-r" />

                            </fieldset>
                            <div className="input-group mb-3">
                                <button style={{ marginTop: "5%" }}
                                    type="submit"
                                    className="btn btn-success w-100 fs-6"

                                >
                                    Xác nhận
                                </button>
                            </div>
                        </Form>
                    </Formik>

                </div>
            </div>
            <ToastContainer />



        </>
    )
}