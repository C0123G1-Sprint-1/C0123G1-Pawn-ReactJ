import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import *as employeeInformationService from "../../service/EmployeeInformationService"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import {RotatingLines} from "react-loader-spinner";
import {useParams} from "react-router";

export default function EmployeeInformation() {
    const [employeeDetail, setEmployeeDetail] = useState()
    const navigate = useNavigate()
    const params = useParams();
    const [isAuth, setIsAuth] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [firebaseImg, setImg] = useState(null);
    const [avatar, setAvatarFile] = useState();
    const [avatarUrl, setAvatarUrl] = useState();
    const defaultAvatar = "https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png";
    const messageError = "Các trường ảnh không được để trống!!";

    const [showPassword, setShowPassword] = useState(false);
    const [getPassword, setGetPassword] = useState([]);

    const handleUpdateClick = () => {
            const maKhau = document.getElementById('maKhau');
            const nhapLaiMatKhau = document.getElementById('nhapLaiMatKhau');

            if (maKhau.value !== nhapLaiMatKhau.value) {
                alert('Mật khẩu không trùng khớp. Vui lòng nhập lại.');
                return;
            }
    };

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const getMinDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 15,
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
    useEffect( () => {
        const fectApi = async ()=>{
            try {
                const res = await employeeInformationService.findById(params.id);
                setEmployeeDetail(res);
                console.log(res)

            } catch (error) {
                console.log(error)
            }
        }
        fectApi()
    }, [params.id])

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const handleFileUpload = async () => {
        return new Promise((resolve, reject) => {
            const file = setAvatarFile;
            if (!file) return reject("No file selected");
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
                    resolve(downloadURL);
                }
            );
        });
    };

    useEffect(() => {
        document.title = "Thông tin tài khoản";
    }, [])
    useEffect(() => {
        setAvatarUrl(employeeDetail?.image)
        setGetPassword(employeeDetail?.users.password)
    }, [employeeDetail?.image])

    const handleAvatarFileSelect = (event) => {
        handleFileSelect(event, setAvatarFile);
    };

    const handleAvatarFileUpload = async () => {
        if (avatarUrl) {
            return avatarUrl
        } else
            return await handleFileUpload(avatar, setAvatarUrl);
    };
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{

                    id: employeeDetail?.id,
                    name: employeeDetail?.name,
                    gender: employeeDetail?.gender.toString(),
                    birthDay: employeeDetail?.birthDay,
                    salary: isAuth ? employeeDetail?.salary : employeeDetail?.salary.toLocaleString(),
                    phoneNumber: employeeDetail?.phoneNumber,
                    email: employeeDetail?.email,
                    address: employeeDetail?.address,
                    image: employeeDetail?.image,
                    citizenCode: employeeDetail?.citizenCode,
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Không được bỏ trống')
                        .matches(/^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/, 'Tên phải đúng định dạng. VD: Nguyễn Văn A')
                        .min(5, 'Ký tự phải nhiều hơn 5')
                        .max(100, 'Ký tự phải ít hơn 100'),
                    birthDay: Yup.date().required('Không được bỏ trống').max(getMinDate(), 'Người dùng phải từ 15 tuổi trở lên').min(getMaxDate(), 'Người dùng không được quá 100 tuổi'),
                    gender: Yup.string().required('Không được bỏ trống'),
                    salary: Yup.number().typeError("Số lương phải là một số").required("Không được bỏ trống").positive("Số lương phải là số dương").min(1000000, "Số lương không được dưới 1 triệu").max(100000000, "Số lương không được quá 100 triệu"),
                    phoneNumber: Yup.string().required('Không được bỏ trống')
                        .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Nhập đúng định dạng SDT VD: 0903.XXX.XXX (X là chữ số)'),
                    address: Yup.string().required('Không được bỏ trống'),
                    email: Yup.string().required('Không được bỏ trống').email('Nhập đúng định dạng email'),
                    citizenCode: Yup.string().required('Không được bỏ trống')
                })}
                onSubmit={(value, {setSubmitting}) => {
                    const editEmployee = async () => {
                        try {
                            const maKhau = document.getElementById("maKhau").value;
                            if (maKhau !== getPassword) {
                                await Swal.fire({
                                    icon: "error",
                                    title: "Mật khẩu không đúng",
                                    text: "Vui lòng nhập lại mật khẩu",
                                    timer: 1500
                                });
                                setSubmitting(false);
                                return;
                            }
                            value.gender = parseInt(value.gender);
                            await handleAvatarFileUpload()
                            const newValues = {...value, image: firebaseImg};
                            newValues.image = await handleAvatarFileUpload();
                            await employeeInformationService.update({
                                ...newValues,
                            })

                            setSubmitting(false)
                            await Swal.fire({
                                icon: 'success',
                                title: 'Chỉnh sửa thông tin thành công. Nhân viên ' + value.name,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } catch
                            (error) {
                            console.log(error);
                            await Swal.fire({
                                icon: "error",
                                title: "Thất bại",
                            });
                            setSubmitting(false);
                        }
                    }
                    editEmployee()
                }}
            >
                {({values, isSubmitting}) => (
                    <Form>
                        <div className="container m-auto">
                            <div className="row row-no-gutters col-xs-8 col-md-8 m-auto">
                                <h2 className="d-flex justify-content-center"
                                    style={{padding: "10px", backgroundColor: "#00833e", color: "#fff"}}>
                                    <b>THÔNG TIN CÁ NHÂN</b>
                                </h2>
                                <div className="col-md-3" style={{textAlign: "center", display: "block"}}>
                                    <img
                                        id="avatar-img"
                                        src={avatarUrl ? avatarUrl : (avatar ? URL.createObjectURL(avatar) : defaultAvatar)}
                                        style={{width: "100%"}}
                                        alt="avatar"
                                    />
                                    {avatarUrl && (
                                        <div>
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
                                        </div>
                                    )}

                                    <label className="mt-2 text-file-name">
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
                                    {fileSelected ? null : (
                                        <span className="error-flag"><br/> {messageError}</span>
                                    )}
                                </div>
                                <div className="col-md-9">
                                    <div className="mt-4 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="tenDangNhap" className="form-label">
                                                Tên đăng nhập</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={employeeDetail?.users.username}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <Field
                                        id="f-id"
                                        className="form-control"
                                        name="id"
                                        type="number"
                                        hidden
                                    />
                                    <div className="mt-2 inputs row">
                                        <>
                                            <div className="mt-2 inputs row">
                                                <div className="col-md-3">
                                                    <label htmlFor="maKhau" className="form-label">
                                                        Mật khẩu
                                                    </label>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="input-group">
                                                        <input
                                                            id="maKhau"
                                                            type={showPassword ? 'text' : "password"}
                                                            className="form-control"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={handleToggleShowPassword}
                                                        >
                                                            {showPassword ? 'Ẩn' : 'Hiện'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 inputs row">
                                                <div className="col-md-3">
                                                    <label htmlFor="nhapLaiMatKhau" className="form-label">
                                                        Nhập lại mật khẩu
                                                    </label>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="input-group">
                                                        <input
                                                            id="nhapLaiMatKhau"
                                                            type={showPassword ? 'text' : "password"}
                                                            className="form-control"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={handleToggleShowPassword}
                                                        >
                                                            {showPassword ? 'Ẩn' : 'Hiện'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="hoTen" className="form-label">
                                                Họ và tên
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Field id="hoTen" name="name" type="text" className="form-control"/>
                                            <ErrorMessage component="span"
                                                          name="name"
                                                          className="error-flag"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label className="form-label">Giới tính:</label>
                                        </div>
                                        <div className="d-flex col-md-9">
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="nam">
                                                    Nam
                                                </label>
                                                <Field type="radio" className="form-check-input" name="gender" value="0"
                                                />
                                            </div>
                                            <div className="form-check" style={{marginLeft: "10px"}}>
                                                <label className="form-check-label" htmlFor="nu">
                                                    Nữ
                                                </label>
                                                <Field type="radio" className="form-check-input" name="gender"
                                                       value="1"/>
                                            </div>
                                            <div className="form-check" style={{marginLeft: "10px"}}>
                                                <label className="form-check-label" htmlFor="khac">
                                                    Khác
                                                </label>
                                                <Field type="radio" className="form-check-input" name="gender"
                                                       value="2"/>
                                            </div>
                                            <ErrorMessage component="span"
                                                          name="gender"
                                                          className="error-flag"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="ngaySinh" className="form-label">
                                                Ngày sinh:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Field id="ngaySinh" name="birthDay" type="date" className="form-control"/>
                                            <ErrorMessage component="span"
                                                          name="birthDay"
                                                          className="error-flag"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="email" className="form-label">
                                                Email:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Field id="email" name="email" type="text" className="form-control"/>
                                            <ErrorMessage component="span"
                                                          name="email"
                                                          className="error-flag"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="diaChi" className="form-label">
                                                Địa chỉ:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Field id="diaChi" name="address" type="text" className="form-control"/>
                                            <ErrorMessage component="span"
                                                          name="address"
                                                          className="error-flag"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="soDienThoai" className="form-label">
                                                Số điện thoại:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Field id="soDienThoai" name="phoneNumber" type="text"
                                                   className="form-control"/>
                                            <ErrorMessage component="span"
                                                          name="phoneNumber"
                                                          className="error-flag"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="CMND/CCCD" className="form-label">
                                                CMND/CCCD:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <Field id="CMND/CCCD" name="citizenCode" type="text"
                                                   className="form-control"/>
                                            <ErrorMessage component="span"
                                                          name="citizenCode"
                                                          className="error-flag"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="mt-2 inputs col-md-3"></div>
                                        <div className="mt-2 inputs col-md-9 row">


                                            <div className="row">
                                                {
                                                    isSubmitting
                                                        ?
                                                        <div className="d-flex justify-content-center mt-4 ms-4">
                                                            <RotatingLines
                                                                strokeColor="grey"
                                                                strokeWidth="5"
                                                                animationDuration="0.75"
                                                                width="30"
                                                                visible={true}
                                                            />
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="text-center mt-2 btn-group col-md-6">
                                                                <button type="button" className="btn btn-secondary">
                                                                    <b>Quay lại</b>
                                                                </button>
                                                            </div>
                                                            <div className="text-center mt-2 btn-group col-md-6">
                                                                <button
                                                                    onClick={handleUpdateClick}
                                                                    type="submit" className="btn btn-success">
                                                                    <b>Cập nhật</b>
                                                                </button>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
                }
            </Formik>
        </>
    )
}