import {Formik, Form, Field, ErrorMessage} from "formik";
import * as customerService from "../../service/CustomerSaveService";
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import React, {useEffect, useState} from "react";
import {Oval} from "react-loader-spinner";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

export function UpdateCustomer() {
    let navigate = useNavigate();
    const params = useParams();
    const [customer, setCustomer] = useState();
    const defaultAvatar = "https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png";
    const defautImg = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
    const [fileUrl, setFileUrl] = useState(null);

    const [avatar, setAvatarFile] = useState();
    const [avatarUrl, setAvatarUrl] = useState();
    const [frontCitizen, setFrontCitizenFile] = useState();
    const [frontCitizenUrl, setFrontCitizenUrl] = useState();
    const [backCitizen, setBackCitizenFile] = useState();
    const [backCitizenUrl, setBackCitizenUrl] = useState();

    const handleFileSelect = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            if (file.size > 0) {
                const fileUrl = URL.createObjectURL(file);
                setFileUrl(fileUrl);
            } else {
                console.error("File is empty");
            }
        }
    };

    const handleFileUpload = (file, setFileUrl) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                return reject("No file selected");
            }
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(`Upload progress: ${progress}%`);

                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFileUrl(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };

    const handleAvatarFileSelect = (event) => {
        handleFileSelect(event, setAvatarFile);
    };

    const handleFrontCitizenFileSelect = (event) => {
        handleFileSelect(event, setFrontCitizenFile);
    };

    const handleBackCitizenFileSelect = (event) => {
        handleFileSelect(event, setBackCitizenFile);
    };

    const handleAvatarFileUpload = async () => {
        setAvatarUrl(avatar);
        await handleFileUpload(avatar, setAvatarUrl);
    };

    const handleFrontCitizenFileUpload = async () => {
        setFrontCitizenUrl(frontCitizen);
        await handleFileUpload(frontCitizen, setFrontCitizenUrl);
    };

    const handleBackCitizenFileUpload = async () => {
        setBackCitizenUrl(backCitizen);
        await handleFileUpload(backCitizen, setBackCitizenUrl);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await customerService.findByIdCustomer(params.id);
                setCustomer(result);
                setAvatarUrl(result.image);
                setFrontCitizenUrl(result.frontCitizen);
                setBackCitizenUrl(result.backCitizen);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.id]);

    if (!customer) {
        return null;
    }

    return (
        <>
            <Formik

                initialValues={{
                    id: params.id,
                    name: customer?.name,
                    birthday: customer?.birthday,
                    gender: customer?.gender,
                    phoneNumber: customer?.phoneNumber,
                    email: customer?.email,
                    address: customer?.address,
                    citizenCode: customer?.citizenCode,
                    image: customer?.image,
                    frontCitizen: customer?.frontCitizen,
                    backCitizen: customer?.backCitizen,
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Tên không được để trống"),
                    birthday: Yup.string().required("Ngày tháng năm sinh không được để trống"),
                    gender: Yup.number().required("Giới tính không được để trống"),
                    phoneNumber: Yup.string().required("Số diện thoại không được để trống"),
                    email: Yup.string().required("Email không được để trống"),
                    address: Yup.string().required("Địa chỉ không được để trống"),
                    citizenCode: Yup.string().required("Căn cước không được để trống"),
                    image: Yup.string().required("Ảnh chân dung không được để trống"),
                    frontCitizen: Yup.string().required("Ảnh mặt trước căn cước không được để trống"),
                    backCitizen: Yup.string().required("Ảnh mặt sau căn cước không được để trống"),
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
                        console.log(results)

                        values.gender = parseInt(values.gender);
                        const newValue = {
                            ...values,
                            image: avatarUrl,
                            backCitizen: backCitizenUrl,
                            frontCitizen: frontCitizenUrl,
                        };
                        console.log(newValue)
                        await customerService.update(newValue);

                        setSubmitting(false);
                        await Swal.fire({
                            icon: "success",
                            title: "Thành công",
                        }); debugger
                        resetForm();
                        navigate("/");
                    } catch (error) {
                        console.error(error);
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
                                        <h1 id="title-h1">Cập nhật thông tin khách hàng</h1>
                                    </div>
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-4" style={{textAlign: "center", display: "block"}}>
                                                <div>
                                                    <img
                                                        id="avatar-img"
                                                        src={avatarUrl ? avatarUrl : (avatar ? URL.createObjectURL(avatar) : defaultAvatar)}
                                                        style={{width: "100%"}}
                                                        alt="avatar"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm mt-2"
                                                        onClick={() => {
                                                            setAvatarUrl(null);
                                                            setAvatarFile(null);
                                                        }}
                                                    >
                                                        Xoá
                                                    </button>
                                                </div>

                                                <label className="mt-2" style={{textAlign: "center", display: "block"}}>
                                                    Ảnh chân dung
                                                </label>
                                                {!avatar && (
                                                    <label htmlFor="file-upload-avatar"
                                                           className="custom-file-upload mt-4">
                                                        Thêm ảnh chân dung <span style={{color: "red"}}>*</span>
                                                    </label>
                                                )}
                                                <input
                                                    type="file"
                                                    onChange={handleAvatarFileSelect}
                                                    id="image"
                                                    name="image"
                                                    className="form-control-plaintext d-none"
                                                />
                                                {!avatar && (
                                                    <div>
                                                        <input
                                                            type="button"
                                                            value="Chọn hình ảnh"
                                                            onClick={() => document.getElementById("image").click()}
                                                            style={{
                                                                display: "flex",
                                                                padding: "6px 12px",
                                                                border: "1px ",
                                                                borderRadius: "4px",
                                                                backgroundColor: "white",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <hr/>
                                                <div className="mb-3 mt-3">
                                                    <button
                                                        id="file-upload-label"
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => {
                                                            document.getElementById("front-back-upload").classList.remove("hidden");
                                                        }}
                                                    >
                                                        Thêm căn cước <i className="bi bi-person-vcard"/>
                                                    </button>
                                                </div>
                                                <div id="front-back-upload" className="hidden">
                                                    <div className="mb-3">
                                                        <label htmlFor="front-upload" className="custom-file-upload">
                                                            Tải lên mặt trước <span style={{color: "red"}}>*</span>
                                                        </label>
                                                        <input
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

                                                            <div>
                                                                <img
                                                                    onChange={handleFrontCitizenFileUpload}
                                                                    className="mt-2"
                                                                    src={frontCitizenUrl ? frontCitizenUrl : (frontCitizen ? URL.createObjectURL(frontCitizen) : defautImg)}
                                                                    style={{width: "100%"}}
                                                                    alt=""
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm mt-2"
                                                                    onClick={() => {
                                                                        setFrontCitizenFile(null);
                                                                        setFrontCitizenUrl(null);
                                                                    }}
                                                                >
                                                                    Xoá
                                                                </button>
                                                            </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="back-upload" className="custom-file-upload">
                                                            Tải lên mặt sau <span style={{color: "red"}}>*</span>
                                                        </label>
                                                        <input
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

                                                            <div>
                                                                <img
                                                                    onChange={handleBackCitizenFileUpload}
                                                                    className="mt-2"
                                                                    src={backCitizenUrl ? backCitizenUrl : (backCitizen ? URL.createObjectURL(backCitizen) : defautImg)}
                                                                    style={{width: "100%"}}
                                                                    alt=""
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm mt-2"
                                                                    onClick={() => {
                                                                        setBackCitizenFile(null);
                                                                        setBackCitizenUrl(null);
                                                                    }}
                                                                >
                                                                    Xoá
                                                                </button>
                                                            </div>
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
                                            <Field
                                                id="f-id"
                                                className="form-control"
                                                name="id"
                                                type="number"
                                                hidden
                                            />
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
                                                                <Field type="radio" name="gender" value="0"
                                                                       checked={customer.gender === 0}/>
                                                                Nam
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <Field type="radio" name="gender" value="1"
                                                                       checked={customer.gender === 1}/>
                                                                Nữ
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                <Field type="radio" name="gender" value="2"
                                                                       checked={customer.gender === 2}/>
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
                                                                <div className="text-center ms-lg-3 ms-md-2 ms-sm-2">
                                                                    <Link to={"/"} type="button"
                                                                          className="btn btn-secondary">
                                                                        <b className="text-center">Quay lại</b>
                                                                    </Link>
                                                                </div>
                                                                <div className="text-center ms-lg-3 ms-md-2 ms-sm-2">
                                                                    <button type="submit" className="btn btn-success">
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
