import React, {useEffect, useState} from "react";
import axios from "axios";
import {useOutletContext} from "react-router";
import moment from "moment";

export default function Foresee() {
    const contracts = useOutletContext();
    return (
        <>
            <div style={{height: ""}}>
                <table className="table table-hover table-striped" border={1}>
                    <thead>
                    <tr>
                        <th>Mã HD</th>
                        <th>Tiền Cho Vay(VND)</th>
                        <th>Tiền Lãi (VND)</th>
                        <th>Ngày Bắt Đầu</th>
                        <th>Ngày Kết Thúc</th>
                        <th>Lợi Nhuận Dự Kiến (VND)</th>
                        <th id="actions">Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contracts ?
                            contracts.map((contract, index) =>
                                <tr key={index}>
                                    <td style={{textAlign: "center"}}>{contract.contractCode}</td>
                                    <td style={{textAlign: "center"}}>{contract.loans?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td style={{textAlign: "center"}}>{contract.interest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td style={{textAlign: "center"}}>{moment(contract.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')}</td>
                                    <td style={{textAlign: "center"}}>{moment(contract.endDate, 'YYYY/MM/DD').format('DD/MM/YYYY')}</td>
                                    <td style={{textAlign: "center"}}>{contract.profitForesee?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
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