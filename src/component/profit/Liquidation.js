import React from "react";
import {useOutletContext} from "react-router";
import moment from "moment";

export default function Liquidation() {
    const liquidations = useOutletContext();
    return (
        <>
            <div style={{height: ""}}>
                <table className="table table-hover table-striped" border={1}>
                    <thead>
                    <tr>
                        <th>Mã HD</th>
                        <th>Tiền Mua(VND)</th>
                        <th>Tiền Bán(VND)</th>
                        <th>Ngày Thanh lý</th>
                        <th>Lợi Nhuận(VND)</th>
                        <th id="actions">Chức Năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        liquidations ?
                            liquidations.map((liquidation, index) =>
                                <tr key={index}>
                                    <td style={{textAlign: "center"}}>{liquidation.contractCode}</td>
                                    <td style={{textAlign: "center"}}>{liquidation.loans?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td style={{textAlign: "center"}}>{liquidation.proceedsOfSale?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td style={{textAlign: "center"}}>{moment(liquidation.createDate, 'YYYY/MM/DD').format('DD/MM/YYYY')}</td>
                                    <td style={{textAlign: "center"}}>{liquidation.profit?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
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