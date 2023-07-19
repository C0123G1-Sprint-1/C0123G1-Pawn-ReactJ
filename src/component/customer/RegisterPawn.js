import React, {useEffect, useState} from 'react';
import * as customersService from "../../service/customersService";
import ReactPaginate from "react-paginate";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";

function RegisterPawn() {
    const [registerPawn, setRegisterPawn] = useState([])
    useEffect(() => {
        const list = async () => {
            let rs =await customersService.registerPawn();
            setRegisterPawn(rs.content)
        }
        list()
    },[])

// page
    const [pageCount1, setPageCount1] = useState(0);
    let [count, setCount1] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(0);
    const [names1, setName1] = useState("")


    const showList1 = async () => {
        try {
            const result = await customersService.registerPawn(names1, currentPage1);
            console.log(result);
            setRegisterPawn(result.content);
            const totalPages = result.totalPages;
            setPageCount1(totalPages);
        } catch (error) {
            console.log(error);
            setCurrentPage1(currentPage1 - 1);
        }
    };

    const search1 = async (value) => {
        let showTable = document.getElementById("showTable");
        let errMsg = document.getElementById("error");
        try {
            const res = await customersService.registerPawn(value.name, value.page);

            setCurrentPage1(res.content.number);
            setName1(value.name);
            const totalPages = res.totalPages;
            setPageCount1(totalPages);

            setRegisterPawn(res.content);

            console.log(res.content);
            showTable.style.display = "block";
            errMsg.style.display = "none";
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        showList1();
    }, [currentPage1]);

    const handlePageClick1 = async (page) => {
        setCurrentPage1(+page.selected);

        const result = await customersService.registerPawn(names1, page.selected);
        console.log(result.data);
        setRegisterPawn(result.content);
        setCount1(Math.ceil(result.size * page.selected + 1));
    };

    return (
        <>
            <div className="row mx-0">
                <div className="container mx-auto my-5 col-8" style={{width: '90%'}}>
                    <div style={{boxShadow: '1px 3px 10px 5px rgba(0, 0, 0, 0.2)'}}>
                        <div style={{marginBottom: '20px'}}>
                            <h2 className="d-flex justify-content-center"
                                style={{padding: '16px', backgroundColor: 'seagreen', color: 'white'}}>
                                DANH SÁCH KHÁCH HÀNG ĐĂNG KÍ TRÊN MẠNG
                            </h2>
                        </div>
                        <div style={{marginTop: '2%'}}>
                            <div className="row">
                                <div className='col mt-2' style={{marginLeft:"10%",padding:"0px"}} ><NavLink to='/listCustomer' className="btn btn-outline-primary" style={{marginLeft: '5%'}}>Danh sách khách hàng
                                </NavLink></div>
                                <div className="col  d-flex justify-content"
                                     style={{alignItems: 'center', marginLeft: '12%'}}>
                                    <Formik
                                        initialValues={{
                                            name: ''
                                        }}
                                        onSubmit={(value) => {
                                            search1(value)
                                            console.log(value)
                                        }
                                        }>
                                        <Form className="d-flex m-1" style={{padding:"0,0,0,0",marginBottom:"20px",marginTop:"0%"}}>
                                            <Field
                                                style={{paddingTop:"5px"}}
                                                className="form-control"
                                                type="text"
                                                placeholder="Tìm kiếm theo tên khách hàng"
                                                aria-label="Search"
                                                name='name'
                                            />
                                            <label htmlFor=""> </label>
                                            <button type='submit' className="btn btn-outline-success m-2"><i
                                                className="bi bi-search"/></button>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex justify-content-center">
                                        {registerPawn.length === 0 && names1 !== "" ? (
                                            <h3 className={"text-danger text-center my-3"}>
                                                Không tìm thấy kết quả {names1}
                                            </h3>
                                        ) : (
                                        <div className="table-responsive" style={{width: '80%'}}>
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên khách hàng</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Email</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Nội dung</th>
                                                    <th>Loại khách</th>
                                                    <th>Ngày tạo</th>
                                                    <th>Ngày chỉnh sửa</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {/*{*/}
                                                {/*    noResults && (*/}
                                                {/*        <h6 style={{textAlign: "center", width: "100%", color: 'red'}}><b>Không*/}
                                                {/*            tìm thấy khách hàng</b></h6>)*/}
                                                {/*}*/}
                                                {registerPawn.map((value,index)=>(
                                                    <tr key={index}>
                                                        <td>{value.id}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.phone}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.address}</td>
                                                        <td>{value.contendNote}</td>
                                                        <td>{value.productType.name}</td>
                                                        <td>{value.createTime}</td>
                                                        <td>{value.updateTime}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                            )}
                                    </div>
                                </div>

                            </div>
                            <div className="d-grid">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=">"
                                    onPageChange={handlePageClick1}
                                    pageCount={pageCount1}
                                    previousLabel="< "
                                    containerClassName="pagination"
                                    pageLinkClassName="page-num"
                                    nextLinkClassName="page-num"
                                    previousLinkClassName="page-num"
                                    activeClassName="active"
                                    disabledClassName="d-none"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPawn;