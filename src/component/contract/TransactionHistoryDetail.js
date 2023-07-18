import {useEffect, useState} from "react";
import {useParams} from "react-router";
import * as contractService from "../../service/ContractService";

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
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="col-xxl-12 col-xl-12 col-md-12 d-flex justify-content-center align-items-center"
                        style={{height: "15vh", backgroundColor: "green"}}
                    >
                        <h1 className="text-center align-center" style={{color: "#eeeeee"}}>
                            HEADER
                        </h1>
                    </div>
                </div>
                <div className="container-fluid mt-5" style={{height: "105vh"}}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-xxl-3 col-xl-3 col-sm-12 col-md-8 mt-3">
                            <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-action">
                                    Thông tin cửa hàng
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    Tài chính
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    Danh sách đồ cầm trong kho
                                </a>
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action active"
                                    aria-current="true"
                                >
                                    Lịch sử giao giao dịch
                                </a>
                                <a className="list-group-item list-group-item-action ">
                                    Top 10 hợp đồng mới nhất
                                </a>
                                <a className="list-group-item list-group-item-action ">
                                    Thống kê lợi nhuận
                                </a>
                            </div>
                        </div>
                        <div className="col-xxl-9 col-xl-9">
                            <h1 className="text-center mt-5">Chi tiết giao dịch</h1>
                            <div className="row">
                                <div className="col-xxl-12 col-xl-12 col-lg-12 mt-5">
                                    <div className="container">
                                        <table className="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <th>Mã hợp đồng</th>
                                                <td>{contract?.contractCode}</td>
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
                                                <td>{contract?.loans}</td>
                                            </tr>
                                            <tr>
                                                <th>Tiền lãi theo ngày</th>
                                                <td>{contract?.profit}</td>
                                            </tr>
                                            <tr>
                                                <th>Ngày bắt đầu</th>
                                                <td>{contract?.startDate}</td>
                                            </tr>
                                            <tr>
                                                <th>Ngày kết thúc</th>
                                                <td>{contract?.endDate}</td>
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
                                                    className="align-items-center"
                                                >
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
                                                <th >Ảnh CMND mặt trước</th>
                                                <td>
                                                    <img
                                                        src={contract?.customers.frontCitizen}
                                                        width={250}
                                                        alt=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th >Ảnh CMND mặt sau</th>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}