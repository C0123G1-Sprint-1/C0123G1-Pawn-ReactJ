import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap';
import * as redeemingService from './service/RedeemingService'
import {Field, Form, Formik} from "formik";
import * as Swal from "sweetalert2";


export const Redeeming = () => {
    const [showModal, setShowModal] = useState(false);
    const [contractCode, setContractCode] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [productName, setProductName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [contracts, setContract] = useState([]);
    const [selectedContract, setSelectedContract] = useState(0);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };


    const paginate = (page) => {

        setPage(page)


    }


    const fetchContract = async () => {
        try {
            const response = await redeemingService.getContractList(page, contractCode, customerName, productName, startDate)
            console.log(customerName)
            // setContract(getContract)
            console.log('API response:', response);
            await setContract(response.content)
            await setTotalPages(response.totalPages)
        } catch (error) {
            console.log('Error fetching contracts:', error);
        }
        console.log(contracts)

    }

    useEffect(() => {

        fetchContract()
        console.log("trang so " + page)
    }, [page, contractCode, customerName, productName, startDate])

    // const handleContractSelect = (contract) => {
    //     setSelectedContract(contract);
    //     handleModalClose();
    // };
    console.log('Contracts:', contracts);
    return (

        <>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"/>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"/>
            <meta charSet="UTF-8"/>
            <title>Title</title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
            />
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        '\n        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");\n\n        .card {\n            border: none;\n            padding: 20px;\n            position: relative;\n            background-color: rgba(255, 255, 255, 0.7);\n            border-radius: 20px;\n        }\n\n        body {\n        }\n\n        body {\n            background-color: #eee;\n            font-family: "Poppins", sans-serif;\n            font-weight: 300\n        }\n\n        .height {\n            height: 100vh\n        }\n\n        .card {\n            border: none;\n            padding: 20px;\n            position: relative\n        }\n\n        .btn-group {\n            display: flex;\n            justify-content: space-between;\n        }\n\n        label {\n            font-family: Arial, sans-serif;\n            font-size: 14px;\n            font-weight: bold;\n            color: #222222;\n            margin-bottom: 5px;\n            display: inline-block;\n        }\n\n    '
                }}
            />
            <br/>
            <div className="container mt-5 mb-5">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card px-5 py-4">
                            <div style={{textAlign: "center"}}>
                                <h1>
                                    <b>Trả Đồ</b>
                                </h1>
                            </div>

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
                                        className="modal-xl"
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
                                            <div className="controls">
                                                <Formik initialValues={{
                                                    contractCode: contractCode,
                                                    customerName: customerName,
                                                    startDate: startDate,
                                                    productName: startDate
                                                }} onSubmit={(values) => {
                                                    const res = async () => {
                                                        await setContractCode(values.contractCode)
                                                        await setCustomerName(values.customerName)
                                                        await setProductName(values.productName)
                                                        await setStartDate(values.startDate)
                                                        await setPage(0)
                                                        await redeemingService.getContractList(page, contractCode, customerName, productName, startDate)
                                                    }
                                                    res()
                                                    fetchContract()

                                                }}>
                                                    <Form>
                                                        <div className="row">
                                                            <div className="col-lg-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="ma">Mã HĐ</label>
                                                                    <Field id="ma"
                                                                           type="text" name="contractCode"
                                                                           className="form-control"/>

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="kh">Tên khách hàng</label>
                                                                    <Field id="kh"
                                                                           type="text" name="customerName"
                                                                           className="form-control"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="doCam">Đồ cầm</label>
                                                                    <Field id="doCam"
                                                                           type="text" name="productName"
                                                                           className="form-control"/>

                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="dateStart">Ngày làm hợp
                                                                        đòng</label>
                                                                    <Field
                                                                        id="dateStart" type="date" name="startDate"
                                                                        className="form-control"/>
                                                                </div>

                                                            </div>

                                                        </div>


                                                        <div className="row">
                                                            <div className="col-md-12 d-flex justify-content-end">
                                                                <button type="submit"
                                                                        className="btn btn-outline-primary "><i
                                                                    className="bi bi-search"></i>
                                                                </button>

                                                            </div>
                                                        </div>

                                                    </Form>

                                                </Formik>
                                            </div>
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th className="text-center">Mã HĐ</th>
                                                    <th className="text-center">Khách Hàng</th>
                                                    <th className="text-center">Đồ Cầm</th>
                                                    <th className="text-center">Tiền Cho Vay (VNĐ)</th>
                                                    <th className="text-center">Ngày Làm HĐ</th>
                                                    <th className="text-center">Chức Năng</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {
                                                    contracts.map((contract) => (
                                                        <tr key={contract.contractId}>
                                                            <td className="text-center">{contract.contractCode}</td>
                                                            <td className="text-center">{contract.customerName}</td>
                                                            <td className="text-center">{contract.productName}</td>
                                                            <td className="text-center">{contract.loans}</td>
                                                            <td className="text-center">{contract.startDate}</td>
                                                            <td className="text-center">
                                                                <button onClick={() => {
                                                                    handleModalClose(true);
                                                                    setSelectedContract(contract.contractId)
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
                                            <div className="d-flex col-12 justify-content-end">
                                                <nav aria-label="...">
                                                    <ul className="pagination">
                                                        <li hidden={page === 0} className="page-item ">
                                                            <button className="page-link" tabIndex={-1}
                                                                    onClick={() => paginate(page - 1)}>
                                                                Trước
                                                            </button>
                                                        </li>
                                                        {/*<li className="page-item active" aria-current="page">*/}
                                                        {/*    <a className="page-link" href="#">*/}
                                                        {/*        1*/}
                                                        {/*    </a>*/}
                                                        {/*</li>*/}
                                                        {
                                                            Array.from({length: totalPages}, (a, index) => index).map((page) => (
                                                                <li className="page-item">
                                                                    <button className="page-link " key={page}
                                                                            onClick={() => paginate(page)}>
                                                                        {page + 1}
                                                                    </button>
                                                                </li>
                                                            ))
                                                        }


                                                        {/*<li className="page-item">*/}
                                                        {/*    <a className="page-link" href="#">*/}
                                                        {/*        3*/}
                                                        {/*    </a>*/}
                                                        {/*</li>*/}
                                                        <li disabled={page + 1 === totalPages}
                                                            className="page-item">
                                                            <button className="page-link" tabIndex={-1}
                                                                    onClick={() => paginate(page + 1)}>
                                                                Tiếp
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                            <Formik initialValues={{
                                contractId: selectedContract,
                                redeemDate: ''
                            }} onSubmit={(value) => {
                                const res = async () => {
                                    try {
                                        await redeemingService.redeem(selectedContract, value.redeemDate)
                                    }catch (e) {
                                        console.log(e)
                                    }
                                }
                                res()
                                Swal.fire({
                                    icon: "success",
                                    title: "Đã chuộc thành công"
                                })

                            }}>
                                <Form>
                                    <div className="row mt-2  ">
                                        <div className="col-lg-6 inputs form-group">
                                            <label>Mã HĐ</label>
                                            <input
                                                disabled
                                                type="text"
                                                className="form-control"
                                                name=""
                                                value={contracts.find((c) => c.contractId == selectedContract)?.contractCode}
                                            />
                                        </div>
                                        <div className="col-lg-6 inputs form-group">
                                            <label>Tên khách hàng</label>
                                            <input
                                                disabled
                                                type="text"
                                                className="form-control"
                                                name=""
                                                value={contracts.find((c) => c.contractId == selectedContract)?.customerName}

                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs form-group">
                                        <label>Đồ cầm</label>
                                        <input
                                            disabled
                                            defaultValue=""
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={contracts.find((c) => c.contractId == selectedContract)?.productName}

                                        />
                                    </div>
                                    <div className="row mt-2  ">
                                        <div className="col-lg-6 inputs ">
                                            <label>Tiền cho vay</label>
                                            <input
                                                disabled
                                                type="number"
                                                className="form-control"
                                                name=""
                                                value={contracts.find((c) => c.contractId == selectedContract)?.loans}

                                            />
                                        </div>
                                        <div className="col-lg-6 inputs form-group">
                                            <label>Tiền lãi</label>
                                            <input
                                                disabled
                                                type="text"
                                                className="form-control"
                                                name=""
                                                value={contracts.find((c) => c.contractId == selectedContract)?.profit}


                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2  ">
                                        <div className="col-lg-6 inputs form-group">
                                            <label>Ngày bắt đầu</label>
                                            <input
                                                disabled
                                                type="text"
                                                className="form-control"
                                                name=""
                                                value={contracts.find((c) => c.contractId == selectedContract)?.startDate}

                                            />
                                        </div>
                                        <div className="col-lg-6 inputs form-group">
                                            <label>Ngày kết thúc</label>
                                            <input
                                                disabled
                                                type="text"
                                                className="form-control"
                                                name=""
                                                value={contracts.find((c) => c.contractId == selectedContract)?.endDate}

                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Tiền thanh toán</label>
                                        <input
                                            disabled
                                            type="number"
                                            className="form-control"
                                            name="birthday"
                                            min="1920-01-01"
                                            value={contracts.find((c) => c.contractId == selectedContract)?.loans + contracts.find((c) => c.contractId == selectedContract)?.profit}

                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Ngày trả đồ</label>
                                        <Field
                                            type="date"
                                            className="form-control"
                                            name="redeemDate"
                                        />
                                    </div>
                                    <div className="text-center mt-4 btn-group p-3 m-l-2">
                                        <div className="text-center m-auto">
                                            <button
                                                type="button"
                                                className="btn btn-secondary "
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                            >
                                                <b className="text-center">Quay lại</b>
                                            </button>
                                        </div>
                                        <div className="text-center m-auto">
                                            <button type="submit" className="btn btn-success">
                                                <b className="text-center">Thanh toán</b>
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
            {/*Chọn hợp đồng*/}

        </>


    )
}