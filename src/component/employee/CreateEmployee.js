import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from 'moment';
import { useNavigate } from "react-router";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import * as Yup from "yup";
import "../employee/employee.css";
import Swal from "sweetalert2";
import * as employeeService from "../../service/employeeService";

import {
    checkCitizenCodeExists,
    checkEmailExists, checkPhoneNumberExists,
    createEmployee
} from "../../service/employeeService";
import jwt from "jwt-decode";


export function CreateEmployee() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imgErr, setImgErr] = useState("");
    const navigate = useNavigate();

    // const token = localStorage.getItem('token');
    // const decodedToken = jwt(token);
    // console.log(decodedToken.sub)
    // console.log(decodedToken.role)

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setImgErr("");
        if (file) {
            setSelectedFile(file);
        }
    };

    const save = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm mới nhân viên thành công ',
            showConfirmButton: false,
            timer: 1500
        })
    };

    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("Chưa có file nào được chọn ");
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    birthDay: "",
                    gender: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    salary: "",
                    citizenCode: "",
                    image: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .trim()
                        .required("Vui lòng nhập họ tên đầy đủ")
                        .min(2, "Tên quá ngắn , phải từ 2 ký tự")
                        .max(50, "Tên không đúng , vui lòng nhập lại")
                        .matches(/^[^!@#$%^&*()+=\[\]{};':"\\|.<>?`~/]+$/, "Tên không chứa ký tự đặc biệt như @#$.."),
                    birthDay: Yup.date()
                        .test("is-over-18", "Bạn chưa đủ 18 tuổi ", function (value) {
                            const currentDate = new Date();
                            const selectedDate = new Date(value);
                            const ageDiff =
                                currentDate.getFullYear() - selectedDate.getFullYear();
                            if (ageDiff < 18) {
                                return false;
                            }
                            return true;
                        }),
                    email: Yup.string()
                        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            "Email phải đúng định dạng xxx@gmail.com")
                        .required("Vui lòng nhập email")
                        .test("check-email", "Email đã tồn tại", async function (value) {
                            if (!value) {
                                return true; // Không ki?m tra n?u không có giá tr?
                            }

                            const isEmailExists = await checkEmailExists(value);
                            return !isEmailExists;
                        }),
                    phoneNumber: Yup.string()
                        .required("Vui lòng nhập số điện thoại")
                        .matches(
                            /^(\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/,
                            "Số điện thoại không hợp lệ, phải từ 10 hoặc 11 số"
                        )
                        .test(
                            "check-phone-number",
                            "Số điện thoại đã tồn tại",
                            async function (value) {
                                if (!value) {
                                    return true;
                                }
                                const isPhoneNumberExists = await checkPhoneNumberExists(value);
                                return !isPhoneNumberExists;
                            }
                        ),
                    address: Yup.string()
                        .trim()
                        .required("Vui lòng nhập địa chỉ")
                        .min(4, "Địa chỉ quá ngắn")
                        .max(100, "Vui lòng xác nhận lại địa chỉ"),
                    salary: Yup.string()
                        .required("Vui lòng nhập lương")
                        .matches(/^\d+(\.\d+)?$/, "Tiền không được nhập số âm"),
                    citizenCode: Yup.string()
                        .required("Vui lòng nhập địa chỉ")
                        .matches(/^[0-9]{12}$/, "CCCD/Hộ chiếu không đúng")
                        .max(12, "CCCD/Hộ chiếu không chính xác")
                        .test(
                            "check-citizen-code",
                            "CCCD/Hộ chiếu đã tồn tại",
                            async function (value) {
                                if (!value) {
                                    return true;
                                }
                                const isCitizenCodeExists = await checkCitizenCodeExists(value);
                                return !isCitizenCodeExists;
                            }
                        ),
                })}
                onSubmit={(values, { resetForm }) => {
                    const create = async () => {
                        const newValue = {
                            ...values,
                            image: firebaseImg,
                        };
                        try {
                            newValue.image = await handleSubmitAsync();
                            await createEmployee(newValue);
                            console.log(values)
                            save();
                            navigate("/api/employee");
                            resetForm(false);
                        } catch (e) {
                            resetForm(true);
                        }
                    };
                    create();
                }}
            >
                <Form>
                    <div className="container mt-5 mb-5">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="col-md-8">
                                <div className="dong">
                                    <div className="card px-1 py-2">
                                        <div style={{ textAlign: "center" }}>
                                            <h1>Thêm Mới Nhân Viên</h1>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div
                                                    className="column-gap-lg-3"
                                                    style={{ width: "92%", marginBottom: "5%", marginLeft: "3%" }}
                                                >
                                                    {selectedFile && (
                                                        <img
                                                            src={URL.createObjectURL(selectedFile)}
                                                            className="rounded-circle mt-2 "
                                                            style={{
                                                                width: "180px",
                                                                height: "180px",
                                                                display: "flex",
                                                                margin: `0 auto`,
                                                                border: "1px solid"
                                                            }}
                                                            height="100px"
                                                        />
                                                    )}
                                                </div>
                                                <div className="form-outline">
                                                    <Field
                                                        type="file"
                                                        onChange={(e) => handleFileSelect(e)}
                                                        id="image"
                                                        name={"image"}
                                                        className="form-control-plaintext d-none "
                                                    />
                                                    <p>
                                                        <label
                                                            htmlFor="image"
                                                            className="dong"
                                                            style={{
                                                                display: "flex",
                                                                padding: "6px 12px",
                                                                border: "1px solid",
                                                                borderRadius: "4px",
                                                                marginLeft: "3%"
                                                            }}
                                                        >
                                                            Chọn hình ảnh
                                                        </label>
                                                    </p>
                                                    {!selectedFile && (
                                                        <span className={"mt-2 text-danger"}>
                                                            Chưa có hình ảnh được chọn
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-8" >
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="mt-2 inputs">
                                                            <label className="dong">
                                                                Họ và tên <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <Field type="text" className="form-control" name="name" />
                                                            <ErrorMessage name="name" component="p"
                                                                style={{ color: "red" }} />
                                                        </div>
                                                        <div className="mt-2 inputs">
                                                            <label className="dong">
                                                                Ngày sinh <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <Field
                                                                type="date"
                                                                className="form-control"
                                                                name="birthDay"
                                                            />
                                                            <ErrorMessage name="birthDay" component="p"
                                                                style={{ color: "red" }} />
                                                        </div>
                                                        <div className="mt-2 inputs row">
                                                            <div className="col-md-3">
                                                                <label className="form-label dong">Giới tính</label>
                                                            </div>
                                                            <div className="d-flex col-md-9">
                                                                <div style={{ marginLeft: "20px" }}>
                                                                    <Field type="radio" name="gender" value="1" />
                                                                    Nam
                                                                </div>
                                                                <div style={{ marginLeft: "20px" }}>
                                                                    <Field type="radio" name="gender" value="0" />
                                                                    Nữ
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 inputs">
                                                            <label className="dong">
                                                                Email <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <Field type="email" className="form-control" name="email" />
                                                            <ErrorMessage name="email" component="p"
                                                                style={{ color: "red" }} />
                                                        </div>

                                                        <div className="mt-2 inputs">
                                                            <label className="dong">
                                                                Lương(VND)<span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <Field type="number" className="form-control"
                                                                name="salary" />
                                                            <ErrorMessage name="salary" component="p"
                                                                style={{ color: "red" }} />
                                                        </div>
                                                    </div>

                                                    <div className="col-6" >
                                                        <div className="mt-2 inputs">
                                                            <label className="dong">
                                                                Số điện thoại <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                className="form-control"
                                                                name="phoneNumber"
                                                            />
                                                            <ErrorMessage name="phoneNumber" component="p"
                                                                style={{ color: "red" }} />
                                                        </div>

                                                        <div className="mt-2 inputs">
                                                            <label className="dong">
                                                                CMND/Hộ chiếu <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <Field type="text" className="form-control"
                                                                name="citizenCode" />
                                                            <ErrorMessage name="citizenCode" component="p"
                                                                style={{ color: "red" }} />
                                                        </div>

                                                        <div className="mt-2 inputs">
                                                            <label className="dong">
                                                                Địa chỉ <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <Field as="textarea"
                                                                type="text"
                                                                className="form-control"
                                                                name="address"
                                                                id="address"
                                                            />
                                                            <ErrorMessage name="address" component="p"
                                                                style={{ color: "red" }} />
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px auto' }}>
                                                <div>
                                                    <NavLink
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        to={"/nav/api/employee"}>
                                                        Quay lại
                                                    </NavLink>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    <button type="submit" className="btn btn-success">
                                                        <b className="text-center">Thêm mới</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}