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
const [name,setName] =useState("")
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
                contendNote: "",
                productTypeId: 0
            }}
                    validationSchema={yup.object({
                        name: yup.string().required(),
                        phone: yup.string().required(),
                        email: yup.string().required(),
                        address: yup.string().required(),
                        contendNote: yup.string().required(),
                        productTypeId: yup.number().required()

                    })}
                    onSubmit={(values,{resetForm}) => {
                        console.log(values)
                        const create = async () => {
                            const serviceCurrent = productType.find(item => item.id === Number(values.productTypeId));
                            console.log(serviceCurrent, productType);
                            const {productTypeId, ...body} = values;
                           const er = await service.save({ // spread
                                ...body,
                                productType: serviceCurrent
                            })
                            setName(er.response.data.name)
                            console.log(er.response.data.phone)
                            console.log(er.response.data.email)
                            console.log(er.response.data.name)
                            console.log(er.response.data.contendNote)
                            console.log(er.response.data.address)
                            await sweat.fire({
                                icon: "success",
                                title: `Register ${values.name} successfully !!!`,
                                timer: "2000"
                            })
                            navigate("/")
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
                                    alt="" style={{backgroundColor: "white"}}/>
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
                                                    <option>---chọn----</option>
                                                    {
                                                        productType && productType.map((s) => (
                                                            <option key={s.id}
                                                                    value={s.id}>{s.name}</option>
                                                        ))
                                                    }

                                                </Field>
                                                <ErrorMessage className='form-err' component='span'  name='productTypeId'/>
                                            </div>
                                            <div className="mt-2 inputs">
                                                <label>Họ tên</label>
                                                <Field type="text" className="form-control" name='name'/>
                                                <ErrorMessage className='form-err' component='span' name='name'/>
                                                <p>{name}</p>
                                            </div>
                                            <div className="mt-2 inputs">
                                                <label>Số điện thoại</label>
                                                <Field type="text" className="form-control" name='phone'/>
                                                <ErrorMessage className='form-err' component='span' name='phone'/>
                                            </div>
                                            <div className="mt-2 inputs">
                                                <label>Email</label>
                                                <Field type="text" className="form-control" name='email'/>
                                                <ErrorMessage className='form-err' component='span' name='email'/>
                                            </div>
                                            <div className="mt-2 inputs">
                                                <label>Địa chỉ</label>
                                                <Field type="text" className="form-control" name='address'/>
                                                <ErrorMessage className='form-err' component='span' name='address'/>
                                            </div>
                                            <div className="mt-2 inputs">
                                                <label>Nội Dung - Ghi Chú</label>
                                                <Field as="textarea" type="text" className="form-control"
                                                       name='contendNote'/>
                                                <ErrorMessage className='form-err' component='span' name='contendNote'/>
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