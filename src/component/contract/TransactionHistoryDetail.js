import {useEffect, useState} from "react";
import {useParams} from "react-router";
import "bootstrap/dist/css/bootstrap.min.css"
import * as contractService from "../../service/ContractService";
import {FormattedNumber} from "react-intl";
import moment from "moment";

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
                <h1 className="text-center my-5">CHI TIẾT GIAO DỊCH</h1>
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
                        <th>Ảnh đồ cầm</th>
                        <td>
                            <img
                                src={contract?.image}
                                width={150}
                                height={150}
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
                            </FormattedNumber> VND
                        </td>
                    </tr>
                    <tr>
                        <th>Tiền lãi theo ngày</th>
                        <td>
                            <FormattedNumber
                                value={contract?.profit}
                                currency="VND"
                                minimumFractionDigits={0}>
                            </FormattedNumber> VND
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày bắt đầu</th>
                        <td>{
                            moment(contract?.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                        }</td>
                    </tr>
                    <tr>
                        <th>Ngày kết thúc</th>
                        <td>{
                            moment(contract?.endDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                        }</td>
                    </tr>
                    <tr>
                        <th>Tên khách hàng</th>
                        <td>{contract?.customers.name}</td>
                    </tr>
                    <tr>
                        <th>SĐT khách hàng</th>
                        <td>{contract?.customers.phoneNumber}</td>
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
                        <th
                            className="align-items-center">
                            Ảnh chân dung
                        </th>
                        <td>
                            <img
                                src={contract?.customers.image}
                                width={250}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Ảnh CMND mặt trước</th>
                        <td>
                            <img
                                src={contract?.customers.frontCitizen}
                                width={250}
                                alt=""
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Ảnh CMND mặt sau</th>
                        <td>
                            <img
                                src={contract?.customers.backCitizen}
                                width={250}
                                alt=""
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}