    import React, {useEffect, useState} from 'react';
import * as customersService from "../../service/customersService";
import ReactPaginate from "react-paginate";
import {Link, NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";

 export  function RegisterPawnAnhQoc() {
    const [registerPawn, setRegisterPawn] = useState([])
    useEffect(() => {
        const list = async () => {
            let rs = await customersService.registerPawn();
            setRegisterPawn(rs.content)
        }
        list()
    }, [])

// page
    const [pageCount1, setPageCount1] = useState(0);
    let [count1, setCount1] = useState(1);
    const [currentPage1, setCurrentPage1] = useState(0);


    const showList1 = async () => {
        try {
            const result = await customersService.registerPawn(currentPage1);
            console.log(result);
            setRegisterPawn(result.content);
            const totalPages = result.totalPages;
            setPageCount1(totalPages);
        } catch (error) {
            console.log(error);
            setCurrentPage1(currentPage1 - 1);
        }
    };


    useEffect(() => {
        showList1();
    }, [currentPage1]);

    const handlePageClick1 = async (page) => {
        setCurrentPage1(+page.selected);

        const result = await customersService.registerPawn(page.selected);
        console.log(result.data);
        setRegisterPawn(result.content);
        setCount1(Math.ceil(result.size * page.selected + 1));
    };

    return (
        <>
            <div className="row mx-0">
                <div className="container mx-auto my-5 col-8" style={{width: '90%'}}>
                    <div style={{marginBottom: '20px'}}>
                        <h2 className="d-flex justify-content-center"
                            >
                            DANH SÁCH KHÁCH HÀNG MỚI
                        </h2>
                    </div>
                    <div style={{marginTop: '2%'}}>
                        <div className="row">
                            <div className='col mt-2' style={{marginLeft: "10%", padding: "0px"}}>
                                <Link to='/nav/manager-customer' className="btn btn-success m-2">Danh
                                sách khách hàng
                            </Link>
                            </div>
                            <div className="col  d-flex justify-content"
                                 style={{alignItems: 'center', marginLeft: '12%'}}>
                            </div>
                            <div className="col-12">
                                <div className="d-flex justify-content-center">

                                    <div className="table-responsive" style={{width: '80%'}}>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên khách hàng</th>
                                                <th>Số điện thoại</th>
                                                <th>Email</th>
                                                <th>Địa chỉ</th>
                                                <th>Loại cầm đồ</th>

                                            </tr>
                                            </thead>
                                            <tbody>

                                            {registerPawn.map((value, index) => (
                                                <tr key={index}>
                                                    <td>{value.id}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.phone}</td>
                                                    <td>{value.email}</td>
                                                    <td>{value.address}</td>

                                                    <td>{value.productType.name}</td>

                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="d-grid" style={{marginRight:"5.5%"}}>
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
        </>
    );
}

export default RegisterPawnAnhQoc;