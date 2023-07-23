import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import *as employeeInformationService from "../../service/EmployeeInformationService"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import {useParams} from "react-router";
import {ThreeCircles} from "react-loader-spinner";
import bcrypt from "bcryptjs";

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
    const messageError = "Ảnh không được để trống!!";
    const [isEditing, setIsEditing] = useState(true);
    const [newPass, setNewPass] = useState(0);

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(false);
    }

    const [showPassword, setShowPassword] = useState(false);
    const [getPassword, setGetPassword] = useState('');
    const [inputPassword, setInputPassword] = useState('');

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
    useEffect(() => {
        const fectApi = async () => {
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

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const isPasswordMatch = await bcrypt.compare(inputPassword, getPassword);

            if (!isPasswordMatch) {
                await Swal.fire({
                    icon: "error",
                    title: "Mật khẩu không đúng",
                    text: "Vui lòng nhập lại mật khẩu",
                    timer: 1500
                });
                setSubmitting(false);
                setNewPass(newPass + 1);
                if (newPass >= 5) {
                    Swal.fire({
                        title: 'Xác nhận đổi mật khẩu?',
                        text: "Bạn đã nhập sai quá 5 lần!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Đồng ý đổi!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                           navigate("/login/forgot")
                        }
                    })
                    return;
                }
                return;
            }

            values.gender = parseInt(values.gender);
            await handleAvatarFileUpload()
            const newValues = {...values, image: firebaseImg};
            newValues.image = await handleAvatarFileUpload();
            await employeeInformationService.update({
                ...newValues,
            })

            setSubmitting(false)
            await Swal.fire({
                icon: 'success',
                title: 'Chỉnh sửa thông tin thành công.',
                text: 'Nhân viên ' + values.name,
                showConfirmButton: false,
                timer: 1500
            })
        } catch
            (error) {
            console.log(error);
            await Swal.fire({
                icon: "error",
                title: "Thất bại",
                text: "Vui lòng thực hiện lại."
            });
            setSubmitting(false);
        }
    }

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
                onSubmit={handleSubmit}
            >
                {
                    ({isSubmitting}) => (
                        <div className="dat-nt container mt-5 mb-5">
                            <div className="row height d-flex justify-content-center align-items-center">
                                <div className="col-md-8 col-sm-12">
                                    <div className="card px-5 py-4">
                                        <div
                                            className="m-2"
                                        >
                                            <h2 style={{textAlign: "center"}}>THÔNG TIN CÁ NHÂN</h2>
                                        </div>
                                        <Form>
                                            <div className="row">
                                                <div className="col-md-4"
                                                     style={{textAlign: "center", display: "block"}}>
                                                    <img
                                                        id="avatar-img"
                                                        src={avatarUrl ? avatarUrl : (avatar ? URL.createObjectURL(avatar) : defaultAvatar)}
                                                        style={{width: "100%"}}
                                                        alt="avatar"
                                                    />
                                                    {avatarUrl && (
                                                        <div className="mt-2">
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
                                                        <p>
                                                            <label
                                                                htmlFor="image"
                                                                style={{
                                                                    display: "flex",
                                                                    padding: "6px 12px",
                                                                    border: "1px ",
                                                                    borderRadius: "4px",
                                                                    backgroundColor: "#ccffc6",
                                                                    justifyContent: "center",

                                                                }}
                                                            >
                                                                <i className="bi bi-upload"> Chọn hình ảnh</i>
                                                            </label>
                                                        </p>
                                                    )}
                                                    {fileSelected || avatarUrl ? null : (
                                                        <span className="text-danger"><br/> {messageError}</span>
                                                    )}
                                                </div>
                                                <div className="col-md-8">
                                                    <label id="label-dat" htmlFor="tenDangNhap">
                                                        Tên đăng nhập
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={employeeDetail?.users.username}
                                                        disabled
                                                    />
                                                    <Field
                                                        id="f-id"
                                                        className="form-control"
                                                        name="id"
                                                        type="number"
                                                        hidden
                                                    />

                                                    <label className="mt-2" id="label-dat" htmlFor="hoTen">
                                                        Họ và tên
                                                        <span style={{color: "red"}}> *</span>
                                                    </label>
                                                    <div className="mt-2">
                                                        {!isEditing ? (
                                                            <Field id="hoTen" name="name" type="text"
                                                                   className="form-control"/>
                                                        ) : (
                                                            <div className="ms-2">{employeeDetail?.name}</div>
                                                        )}
                                                        <ErrorMessage component="span"
                                                                      name="name"
                                                                      className="text-danger"/>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="mt-2">
                                                            <label id="label-dat">
                                                                Giới tính
                                                                <span style={{color: "red"}}> *</span></label>
                                                        </div>
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
                                                    </div>

                                                    <ErrorMessage component="span"
                                                                  name="gender"
                                                                  className="text-danger"/>
                                                    <div className="mt-2"><label id="label-dat" htmlFor="ngaySinh">
                                                        Ngày sinh
                                                        <span style={{color: "red"}}> *</span>
                                                    </label></div>
                                                    <Field id="ngaySinh" name="birthDay" type="date"
                                                           className="form-control"/>
                                                    <ErrorMessage component="span"
                                                                  name="birthDay"
                                                                  className="text-danger"/>
                                                    <div className="mt-2">
                                                        <label id="label-dat" htmlFor="email">
                                                            Email
                                                            <span style={{color: "red"}}> *</span>
                                                        </label></div>
                                                    {!isEditing ? (
                                                        <Field id="email" name="email" type="text"
                                                               className="form-control"/>
                                                    ) : (
                                                        <div className="ms-2">{employeeDetail?.email}</div>
                                                    )}
                                                    <ErrorMessage component="span"
                                                                  name="email"
                                                                  className="text-danger"/>
                                                    <div className="mt-2">
                                                        <label id="label-dat" htmlFor="diaChi">
                                                            Địa chỉ<span style={{color: "red"}}> *</span>
                                                        </label></div>
                                                    {!isEditing ? (
                                                        <Field id="diaChi" name="address" type="text"
                                                               className="form-control"/>) : (
                                                        <div className="ms-2">{employeeDetail?.address}</div>
                                                    )}
                                                    <ErrorMessage component="span"
                                                                  name="address"
                                                                  className="text-danger"/>
                                                    <div className="mt-2">
                                                        <label id="label-dat" htmlFor="soDienThoai">
                                                            Số điện thoại<span style={{color: "red"}}> *</span>
                                                        </label></div>
                                                    {!isEditing ? (
                                                        <Field id="soDienThoai" name="phoneNumber" type="text"
                                                               className="form-control"/>
                                                    ) : (
                                                        <div className="ms-2">{employeeDetail?.phoneNumber}</div>
                                                    )}
                                                    <ErrorMessage component="span"
                                                                  name="phoneNumber"
                                                                  className="text-danger"/>
                                                    <div className="mt-2">
                                                        <label id="label-dat" htmlFor="CMND/CCCD">
                                                            Số căn cước<span style={{color: "red"}}> *</span>
                                                        </label></div>
                                                    {!isEditing ? (
                                                        <Field id="CMND/CCCD" name="citizenCode" type="text"
                                                               className="form-control"/>
                                                    ) : (
                                                        <div className="ms-2">{employeeDetail?.citizenCode}</div>
                                                    )}
                                                    <ErrorMessage component="span"
                                                                  name="citizenCode"
                                                                  className="text-danger"/>
                                                    {isEditing ? (<hr/>) : (<>
                                                            <label id="label-dat" htmlFor="maKhau"
                                                                   className="form-label mt-2">
                                                                Mật khẩu<span style={{color: "red"}}> *</span>
                                                            </label>
                                                            <div className="input-group">
                                                                <input
                                                                    value={inputPassword}
                                                                    onChange={(e) => setInputPassword(e.target.value)}
                                                                    type={showPassword ? 'text' : "password"}
                                                                    className="form-control m-0"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-secondary"
                                                                    onClick={handleToggleShowPassword}
                                                                >
                                                                    {showPassword ? <i class="bi bi-eye-slash"></i> :
                                                                        <i class="bi bi-eye"></i>}
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                <div className="mt-2 inputs row">

                                                    {
                                                        isSubmitting
                                                            ?
                                                            <div
                                                                className="d-flex justify-content-center mt-4 ms-4">
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
                                                            </div>
                                                            :
                                                            <div className="mt-3 mb-3">
                                                                <div className="text-center m-auto">
                                                                    <div className="d-flex justify-content-center"
                                                                         style={{
                                                                             marginLeft: "3vw"
                                                                         }}>
                                                                        <div
                                                                            className="text-center">
                                                                            <Link
                                                                                style={{
                                                                                    marginLeft: "4vw",
                                                                                    marginRight: "8vw",
                                                                                    width: "130px"
                                                                                }}
                                                                                type="button"
                                                                                className="btn btn-secondary m-0"
                                                                                to={"/nav/info-store"}
                                                                            >
                                                                                <b className="text-center">Quay lại</b>
                                                                            </Link>
                                                                        </div>
                                                                        <div
                                                                            className="text-center ms-lg-3 ms-md-2 ms-sm-2">
                                                                            {isEditing ? (
                                                                                <button
                                                                                    className="btn btn-success"
                                                                                    style={{
                                                                                        marginLeft: "4vw",
                                                                                        width: "130px"
                                                                                    }}
                                                                                    onClick={handleEditClick}
                                                                                >
                                                                                    <b className="text-center">Chỉnh
                                                                                        sửa</b>
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-success"
                                                                                    style={{
                                                                                        marginLeft: "4vw",
                                                                                        width: "130px"
                                                                                    }}
                                                                                >
                                                                                    <b className="text-center">Cập
                                                                                        nhật</b>
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Formik>
        </>
    )
}