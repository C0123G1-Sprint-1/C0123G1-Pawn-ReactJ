import React, {useEffect, useState} from "react";
import * as contractService from "../../service/ContractService"
import {Link, NavLink} from "react-router-dom";
import "../../css/UpdateContract.css"


export function Top10NewContract() {
    const [contracts, setContract] = useState([]);
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
    return (
        <>
            <div className="col-md-12 col-lg-9 content-profit">
                <div className="row ">
                    <div className="container">
                        <h2>
                            <div style={{textAlign: "center"}}>Top 10 Hợp Đồng Mới Nhất</div>
                        </h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Mã HD</th>
                                <th>Tên Đồ</th>
                                <th>Tên khách hàng</th>
                                <th>Ngày làm hợp đồng</th>
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
                                        <td>{contract.startDate}</td>
                                        <td>{contract.contractType.name}</td>
                                        <td>{contract.contractStatus.name}</td>
                                        <td>
                                            <Link to={`/nav/info-store/transaction-history/detail/${contract?.contractCode}`}><i
                                                className="bi bi-info-circle me-2"/></Link>
                                            <Link to={`/nav/info-store/transaction-history/update-contract/${contract?.id}`}
                                                  className="me-2"><i style={{color: "orange"}}
                                                                      className="bi bi-pencil-square"/></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        {/*<div className="pagination-container">*/}
                        {/*    {showPreviousButton && (*/}
                        {/*        <button*/}
                        {/*            className="pagination-button"*/}
                        {/*            onClick={() => handlePageChange(currentPage - 1)}*/}
                        {/*        >*/}
                        {/*            &lt;*/}
                        {/*        </button>*/}
                        {/*    )}*/}
                        {/*    {Array.from({length: totalPages}, (_, index) => index + 1).map(*/}
                        {/*        (pageNumber) => (*/}
                        {/*            <button*/}
                        {/*                key={pageNumber}*/}
                        {/*                className={`pagination-button ${*/}
                        {/*                    pageNumber === currentPage ? "active" : ""*/}
                        {/*                }`}*/}
                        {/*                onClick={() => handlePageChange(pageNumber)}*/}
                        {/*            >*/}
                        {/*                {pageNumber}*/}
                        {/*            </button>*/}
                        {/*        )*/}
                        {/*    )}*/}
                        {/*    {showNextButton && (*/}
                        {/*        <button*/}
                        {/*            className="pagination-button"*/}
                        {/*            onClick={() => handlePageChange(currentPage + 1)}*/}
                        {/*        >*/}
                        {/*            &gt;*/}
                        {/*        </button>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <div className="pagination-container-tri">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Lui
                            </button>
                            {Array.from({length: totalPages}, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    style={{fontWeight: currentPage === index + 1 ? 'bold' : 'normal'}}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Tới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}