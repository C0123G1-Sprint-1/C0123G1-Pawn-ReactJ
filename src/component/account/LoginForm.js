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
// import jwtDecode from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
import jwt from 'jwt-decode';

export function LoginForm() {
  const navigate =useNavigate()


  return (
    <>
      <div className="col-md-6 right-box">
        <div className="row align-items-center">
          <div className="header-text mb-4">
            <h2>Đăng nhập hệ thống</h2>
          </div>
          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required('Vui lòng nhập tài khoản'),
              password: Yup.string()
                .required('Vui lòng nhập mật khẩu'),

            })}
          
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // Gửi yêu cầu đăng nhập
              const response = await axios.post(
                'http://localhost:8080/api/user/authenticate',
                values
              );
              // Kiểm tra nếu response có chứa token
              if (response.data.token) {
                // Giải mã token và lấy thông tin payload
                const decodedToken = jwt(response.data.token);
                console.log(decodedToken.sub)
                // Lưu trữ thông tin người dùng vào localStorage hoặc state
                localStorage.setItem('token', response.data.token);
                // localStorage.setItem('userId', decodedToken.userId);
              }
              
              // Đăng nhập thành công, chuyển hướng hoặc thực hiện hành động khác
              navigate('/forgot');
            } catch (e) {
              // Xử lý lỗi đăng nhập
              toast.error(e.response.data);
            } finally {
              setSubmitting(false);
            }
          }}
          >
            <Form>
              <div className="input-group mb-3">
                <Field
                  name="username"
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Tài khoản"
                />
              </div>
              <ErrorMessage  name="username" component="span" className="error-r" />

              <div className="input-group mb-1">
                <Field
                  name="password"
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Mật khẩu"
                />
              </div>
              <ErrorMessage  name="password" component="span" className="error-r" />
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                  />
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Nhớ mật khẩu</small>
                  </label>
                </div>
                <div className="forgot">
                  <small>
                    <NavLink to="/login/forgot">Quên mật khẩu?</NavLink>
                  </small>
                </div>
              </div>
              <div className="input-group mb-3 log">
                <button className="btn btn-lg btn-success w-100 fs-6" type="submit">
                  Đăng nhập ngay
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