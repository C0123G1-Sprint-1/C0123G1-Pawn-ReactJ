import * as contractService from '../../service/ContractService';
import "../../component/employee/employee.css";

import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import * as Swal from "sweetalert2";
import moment from "moment";
import {Field, Form, Formik} from "formik";
import ReactPaginate from "react-paginate";

export default function TransactionHistoryList() {

    const [contractStatus, setContractStatus] = useState([]);
    const [contractType, setContractType] = useState([]);
    const [contracts, setContract] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [minAndMax, setMinAndMax] = useState({
        min: "",
        max: ""
    });
    //
    // const getMinAndMaxApi = async () => {
    //     try {
    //         const res = await contractService.getMinAndMaxDate()
    //         setMinAndMax({
    //             min: res.data.minDate,
    //             max: res.data.maxDate
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }


    const role = localStorage.getItem("role");

    const getContractStatusApi = async () => {
        const res = await contractService.findAllContractStatus();
        setContractStatus(res.data);
    }
    const getContractTypeApi = async () => {
        const res = await contractService.findAllContractType();
        setContractType(res.data);
    }


    const showList = async () => {
        try {
            const result = await contractService.searchTransactionHistory(currentPage, search);
            setContract(result.content);
            const totalPages = result.totalPages;
            setPageCount(totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageClick = async (page) => {
        setCurrentPage(+page.selected);
        const result = await contractService.searchTransactionHistory(page.selected, search);
        setContract(result.content);
    };

    let [search, setSearch] = useState({
        customerName: '',
        productName: '',
        startDate: '',
        endDate: '',
        contractType: '',
        contractStatus: ''
    });

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-secondary me-3'
        },
        buttonsStyling: false
    })
    const pageTitle = "Lịch sử giao dịch";
    useEffect(() => {
        document.title = pageTitle;
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        getContractStatusApi();
        getContractTypeApi();
        showList()
        // getMinAndMaxApi()
    }, [search, currentPage]);
    const deleteTransactionHistory = async (id) => {
        let res = await contractService.deleteTransactionHistoryByID(id);
        showResultAlert(res.data);
        showList();
    }
    const showResultAlert = (res) => {
        if (res != null) {
            if (res) {
                Swal.fire({
                    icon: "success",
                    title: "Xóa thành công !",
                    timer: 2000
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xóa thất bại !",
                    timer: 2000
                })

            }
        }
    }
    return (
        <>
            <div className="col-lg-9 col-md-12 ">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="text-center">LỊCH SỬ GIAO DỊCH</h2>
                        <Formik initialValues={({
                            customerName: search?.customerName,
                            productName: search?.productName,
                            startDate: search?.startDate,
                            endDate: search?.endDate,
                            contractType: search?.contractType,
                            contractStatus: search?.contractStatus
                        })}
                                onSubmit={(values) => {
                                    const res = async () => {
                                        await setCurrentPage(0)
                                        await contractService.searchTransactionHistory(currentPage, values)
                                        await setSearch(values)
                                    }
                                    res()
                                }}
                        >
                            <Form>
                                <div className="row justify-content-center">
                                    <div className=" col-lg-5 col-xl-5 col-md-5">
                                        <label htmlFor="customerName" className="form-label me-2"
                                               style={{color: "black"}}>Tên
                                            khách
                                            hàng:</label>
                                        <Field style={{borderColor: "black"}} type="text" id="customerName"
                                               className="form-control"
                                               name="customerName"/>
                                    </div>
                                    <div className="col-lg-5 col-xl-5 col-md-5">
                                        <label htmlFor="productName" className="form-label me-2"
                                               style={{color: "black"}}>Tên
                                            đồ:</label>
                                        <Field style={{borderColor: "black"}} type="text" id="productName"
                                               className="form-control"
                                               name="productName"/>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mt-3">
                                    <div className="col-lg-5 col-xl-5 col-md-5">
                                        <label htmlFor="startDate" className="form-label me-2"
                                               style={{color: "black"}}>Giao dịch từ
                                            ngày:</label>
                                        <Field style={{borderColor: "black"}} type="date" id="startDate"
                                               className="form-control"
                                               name="startDate"/>
                                    </div>
                                    <div className="col-lg-5 col-xl-5 col-md-5">
                                        <label htmlFor="endDate" className="form-label me-2"
                                               style={{color: "black"}}>Đến:</label>
                                        <Field style={{borderColor: "black"}} type="date" id="endDate"
                                               className="form-control"
                                               name="endDate"/>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center align-items-center mt-3">
                                    <div className="col-lg-5 col-xl-5 col-md-5">
                                        <label className="form-label" style={{color: "black"}}>Loại hợp
                                            đồng:</label>
                                        <Field style={{borderColor: "black"}} name="contractType" as="select"
                                               className="text-center form-select">
                                            <option value={""}>--Chọn loại hợp đồng--</option>
                                            {
                                                contractType.map((ct, index) => (
                                                    <option key={index} value={ct.id}>{ct?.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <div className="col-lg-5 col-xl-5 col-md-5">
                                        <div className="align-items-center">
                                            <label className="form-label" style={{color: "black"}}>Trạng
                                                thái: </label>
                                            <div className="d-flex">
                                                <Field style={{borderColor: "black"}} name="contractStatus" as="select"
                                                       className="text-center form-select">
                                                    <option value={""}>--Chọn trạng thái--</option>
                                                    {
                                                        contractStatus.map((cs, index) => (
                                                            <option key={index} value={cs.id}>{cs?.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-10 my-4">
                                        <div className="d-flex justify-content-end">
                                            <button type="reset" className="btn btn-outline-secondary me-3"
                                            ><i className="bi bi-arrow-repeat"/></button>
                                            <button type="submit" className="btn btn-outline-success"><i
                                                className="bi bi-search"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12">
                    <table className="table table table-striped" border="1">
                        <thead>
                        <tr style={{textAlign: "start", fontSize: "15px"}}>
                            <th>Mã HĐ</th>
                            <th>Tên đồ</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày làm HĐ</th>
                            <th>Loại HĐ</th>
                            <th>Trạng thái</th>
                            <th>Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            contracts?.length === 0 && (search.customerName !== "" || search.productName !== "" || search.contractType !== ""
                                || search.contractStatus !== "" || search.startDate !== "" || search.endDate !== "") ? (
                                    <tr>
                                        <td colSpan={7}>
                                            <h4 style={{color: "red", textAlign: "center"}}>Dữ liệu không tồn tại</h4>
                                        </td>
                                    </tr>
                                ) :
                                contracts.map((th, index) => (
                                    <tr key={index} style={{textAlign: "start"}}>
                                        <td>HD-{th?.contractCode}</td>
                                        <td
                                            style={{
                                                textAlign: "start",
                                                maxWidth: '28%',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }} title={th.productName}>{th?.productName}</td>
                                        <td style={{textAlign: "start"}}>{th?.customers}</td>
                                        <td>{
                                            th?.startDate === "" ? "" :
                                                moment(th?.startDate, 'YYYY/MM/DD').format('DD/MM/YYYY')
                                        }</td>
                                        <td>{th?.contractType}</td>
                                        <td>{th?.contractStatus}</td>
                                        <td>
                                            <Link to={`/nav/info-store/transaction-history/detail/${th?.id}`}><i
                                                className="bi bi-info-circle me-3"/></Link>
                                            <Link to={`/nav/info-store/transaction-history/update-contract/${th?.id}`}
                                                  className="me-3"><i style={{color: "orange"}}
                                                                      className="bi bi-pencil-square"/></Link>
                                            {
                                                role === ("ROLE_ADMIN") ?
                                                    <a type="button" onClick={() => {
                                                        swalWithBootstrapButtons.fire({
                                                            icon: "warning",
                                                            title: "Xác nhận xóa",
                                                            html: `Bạn có muốn xoá lịch sử giao dịch có mã <span style="color: red">HD-${th?.contractCode}</span> không?`,
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Có',
                                                            cancelButtonText: 'Không',
                                                            reverseButtons: true
                                                        }).then((res) => {
                                                            if (res.isConfirmed) {
                                                                deleteTransactionHistory(+th?.id)
                                                            }
                                                        })
                                                    }}><i
                                                        style={{color: "red"}}
                                                        className="bi bi-trash3"/></a>
                                                    : ""}
                                        </td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-3 mb-5">
                <div className="d-flex col-12 justify-content-end">
                    <div className="d-grid">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={contracts.length === 0 || pageCount === 1 ? "" : "Sau"}
                            onPageChange={handlePageClick}
                            pageCount={pageCount}
                            previousLabel={contracts.length === 0 || pageCount === 1 ? "" : "Trước"}
                            containerClassName="pagination"
                            pageLinkClassName={contracts.length === 0 ? "" : "page-num"}
                            nextLinkClassName={contracts.length === 0 ? "" : "page-num"}
                            previousLinkClassName={contracts.length === 0 ? "" : "page-num"}
                            activeClassName="active"
                            disabledClassName="d-none"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}