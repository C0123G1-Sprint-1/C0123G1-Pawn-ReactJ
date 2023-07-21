import React, {useEffect, useState} from "react";
import * as contractService from "../../service/ContractService"
import {Link, NavLink} from "react-router-dom";
import "../../css/UpdateContract.css"
import jwt from 'jwt-decode';
import Swal from "sweetalert2";
import moment from "moment";
import "../employee/employee.css"

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
                                <th>Tên đồ</th>
                                <th>Tên khách hàng</th>
                                <th>Ngày làm HĐ</th>
                                <th>Loại HĐ</th>
                                <th>Trạng thái</th>
                                <th>Chức năng</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentContracts.map((contract) => (
                                    <tr key={contract.id}>
                                        <td>{contract.contractCode}</td>
                                        <td>HD-{contract.productName}</td>
                                        <td>{contract.customers?.name}</td>
                                        <td>{
                                            moment(contract?.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                                        }</td>
                                        <td>{contract.contractType.name}</td>
                                        <td>{contract.contractStatus.name}</td>
                                        <td>
                                            <Link
                                                to={`/nav/info-store/transaction-history/detail/${contract?.id}`}><i
                                                className="bi bi-info-circle me-2"/></Link>
                                            <Link
                                                to={`/nav/info-store/transaction-history/update-contract/${contract?.id}`}
                                                className="me-2"><i style={{color: "orange"}}
                                                                    className="bi bi-pencil-square"/></Link>
                                            <a type="button"
                                               data-bs-target="#exampleModal" onClick={() => {
                                                Swal.fire({
                                                    icon: "warning",
                                                    title: "Xóa",
                                                    html: `Bạn có muốn xoá lịch sử giao dịch có mã hợp đồng <span style="color: red">HD-${contract?.contractCode}</span> không ?`,
                                                    showCancelButton: true,
                                                    cancelButtonText: "Hủy",
                                                    confirmButtonText: "Có",
                                                    cancelButtonColor: "rgba(118,112,112,0.51)",
                                                    confirmButtonColor: "#d33"
                                                })
                                                    .then((res) => {
                                                        if (res.isConfirmed) {
                                                            deleteTransactionHistory(+contract?.id)
                                                        }
                                                    })

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
        </>
    )
}