import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, Link} from "react-router-dom";
import employeeInformationService from "../../service/EmployeeInformationService"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase";
import positionService from "../../service/positionService"
import {RotatingLines} from "react-loader-spinner";

export default function EmployeeInformation() {
    const [employeeDetail, setEmployeeDetail] = useState()
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [isChangeImg, setIsChangeImg] = useState(false);
    const [avatarDetail, setAvatarDetail] = useState('')
    const [avatarErr, setAvatarErr] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [isAuth, setIsAuth] = useState(false);

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
        (async () => {
            try {
                const res = await employeeInformationService.detail()
                setEmployeeDetail(res.data)
                if (res.data.account.accountRoles[0].role.nameRole === 'ROLE_ADMIN') {
                    setIsAuth(true)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file instanceof File || file instanceof Blob) {
            const extension = file.name
            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(extension);
            !isImage ? setAvatarErr(true) : setAvatarErr(false)
            setSelectedFile(file);
            setIsChangeImg(true)
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setAvatarDetail(imageUrl);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Invalid file or blob');
        }
    };
    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("No file selected");
            const extension = file.name
            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(extension);
            !isImage ? setAvatarErr(true) : setAvatarErr(false)
            if (!isImage) return console.log("Wrong image format")
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
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
    }
    useEffect(() => {
        document.title = "Thông tin tài khoản";
    }, [])
    useEffect(() => {
        setAvatarDetail(employeeDetail?.image)
    }, [employeeDetail?.image])

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{

                    id: employeeDetail?.id,
                    name: employeeDetail?.name,
                    gender: employeeDetail?.gender,
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
                            if (isChangeImg) {
                                const newValues = {...value, image: firebaseImg};
                                newValues.image = await handleSubmitAsync();
                                await employeeInformationService.update({
                                    ...newValues,
                                })
                            } else {
                                await employeeInformationService.update({
                                    ...value,
                                    citizenCode: {
                                        idPosition: value.citizenCode
                                    }
                                })
                                setIsChangeImg(false)
                            }
                            setSubmitting(false)
                            Swal.fire({
                                icon: 'success',
                                title: 'Chỉnh sửa thông tin thành công. Nhân viên ' + value.name,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } catch (error) {
                            console.log(error);
                            if (error) {
                                setSubmitting(false)
                            }
                            if (error.response.data.message === 'Email đã tồn tại') {
                                setShowErr(true)
                            } else {
                                setShowErr(false)
                            }
                        }
                    }
                    editEmployee()
                }}
            >
                {({values, isSubmitting}) => (
                    <Form>
                        <div className="container " style={{marginTop: "10%"}}>
                            <div className="row row-no-gutters col-xs-12 col-md-12">
                                <div className="col-xs-4 col-md-4" id="a">
                                    <p className="text-center avatar" style={{marginTop: 10}}>
                                        {
                                            avatarErr ? <div>
                                                    <h5 className="text-danger" width='100%' height='100%'>Sai định dạng
                                                        ảnh, phải có dạng đuôi .jpg, .jpeg, .png</h5>
                                                </div> :
                                                <div>
                                                    <img
                                                        src={avatarDetail}
                                                        className="border-avatar rounded-circle" width='200px'
                                                        height='200px' alt="image"/>
                                                </div>
                                        }
                                        {
                                            isAuth && <div className={!avatarErr && "border-camera"}>
                                                <label htmlFor="avatar" type='button'
                                                       className="bi bi-camera-fill fs-2"></label>
                                                <input
                                                    type="file"
                                                    onChange={handleFileSelect}
                                                    className='d-none' id='avatar' name='image'/>
                                            </div>
                                        }

                                    </p>
                                    <h3 style={{textAlign: "center"}}>{employeeDetail?.account.nameAccount}</h3>
                                    <div className="mt-3" style={{textAlign: "center"}}>
                                        <i className="bi bi-emoji-smile me-1"/>
                                        Chào mừng bạn trở lại
                                    </div>
                                    <hr/>
                                    <div className="col-12">
                                        <ul className="datnt-app-menu">
                                            <li className="datnt-li">
                                                <NavLink to={`/account/change-password`}
                                                         className="datnt-app-menu__item " href="ChangePassword.html">
                                                    <i className="bi bi-file-lock"/>
                                                    <span className="datnt-app-menu__label">Đổi mật khẩu</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <h2 className="d-flex justify-content-center"
                                    style={{padding: "10px", backgroundColor: "#00833e", color: "#fff"}}>
                                    <b>THÔNG TIN CÁ NHÂN</b>
                                </h2>
                                <div className="col-md-3" style={{textAlign: "center", display: "block"}}>
                                    <img
                                        id="avatar-img"
                                        src="https://bizweb.dktcdn.net/100/175/849/files/chup-anh-nu-doanh-nhan-dep-nhat-ha-noi-cho-doanh-nghiep-cong-ty-studio-nao-02.jpg?v=1619414255120"
                                        width="100%"
                                        alt="avatar"
                                    />
                                    <label className="mt-2" style={{textAlign: "center", display: "block"}}
                                           htmlFor="avatar-img">
                                        Ảnh đại diện
                                    </label>
                                </div>
                                <div className="col-md-9">
                                    <div className="mt-4 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="tenDangNhap" className="form-label">
                                                Tên đăng nhập:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                id="tenDangNhap"
                                                type="text"
                                                className="form-control"
                                                placeholder="nhan_vien"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="maKhau" className="form-label">
                                                Mật khẩu:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="maKhau" type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="nhapLaiMatKhau" className="form-label">
                                                Nhập lại mật khẩu:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="nhapLaiMatKhau" type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="hoTen" className="form-label">
                                                Họ tên:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="hoTen" type="text" className="form-control"/>
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
                                                <input type="radio" className="form-check-input" name="gender" id="nam"
                                                       defaultChecked/>
                                            </div>
                                            <div className="form-check" style={{marginLeft: "10px"}}>
                                                <label className="form-check-label" htmlFor="nu">
                                                    Nữ
                                                </label>
                                                <input type="radio" className="form-check-input" name="gender" id="nu"/>
                                            </div>
                                            <div className="form-check" style={{marginLeft: "10px"}}>
                                                <label className="form-check-label" htmlFor="khac">
                                                    Khác
                                                </label>
                                                <input type="radio" className="form-check-input" name="gender"
                                                       id="khac"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="ngaySinh" className="form-label">
                                                Ngày sinh:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="ngaySinh" type="date" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="email" className="form-label">
                                                Email:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="email" type="text" className="form-control"/>
                                            {showErr ? (
                                                <span className="text-danger">Email đã tồn tại</span>
                                            ) : (
                                                <ErrorMessage component="span" className="text-danger" name="email"/>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="diaChi" className="form-label">
                                                Địa chỉ:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="diaChi" type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="soDienThoai" className="form-label">
                                                Số điện thoại:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="soDienThoai" type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="col-md-3">
                                            <label htmlFor="CMND/CCCD" className="form-label">
                                                CMND/CCCD:
                                            </label>
                                        </div>
                                        <div className="col-md-9">
                                            <input id="CMND/CCCD" type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs row">
                                        <div className="mt-2 inputs col-md-3"></div>
                                        <div className="mt-2 inputs col-md-9 row">
                                            <div className="text-center mt-2 btn-group col-md-6">
                                                <button type="submit" className="btn btn-secondary">
                                                    <b>Quay lại</b>
                                                </button>
                                            </div>
                                            <div className="text-center mt-2 btn-group col-md-6">
                                                <button type="button" className="btn btn-success" onClick={update}>
                                                    <b>Sửa</b>
                                                </button>
                                            </div>

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
                                                            <div className="col-12" style={{textAlign: "center"}}>
                                                                <Link
                                                                    to={"/"}
                                                                    className={"btn-datnt"}
                                                                    type="button"
                                                                    style={{
                                                                        backgroundColor: "#B29A81",
                                                                        width: 80,
                                                                        color: "#ffffff",
                                                                        padding: 5,
                                                                        textAlign: "center",
                                                                        marginRight: 10,
                                                                        paddingRight: 5,
                                                                        borderRadius: 10,
                                                                        border: "none",
                                                                        letterSpacing: '0px',
                                                                        textDecoration: "none"
                                                                    }}
                                                                >
                                                                    Quay về
                                                                </Link>
                                                                <button
                                                                    className={"btn-datnt"}
                                                                    type={avatarErr || !isAuth ? "button" : "submit"}
                                                                    style={{
                                                                        backgroundColor: "#8C6842",
                                                                        width: 80,
                                                                        color: "#ffffff",
                                                                        padding: 5,
                                                                        textAlign: "center",
                                                                        marginRight: 10,
                                                                        paddingRight: 5,
                                                                        borderRadius: 10,
                                                                        border: "none",
                                                                        letterSpacing: '0px'
                                                                    }}
                                                                >
                                                                    Cập nhật
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
                )}
            </Formik>
        </>
    )
}