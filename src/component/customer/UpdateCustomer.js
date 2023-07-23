import {Formik, Form, Field, ErrorMessage} from "formik";
import * as customerService from "../../service/CustomerSaveService";
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import {checkCitizenCodeExists, checkEmailExists, checkPhoneNumberExists} from "../../service/CustomerSaveService";
import {ThreeCircles} from "react-loader-spinner";


export function UpdateCustomer() {
    let navigate = useNavigate();
    const params = useParams();
    const [customer, setCustomer] = useState();
    const defaultAvatar = "https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png";
    const defaultImag = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
    const [fileUrl, setFileUrl] = useState(null);

    const [avatar, setAvatarFile] = useState();
    const [avatarUrl, setAvatarUrl] = useState();
    const [frontCitizen, setFrontCitizenFile] = useState();
    const [frontCitizenUrl, setFrontCitizenUrl] = useState();
    const [backCitizen, setBackCitizenFile] = useState();
    const [backCitizenUrl, setBackCitizenUrl] = useState();
    const [fileSelected, setFileSelected] = useState(false);
    const messageError = "Ảnh không được để trống!!";
    console.log(fileSelected, "1 lan")
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
            const newName = "pawn_shop_topvn" + Date.now() + "_" + file.name;
            const storageRef = ref(storage, `files/${newName}`);
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
                    return downloadURL;
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
        if (avatarUrl) {
            return avatarUrl
        } else
            return await handleFileUpload(avatar, setAvatarUrl);
    };

    const handleFrontCitizenFileUpload = async () => {
        if (frontCitizenUrl) {
            return frontCitizenUrl
        } else
            return await handleFileUpload(frontCitizen, setFrontCitizenUrl);
    };

    const handleBackCitizenFileUpload = async () => {
        if (backCitizenUrl) {
            return backCitizenUrl
        } else
            return await handleFileUpload(backCitizen, setBackCitizenUrl);
    };


    console.log({customer})

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

    const getMinDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        );
    };
    const getMaxDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 100,
            today.getMonth(),
            today.getDate()
        );
    };

    return (
        <>
            <Formik

                initialValues={{
                    id: params.id,
                    name: customer?.name,
                    birthday: customer?.birthday,
                    gender: customer?.gender.toString(),
                    phoneNumber: customer?.phoneNumber,
                    email: customer?.email,
                    address: customer?.address,
                    citizenCode: customer?.citizenCode,
                    image: customer?.image,
                    frontCitizen: customer?.frontCitizen,
                    backCitizen: customer?.backCitizen,
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Tên không được để trống")
                        .min(5, 'Ký tự phải nhiều hơn 5')
                        .max(100, 'Ký tự phải ít hơn 100')
                        .matches(
                            /^[A-Z][A-Za-z0-9\s]*$/,
                            "Tên không được chứa ký tự đặc biệt và chữ cái đầu tiên phải viết hoa"
                        )
                        .test('no-special-characters', 'Tên không được chứa các ký tự đặc biệt như @, #, !', value => {
                            return !/[!@#\$%\^&*()_\+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
                        }),

                    birthday: Yup.date().required("Ngày, tháng, năm sinh không được để trống").max(getMinDate(), 'Người dùng phải từ 18 tuổi trở lên').min(getMaxDate(), 'Người dùng không được quá 100 tuổi'),
                    gender: Yup.number().required("Giới tính không được để trống"),
                    phoneNumber: Yup.string().required("Số diện thoại không được để trống")
                        .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Nhập đúng định dạng SDT VD: 098XXXXXXX (X là chữ số)')
                        .test(
                            "check-phone-number",
                            "Số điện thoại đã tồn tại",
                            async function (value) {
                                if (value === customer.phoneNumber) {
                                    return true
                                } else if (!value) {
                                    return true;
                                } else {
                                const isPhoneNumberExists = await checkPhoneNumberExists(value);
                                return !isPhoneNumberExists;
                                }
                            }),
                    email: Yup.string().required("Email không được để trống").email('Nhập đúng định dạng email')
                        .test(
                            "check-email",
                            "Email đã tồn tại",
                            async function (value) {
                                if (value === customer.email) {
                                    return true
                                } else if (!value) {
                                    return true;
                                }
                                const isEmailExists = await checkEmailExists(value);
                                return !isEmailExists;
                            }),
                    address: Yup.string().required("Địa chỉ không được để trống")
                        .min(10, 'Ký tự phải nhiều hơn 10')
                        .max(100, 'Ký tự phải ít hơn 100')
                        .matches(/^[^+.#()?&]*$/, "Địa chỉ không chứa các ký tự +,.,#,(,),?,&"),
                    citizenCode: Yup.string().required("Căn cước không được để trống")
                        .matches(/^(\d{12})$/, "Nhập không đúng định dạng. Vui lòng kiểm tra lại")
                        .test(
                            "check-citizen-code",
                            "Số căn cước đã tồn tại",
                            async function (value) {
                                if (value === customer.citizenCode) {
                                    return true
                                } else if (!value) {
                                    return true;
                                }
                                const isCitizenCodeExists = await checkCitizenCodeExists(value);
                                return !isCitizenCodeExists;
                            }),
                })}
                onSubmit={async (values, {resetForm, setSubmitting}) => {
                    console.log(values)
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
                            frontCitizen: frontCitizenUrl,
                            backCitizen: backCitizenUrl,
                        };
                        await customerService.update(newValue);
                        console.log(newValue)
                        setSubmitting(false);
                        await Swal.fire({
                            icon: "success",
                            title: "Chỉnh sửa thông tin thành công. Khách hàng " + newValue.name,
                        });
                        resetForm();
                        navigate("/nav/manager-customer");
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
                    <div className="dat-nt container mt-5 mb-5">
                        <div className="row height d-flex justify-content-center align-items-center">
                            <div className="col-md-8 col-sm-12">
                                <div className="card px-5 py-4">
                                    <div
                                        className="m-2"
                                    >
                                        <h2 style={{textAlign: "center",}}>CẬP NHẬT THÔNG TIN KHÁCH HÀNG</h2>
                                    </div>
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-4" style={{textAlign: "center", display: "block"}}>
                                                <div>
                                                    <img
                                                        id="avatar-img"
                                                        src={avatarUrl ? avatarUrl : (avatar ? URL.createObjectURL(avatar) : defaultAvatar)}
                                                        style={{width: "100%",
                                                            height: "auto",
                                                            objectFit: "contain" }}
                                                        alt="Image Loading.."/>
                                                    {avatarUrl && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm mt-2"
                                                            onClick={() => {
                                                                setAvatarUrl(null);
                                                                setAvatarFile(null);
                                                                setFileSelected(false);
                                                            }}
                                                        >
                                                            Xoá
                                                        </button>
                                                    )}
                                                </div>

                                                <label id="label-dat" className="mt-2 text-file-name">
                                                    Ảnh chân dung
                                                </label>
                                                {!avatarUrl && (
                                                    <label htmlFor="file-upload-avatar"
                                                           className="text-name-file mt-4">
                                                        Thêm ảnh chân dung <span style={{color: "red"}}>*</span>
                                                    </label>
                                                )}

                                                <input
                                                    type="file"
                                                    onChange={(event) => {
                                                        handleAvatarFileSelect(event);
                                                        setFileSelected(true);
                                                    }}
                                                    id="image"
                                                    name="image"
                                                    className="form-control-plaintext d-none"
                                                />
                                                {!avatarUrl && (
                                                    <div>
                                                        <label
                                                            htmlFor="image"
                                                            style={{
                                                                display: "flex",
                                                                padding: "6px 12px",
                                                                border: "1px",
                                                                borderRadius: "4px",
                                                                backgroundColor: "#ccffc6",
                                                                justifyContent: "center",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <i className="bi bi-upload"> Chọn hình ảnh</i>
                                                        </label>
                                                    </div>
                                                )}
                                                {fileSelected || avatarUrl ? null : (
                                                    <span className="text-danger mt-4"><br/> {messageError}</span>
                                                )}

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
                                                    <label id="label-dat" htmlFor="f-name">
                                                        Họ và tên<span style={{color: "red"}}> *</span>
                                                    </label>
                                                    <Field
                                                        id="f-name"
                                                        className="form-control"
                                                        name="name"
                                                        type="text"
                                                    />
                                                    <ErrorMessage component="span"
                                                                  name="name"
                                                                  className="text-danger"/>
                                                </div>
                                                <div className="mt-2">
                                                    <label id="label-dat" htmlFor="f-dateOfBirth">
                                                        Ngày sinh<span style={{color: "red"}}> *</span>
                                                    </label>
                                                    <Field
                                                        id="f-dateOfBirth"
                                                        className="form-control"
                                                        name="birthday"
                                                        type="date"
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="birthday"
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="mt-2 row">
                                                    <div className="col-md-">
                                                        <label id="label-dat" htmlFor="gender" className="form-label">
                                                            Giới tính<span style={{color: "red"}}> *</span>
                                                        </label>
                                                        <label className='m-2'>
                                                            <Field type="radio" name="gender" value="0"/>
                                                            {' '}Nam
                                                        </label>
                                                        <label className='m-2'>
                                                            <Field type="radio" name="gender" value="1"/>
                                                            {' '}Nữ
                                                        </label>
                                                        <label className='m-2'>
                                                            <Field type="radio" name="gender" value="2"/>
                                                            {' '}Khác
                                                        </label>
                                                        <ErrorMessage
                                                            component="span"
                                                            name="gender"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <label id="label-dat" htmlFor="f-email">
                                                        Email<span style={{color: "red"}}> *</span>
                                                    </label>
                                                    <Field
                                                        id="f-email"
                                                        className="form-control"
                                                        name="email"
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="email"
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label id="label-dat" htmlFor="f-phone">
                                                        Số điện thoại
                                                        <span style={{color: "red"}}> *</span>
                                                    </label>
                                                    <Field
                                                        id="f-phone"
                                                        className="form-control"
                                                        name="phoneNumber"
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="phoneNumber"
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label id="label-dat" htmlFor="f-idCard">
                                                        Số căn cước
                                                        <span style={{color: "red"}}> *</span>
                                                    </label>
                                                    <Field
                                                        id="f-idCard"
                                                        className="form-control"
                                                        name="citizenCode"
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="citizenCode"
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label id="label-dat" htmlFor="f-country">
                                                        Nơi thường trú
                                                        <span style={{color: "red"}}> *</span>
                                                    </label>
                                                    <Field
                                                        id="f-country"
                                                        className="form-control"
                                                        name="address"
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="address"
                                                        className="text-danger"
                                                    />
                                                </div>

                                            </div>
                                            <div className="row mt-3">
                                                <div className="m-auto d-flex justify-content-center">
                                                    <button id="file-upload-label" type='button'
                                                            className="btn btn-sm btn-danger"
                                                    >
                                                        Thêm căn cước <i className="bi bi-person-vcard"/>
                                                    </button>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="mb-3 col-md-6">
                                                        <label id="label-dat" htmlFor="front-upload"
                                                               className="text-name-file">
                                                            Tải lên mặt trước <span style={{color: "red"}}>*</span>
                                                        </label>

                                                        <input
                                                            type="file"
                                                            onChange={(event) => {
                                                                handleFrontCitizenFileSelect(event);
                                                                setFileSelected(true);
                                                            }}
                                                            id="frontCitizen"
                                                            name="frontCitizen"
                                                            className="form-control-plaintext d-none"
                                                        />
                                                        {!frontCitizenUrl && (
                                                            <p>
                                                                <label
                                                                    htmlFor="frontCitizen"
                                                                    style={{
                                                                        display: "flex",
                                                                        padding: "6px 12px",
                                                                        border: "1px",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "#ccffc6",
                                                                        justifyContent: "center",
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <i className="bi bi-upload"> Chọn hình ảnh</i>
                                                                </label>
                                                            </p>
                                                        )}

                                                        <div>
                                                            <img
                                                                onChange={handleFrontCitizenFileUpload}
                                                                className="mt-2"
                                                                src={frontCitizenUrl ? frontCitizenUrl : (frontCitizen ? URL.createObjectURL(frontCitizen) : defaultImag)}
                                                                style={{width: "100%"}}
                                                                alt="Image Loading.."/>
                                                            {frontCitizenUrl && (<button
                                                                type="button"
                                                                className="btn btn-danger btn-sm mt-2"
                                                                onClick={() => {
                                                                    setFrontCitizenFile(null);
                                                                    setFrontCitizenUrl(null);
                                                                    setFileSelected(false);
                                                                }}
                                                            >
                                                                Xoá
                                                            </button>)}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label id="label-dat" htmlFor="back-upload"
                                                               className="text-name-file">
                                                            Tải lên mặt sau <span style={{color: "red"}}>*</span>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            onChange={(event) => {
                                                                handleBackCitizenFileSelect(event);
                                                                setFileSelected(true);
                                                            }}
                                                            id="backCitizen"
                                                            name="backCitizen"
                                                            className="form-control-plaintext d-none"
                                                        />
                                                        {!backCitizenUrl && (
                                                            <p>
                                                                <label
                                                                    htmlFor="backCitizen"
                                                                    style={{
                                                                        display: "flex",
                                                                        padding: "6px 12px",
                                                                        border: "1px",
                                                                        borderRadius: "4px",
                                                                        backgroundColor: "#ccffc6",
                                                                        justifyContent: "center",
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    <i className="bi bi-upload"> Chọn hình ảnh</i>
                                                                </label>
                                                            </p>
                                                        )}

                                                        <div>
                                                            <img
                                                                onChange={handleBackCitizenFileUpload}
                                                                className="mt-2"
                                                                src={backCitizenUrl ? backCitizenUrl : (backCitizen ? URL.createObjectURL(backCitizen) : defaultImag)}
                                                                style={{width: "100%"}}
                                                                alt="Image Loading.."/>
                                                            {backCitizenUrl && (<button
                                                                type="button"
                                                                className="btn btn-danger btn-sm mt-2"
                                                                onClick={() => {
                                                                    setBackCitizenFile(null);
                                                                    setBackCitizenUrl(null);
                                                                    setFileSelected(false);
                                                                }}
                                                            >
                                                                Xoá
                                                            </button>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {isSubmitting ? (
                                                    (<ThreeCircles
                                                        height="60"
                                                        width="60"
                                                        color="#4fa94d"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                        visible={true}
                                                        ariaLabel="three-circles-rotating"
                                                        outerCircleColor=""
                                                        innerCircleColor=""
                                                        middleCircleColor=""
                                                    />)
                                                ) : (
                                                    <div>
                                                        <div className="text-center m-auto">
                                                            <div className="d-flex justify-content-center">
                                                                <div
                                                                    className="text-center">
                                                                    <Link

                                                                        style={{marginLeft:"4vw",width:"130px"}}
                                                                        type="button"
                                                                        className="btn btn-secondary m-0"
                                                                        to={"/nav/manager-customer"}
                                                                    >
                                                                        <b className="text-center">Quay lại</b>
                                                                    </Link>
                                                                </div>
                                                                <div
                                                                    className="text-center ms-lg-3 ms-md-2 ms-sm-2">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-success"
                                                                        style={{marginLeft:"4vw",width:"130px"}}
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
