import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as service from "../../service/RegisterPawnService"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup"
import sweat from "sweetalert2"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/home.css"

export function RegisterPawn() {


    // cần list để hiện ra
    // const getById = async (id) => {
    //     await service.getById(id);
    //
    //     // hiện lại ra cái danh sách   getAllBill();
    // }
    //
    // function confirmRegisterPawn(id,name) {
    //     sweat.fire({
    //             icon: "warning",
    //             title: `Bạn Có Muốn Xác Nhận Khách Hàng ${name} Đăng Ký Cầm Đồ Không ?`,
    //             showCancelButton: true,
    //             confirmButtonText: "OK"
    //         }
    //     ).then(async (isConfirm) => {
    //         if (isConfirm.isConfirmed) {
    //             getById(id);
    //         }
    //     })
    //
    // }
    //
    //


    const navigate = useNavigate();
    const [productType, setProductType] = useState([]);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contentNote, setContentNote] = useState("")
    useEffect(() => {
        const getAll = async () => {
            const res = await service.getAllServicePawn()
            setProductType(res)
        }
        getAll()
    }, [])
    // if (!productType) {
    //     return null
    // }

    return (
        <>
            <Formik initialValues={{
                name: "",
                phone: "",
                email: "",
                address: "",
                contentNote: "",
                productTypeId: 0
            }}
                    validationSchema={yup.object({
                        name: yup.string().required("bạn không không thể để trống"),
                        phone: yup.string().required("bạn không không thể để trống"),
                        email: yup.string().required("bạn không không thể để trống"),
                        address: yup.string().required("bạn không không thể để trống"),
                        contentNote: yup.string().required("bạn không không thể để trống"),
                        productTypeId: yup.number().required("bạn không không thể để trống").min(1,'vui long chọn')

                    })}
                    onSubmit={(values, {resetForm}) => {
                        console.log(values)
                        const create = async () => {
                            const serviceCurrent = productType.find(item => item.id === Number(values.productTypeId));
                            const {productTypeId, ...body} = values;
                            const value = await service.save({ // spread
                                ...body,
                                productType: serviceCurrent
                            })


                            if(value && value?.status !== 200){
                                setName(value.response.data.name)
                                setPhone(value.response.data.phone)
                                setEmail(value.response.data.email)
                                setContentNote(value.response.data.contentNote)
                                setAddress(value.response.data.address)
                            }
                            else {
                                await sweat.fire({
                                    icon: "success",
                                    title: `Register ${values.name} successfully !!!`,
                                    timer: "2000"
                                })
                                navigate("/")
                            }
                        }
                        create()
                        resetForm();
                    }}>
                {
                    <div className="card-register" style={{backgroundColor: "white"}}>
                        <div className="card-register-left">
                            <div className="title">ĐIỀU KIỆN ĐẢM BẢO AN TOÀN</div>
                            <div className="content">
                                Tiệm cầm đồ <span style={{color: "red"}}>Pawn Shop</span> tuân thủ
                                nghiêm ngặt quy trình của Nhà nước về lĩnh vực cầm đồ, cầm cố tài sản
                                với lãi suất trong giới hạn cho phép của cơ quan có thẩm quyền. Đặc
                                biệt, tiệm cầm đồ này có đội ngũ nhân viên chuyên nghiệp, khảo sát giá
                                trị mặt hàng, tài sản cầm cố một cách nhanh chóng, thủ tục đơn giản tạo
                                điều kiện tốt nhất cho khách hàng khi có nhu cầu
                            </div>
                            <div>
                                <img
                                    src="https://chovayhanoi.com/wp-content/uploads/2020/02/024060710868.png"
                                    alt="" style={{backgroundColor: "white",marginTop : "3rem"}}/>
                                <h5 className="uppercase">Kinh Doanh Cầm Đồ</h5>
                            </div>
                        </div>
                        <div id="create" className="card-register-right">
                            <div className="container-fluid">
                                <div className="height d-flex justify-content-center align-items-center">
                                    <div className="register-form">
                                        <div style={{textAlign: "center"}}>
                                            <h3>Đăng Ký Cầm Đồ</h3>
                                        </div>
                                        <Form>
                                            <div className="mt-4 inputs">
                                                <Field as='select' aria-label="Default select example"
                                                    className="form-select" name='productTypeId'>
                                                    <option value={0}>Chọn</option>
                                                    {
                                                        productType && productType.map((s) => (
                                                            <option key={s.id}
                                                                    value={s.id}>{s.name}</option>
                                                        ))
                                                    }

                                                </Field>
                                                <ErrorMessage className='form-err' component='span'
                                                              name='productTypeId'/>
                                            </div>
                                            <div className="mt-5 inputs">
                                                <label style={{marginTop:"-2rem"}} className="label-thang" >Họ tên <span style={{color : "red"}}>*</span></label>
                                                <Field type="text" className="form-control" name='name'/>
                                                <ErrorMessage className='form-err' component='span' name='name'/>
                                                 <p style={{color: "red",fontFamily : "Times New Roman",fontWeight:"500"}}>{name}</p>
                                            </div>
                                            <div className="mt-2 inputs">
                                                <label  className="label-thang" >Số điện thoại <span style={{color : "red"}}>*</span></label>
                                                <Field type="text" className="form-control" name='phone'/>
                                                <ErrorMessage className='form-err' component='span' name='phone'/>
                                                 <p style={{color: "red",fontFamily : "Times New Roman",fontWeight:"500"}}>{phone}</p>
                                            </div>
                                            <div className="mt-2 inputs">
                                                <label  className="label-thang" >Email <span style={{color : "red"}}>*</span></label>
                                                <Field type="text" className="form-control" name='email'/>
                                                <ErrorMessage className='form-err' component='span' name='email'/>
                                                 <p style={{color: "red",fontFamily : "Times New Roman",fontWeight:"500"}}>{email}</p>

                                            </div>
                                            <div className="mt-2 inputs">
                                                <label  className="label-thang" >Địa chỉ <span style={{color : "red"}}>*</span></label>
                                                <Field type="text" className="form-control" name='address'/>
                                                <ErrorMessage className='form-err' component='span' name='address'/>
                                                 <p style={{color: "red",fontFamily : "Times New Roman",fontWeight:"500"}}>{address}</p>

                                            </div>
                                            <div className="mt-2 inputs">
                                                <label  className="label-thang" >Nội dung - Ghi chú <span style={{color : "red"}}>*</span></label>
                                                <Field id="select-pawn" as="textarea" type="text" className="form-control"
                                                       name='contentNote'/>
                                                <ErrorMessage className='form-err' component='span' name='contentNote'/>
                                                 <p style={{color: "red",fontFamily : "Times New Roman",fontWeight:"500"}}>{contentNote}</p>

                                            </div>
                                            <div className="text-center mt-4 btn-group">
                                                <button type="submit" className=" btn btn-success integration">
                                                    <b>Đăng ký</b>
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/*<button onClick={() => confirmRegisterPawn()}>Xác Nhận</button>*/}

            </Formik>

        </>
    )
}