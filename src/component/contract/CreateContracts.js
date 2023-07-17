
import * as contractService from "../service/ContractService";
import React,{useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";


export const CreateContracts = () => {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    const [current, setCurrent] = useState(0);

    const [pageCount, setPageCount] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [productType, setProductType] = useState([]);
    const [customers, setCustomer] = useState([]);
    const [code, setCode] = useState('');
    const [idCustomer, setIdCustomer] = useState(0);
    const  n=useNavigate();
    useEffect(() => {
        const getAllCustomer = async () => {
            const res = await contractService.findAllCustomer()
            setCustomer(res.content)

        }
        getAllCustomer()
    }, [])

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const getAllProductType = async () => {
        const res = await contractService.findAllProductType();
        setProductType(res)
    }
    // const paginate = (page) => {
    //     if (page > 1) {
    //         setPage(page - 1)
    //     } else {
    //         setPage(page)
    //
    //     }
    // }
    const createContractCodeApi = async () => {
        const res = await contractService.createCodeContract();
        console.log(res)
        setCode(res);
    }
    console.log(customers.find((cus) => cus.id == idCustomer)?.name)
    console.log(idCustomer)
    const handlePageClick = async (page) => {
        // setCurrent(+page.selected);
        // const res=await contractService.searchCustomer(customers,page.selected);
        // setCustomer(res.content);
        // setPageCount(Math.ceil(res.size*page.selected+1))
    }

    useEffect(() => {
        getAllProductType()
        createContractCodeApi()
    }, [])
    return (
        <>
            <div className="container">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card px-5 py-4">
                            <div style={{textAlign: "center"}}>
                                <h1>Thêm mới dịch vụ cầm đồ</h1>
                            </div>
                            <Formik initialValues={{
                                customers: '',
                                contractCode: code,
                                productName: '',
                                productType: 0,
                                image: '',
                                loans: '',
                                startDate: '',
                                endDate: '',
                                profit: '',
                                contractStatus: '',
                                contractType: '',
                                employees: '',
                            }}

                                    onSubmit={async (values, {setSubmitting}) => {
                                        const createContracts = async () => {
                                            setSubmitting(false)
                                            await contractService.createContract(
                                                {
                                                    ...values,
                                                    productType: +values.productType.id,
                                                    contractStatus: +values.contractStatus.id,
                                                    contractType: +values.contractType.id,
                                                    employees: +values.employees.id,
                                                    customers: +values.customers.id,

                                                }
                                            )
                                            console.log(values)
                                        }
                                        createContracts()
                                        n("/")
                                    }}
                            >
                                <Form>
                                    <div className="text-center m-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-success "
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => {
                                                handleModalOpen()
                                            }}>
                                            <b className="text-center">Chọn khách hàng</b>
                                        </button>
                                    </div>
                                    {/* nút thêm khách hàng là vd chưa có khách hàng trong danh sách
              lúc đó mình xẽ qua trang thêm khách hàng để thêm mới ạ*/}
                                    <div className="mt-4 inputs">
                                        <label>Tên khách hàng</label>
                                        <Field
                                            name="customers"
                                            // as="select"
                                            className="form-control"
                                            data-error="Please specify your need."
                                            style={{height: 35}}
                                            value={customers.find((cus) => cus.id == idCustomer)?.name}
                                        />
                                    </div>
                                    <div className="mt-2 inputs"><label>Mã hợp đồng</label>
                                        <Field type="text" className="form-control" name="contractCode" value={'HD-'+code}
                                               style={{height: "35px"}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Đồ cầm</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="productName"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Loại đồ</label>
                                        <Field
                                            name="productType"
                                            as="select"
                                            className="form-control"
                                            type="text"
                                            data-error="Please specify your need."
                                            style={{height: 35}}
                                        >
                                            <option value="" selected="" disabled="">
                                                --Loại đồ--
                                            </option>
                                            {productType.map((list, index) => (
                                                <option key={index} value={list.id}>{list.name}</option>
                                            ))}
                                        </Field>
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Hình ảnh</label>
                                        <Field
                                            type="file"
                                            className="form-control"
                                            name="image"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Tiền cho vay</label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            name="loans"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="row mt-2  ">
                                        <div className="col-md-6 form-group">
                                            <label>Ngày bắt đầu</label>
                                            <Field
                                                type="date"
                                                className="form-control"
                                                name="startDate"
                                                style={{height: 36}}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Ngày kết thúc</label>
                                            <Field
                                                type="date"
                                                className="form-control"
                                                name="endDate"
                                                style={{height: 36}}
                                            />
                                        </div>
                                    </div>
                                    {/* khi nhập số tiền cho vay vào và nhập ngày bắt đầu và ngày kết thúc sẽ hiện ra tiền lãi*/}
                                    <div className="mt-2 inputs">
                                        <label>Tiền lãi</label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            name="profit"
                                            values=""
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Trạng thái</label>
                                        <Field

                                            type="number"
                                            className="form-control"
                                            values="1"
                                            name="contractStatus"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Loại hợp đồng</label>
                                        <Field

                                            type="number"
                                            className="form-control"
                                            values="1"
                                            name="contractType"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Nhân viên</label>
                                        <Field

                                            type="number"
                                            className="form-control"
                                            values="1"
                                            name="employees"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className="text-center" style={{marginLeft: "23.6%"}}>
                                            <Link to="/" className="btn btn-secondary ">
                                                <b className="text-center">Quay lại</b>
                                            </Link>
                                        </div>
                                        <div className="text-center" style={{marginRight: "23.6%"}}>
                                            <button type="submit" className="btn btn-success">
                                                <b className="text-center">Thêm mới</b>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <>
                <div className="text-center mt-4 btn-group p-3 m-l-2">
                    <div className="text-center m-auto">
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                                handleModalOpen()
                            }}
                        >
                            <b className="text-center">Chọn hợp đồng</b>
                        </button>
                        <Modal
                            className="modal-lg"
                            show={showModal}
                            onHide={handleModalClose}
                            backdrop="static"
                            keyboard={false}
                            centered
                        >
                            <Modal.Header style={{backgroundColor: "#00833e", color: "white"}}>
                                <Modal.Title style={{width: "100%", textAlign: "center"}}>
                                    <b>Chọn Hợp Đồng</b>
                                </Modal.Title>
                                <Button
                                    variant="secondary"
                                    className="btn-close"
                                    style={{marginLeft: 0}}
                                    onClick={handleModalClose}
                                />
                            </Modal.Header>
                            <Modal.Body>
                                <div className="controlsmodal-body d-flex justify-content-between">
                                    <div style={{marginTop:"0.6%"}}>
                                        <button type="submit" className="btn btn-outline-success ">
                                            <b className="textcenter">Thêm khách hàng</b>
                                        </button>
                                    </div>
                                    <Formik initialValues={{
                                        name: ""
                                    }}
                                            onSubmit={async (values) => {
                                                const search = async () => {
                                                    const res = await contractService.searchCustomer(values.name)
                                                    setCustomer(res.content)
                                                }
                                                search()
                                            }}>
                                        <Form className="d-flex m-1">
                                            <Field
                                                style={{width: "18vw",height:"38px"}}
                                                className="form-control me-3"
                                                type="text"
                                                name="name"
                                                placeholder="Tìm kiếm theo tên khách hàng"
                                                aria-label="Search"
                                            />
                                            <button className="btn btn-outline-primary" type="submit">
                                                <i className="bi bi-search"/>
                                            </button>
                                        </Form>
                                    </Formik>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="text-center">Mã khách hàng</th>
                                        <th className="text-center">Tên khách Hàng</th>
                                        <th className="text-center">CMND/Hộ chiếu</th>
                                        <th className="text-center">Chức Năng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {customers.map((list, index) => (
                                                <tr key={index}>
                                                <td className="text-center">{list.id}</td>
                                                <td className="text-center">{list.name}</td>
                                                <td className="text-center">{list.citizenCode}</td>
                                                <td className="text-center">
                                                    <button onClick={async () => {
                                                       await setIdCustomer(list.id)
                                                        handleModalClose(true);
                                                    }} className="btn btn-success text-center">
                                                        Chọn
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    {/* Other table rows */}
                                    </tbody>
                                </table>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </>

        </>

    )
}