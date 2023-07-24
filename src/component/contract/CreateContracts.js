import * as contractService from "../../service/ContractService";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { ThreeCircles } from "react-loader-spinner";
import { FormattedNumber } from "react-intl";
import ReactPaginate from "react-paginate";
import * as yup from "yup";

export const CreateContracts = () => {


    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imgErr, setImgErr] = useState("");


    const [showModal, setShowModal] = useState(false);
    const [productType, setProductType] = useState([]);
    const [contractType, setContractType] = useState([]);
    const [contractStatus, setContractStatus] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [code, setCode] = useState('');
    const [idCustomer, setIdCustomer] = useState();
    const [customerName, setCustomerName] = useState('');

    const [loans, setLoans] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDay] = useState('');

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0); // Tổng số trang


    const n = useNavigate();

    const handleLoans = async (event) => {
        await setLoans(event.target.value)
    }
    const handleStartDate = async (event) => {

        await setStartDate(event.target.value)
    }

    const handleEndDay = async (event) => {
        await setEndDay(event.target.value)
    }

    useEffect(() => {

    })
    let percent = 0.67 / 100;
    const moment = require('moment');
    const startDates = moment(startDate);
    const endDates = moment(endDate);
    // tính khoảng cách ngày
    const duration = endDates.diff(startDates, 'days');
    const profits = +(loans * percent * duration)

    // fire basex
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setImgErr("");
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmitAsyncs = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("Chưa có file nào được chọn ");
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };
    const getAllCustomer = async () => {
        try {
            const res = await contractService.findAllCustomer(currentPage, customerName)
            setCustomer(res.content)
            setPageCount(res.totalPages)
        } catch (e) {
        }
    }
    //  Sổ list  chọn khách hàng
    useEffect(() => {
        getAllCustomer()
    }, [currentPage, customerName])

    const handlePage = async (pages) => {
        setCurrentPage(+pages.selected);
        const res = await contractService.findAllCustomer(currentPage, customerName)
        setCustomer(res.content)
    }
    // Modal
    const handleModalClose = () => {
        setShowModal(false);
        setCustomerName("")
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };
    // các loại dịch vụ
    const getAllProductType = async () => {
        const res = await contractService.findAllProductType();
        setProductType(res)
    }
    const getAllContractType = async () => {
        const res = await contractService.findAllContractType();
        setContractType(res)
    }
    const getAllContractTStatus = async () => {
        const res = await contractService.findAllContractStatus();
        setContractStatus(res)
    }
    // nhân viên
    const getAllEmployee = async () => {
        const res = await contractService.findAllAndEmployee();
        setEmployees(res.content[0])
        console.log(res.content)
    }

    // page

    // random mã
    const createContractCodeApi = async () => {
        const res = await contractService.createCodeContract();
        setCode(res);
    }
    // duyệt lấy id từng loại
    const getIdProductTypes = (id) => {
        for (let productTypes of productType) {
            if (productTypes.id === id) {
                return productTypes
            }
        }
    }


    useEffect(() => {
        getAllProductType()
        getAllContractType()
        getAllContractTStatus()
        getAllEmployee()
        createContractCodeApi()
    }, [])

    const showLoadingScreen = () => {
        Swal.fire({
            html: '<div className="loading-screen" style={{position: "fixed",\n' +
                '  top: "0;",\n' +
                '  left: "0",\n' +
                '  width: "100%",\n' +
                '  height: "100%",\n' +
                '  background-color: "rgba(0, 0, 0, 0.5)" }}/* Màu nền màn hình đen với độ mờ */></div>', // Sử dụng CSS để tạo màn hình đen.
            timer: 5000,
            title: "Vui lòng đợi chúng tôi xử lí trong vòng vài giây",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: async () => {
                await Swal.showLoading();
            },
            willClose: () => {
                // Thêm xử lý khi SweetAlert2 đóng (nếu cần thiết).
            }
        });
    };

    return (
        <>
            <div className="container" >
                <div className="row height d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <div className="col-md-6">
                        <div className="card px-5 py-4">
                            <div style={{ textAlign: "center" }}>
                                <h1>CẦM ĐỒ</h1>
                            </div>
                            <Formik initialValues={{
                                customers: '',
                                contractCode: code,
                                productName: '',
                                productType: '',
                                image: '',
                                loans: '',
                                startDate: '',
                                endDate: '',
                                profit: '',
                                contractStatus: 2,
                                contractType: 1,
                                employees: 1
                            }}
                                validationSchema={Yup.object({
                                    productName: Yup.string()
                                        .trim()
                                        .required('Không được để trống')
                                        .matches(/^[^!@#$%^&*()+=\[\]{};':"\\|.<>?`~/]+$/, "Tên không chứa ký tự đặc biệt như @#$.."),
                                    loans: Yup.number()
                                        .required('Không được để trống')
                                        .min(500000, 'Tiền cho vay phải lớn hớn 500.000'),
                                    productType: yup.number()
                                        .required('Không được để trống')
                                        .min(1, 'Không được để trống'),

                                    startDate: Yup.date()
                                        .required('Không được để trống')
                                        .test("date", "Không được chọn quá khứ chỉ chọn hiện tại và tương lai",
                                            function (value) {
                                                const buyDate = value.getDay()
                                                const month = value.getMonth()
                                                const year = value.getFullYear()
                                                const dateNow = new Date()
                                                if (year >= dateNow.getFullYear()) {
                                                    if (month > dateNow.getMonth()) {
                                                        return true
                                                    } else if (month === dateNow.getMonth()) {
                                                        if (buyDate >= dateNow.getDay()) {
                                                            return true
                                                        }
                                                    }
                                                }
                                                return false;
                                            }),
                                    endDate: Yup.date()
                                        .required('Không được để trống')
                                        .test("date", "Ngày kết thúc phải lớn hơn ngày bắt đầu",
                                            function (value) {
                                                const startDate = this.resolve(Yup.ref('startDate'));
                                                return value > startDate;
                                            }),
                                    image: Yup.string()
                                        .required('Không được để trống')
                                })}


                                onSubmit={async (values, { resetForm }) => {
                                    const createContracts = async () => {
                                        const newValue = {
                                            ...values,
                                            image: firebaseImg,
                                        };
                                        newValue.image = await handleSubmitAsyncs();
                                        await contractService.createContract({
                                            ...newValue,
                                            image: newValue.image,
                                            customers: customer.find((cus) => cus.id === idCustomer),
                                            contractType: +values.contractType,
                                            contractStatus: +values.contractStatus,
                                            contractCode: code + values.contractCode,
                                            productType: getIdProductTypes(+values.productType),
                                            profit: +(profits),
                                            employees: +values.employees,
                                            startDate: startDate,
                                            endDate: endDate,
                                            loans: +loans
                                        })

                                    }

                                    await createContracts()
                                    // resetForm(false)
                                    Swal.fire({
                                        icon: "success",
                                        title: "Thêm mới thành công",
                                        timer: 3000
                                    })
                                    n("/nav/info-store/transaction-history")
                                }}
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form>
                                        <div className="text-center m-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-success "
                                                data-bs-target="#static"
                                                onClick={async () => {
                                                    handleModalOpen()
                                                }}>
                                                <b className="text-center">Chọn khách hàng</b>
                                            </button>
                                        </div>
                                        {/* nút thêm khách hàng là vd chưa có khách hàng trong danh sách
              lúc đó mình xẽ qua trang thêm khách hàng để thêm mới ạ*/}
                                        <div className="row mt-2  ">
                                            <div className="col-md-6 inputs">
                                                <label>Tên khách hàng</label>
                                                <Field
                                                    disabled
                                                    name="customers"
                                                    type='text'
                                                    className="form-control"
                                                    data-error="Please specify your need."
                                                    style={{ height: 35 }}
                                                    value={customer.find((cus) => cus.id === idCustomer)?.name}
                                                />
                                            </div>
                                            <div className="col-md-6 inputs"><label>Mã hợp đồng </label>
                                                <Field type="text" className="form-control" name="contractCode"
                                                    disabled
                                                    aria-label="Small"
                                                    value={'HD-' + code}
                                                    style={{ height: "35px" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6 inputs">
                                                <label>Đồ cầm <span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    name="productName"
                                                    style={{ height: 35 }}
                                                />
                                                <ErrorMessage name="productName" component="p" style={{ color: "red" }} />

                                            </div>
                                            <div className="col-md-6 inputs">
                                                <label>Loại đồ cầm <span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    name="productType"
                                                    as="select"
                                                    className="form-control"
                                                    type="number"
                                                    data-error="Please specify your need."
                                                    style={{ height: 35 }}
                                                >
                                                    <option value={0} selected="">Chọn loại đồ cầm</option>
                                                    {productType.map((list, index) => (
                                                        <option key={index} value={list.id}>{list.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="productType" component="p" style={{ color: "red" }} />
                                            </div>
                                        </div>
                                        <div className="row mt-2  ">
                                            <div className="col-md-6 form-group">
                                                <label>Ngày bắt đầu <span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    type="date"
                                                    className="form-control"
                                                    name="startDate"
                                                    style={{ height: 36 }}
                                                    onChange={(event) => {
                                                        handleStartDate(event);
                                                        setFieldValue('startDate', event.target.value);
                                                    }}
                                                    value={startDate.startDate}
                                                />
                                                <ErrorMessage name="startDate" component="p" style={{ color: "red" }} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Ngày kết thúc <span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    type="date"
                                                    className="form-control"
                                                    name="endDate"
                                                    style={{ height: 36 }}
                                                    onChange={(event) => {
                                                        handleEndDay(event);
                                                        setFieldValue('endDate', event.target.value);
                                                    }}
                                                    value={endDate}
                                                />
                                                <ErrorMessage name="endDate" component="p" style={{ color: "red" }} />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className=" col-md-6 mt-2 inputs">
                                                <label>Tiền cho vay <span style={{ color: "red" }}>*</span></label>
                                                <Field
                                                    type="number"
                                                    className="form-control"
                                                    name="loans"
                                                    style={{ height: 35 }}
                                                    onChange={(event) => {
                                                        handleLoans(event);
                                                        setFieldValue('loans', event.target.value);
                                                    }}
                                                    value={loans.loans}
                                                />
                                                <ErrorMessage name="loans" component="p" style={{ color: "red" }} />
                                            </div>
                                            <div className=" col-md-6 mt-2 inputs">
                                                <label>Tiền lãi</label>
                                                <div aria-disabled style={{
                                                    border: "1px solid #DDDDDD",
                                                    fontSize: "0.9rem",
                                                    fontWeight: "bolder",
                                                    alignItems: "center",
                                                    display: "flex",
                                                    backgroundColor: "#EEEEEE",
                                                    height: "4.5vh",
                                                    borderRadius: "7px",
                                                    height: '35px',
                                                    paddingLeft: '10px'
                                                }}
                                                    className="m-0">
                                                    <FormattedNumber
                                                        value={profits || 0} disabled
                                                        thousandSeparator={true} currency="VND"
                                                        minimumFractionDigits={0}
                                                    >
                                                    </FormattedNumber>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mt-2 inputs">
                                            <label htmlFor="image">Hình ảnh <span
                                                style={{ color: "red" }}>*</span></label>
                                            <Field
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                onChange={(event) => {
                                                    handleFileSelect(event);
                                                    setFieldValue('image', event.target.value);
                                                }}
                                                id="image"
                                                style={{ height: 35 }}
                                                values={firebaseImg}
                                            />
                                        </div>
                                        <ErrorMessage name="image" component="p" style={{ color: "red" }} />
                                        <div className="mt-2 inputs">
                                            {/*<label>Trạng thái</label>*/}
                                            <Field
                                                hidden
                                                disabled
                                                type="number"
                                                className="form-control"
                                                value="2"
                                                name="contractStatus"
                                                style={{ height: 35 }}
                                            />
                                        </div>
                                        <div className="mt-2 inputs">
                                            {/*<label>Loại hợp đồng</label>*/}
                                            <Field
                                                hidden
                                                disabled
                                                type="number"
                                                className="form-control"
                                                value="1"
                                                name="contractType"
                                                style={{ height: 35 }}
                                            />
                                        </div>
                                        <div className="mt-2 inputs">
                                            {/*<label>Nhân viên</label>*/}
                                            <Field
                                                hidden
                                                disabled
                                                type="number"
                                                className="form-control"
                                                value="1"
                                                name="employees"
                                                style={{ height: 35 }}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="column-gap-lg-3"
                                                style={{ width: "100%", marginBottom: "5%", marginLeft: "3%" }}
                                            >
                                                {selectedFile && (
                                                    <img
                                                        className={"mt-2"}
                                                        src={URL.createObjectURL(selectedFile)}
                                                        style={{ width: "100%", marginLeft: "90%" }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="d-flex mt-4 justify-content-between">
                                            <div className="text-center" style={{ marginLeft: "23.6%" }}>
                                                <Link to="/nav/info-store/transaction-history"
                                                    className="btn btn-secondary ">
                                                    <b className="text-center">Quay lại</b>
                                                </Link>
                                            </div>
                                            <div className="text-center m-auto">
                                                <div className="text-center">
                                                    <button disabled={!idCustomer} type="submit"
                                                        className="btn btn-success" onClick={showLoadingScreen}>
                                                        <b className="text-center">Thêm mới</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <>
                <div className="text-center mt-4 btn-group p-3 m-l-2">
                    <div className="text-center m-auto">

                        <Modal
                            className="modal-lg"
                            show={showModal}
                            onHide={handleModalClose}

                            keyboard={false}
                            centered
                        >
                            <Modal.Header style={{ backgroundColor: "#00833e", color: "white" }}>
                                <Modal.Title style={{ width: "100%", textAlign: "center" }}>
                                    <b>Chọn khách hàng</b>
                                </Modal.Title>
                                <Button
                                    variant="secondary"
                                    className="btn-close"
                                    style={{ marginLeft: 0 }}
                                    onClick={handleModalClose}
                                />
                            </Modal.Header>
                            <Modal.Body>
                                <div className="controlsmodal-body d-flex justify-content-between">
                                    <div style={{ marginTop: "0.6%" }}>
                                        <Link to="/nav/manager-customer/create" type="submit" className="btn btn-outline-success ">
                                            <b className="textcenter">Thêm khách hàng</b>
                                        </Link>
                                    </div>
                                    <Formik initialValues={{
                                        name: ""
                                    }}
                                        onSubmit={async (values) => {

                                            const search = async () => {
                                                await setCustomerName(values.name)
                                                const res = await contractService.findAllCustomer(pageCount, values.name)
                                                setCustomer(res.content)
                                                setPageCount(0)
                                                console.log(values)
                                            }
                                            search()

                                        }}>
                                        <Form className="d-flex m-1">
                                            <Field
                                                style={{ width: "18vw", height: "38px" }}
                                                className="form-control me-3"
                                                type="text"
                                                name="name"
                                                placeholder="Tìm kiếm theo tên khách hàng"
                                                aria-label="Search"

                                            />
                                            <button className="btn btn-outline-success" type="submit">
                                                <i className="bi bi-search" />
                                            </button>
                                        </Form>
                                    </Formik>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr style={{ textAlign: "start" }}>
                                            <th className="">STT</th>
                                            <th className="">Tên khách hàng</th>
                                            <th className="">CMND/CCCD</th>
                                            <th className="text-center">Chức Năng</th>
                                        </tr>
                                    </thead>
                                    {customer.length === 0 ?
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                <h4 style={{ color: "red" }}>Dữ liêu không tồn tại</h4>
                                            </td>
                                        </tr>
                                        :
                                        <tbody>
                                            {customer.map((list, index) => (
                                                <tr key={index}>
                                                    <td >{list.id}</td>
                                                    <td className=" ">{list.name}</td>
                                                    <td className="">{list.citizenCode}</td>
                                                    <td className="text-center">
                                                        <button onClick={() => {
                                                            setIdCustomer(list.id)
                                                            handleModalClose(true);
                                                        }} className="btn btn-success text-center">
                                                            Chọn
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                            {/* Other table rows */}
                                        </tbody>
                                    }
                                </table>
                                {customer.length === 0 ? '' :
                                    <div className="d-grid">
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="Sau"
                                            onPageChange={handlePage}
                                            pageCount={pageCount}
                                            previousLabel="Trước"
                                            containerClassName="pagination"
                                            pageLinkClassName="page-num"
                                            nextLinkClassName="page-num"
                                            previousLinkClassName="page-num"
                                            activeClassName="active"
                                            disabledClassName="d-none"
                                        />
                                    </div>
                                }
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </>
        </>
    )
}