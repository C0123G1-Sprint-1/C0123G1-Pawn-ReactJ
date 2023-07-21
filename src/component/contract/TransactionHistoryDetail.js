import {useEffect, useState} from "react";
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
    }
    useEffect(() => {
        getContractApi();
    }, [param.id])
    if (!contract) {
        return null;
    }
    return (
        <>
            <div className="col-lg-9 col-md-9">
                <h2 className="text-center my-5">CHI TIẾT GIAO DỊCH</h2>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th>Mã hợp đồng</th>
                        <td>HD-{contract?.contractCode}</td>
                    </tr>
                    <tr>
                        <th>Loại hợp đồng</th>
                        <td>{contract?.contractType.name}</td>
                    </tr>
                    <tr>
                        <th>Tên đồ cầm</th>
                        <td>{contract?.productName}</td>
                    </tr>
                    <tr>
                        <th>Loại đồ</th>
                        <td>{contract?.productType.name}</td>
                    </tr>
                    <tr>
                        <th style={{lineHeight: "240px"}}>Ảnh đồ cầm</th>
                        <td className="text-center">
                            <img
                                src={contract.image === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract.image}
                                width={250}
                                height={240}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Tiền vay</th>

                        <td>
                            <FormattedNumber
                                value={contract?.loans}
                                currency="VND"
                                minimumFractionDigits={0}>
                            </FormattedNumber> VNĐ
                        </td>
                    </tr>
                    <tr>
                        <th>Tiền lãi theo ngày</th>
                        <td>
                            <FormattedNumber
                                value={contract?.loans * 0.0067}
                                currency="VND"
                                minimumFractionDigits={0}>
                            </FormattedNumber> VNĐ
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày bắt đầu</th>
                        <td>{
                            contract?.startDate===""?"":
                            moment(contract?.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                        }</td>
                    </tr>
                    <tr>
                        <th>Ngày kết thúc</th>
                        <td>{
                            contract?.endDate===""?"":
                            moment(contract?.endDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                        }</td>
                    </tr>
                    <tr>
                        <th>Tên khách hàng</th>
                        <td>{contract?.customers.name}</td>
                    </tr>
                    <tr>
                        <th>SĐT khách hàng</th>
                        <td>{contract?.customers.phoneNumber}
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{contract?.customers.email}</td>
                    </tr>
                    <tr>
                        <th>Địa chỉ</th>
                        <td>{contract?.customers.address}</td>
                    </tr>
                    <tr>
                        <th>CMND</th>
                        <td>{contract?.customers.citizenCode}</td>
                    </tr>
                    <tr>
                        <th style={{lineHeight:"240px"}}>
                            Ảnh chân dung
                        </th>
                        <td className="text-center">
                            <img
                                src={contract?.customers.image === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract?.customers.image}
                                width={250}
                                height={240}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{lineHeight:"240px"}}>Ảnh CMND mặt trước</th>
                        <td className="text-center">
                            <img
                                src={contract?.customers.frontCitizen === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract?.customers.frontCitizen}
                                width={250}
                                height={200}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{lineHeight:"240px"}}>Ảnh CMND mặt sau</th>
                        <td className="text-center">
                            <img
                                src={contract?.customers.backCitizen === "" ? "https://vpubnd.quangnam.gov.vn/bootstrapv2/resources/portal/vpubnd/images/placeholder.jpg" : contract?.customers.backCitizen}
                                width={250}
                                height={200}
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