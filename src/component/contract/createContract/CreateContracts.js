import * as contractService from "../../../service/ContractService";
import * as modal from "./ModalCustomers"
import * as fireBase from './FireBaseContracts'
import React, { useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import * as Yup from 'yup';

import { FormattedNumber } from "react-intl";

import * as yup from "yup";

import {randomCodeContract} from "../../../service/ContractService";

export const CreateContracts = () => {

    const [productType, setProductType] = useState([]);
    const [contractType, setContractType] = useState([]);
    const [contractStatus, setContractStatus] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [code, setCode] = useState('');

    const [loans, setLoans] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDay] = useState('');
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

    let percent = 0.67 / 100;
    const moment = require('moment');
    const startDates = moment(startDate);
    const endDates = moment(endDate);
    // tính khoảng cách ngày
    const duration = endDates.diff(startDates, 'days');
    const profits = +(loans * percent * duration)

    // fire basex


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
    // random mã
    const createContractCodeApi = async () => {
        const res = await contractService.randomCodeContract();
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
                                employees: ''
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
                                            image: fireBase,
                                        };
                                        newValue.image = await fireBase();
                                        await contractService.createContract({
                                            ...newValue,
                                            image: newValue.image,
                                            customers:'',
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
                                                onClick={async () => {modal}}>
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
                                                    fireBase(event);
                                                    setFieldValue('image', event.target.value);
                                                }}
                                                id="image"
                                                style={{ height: 35 }}
                                                values={fireBase}
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
                                                    <button  type="submit"
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
        </>
    )
}