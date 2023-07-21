import React, {useEffect, useState} from 'react';
import * as customersService from "../../service/customersService";
import {Field, Form, Formik} from "formik";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import jwt from 'jwt-decode';
import moment from "moment";
import {Link} from "react-router-dom";
export function CustomerList() {
    const [listCustomer, setListCustomer] = useState([]);
    const [nameDelete, setNameDelete] = useState(null);
    const [idDelete, setIdDelete] = useState(null);

    const [registerPawn, setRegisterPawn] = useState([])
    useEffect(() => {
        const list = async () => {
            let rs = await customersService.registerPawn();
            setRegisterPawn(rs.content)
        }
        list()
    }, [])

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

        const result = await customersService.registerPawn( page.selected);
        console.log(result.data);
        setRegisterPawn(result.content);
        setCount1(Math.ceil(result.size * page.selected + 1));
    };

// page
    const [pageCount, setPageCount] = useState(0);
    let [count, setCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [name, setName] = useState("")


    const showList = async () => {
        try {
            const result = await customersService.findByAll(name, currentPage);
            console.log(result);
            setListCustomer(result.content);
            const totalPages = result.totalPages;
            setPageCount(totalPages);
        } catch (error) {
            console.log(error);
            // setCurrentPage(currentPage - 1);
        }
    };

    const search = async (value) => {
        let showTable = document.getElementById("showTable");
        let errMsg = document.getElementById("error");
        try {
            const res = await customersService.findByAll(value.name, value.page);
            setCurrentPage(res.content.number);
            setName(value.name);
            const totalPages = res.totalPages;
            setPageCount(totalPages);
            setListCustomer(res.content);
            showTable.style.display = "block";
            errMsg.style.display = "none";
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        showList();
    },  [currentPage]);

    const handlePageClick = async (page) => {
        setCurrentPage(+page.selected);

        const result = await customersService.findByAll(name, page.selected);
        console.log(result.data);
        setListCustomer(result.content);
        setCount(Math.ceil(result.size * page.selected + 1));
    };


    useEffect(() => {
        const list = async () => {
            let rs = await customersService.findByAll();
            setListCustomer(rs.content)
            console.log(rs)
        }
        list()
    }, [])


    async function deleteCustomers(id) {
        await customersService.deleteCustomer(id)
        Swal.fire({
            icon: "success",
            title: "Xóa thành công !",
            timer: 3000
        })
        let rs = await customersService.findByAll(name, currentPage);
        setListCustomer(rs.content)

    }


    const [id, setId] = useState("")
    const [names, setNames] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [citizenCode, setCitizenCode] = useState("")
    const [image, setImage] = useState("")
    const [frontCitizen, setFrontCitizen] = useState("")
    const [backCitizen, setBackCitizen] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [updateDate, setUpdateDate] = useState("")
    const [note, setNote] = useState("")
    const [quantityContract, setQuantityContract] = useState("")

    function getDetail(id, name, birthday, gender, phoneNumber, email, address, citizenCode, image,
                       frontCitizen, backCitizen, createDate, updateDate, note,quantityContract) {
        setId(id);
        setNames(name);
        setBirthday(birthday);
        setGender(gender);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        setAddress(address);
        setCitizenCode(citizenCode);
        setImage(image);
        setFrontCitizen(frontCitizen);
        setBackCitizen(backCitizen);
        setCreateDate(createDate);
        setUpdateDate(updateDate)
        setNote(note);
        setQuantityContract(quantityContract)
    }

    return (
        <>

            <div className="row mx-0">
                <div className="container mx-auto my-5 col-8" style={{width: '85%'}}>
                    <div style={{boxShadow: '1px 3px 10px 5px rgba(0, 0, 0, 0.2)'}}>
                        <div style={{marginBottom: '20px'}}>
                            <h2 className="d-flex justify-content-center"
                                style={{padding: '16px', backgroundColor: 'seagreen', color: 'white'}}>
                                DANH SÁCH KHÁCH HÀNG
                            </h2>
                        </div>

                        <div className='container'>
                            <div className="row ">
                                <div className="col-6 mt-2">
                                    <Link to="/nav/manager-customer/create"  className="btn btn-success" style={{marginLeft: "10%"}}>Thêm khách
                                        hàng
                                    </Link>
                                    {/*<NavLink*/}
                                    {/*    to='/listCustomerRegisterPawn' className="btn btn-outline-primary"*/}
                                    {/*    style={{marginLeft: '5%'}}>Danh sách khách hàng mới*/}
                                    {/*</NavLink>*/}
                                    <button type="button" className="btn btn-success" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal" style={{marginLeft: '5%'}}>
                                        Danh sách khách hàng mới
                                    </button>
                                </div>

                                <div className="col-6"
                                >
                                    <Formik
                                        initialValues={{
                                            name: ''
                                        }}
                                        onSubmit={(value) => {
                                            search(value)
                                        }
                                        }>
                                        <Form className="d-flex m-1">
                                            <Field
                                                style={{paddingTop: "5px", width: '70%'}}
                                                className="form-control d-flex"
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
                            </div>


                        </div>
                        <div style={{marginTop: '2%'}}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-center">
                                        {listCustomer.length === 0 && name !== "" ? (
                                            <h3 className={"text-danger text-center my-3"}>
                                                Không tìm thấy kết quả {name}
                                            </h3>
                                        ) : (
                                            <div className="table-responsive" style={{width: '80%'}}>
                                                <table className="table table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên khách hàng</th>
                                                        <th>Số điện thoại</th>
                                                        <th>CMND/Hộ chiếu</th>
                                                        <th>Số lượng hợp đồng</th>
                                                        <th>Chức năng</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        listCustomer.map((value, index) => (
                                                            <tr key={index}>
                                                                <td>{value.id}</td>
                                                                <td>{value.name}</td>
                                                                <td>{value.phoneNumber}</td>
                                                                <td>{value.citizenCode}</td>
                                                                <td>{value.quantityContract}</td>
                                                                <td>
                                                                    <a href className="me-2" data-bs-toggle="modal"
                                                                       data-bs-target="#staticBackdrop"><i
                                                                        style={{color: '#4698f9'}}
                                                                        className="bi bi-info-circle"
                                                                        onClick={() => getDetail(value.id, value.name, value.birthday, value.gender, value.phoneNumber, value.email, value.address,
                                                                            value.citizenCode, value.image, value.frontCitizen, value.backCitizen, value.createDate,value.quantityContract,
                                                                            value.updateDate, value.note)}/></a>
                                                                    <Link to={`/nav/manager-customer/update/${value.id}`} href className="me-2"><i
                                                                        style={{color: 'orange'}}
                                                                        className="bi bi-pencil-square"/></Link>
                                                                    <a type="button"
                                                                       >
                                                                        <i style={{color: 'red'}}
                                                                           className="bi bi-trash3"
                                                                           onClick={() => {
                                                                               Swal.fire({
                                                                                   icon: "warning",
                                                                                   title:"Xác nhận xóa",
                                                                                   titleText: `Bạn có muốn xoá khách hàng ${value.name} không ?`,
                                                                                   showCancelButton: true,
                                                                                   cancelButtonText: "Hủy",
                                                                                   confirmButtonText: "Có",
                                                                                   cancelButtonColor: "rgba(118,112,112,0.51)",
                                                                                   confirmButtonColor: "#d33"
                                                                               })
                                                                                   .then((res) => {
                                                                                       if (res.isConfirmed) {
                                                                                           deleteCustomers(value.id)
                                                                                       }
                                                                                   })}}
                                                                               />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                    {/* Modal */}
                                                    {/*<div className="modal fade" id="staticBackdrop6"*/}

                                                    {/*     tabIndex={-1}*/}
                                                    {/*     aria-labelledby="staticBackdropLabel" aria-hidden="true">*/}
                                                    {/*    <div className="modal-dialog">*/}
                                                    {/*        <div className="modal-content">*/}
                                                    {/*            <div className="modal-header">*/}
                                                    {/*                <h5 className="modal-title"*/}
                                                    {/*                    id="staticBackdropLabel6">Xác nhận*/}
                                                    {/*                    xóa khách hàng</h5>*/}
                                                    {/*                <button type="button" className="btn-close"*/}
                                                    {/*                        data-bs-dismiss="modal" aria-label="Close"/>*/}
                                                    {/*            </div>*/}
                                                    {/*            <div className="modal-body">*/}
                                                    {/*                Bạn thật sự muốn xóa <b*/}
                                                    {/*                style={{color: 'red'}}>{nameDelete}</b>*/}
                                                    {/*                ?*/}
                                                    {/*            </div>*/}
                                                    {/*            <div className="modal-footer">*/}
                                                    {/*                <button type="button" className="btn btn-secondary"*/}
                                                    {/*                        data-bs-dismiss="modal">Thoát*/}
                                                    {/*                </button>*/}
                                                    {/*                <button type="button" className="btn btn-danger"*/}
                                                    {/*                        data-bs-dismiss="modal"*/}
                                                    {/*                        onClick={() => deleteCustomers()}>Xóa*/}
                                                    {/*                </button>*/}
                                                    {/*            </div>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}


                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-grid">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="Trước"
                                            onPageChange={handlePageClick}
                                            pageCount={pageCount}
                                            previousLabel="Sau"
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
                </div>
            </div>
            {/*chi tiết khách hàng*/}
            <div className="modal fade " id="staticBackdrop"
                  tabIndex={-1}
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header" align="center">
                            <h2 className="modal-title text-center"
                                id="staticBackdropLabel"> Chi tiết khách
                                hàng <span style={{color: 'green'}}>{names}</span></h2>
                            <button type="button" className="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="row mb-4 mt-4 ">
                            <div className="col-sm-4  ">
                                <div className=" image-frame">
                                    <div className="card-body ">
                                        <img
                                            src={image}
                                            width={250} style={{padding: '7%'}}
                                            alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8" style={{width: '63.666667%'}}>
                                <div className>
                                    <div className="card-body ">
                                        <table className="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td className="col-sm-4 fw-bold">Mã
                                                    khách hàng
                                                </td>
                                                <td className="col-sm-6"> {id}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold"> Ngày
                                                    sinh
                                                </td>
                                                <td className="col-sm-6">{birthday}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold"> Số
                                                    điện thoại
                                                </td>
                                                <td className="col-sm-6"> {phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold"> Email</td>
                                                <td className="col-sm-6">{email}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold">Giới
                                                    tính
                                                </td>
                                                <td className="col-sm-6"> {gender === 1 ? 'nam' : 'nữ'}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold"> Địa
                                                    chỉ
                                                </td>
                                                <td className="col-sm-6">{address}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold">CMND/Hộ
                                                    chiếu
                                                </td>
                                                <td className="col-sm-6">{citizenCode}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold">Số
                                                    lượng hợp đồng
                                                </td>
                                                <td className="col-sm-6">{updateDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold">Ngày tạo
                                                </td>
                                                <td>{moment(createDate).format('DD/MM/YYYY')}</td>

                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold">Ngày chỉnh sửa</td>
                                                <td>{moment(note).format('DD/MM/YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <td className="col-sm-4 fw-bold">Ghi chú</td>
                                                <td className="col-sm-6">{quantityContract}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*modal xem danh sách*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor: 'seagreen'}}>
                            <h5 className="modal-title"  id="exampleModalLabel">DANH SÁCH KHÁCH HÀNG ĐĂNG KÍ TRÊN
                                MẠNG</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-12">
                                <div className="d-flex justify-content-center">
                                    <div className="table-responsive" style={{width: '100%'}}>
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
                                            {registerPawn.map((value, index) => (
                                                <tr key={index}>
                                                    <td>{value.id}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.phone}</td>
                                                    <td>{value.email}</td>
                                                    <td>{value.address}</td>
                                                    <td>{value.contentNote}</td>
                                                    <td>{value.productType.name}</td>
                                                    <td>{moment(value.createTime).format('DD/MM/YYYY')}</td>
                                                    <td>{moment(value.updateTime).format('DD/MM/YYYY')}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <div className="d-grid">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="Trước"
                                    onPageChange={handlePageClick1}
                                    pageCount={pageCount1}
                                    previousLabel="Sau"
                                    containerClassName="pagination"
                                    pageLinkClassName="page-num"
                                    nextLinkClassName="page-num"
                                    previousLinkClassName="page-num"
                                    activeClassName="active"
                                    disabledClassName="d-none"
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}

export default CustomerList;