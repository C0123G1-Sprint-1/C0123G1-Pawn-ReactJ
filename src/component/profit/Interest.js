import {useOutletContext} from "react-router";
import React from "react";
import "../../css/interest.css"

export default function Interest() {
    const contracts = useOutletContext();
    return (
        <>
            <div  style={{height: ""}}>
                <table className="table table-hover table-striped" border={1}>
                    <thead>
                    <tr>
                        <th>Mã Hợp Đồng</th>
                        <th>Tiền Cho Vay(VND)</th>
                        <th>Tiền Lãi (VND)</th>
                        <th>Ngày Bắt Đầu</th>
                        <th>Lợi Nhuận (VND)</th>
                        <th id="actions">Chức Năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contracts ?
                            contracts.map((contract, index) =>
                                <tr key={index}>
                                    <td>{contract.contractCode}</td>
                                    <td>{contract.loans?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td>{contract.interest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td>{contract.startDate}</td>
                                    <td>{contract.profit?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td className="detail-button">
                                        <a href="#">
                                            <i
                                                className="bi bi-info-circle detail"
                                                title="Chi tiết"
                                            />
                                        </a>
                                    </td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="7">
                                    <div align="center">
                                        <h4 className="text-danger">Dữ liệu không tồn tại</h4>
                                    </div>
                                </td>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}