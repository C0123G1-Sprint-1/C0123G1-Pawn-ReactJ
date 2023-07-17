import {useOutletContext} from "react-router";
import React from "react";
import "../profit/interest.css"
import "bootstrap/dist/css/bootstrap-grid.css"
export default function Interest() {
    const contracts = useOutletContext();
    return (
        <>
            <table className="table table-hover table-striped" border={1}>
                <thead>
                <tr>
                    <th>Mã Hd</th>
                    <th>Tiền cho vay</th>
                    <th>Tiền lãi</th>
                    <th>Lợi nhuận</th>
                    <th id="actions">Tùy chọn</th>
                </tr>
                </thead>
                <tbody>
                {
                    contracts.map((contract,index)=>
                        <tr key={index} >
                            <td>{contract.contractCode}</td>
                            <td>{contract.loans}</td>
                            <td>{contract.interest}</td>
                            <td>{contract.profit}</td>
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
                }
                </tbody>
            </table>
        </>
    )
}