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
// import jwtDecode from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
import jwt from 'jwt-decode';

export function NewPassword() {
    const navigate = useNavigate()
    const [password1, setPassword1] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const location = useLocation();
    const data = location.state && location.state.data;
    const [matchError, setMatchError] = useState(false);

    const passwordInputHandler = (val) => {
        setConfirmPassword(val);
        setMatchError(val !== password1); // Kiểm tra nếu password1 và confirmPassword không khớp
    };
    useEffect(()=>{
        passwordInputHandler(confirmPassword)
    },[password1])
    
    return (
        <>
            <div className="col-md-6 right-box">
                <div className="row align-items-center">
                    <div className="header-text mb-4">
                        <h2>Tạo mật khẩu mới</h2>
                    </div>
                    <Formik
                        initialValues={{
                            password: "",
                            confirmP: ""
                        }}
                        validationSchema={Yup.object({

                            // password: Yup.string()
                            //     .required('Vui lòng nhập mật khẩu').min(8, "Mật khẩu ít nhất 8 kí tự"),

                        })}

                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                values = {
                                    ...values,
                                    password:password1,
                                    id: data
                                }
                                const response = await axios.patch(
                                    'http://localhost:8080/api/user/newPassword',
                                    values
                                )
                                console.log(response)
                                toast.success("Đổi mật khẩu thành công");
                                navigate('/login');
                            } catch (error) {
                                console.log(error)
                                console.log(password1)
                                toast.error(error.response.data);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        <Form>
                            <div className="input-group mb-3">
                                <input
                                    name="password"
                                    onChange={(e) => setPassword1(e.target.value)}
                                    
                                    type="password"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Mật khẩu"
                                />
                            </div>
                            <ErrorMessage style={{ marginTop: "-5%" }} name="password" component="span" className="error-r" />


                            <div className="input-group mb-1">
                                <input
                                    name="confirmP"
                                    onChange={(v) => passwordInputHandler(v.target.value)}

                                    type="password"
                                    className="form-control form-control-lg bg-light fs-6"
                                    placeholder="Xác nhận mật khẩu"
                                />
                            </div>
                            {matchError && <p style={{ color: 'red' }}>Mật khẩu không khớp!</p>}


                            <div className="input-group mb-3 log" style={{ marginTop: "5%" }}>
                                {!matchError && (
                                    <button className="btn btn-lg btn-success w-100 fs-6" type="submit">
                                        Tạo ngay
                                    </button>
                                )}
                                {matchError && (
                                    <button className="btn btn-lg btn-success w-100 fs-6" type="button">
                                        Tạo ngay
                                    </button>
                                )}
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
            <ToastContainer />

        </>
    )
}