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
    return(
        <>
            <div className="container">
                <h2>
                    <div style={{textAlign:"center"}}>Top 10 Hợp Đồng Mới Nhất</div>
                </h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Mã HD</th>
                        <th>Tên Đồ</th>
                        <th>Tên khách hàng</th>
                        <th>Ngày làm HD(dd-mm-yyyy)</th>
                        <th>Loại hợp đồng</th>
                        <th>Trạng thái</th>
                        <th>Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentContracts.map((contract)=>(
                            <tr key={contract.id}>
                                <td>{contract.contractCode}</td>
                                <td>{contract.productName}</td>
                                <td>{contract.customers?.name}</td>
                                <td>{contract.startDate}</td>
                                <td>{contract.contractType.name}</td>
                                <td>{contract.contractStatus.name}</td>
                                <td>
                                        <NavLink to={"/updateContract/"+contract.id} className="me-2"><i style={{color: "orange"}}
                                                                                                         className="bi bi-pencil-square"></i>
                                        </NavLink>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                <div className="pagination-container-tri">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>

            </>
    )
}