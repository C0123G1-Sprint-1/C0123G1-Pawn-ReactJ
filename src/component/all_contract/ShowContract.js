import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

import * as showAllContractService from '../../service/ShowAllContractServices'

export const ShowContract = () => {
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [productName, setProductName] = useState('');
    const [searchType, setSearchType] = useState('');
    const [showDetail, setShowDetail] = useState(0);
    const [contracts, setContracts] = useState([]);
    const [typeProduct, setProductType] = useState([]);

    const fetchAPI = () => {
        const rs = async () => {
            try {
                const r = await showAllContractService.getAllContractPage(page, productName, searchType)
                await setTotalPage(r.totalPages)

                console.log("contract ..." + r.content)
                await setContracts(r.content)
                const type = await showAllContractService.getProductTypeList();
                await setProductType(type)

            } catch (e) {
                console.log(e)
            }
        }
        rs()
    }
    const paginate = (page) => {

        setPage(page)


    }
    const getTypeId = (id) => {
        setPage(0)
        setSearchType(id)
    }
    const handleInput = async (value) => {
        setPage(0)

        setProductName(value)
    }

    useEffect(() => {
        fetchAPI(page, contracts)
    }, [page, productName, searchType])

    console.log("loai do" + searchType)

    const handleShowDetail = async (id) => {
        await setShowDetail(id)
        await setShowModal(true)
    }
    console.log("id cua contract: " + productName)
    return (
        <>

            <meta charSet="UTF-8"/>
            <title>Title</title>
            {/*<link*/}
            {/*    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"*/}
            {/*    rel="stylesheet"*/}
            {/*    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"*/}
            {/*    crossOrigin="anonymous"*/}
            {/*/>*/}
            {/*<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>*/}
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
            <div className="col-md-12 col-lg-9 content-profit">
                <div className="row">
                    <div className="modal-content">
                        <div className="d-flex">
                            <div className="modal-body">
                                <div>


                                    <div
                                        className="row"
                                        style={{display: "flex", justifyContent: "end"}}
                                    >
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <input
                                                    style={{borderColor: "black"}}
                                                    id=""
                                                    type="text"
                                                    name="productName"
                                                    className="form-control"
                                                    onChange={(event) => {
                                                        handleInput(event.target.value)
                                                    }}
                                                    value={productName}
                                                    placeholder={"Tên đồ cầm"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <select onChange={(event) => {
                                                    getTypeId(event.target.value)
                                                }}
                                                        style={{borderColor: "black"}}
                                                        id="doCam"

                                                        name="typeProduct"
                                                        className="form-control"
                                                        value={searchType}

                                                >
                                                    <option value=''>Chọn loại đồ</option>

                                                    {
                                                        typeProduct && typeProduct.map((value) => (
                                                            <option key={value.id}
                                                                    value={value.id}>{value.name}</option>

                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <br/>

                                </div>
                                <div>
                                    <table className="table table-striped">
                                        <thead>
                                        <tr className="text-center">
                                            <th>Mã HĐ</th>
                                            <th>Tên đồ</th>
                                            <th>Loại đồ</th>
                                            <th>Trạng thái</th>
                                            <th>Giá mua(VNĐ)</th>
                                            <th>Chức Năng</th>
                                        </tr>
                                        </thead>


                                        {contracts.length === 0 ? <tr>
                                            <td colSpan="6" className="text-center">
                                                <h4 style={{color: "red"}}>Dữ liệu không tồn tại</h4>
                                            </td>
                                        </tr>
                                            :
                                            <tbody>
                                            {
                                            contracts.map((value) => (
                                            <tr key={value.contractId} className="text-center">
                                            <td>{value.contractCode}</td>
                                            <td>{value.productName}</td>
                                            <td>{value.productType}</td>
                                            <td>{value.contractStatus}</td>
                                            <td>{value.loans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                            <td>

                                            <i style={{color: 'blue'}} onClick={() => handleShowDetail(value.contractId)}
                                            className=" bi bi-info-circle me-2"></i>


                                            </td>
                                            </tr>


                                        ))
                                            }

                                            </tbody>
                                        }



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
                                                    Array.from({length: totalPage}, (a, index) => index).map((pageNum) => (
                                                        <li className="page-item">
                                                            <button
                                                                className={pageNum === page ? "page-link active" : "page-link"}
                                                                key={pageNum}
                                                                onClick={() => paginate(pageNum)}>
                                                                {pageNum + 1}
                                                            </button>
                                                        </li>
                                                    ))
                                                }


                                                {/*<li className="page-item">*/}
                                                {/*    <a className="page-link" href="#">*/}
                                                {/*        3*/}
                                                {/*    </a>*/}
                                                {/*</li>*/}
                                                <li hidden={page + 1 === totalPage}
                                                    className="page-item">
                                                    <button className="page-link" tabIndex={-1}
                                                            onClick={() => paginate(page + 1)}>
                                                        Sau
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal
                show={showModal} onHide={() => setShowModal(false)}
                className="modal fade bd-example-modal-lg"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"


            >
                <div className="modal-dialog  modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header" align="center">
                            <h1 className="modal-title text-center align-content-center" id="staticBackdropLabel"><b>
                                {" "}
                                Chi tiết đồ cầm{" "}
                            </b>

                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            />
                        </div>
                        <div className="row mb-4 mt-4 ">
                            <div className="col-md-4  ">
                                <div className=" image-frame col-sl-12">
                                    <div className="card-body ">
                                        <img
                                            src={contracts.find((c) => c.contractId == showDetail)?.image}
                                            width={"100%"}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8" style={{width: "63.666667%"}}>
                                <div className="">
                                    <div className="card-body ">
                                        <table className="table table-bordered">
                                            <tbody>
                                            <tr className="row">
                                                <th className="col-sm-6"> Mã hợp đồng</th>
                                                <td className="col-sm-6"> {contracts.find((c) => c.contractId == showDetail)?.contractCode}</td>
                                            </tr>
                                            <tr className="row">
                                                <th className="col-sm-6"> Tên khách hàng</th>
                                                <td className="col-sm-6"> {contracts.find((c) => c.contractId == showDetail)?.customerName}</td>
                                            </tr>
                                            <tr className="row">
                                                <th className="col-sm-6"> Tên đồ cầm</th>
                                                <td className="col-sm-6">{contracts.find((c) => c.contractId == showDetail)?.productName}</td>
                                            </tr>
                                            <tr className="row">
                                                <th className="col-sm-6"> Loại đồ</th>
                                                <td className="col-sm-6">{contracts.find((c) => c.contractId == showDetail)?.productType}</td>
                                            </tr>
                                            <tr className="row">
                                                <th className="col-sm-6">Giá mua</th>
                                                <td className="col-sm-6">{contracts.find((c) => c.contractId == showDetail)?.loans}</td>
                                            </tr>
                                            <tr className="row">
                                                <th className="col-sm-6"> Ngày bắt đầu</th>
                                                <td className="col-sm-6">{contracts.find((c) => c.contractId == showDetail)?.startDate}</td>
                                            </tr>
                                            <tr className="row">
                                                <th className="col-sm-6">Ngày kết thúc</th>
                                                <td className="col-sm-6">{contracts.find((c) => c.contractId == showDetail)?.endDate}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </>


    )
}