import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css"
import * as contractService from "../../service/ContractService";
import {FormattedNumber} from "react-intl";
import moment from "moment";
import {Link} from "react-router-dom";

export function TransactionHistoryDetail() {
    const [contract, setContract] = useState(null)
    const param = useParams();

    const getContractApi = async () => {
        const res = await contractService.getTransactionHistoryById(param.id);
        setContract(res)
        console.log(res)
    }
    useEffect(() => {
        getContractApi();
    }, [param.id])

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    if (!contract) {
        return null;
    }

    return (
        <>
            <div className="col-lg-9 col-md-9">
                <h1 className="text-center my-5">CHI TIẾT GIAO DỊCH</h1>

                <h2 className="text-center mt-2 mb-4">CHI TIẾT GIAO DỊCH</h2>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th className="ps-4">Mã hợp đồng</th>
                        <td className="ps-4">HD-{contract?.contractCode}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Loại hợp đồng</th>
                        <td className="ps-4">{contract?.contractType.name}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Nhân viên làm hợp đồng</th>
                        <td className="ps-4">{contract?.employees.name}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Tên đồ cầm</th>
                        <td className="ps-4">{contract?.productName}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Loại đồ</th>
                        <td className="ps-4">{contract?.productType.name}</td>
                    </tr>
                    <tr>
                        <th style={{lineHeight: "240px"}} className="ps-4">Ảnh đồ cầm</th>
                        <td className="text-center" style={{verticalAlign: "middle",maxWidth:"100%",maxHeight:"100%"}}>
                            <img
                                style={{objectFit:"cover",maxWidth:"100%"}}
                                src={contract.image === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract.image}
                                height={280}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className="ps-4">Tiền vay</th>

                        <td className="ps-4">
                            <FormattedNumber
                                value={contract?.loans}
                                currency="VND"
                                minimumFractionDigits={0}>
                            </FormattedNumber> VNĐ
                        </td>
                    </tr>
                    <tr>
                        <th className="ps-4">Tiền lãi theo ngày</th>
                        <td className="ps-4">
                            <FormattedNumber
                                value={contract?.loans * 0.0067}
                                currency="VND"
                                minimumFractionDigits={0}>
                            </FormattedNumber> VNĐ
                        </td>
                    </tr>
                    <tr>
                        <th className="ps-4">Ngày bắt đầu</th>
                        <td className="ps-4">{
                            contract?.startDate === "" ? "" :
                                moment(contract?.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                        }</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Ngày kết thúc</th>
                        <td className="ps-4">{
                            contract?.endDate === "" ? "" :
                                moment(contract?.endDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                        }</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Tên khách hàng</th>
                        <td className="ps-4">{contract?.customers?.name}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Giới tính</th>
                        <td className="ps-4">{contract?.customers?.gender === 1 ? "Nam" : "Nữ"}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">SĐT khách hàng</th>
                        <td className="ps-4">
                            {contract?.customers?.phoneNumber.replace(
                                /(\d{3})(\d{3})(\d{4})/,
                                "($1) $2-$3"
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th className="ps-4">Email</th>
                        <td className="ps-4">{contract?.customers?.email}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">Địa chỉ</th>
                        <td className="ps-4">{contract?.customers?.address}</td>
                    </tr>
                    <tr>
                        <th className="ps-4">CMND</th>
                        <td className="ps-4">{contract?.customers?.citizenCode}</td>
                    </tr>
                    <tr>
                        <th style={{lineHeight: "270px"}} className="ps-4">
                            Ảnh chân dung
                        </th>
                        <td className="text-center" style={{verticalAlign: "middle"}}>
                            <img
                                style={{objectFit: "cover"}}
                                src={contract?.customers?.image === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract?.customers?.image}
                                width={180}
                                height={250}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{lineHeight: "240px"}} className="ps-4">Ảnh CMND mặt trước</th>
                        <td className="text-center" style={{verticalAlign: "middle"}}>
                            <img
                                style={{objectFit: "cover"}}
                                src={contract?.customers?.frontCitizen === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract?.customers?.frontCitizen}
                                width={300}
                                height={180}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{lineHeight: "240px"}} className="ps-4">Ảnh CMND mặt sau</th>
                        <td className="text-center" style={{verticalAlign: "middle"}}>
                            <img
                                style={{objectFit: "cover"}}
                                src={contract?.customers?.backCitizen === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract?.customers?.backCitizen}
                                width={290}
                                height={180}
                                alt=""
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-center my-5 ">
                    <Link to={"/nav/info-store/transaction-history"} className="btn btn-secondary">Quay lại</Link>
                </div>
            </div>
        </>
    );
}