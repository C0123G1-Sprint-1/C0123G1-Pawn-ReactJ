import React, {useEffect, useState} from "react";
import * as employeeService from "../../service/employeeService";
import ReactPaginate from "react-paginate";
import {Link, NavLink, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import "../employee/employee.css";
import moment from "moment";
import jwt from "jwt-decode";
import {Modal} from "reactstrap";

export default function EmployeeList() {
    // const token = localStorage.getItem("token");
    // const decodedToken = jwt(token);
    const param = useParams();

    const [employeeList, setEmployeeList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [name, setName] = useState("");
    const [size, setSize] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    let count = currentPage * size + 1;

    const handleModalOpen = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const search = (value) => {
        setName(value.name);
        setCurrentPage(0)
    };

    const handlePageClick = async (page) => {
        setCurrentPage(+page.selected);
    };

    useEffect(() => {
        (async () => {
            const res = await employeeService.search(name, currentPage);
            setEmployeeList(res.content);
            setPageCount(res.totalPages);
            setCurrentPage(res.number)
            setSize(res.size)
        })()
    }, [currentPage, name])

    useEffect(() => {
        (async () => {
            const result = await employeeService.findById(param.id);
            setSelectedEmployee(result);
        })();
    }, [param.id]);

    useEffect(() => {
        document.title = "Danh sách nhân viên"; // Thay đổi title
    }, []);

    if (!employeeList) {
        return null
    }
    return (
        <>
            <div className="row mx-0">
                <div className="container mx-auto my-5 col-8" style={{width: "90%"}}>
                    <div

                    >
                        <div style={{marginBottom: 20}}>
                            <h1
                                className="d-flex justify-content-center"
                                style={{padding: 16}}
                            >
                                Danh Sách Nhân Viên
                            </h1>
                        </div>
                        <div className="d-flex">
                            <div className="mt-2 m-2 modal-body d-flex justify-content-between">
                                <Link
                                    to={"/nav/api/employee/create-employee"}
                                    type="button"
                                    className="btn btn-outline-success"
                                    style={{
                                        // marginLeft: "6%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: "20px",
                                        width: "20%",
                                        background: "var(--bs-btn-hover-bg)",
                                        color: "white",
                                    }}
                                >
                                    Thêm mới nhân viên
                                </Link>
                            </div>
                            <Formik
                                initialValues={{
                                    name: "",
                                    page: currentPage,
                                }}
                                onSubmit={(value) => {
                                    search(value);
                                }}
                            >
                                <Form className="d-flex m-1">
                                    <Field
                                        style={{
                                            width: "18vw",
                                            // marginRight: "18%",
                                            marginBottom: "20px",
                                            height: "50px",
                                        }}
                                        className="form-control me-3"
                                        type="text"
                                        placeholder="Tìm kiếm theo tên nhân viên"
                                        aria-label="Search"
                                        name="name"
                                    />
                                    <button
                                        className="btn btn-outline-success"
                                        style={{
                                            // marginRight: "4.5vw",
                                            marginBottom: "20px",
                                            height: "50px",
                                            width: "50px",
                                        }}
                                        type="submit"
                                    >
                                        <i className="bi bi-search"/>
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className="table-responsive justify-content-center "  style={{width: '100%'}}>
                            <table className="table table-striped "  >
                                <thead>
                                <tr>
                                    <th>Mã nhân viên</th>
                                    <th>Tên nhân viên</th>
                                    <th>Ngày sinh</th>
                                    <th>Giới tính</th>
                                    <th>Email</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>CMND/Hộ chiếu</th>
                                    <th>Chi tiết</th>
                                </tr>
                                </thead>
                                {employeeList?.length === 0 && name !== "" ? (
                                    <td colSpan="10">
                                        <h4 className={"text-danger text-center my-3"}>
                                            Dữ liệu không tồn tại
                                        </h4>
                                    </td>
                                ) : (
                                    <tbody>
                                    {employeeList?.map((employee, index) => (
                                        <tr key={index} style={{textAlign: "center"}}>
                                            <td className="text-center">{count++}</td>
                                            <td className="text-cut">{employee.name}</td>
                                            <td>
                                                {moment(employee.birthDay, "YYYY/MM/DD").format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </td>
                                            <td>{employee.gender === 0 ? "Nữ" : "Nam"}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.address}</td>
                                            <td>
                                                {employee.phoneNumber.replace(
                                                    /(\d{3})(\d{3})(\d{4})/,
                                                    "($1) $2-$3"
                                                )}
                                            </td>
                                            <td>{employee.citizenCode}</td>
                                            <td>
                                                <a
                                                    className="me-2"
                                                    onClick={() => handleModalOpen(employee)}
                                                >
                                                    <i
                                                        style={{color: "blue"}}
                                                        className="bi bi-info-circle"
                                                    />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                )}
                            </table>
                        {employeeList?.length === 0 ? (
                            <></>
                        ) : (
                            <div className="d-grid">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="Sau"
                                    onPageChange={handlePageClick}
                                    pageCount={pageCount}
                                    previousLabel="Trước "
                                    containerClassName="pagination"
                                    pageLinkClassName="page-num"
                                    nextLinkClassName="page-num"
                                    previousLinkClassName="page-num"
                                    activeClassName="active"
                                    disabledClassName="d-none"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal isOpen={showModal} className="modal-dialog-centered dong">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Chi tiết nhân viên</h5>
                    </div>
                    <div className="modal-body text-center">
                        <img
                            className="rounded-circle"
                            style={{
                                width: "130px",
                                height: "130px",
                                margin: `0 auto`,
                                border: "1px solid",
                            }}
                            height="100px"
                            src={selectedEmployee?.image}
                            alt=""
                        />
                        <p className="mt-3">Tiền lương : {(+selectedEmployee?.salary).toLocaleString()} VND</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button "
                            onClick={() => handleModalClose()}
                            className="btn btn-secondary"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
