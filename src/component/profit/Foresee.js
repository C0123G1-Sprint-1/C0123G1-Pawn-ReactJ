import React, {useEffect, useState} from "react";
import axios from "axios";
import {useOutletContext} from "react-router";

export default function Foresee() {
    const contracts = useOutletContext();
    return (
        <>
            <div style={{height: "55vh"}}>
                <table className="table table-hover table-striped" border={1}>
                    <thead>
                    <tr>
                        <th>Mã Hd</th>
                        <th>Tiền cho vay</th>
                        <th>Tiền lãi</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Lợi nhuận dự kiến</th>
                        <th id="actions">Tùy chọn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contracts ?
                            contracts.map((contract, index) =>
                                <tr key={index}>
                                    <td>{contract.contractCode}</td>
                                    <td>{contract.loans}</td>
                                    <td>{contract.interest}</td>
                                    <td>{contract.startDate}</td>
                                    <td>{contract.endDate}</td>
                                    <td>{contract.profitForesee}</td>
                                    <td className="detail-button">
                                        <a href="#">
                                            <i className="bi bi-info-circle detail" title="Chi tiết"/>
                                        </a>
                                    </td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan="7">
                                    <div align="center">
                                        <h1>Data Not Found</h1>
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