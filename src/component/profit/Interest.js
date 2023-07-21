import {useOutletContext} from "react-router";
import React from "react";
import "../../css/interest.css"
import moment from "moment";
export default function Interest() {
    const contracts = useOutletContext();
    return (
        <>
            <div  style={{height: ""}}>
                <table className="table table-hover table-striped" border={1}>
                    <thead>
                    <tr>
                        <th>Mã HD</th>
                        <th>Tiền cho vay(VND)</th>
                        <th>Tiền lãi (VND)</th>
                        <th>Ngày bắt Đầu</th>
                        <th>Lợi nhuận (VND)</th>
                        <th id="actions">Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contracts ?
                            contracts.map((contract, index) =>
                                <tr key={index}>
                                    <td>{"HD-"+contract.contractCode}</td>
                                    <td>{contract.loans?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td>{contract.interest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td>{moment(contract.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')}</td>
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