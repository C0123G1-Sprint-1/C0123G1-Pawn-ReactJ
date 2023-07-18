import {ErrorMessage, Field, Form, Formik} from "formik";
import * as customerService from "../../service/CustomerSaveService";
import * as Yup from "yup";
import {useNavigate} from "react-router";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import React, {useState} from "react";
import {Oval} from "react-loader-spinner";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

export function CreateCustomer() {
    let navigate = useNavigate();
    const [avatar, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [frontCitizen, setFrontCitizenFile] = useState(null);
    const [frontCitizenUrl, setFrontCitizenUrl] = useState(null);
    const [backCitizen, setBackCitizenFile] = useState(null);
    const [backCitizenUrl, setBackCitizenUrl] = useState(null);

    const handleFileSelect = (event, setFile, setFileUrl) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleFileUpload = async (file, setFile, setFileUrl) => {
        return new Promise((resolve, reject) => {
            if (!file) return reject("No file selected");
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFile(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };

    const handleAvatarFileSelect = (event) => {
        handleFileSelect(event, setAvatarFile, setAvatarUrl);
    };

    const handleFrontCitizenFileSelect = (event) => {
        handleFileSelect(event, setFrontCitizenFile, setFrontCitizenUrl);
    };

    const handleBackCitizenFileSelect = (event) => {
        handleFileSelect(event, setBackCitizenFile, setBackCitizenUrl);
    };

    const handleAvatarFileUpload = async () => {
        return handleFileUpload(avatar, setAvatarUrl);
    };
    const handleFrontCitizenFileUpload = async () => {
        return handleFileUpload(frontCitizen, setFrontCitizenUrl);
    };

    const handleBackCitizenFileUpload = async () => {
        return handleFileUpload(backCitizen, setBackCitizenUrl);
    };

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
                onSubmit={async (values, {resetForm, setSubmitting}) => {
                    try {
                        const results = await Promise.all([
                            handleAvatarFileUpload(),
                            handleFrontCitizenFileUpload(),
                            handleBackCitizenFileUpload()
                        ]);

                        const avatarUrl = results[0];
                        const frontCitizenUrl = results[1];
                        const backCitizenUrl = results[2];

                        values.gender = parseInt(values.gender);
                        const newValue = {
                            ...values,
                            image: avatarUrl,
                            backCitizen: backCitizenUrl,
                            frontCitizen: frontCitizenUrl
                        };
                        console.log(newValue)
                        await customerService.save(newValue);

                        setSubmitting(false);
                        await Swal.fire({
                            icon: "success",
                            title: "Thành công",
                        });
                        resetForm();
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
                {({isSubmitting}) => (
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
                                    <Link to={"/update/" + 28}>Update 1</Link>
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-4" style={{textAlign: "center", display: "block"}}>
                                                {avatar ? (
                                                    <div>
                                                        <img
                                                            id="avatar-img"
                                                            src={URL.createObjectURL(avatar)}
                                                            style={{width: "100%"}}
                                                            alt="avatar"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm mt-2"
                                                            onClick={() => {
                                                                setAvatarFile(null);
                                                                setAvatarUrl("");
                                                            }}
                                                        >
                                                            Xoá
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <img
                                                        id="avatar-img"
                                                        src="https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png"
                                                        width="60%"
                                                        alt="avatar"
                                                    />
                                                )}
                                                <label className="mt-2" style={{textAlign: "center", display: "block"}}>
                                                    Ảnh chân dung
                                                </label>
                                                {!avatar && (
                                                    <label htmlFor="file-upload-avatar"
                                                           className="custom-file-upload mt-4">
                                                        Thêm ảnh chân dung <span style={{color: "red"}}>*</span>
                                                    </label>)}
                                                <Field
                                                    type="file"
                                                    onChange={handleAvatarFileSelect}
                                                    id="image"
                                                    name="image"
                                                    className="form-control-plaintext d-none"
                                                />
                                                {!avatar && (
                                                    <p>
                                                        <label
                                                            htmlFor="image"
                                                            style={{
                                                                display: "flex",
                                                                padding: "6px 12px",
                                                                border: "1px ",
                                                                borderRadius: "4px",
                                                                backgroundColor: "white",
                                                            }}
                                                        >
                                                            Chọn hình ảnh
                                                        </label>
                                                    </p>
                                                )}
                                                <hr/>
                                                <div className="mb-3 mt-3">
                                                    <button id="file-upload-label" type='button'
                                                            className="btn btn-sm btn-danger" onClick={() => {
                                                        document.getElementById("front-back-upload").classList.remove("hidden");
                                                    }}>
                                                        Thêm căn cước <i className="bi bi-person-vcard"/>
                                                    </button>
                                                </div>
                                                <div id="front-back-upload" className="hidden">
                                                    <div className="mb-3">
                                                        <label htmlFor="front-upload" className="custom-file-upload">
                                                            Tải lên mặt trước <span style={{color: "red"}}>*</span>
                                                        </label>
                                                        <Field
                                                            type="file"
                                                            onChange={handleFrontCitizenFileSelect}
                                                            id="front-citizen-file"
                                                            name="frontCitizen"
                                                            className="form-control-plaintext d-none"
                                                        />
                                                        {!frontCitizen && (
                                                            <p>
                                                                <label
                                                                    htmlFor="front-citizen-file"
                                                                    style={{
                                                                        display: "flex",
                                                                        padding: "6px 12px",
                                                                        border: "1px ",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "white",
                                                                    }}
                                                                >
                                                                    Chọn hình ảnh
                                                                </label>
                                                            </p>
                                                        )}

                                                        {frontCitizen && (
                                                            <div>
                                                                <img
                                                                    onChange={handleFrontCitizenFileUpload}
                                                                    className="mt-2"
                                                                    src={URL.createObjectURL(frontCitizen)}
                                                                    style={{width: "100%"}}
                                                                    alt=""
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm mt-2"
                                                                    onClick={() => {
                                                                        setFrontCitizenFile(null);
                                                                        setFrontCitizenUrl("");
                                                                    }}
                                                                >
                                                                    Xoá
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="back-upload" className="custom-file-upload">
                                                            Tải lên mặt sau <span style={{color: "red"}}>*</span>
                                                        </label>
                                                        <Field
                                                            type="file"
                                                            onChange={handleBackCitizenFileSelect}
                                                            id="back-citizen-file"
                                                            name="backCitizen"
                                                            className="form-control-plaintext d-none"
                                                        />
                                                        {!backCitizen && (
                                                            <p>
                                                                <label
                                                                    htmlFor="back-citizen-file"
                                                                    style={{
                                                                        display: "flex",
                                                                        padding: "6px 12px",
                                                                        border: "1px ",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "white",
                                                                    }}
                                                                >
                                                                    Chọn hình ảnh
                                                                </label>
                                                            </p>
                                                        )}

                                                        {backCitizen && (
                                                            <div>
                                                                <img
                                                                    onChange={handleBackCitizenFileUpload}
                                                                    className="mt-2"
                                                                    src={URL.createObjectURL(backCitizen)}
                                                                    style={{width: "100%"}}
                                                                    alt=""
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm mt-2"
                                                                    onClick={() => {
                                                                        setBackCitizenFile(null);
                                                                        setBackCitizenUrl("");
                                                                    }}
                                                                >
                                                                    Xoá
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <button
                                                        id="show-alert-button"
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        // onClick={analyzeImage}
                                                    >
                                                        Phân tích hình ảnh lấy dữ liệu
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="mt-2">
                                                    <label htmlFor="f-name">
                                                        Họ và tên <span style={{color: "red"}}>*</span>
                                                    </label>
                                                    <Field
                                                        id="f-name"
                                                        className="form-control"
                                                        name="name"
                                                        type="text"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="name"
                                                        className="error-flag"
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="f-dateOfBirth">
                                                        Ngày sinh
                                                        <span style={{color: "red"}}>*</span>
                                                    </label>
                                                    <Field
                                                        id="f-dateOfBirth"
                                                        className="form-control"
                                                        name="birthday"
                                                        type="date"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="birthday"
                                                        className="error-flag"
                                                    />
                                                </div>
                                                <div className="mt-2 row">
                                                    <div className="col-md-3">
                                                        <label htmlFor="gender" className="form-label">
                                                            Giới tính:
                                                        </label>
                                                        <div>
                                                            <label>
                                                                <Field type="radio" name="gender" value="0"/>
                                                                Nam
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <Field type="radio" name="gender" value="1"/>
                                                                Nữ
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <Field type="radio" name="gender" value="2"/>
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
                                                        Email <span style={{color: "red"}}>*</span>
                                                    </label>
                                                    <Field
                                                        id="f-email"
                                                        className="form-control"
                                                        name="email"
                                                        type="text"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="email"
                                                        className="error-flag"
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="f-phone">
                                                        Số điện thoại
                                                        <span style={{color: "red"}}>*</span>
                                                    </label>
                                                    <Field
                                                        id="f-phone"
                                                        className="form-control"
                                                        name="phoneNumber"
                                                        type="text"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="phoneNumber"
                                                        className="error-flag"
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="f-idCard">
                                                        Số căn cước
                                                        <span style={{color: "red"}}>*</span>
                                                    </label>
                                                    <Field
                                                        id="f-idCard"
                                                        className="form-control"
                                                        name="citizenCode"
                                                        type="text"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="citizenCode"
                                                        className="error-flag"
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="f-country">
                                                        Nơi thường trú
                                                        <span style={{color: "red"}}>*</span>
                                                    </label>
                                                    <Field
                                                        id="f-country"
                                                        className="form-control"
                                                        name="address"
                                                        type="text"
                                                        required
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="address"
                                                        className="error-flag"
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
                                                                <div
                                                                    className="text-center ms-lg-3 ms-md-2 ms-sm-2">
                                                                    <Link
                                                                        to={"/"}
                                                                        type="button"
                                                                        className="btn btn-secondary"
                                                                    >
                                                                        <b className="text-center">Quay lại</b>
                                                                    </Link>
                                                                </div>
                                                                <div
                                                                    className="text-center ms-lg-3 ms-md-2 ms-sm-2">
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
