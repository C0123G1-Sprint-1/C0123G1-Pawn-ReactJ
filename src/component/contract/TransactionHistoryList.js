import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import * as contractService from '../../service/ContractService';
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import * as Swal from "sweetalert2";

export default function TransactionHistoryList() {
    const [contracts, setContract] = useState([]);
    const [selectedContract, setSelectedContract] = useState(0);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang

    const paginate = (page) => {
        setSelectedContract(page+1)
        setPage(page)
    }
    const searchTH = async () => {
        try {
            const response = await contractService.searchTransactionHistory(page, search)
            await setContract(response.content)
            await setTotalPages(response.totalPages)
        } catch (error) {
            console.log(error);
        }
    };

    let [search, setSearch] = useState({
        customerName: '',
        productName: '',
        startDate: '',
        endDate: '',
        contractType: '',
        contractStatus: ''
    });
    const [deleteTHList, setDeleteTHList] = useState("");
    useEffect(() => {
        searchTH();
    }, [search, page]);


    const deleteTransactionHistory = async (id) => {
        let res = await contractService.deleteTransactionHistoryByID(id);
        result(res.data)
        searchTH()
    }
    const result = (res) => {
        if (res != null) {
            if (res) {
                Swal.fire({
                    icon: "success",
                    title: "Xóa thành công !",
                    timer: 3000
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xóa thất bại !",
                    timer: 3000
                })

            }
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-md-12 d-flex justify-content-center align-items-center"
                         style={{height: "15vh", backgroundColor: "green"}}>
                        <h1 className="text-center align-center" style={{color: "#eeeeee"}}>HEADER</h1>
                    </div>
                </div>
                <div className="container mt-5" style={{height: "105vh"}}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-xxl-3 col-xl-3 col-sm-12 col-md-8">
                            <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-action">
                                    Thông tin cửa hàng
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">Tài chính</a>
                                <a href="#" className="list-group-item list-group-item-action">Danh sách đồ cầm trong
                                    kho</a>
                                <a href="#" className="list-group-item list-group-item-action active"
                                   aria-current="true">Lịch
                                    sử giao
                                    dịch</a>
                                <a className="list-group-item list-group-item-action ">Top 10 hợp đồng mới nhất</a>
                                <a className="list-group-item list-group-item-action ">Thống kê lợi nhuận</a>
                            </div>
                        </div>
                        <div className="col-xxl-9 col-xl-9">
                            <h1 className="text-center my-5">Lịch sử giao dịch</h1>
                            <Formik initialValues={({
                                customerName: '',
                                productName: '',
                                startDate: '',
                                endDate: '',
                                contractType: '',
                                contractStatus: ''
                            })}
                                    onSubmit={(values) => {
                                        const res = async () => {
                                            await setPage(0)
                                            await contractService.searchTransactionHistory(page, values)
                                            setSearch(values)
                                        }
                                        res()
                                        searchTH()
                                    }}
                            >
                                <Form>
                                    <div className="row justify-content-center">
                                        <div className=" col-xxl-4 col-xl-4 col-md-4">
                                            <label htmlFor="customerName" className="form-label me-2"
                                                   style={{color: "black"}}>Tên
                                                khách
                                                hàng:</label>
                                            <Field style={{borderColor: "black"}} type="text" id="customerName"
                                                   className="form-control"
                                                   name="customerName"/>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-md-4">
                                            <label htmlFor="productName" className="form-label me-2"
                                                   style={{color: "black"}}>Tên
                                                đồ:</label>
                                            <Field style={{borderColor: "black"}} type="text" id="productName"
                                                   className="form-control"
                                                   name="productName"/>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mt-3">
                                        <div className="col-xxl-4 col-xl-4 col-md-4">
                                            <label htmlFor="startDate" className="form-label me-2"
                                                   style={{color: "black"}}>Giao dịch từ
                                                ngày:</label>
                                            <Field style={{borderColor: "black"}} type="date" id="startDate"
                                                   className="form-control"
                                                   name="startDate"/>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-md-4">
                                            <label htmlFor="endDate" className="form-label me-2"
                                                   style={{color: "black"}}>Đến:</label>
                                            <Field style={{borderColor: "black"}} type="date" id="endDate"
                                                   className="form-control"
                                                   name="endDate"/>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center align-items-center mt-3">
                                        <div className="col-xxl-4 col-xl-4 col-md-4">
                                            <label className="form-label" style={{color: "black"}}>Loại hợp
                                                đồng:</label>
                                            <select style={{borderColor: "black"}} name="contractType"
                                                    className="text-center form-select">
                                                <option value={"0"}>--Chọn loại HD--</option>
                                                <option value={"1"}>Cầm đồ</option>
                                                <option value={"2"}>Thanh Lý</option>
                                            </select>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-md-4">
                                            <div className="align-items-center">
                                                <label className="form-label" style={{color: "black"}}>Trạng
                                                    thái: </label>
                                                <div className="d-flex">
                                                    <select style={{borderColor: "black"}} name="contractStatus"
                                                            className="text-center form-select me-2">
                                                        <option value={""}>--Chọn trạng thái--</option>
                                                        <option value={"1"}>Open</option>
                                                        <option value={"2"}>Pending</option>
                                                        <option value={"3"}>Close</option>
                                                    </select>
                                                    <button type="submit" className="btn btn-outline-primary">
                                                        <i className="bi bi-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                            <div className="row mt-5">
                                <table className="table table table-striped text-center m-3" border="1">
                                    <thead>
                                    <tr>
                                        <th>Mã HD</th>
                                        <th>Tên đồ</th>
                                        <th>Tên khách hàng</th>
                                        <th>Ngày làm HD (dd-mm-yyyy)</th>
                                        <th>Loại hợp đồng</th>
                                        <th>Trạng thái</th>
                                        <th>Chức năng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        contracts.map((th, index) => (
                                                <tr key={index}>
                                                    <td>{th.contractCode}</td>
                                                    <td>{th.productName}</td>
                                                    <td>{th.customers}</td>
                                                    <td>{th.startDate}</td>
                                                    <td>{th.contractType}</td>
                                                    <td>{th.contractStatus}</td>
                                                    <td>
                                                        <Link to={`/transaction-history/detail/${th?.contractCode}`}><i
                                                            className="bi bi-info-circle me-2"></i></Link>
                                                        <Link to={""}
                                                              className="me-2"><i style={{color: "orange"}}
                                                                                  className="bi bi-pencil-square"></i></Link>
                                                        <a type="button" data-bs-toggle="modal"
                                                           data-bs-target="#exampleModal" onClick={() => {
                                                            setDeleteTHList(th?.contractCode)
                                                        }}><i
                                                            style={{color: "red"}}
                                                            className="bi bi-trash3"></i></a>
                                                    </td>
                                                </tr>
                                            )
                                        )}

                                    </tbody>
                                </table>
                                <div className="row mt-4">
                                    <div className="d-flex col-12 justify-content-end">
                                        <nav aria-label="...">
                                            <ul className="pagination">
                                                <li hidden={page === 0} className="page-item ">
                                                    <button className="page-link" tabIndex={-1}
                                                            onClick={() => paginate(page - 1)}>
                                                        Trước
                                                    </button>
                                                </li>
                                                {
                                                    Array.from({length: totalPages}, (a, index) => index).map((page) => (
                                                        <li className="page-item">
                                                            <button className={selectedContract==page+1?"active page-link":"page-link"} key={page}
                                                                    onClick={() =>{ paginate(page)
                                                                    }}>
                                                                {page + 1}
                                                            </button>
                                                        </li>
                                                    ))
                                                }

                                                <li hidden= {page + 1 === totalPages}
                                                    className="page-item">
                                                    <button className="page-link" tabIndex={-1}
                                                            onClick={() => paginate(page + 1)}>
                                                        Tiếp
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    {/*    <ReactPaginate*/}
                                    {/*        breakLabel="..."*/}
                                    {/*        nextLabel=">"*/}
                                    {/*        onPageChange={handlePageClick}*/}
                                    {/*        pageCount={pageCount}*/}
                                    {/*        previousLabel="< "*/}
                                    {/*        activeClassName="active"*/}
                                    {/*        disabledClassName="d-none"*/}
                                    {/*        pageClassName="page-item"*/}
                                    {/*        pageLinkClassName="page-link"*/}
                                    {/*        previousClassName="page-item"*/}
                                    {/*        previousLinkClassName="page-link"*/}
                                    {/*        nextClassName="page-item"*/}
                                    {/*        nextLinkClassName="page-link"*/}
                                    {/*        breakClassName="page-item"*/}
                                    {/*        breakLinkClassName="page-link"*/}
                                    {/*        marginPagesDisplayed={2}*/}
                                    {/*        pageRangeDisplayed={5}*/}
                                    {/*        containerClassName="pagination"*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal"
                 data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel6">Xác nhận
                                xóa lịch sử giao dịch</h5>
                            <button type="button" className="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">

                            <span>Bạn muốn xóa lịch sử giao dịch có mã code </span><span
                            style={{color: 'red'}}>{deleteTHList}</span><span> ?</span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Thoát
                            </button>
                            <button type="button" className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        deleteTransactionHistory(deleteTHList);
                                    }}
                            >Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}