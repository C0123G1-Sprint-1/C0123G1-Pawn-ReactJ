import React, {useEffect} from "react";
import {useOutletContext} from "react-router";
import moment from "moment";

export default function Liquidation() {
    const liquidations = useOutletContext();
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <div style={{minHeight: "53vh"}}>
                <table className="table table-hover table-striped" border={1}>
                    <thead>
                    <tr style={{textAlign: "start"}}>
                        <th>Mã HD</th>
                        <th>Tiền mua (VND)</th>
                        <th>Tiền bán (VND)</th>
                        <th>Ngày thanh lý</th>
                        <th>Lợi nhuận (VND)</th>
                        <th id="actions">Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        liquidations ?
                            liquidations.map((liquidation, index) =>
                                <tr key={index}>
                                    <td>{"HD-"+liquidation.contractCode}</td>
                                    <td>{liquidation.loans?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td>{liquidation.proceedsOfSale?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                                    <td>{moment(liquidation.createDate, 'YYYY/MM/DD').format('DD/MM/YYYY')}</td>
                                    <td>{liquidation.profit?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
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