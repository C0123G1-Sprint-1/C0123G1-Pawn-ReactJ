import React, {useEffect, useState} from "react";
import * as contractService from "../../service/ContractService"
import {Link, NavLink} from "react-router-dom";
import "../../css/UpdateContract.css"
import jwt from 'jwt-decode';
import Swal from "sweetalert2";
import moment from "moment";

const token = localStorage.getItem('token');
const decodedToken = jwt(token);
console.log(decodedToken.sub)
console.log(decodedToken.role)

export function Top10NewContract() {
    const [contracts, setContract] = useState([]);
    const [deleteTHList, setDeleteTHList] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const contractsPerPage = 5;
    const fetchTop10NewContract = async () => {
        const result = await contractService.showTop10NewContract();
        setContract(result.content);
        console.log(result)
    }
    useEffect(() => {
        fetchTop10NewContract();
    }, [])
    const indexOfLastContract = currentPage * contractsPerPage;
    const indexOfFirstContract = indexOfLastContract - contractsPerPage;
    const currentContracts = contracts.slice(
        indexOfFirstContract,
        indexOfLastContract
    );

    const totalPages = Math.ceil(contracts.length / contractsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteTransactionHistory = async (id) => {
        let res = await contractService.deleteTransactionHistoryByID(id);
        result(res.data)
        fetchTop10NewContract();

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
            <div className="col-md-12 col-lg-9 content-profit">
                <div className="row ">
                    <div className="container">
                        <h2>
                            <div style={{textAlign: "center" ,marginTop: "3rem"}}>TOP 10 HỢP ĐỒNG MỚI NHẤT</div>
                        </h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Mã HĐ</th>
                                <th>Tên Dồ</th>
                                <th>Tên khách hàng</th>
                                <th>Ngày làm HĐ</th>
                                <th>Loại hợp đồng</th>
                                <th>Trạng thái</th>
                                <th>Chức năng</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentContracts.map((contract) => (
                                    <tr key={contract.id}>
                                        <td>{contract.contractCode}</td>
                                        <td>{contract.productName}</td>
                                        <td>{contract.customers?.name}</td>
                                        <td>{
                                            moment(contract?.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                                        }</td>
                                        <td>{contract.contractType.name}</td>
                                        <td>{contract.contractStatus.name}</td>
                                        <td>
                                            <Link
                                                to={`/nav/info-store/transaction-history/detail/${contract?.contractCode}`}><i
                                                className="bi bi-info-circle me-2"/></Link>
                                            <Link
                                                to={`/nav/info-store/transaction-history/update-contract/${contract?.id}`}
                                                className="me-2"><i style={{color: "orange"}}
                                                                    className="bi bi-pencil-square"/></Link>
                                            <a type="button" data-bs-toggle="modal"
                                               data-bs-target="#exampleModal" onClick={() => {
                                                setDeleteTHList(contract?.contractCode)
                                            }}><i
                                                style={{color: "red"}}
                                                className="bi bi-trash3"/></a>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className="pagination-container-tri">
                            {currentPage !== 1 && (
                                <button onClick={() => handlePageChange(currentPage - 1)}>
                                    Trước
                                </button>
                            )}
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            {currentPage !== totalPages && (
                                <button onClick={() => handlePageChange(currentPage + 1)}>
                                    Sau
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal"
                 data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel6">
                                Xóa lịch sử giao dịch</h5>
                            <button type="button" className="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <span>Bạn muốn xóa lịch sử giao dịch có mã code </span><span
                            style={{color: 'red'}}>HD-{deleteTHList}</span><span> ?</span>
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
    )
}