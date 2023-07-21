import React, {useEffect, useState} from "react";
import * as employeeService from "../../service/employeeService";
import ReactPaginate from "react-paginate";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import "../employee/employee.css";
import moment from 'moment';
import {Footer} from "../register-pawn/Footer";
import jwt from 'jwt-decode';


export default function EmployeeList() {
    const token = localStorage.getItem('token');
    const decodedToken = jwt(token);
    console.log(decodedToken.sub)
    console.log(decodedToken.role)

    const [employeeList, setEmployeeList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    let [count, setCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [name, setName] = useState("");

    useEffect(() => {
        document.title = "Danh sách nhân viên"; // Thay đổi title
    }, []);

    const showList = async () => {
        try {
            const result = await employeeService.search(name, currentPage, token);
            console.log(result);
            setEmployeeList(result.content);
            const totalPages = result.totalPages;
            setPageCount(totalPages);
        } catch (error) {
            console.log(error);
            setCurrentPage(currentPage - 1);
        }
    };

    const search = async (value) => {
        try {
            const res = await employeeService.search(value.name, value.page, token);
            setCurrentPage(res);
            setName(value.name);
            const totalPages = res.totalPages;
            setPageCount(totalPages);
            setEmployeeList(res.content);
            console.log(res.content);
        } catch (e) {
            setEmployeeList([])
        }
    };

    useEffect(() => {
        showList();
    }, []);

    const handlePageClick = async (page) => {
        setCurrentPage(+page.selected);

        const result = await employeeService.search(name, page.selected);
        console.log(result);
        setEmployeeList(result.content);
        setCount(Math.ceil(result.size * page.selected + 1));
    };

    return (
        <>
            <div className="row mx-0">
                <div className="container mx-auto my-5 col-8" style={{width: "97%"}}>
                    <div style={{boxShadow: "1px 3px 10px 5px rgba(0, 0, 0, 0.2)", height: "160px"}}>
                        <div style={{marginBottom: 20}}>
                            <h2
                                className="d-flex justify-content-center"
                                style={{padding: 16}}
                            >
                                Danh Sách Nhân Viên
                            </h2>
                        </div>
                        <div className="d-flex">
                            <div className="mt-2 m-2 modal-body d-flex justify-content-between">
                                <NavLink
                                    to={"/nav/api/employee/create-employee"}
                                    type="button"
                                    className="btn btn-outline-success"
                                    style={{
                                        marginLeft: 10,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: "20px",
                                        width: "20%",
                                        background: "var(--bs-btn-hover-bg)",
                                        color: "white",
                                    }}>
                                    Thêm mới nhân viên
                                </NavLink>
                            </div>
                            <Formik
                                initialValues={{
                                    name: "",
                                    page: currentPage,
                                }}
                                onSubmit={(value) => {
                                    search(value)

                                }}
                            >
                                <Form className="d-flex m-1">
                                    <Field
                                        style={{width: "18vw", marginBottom: "20px", height: "50px"}}
                                        className="form-control me-3"
                                        type="text"
                                        placeholder="Tìm kiếm theo tên nhân viên"
                                        aria-label="Search"
                                        name='name'
                                    />
                                    <button
                                        className="btn btn-outline-success"
                                        style={{
                                            marginRight: 10,
                                            marginBottom: "20px",
                                            height: "50px",
                                            width: "50px"
                                        }}
                                        type="submit"
                                    >
                                        <i className="bi bi-search"/>
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-responsive">
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
                                    <th>Tiền lương (VND)</th>
                                    <th>Hình ảnh</th>
                                    <th/>
                                </tr>
                                </thead>
                                {employeeList.length === 0 && name !== "" ? (
                                      <td colSpan="10">
                                          <h4 className={"text-danger text-center my-3"}>
                                            Dữ liệu không tồn tại
                                          </h4>
                                      </td>
                                ) : (
                                <tbody>
                                {employeeList.map((employee, index) => (
                                    <tr key={index} style={{textAlign: "center"}}>
                                        <td className="text-center">{count++}</td>
                                        <td className="text-cut">
                                            {employee.name}
                                        </td>
                                        <td>{
                                            moment(employee.birthDay, 'YYYY/MM/DD').format('DD/MM/YYYY')
                                        }</td>
                                        <td>{employee.gender === 0 ? "Nữ" : "Nam"}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</td>
                                        <td>{employee.citizenCode}</td>
                                        <td>{(+employee.salary).toLocaleString()} VND</td>
                                        <td><img className="rounded-circle"
                                                 style={{
                                                     width: "120px",
                                                     height: "110px",
                                                     margin: `0 auto`,
                                                     border: "1px solid"
                                                 }}
                                                 height="100px" src={employee.image} alt=""/></td>
                                    </tr>
                                ))}
                                </tbody>
                                )}
                            </table>
                            {employeeList.length === 0 ? ""
                                :
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
                            }
                        </div>

                </div>
            </div>
        </>
    );
}