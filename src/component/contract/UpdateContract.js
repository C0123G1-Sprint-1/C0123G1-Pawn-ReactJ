import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as contractService from "../../service/ContractService";
import * as productTypeService from "../../service/ProductTypeService"
import "../../css/UpdateContract.css"
import * as Yup from "yup"
import {NavLink} from "react-router-dom";

export function UpdateContract() {
    const param = useParams();
    const navigate = useNavigate();
    const [contract, setContract] = useState();
    const [customer, setCustomer] = useState([]);
    const [contractType, setContractType] = useState([]);
    const [contractStatus, setContractStatus] = useState([]);
    const [productTypes, setProductType] = useState([]);
    const fetchContractById = async () => {
        const result = await contractService.findContractById(param.id)
        setContract(result);
    }
    useEffect(() => {
        fetchContractById()
    }, [param.id])

    const fetchProductType = async () => {
        const result = await productTypeService.getAllProductType();
        setProductType(result);
    }
    const fetchCustomer = async () => {
        const result = await productTypeService.getAllCustomer();
        setCustomer(result);
    }
    const fetchContractType = async () => {
        const result = await productTypeService.getContractType();
        setContractType(result);
    }
    const fetchContractStatus = async () => {
        const result = await productTypeService.getContractStatus();
        setContractStatus(result);
    }

    useEffect(() => {
        fetchProductType();
        fetchCustomer();
        fetchContractType();
        fetchContractStatus();
    }, [])
    if (!contract) {
        return null;
    }


    return (
        <>
            <Formik
                initialValues={{
                    id: contract?.id,
                    productName: contract?.productName,
                    contractCode: contract?.contractCode,
                    loans:contract?.loans,
                    profit:contract?.profit,
                    image:contract?.image,
                    createTime:contract.createTime,
                    updateTime:new Date(),
                    isDelete:contract?.isDelete,
                    customers: contract?.customers.id,
                    productType: contract?.productType.id,
                    startDate: contract?.startDate,
                    endDate: contract?.endDate,
                    contractType: contract?.contractType.id,
                    contractStatus: contract?.contractStatus.id,
                    employees:contract?.employees
                }}
                validationSchema={Yup.object({
                    productName:Yup.string().required("Không được để trống"),
                    contractCode:Yup.string().required("Không được để trống"),
                    startDate: Yup
                        .date()
                        .typeError('Vui lòng nhập một ngày hợp lệ')
                        .required('Không được để trống')
                        .test('startDateBeforeEndDate', 'Ngày bắt đầu phải trước ngày kết thúc', function (value) {
                            const endDate = Yup.date().typeError('Vui lòng nhập một ngày hợp lệ').cast(this.parent.endDate, value);
                            if (!value || !endDate) return true;
                            return value <= endDate;
                        }),
                    endDate:Yup.date().required("Không được để trống")

                })}
                onSubmit={(values) => {

                    console.log(values)
                    console.log(values.productType)
                    console.log(values.customers)
                    console.log(values.contractType)
                    console.log(values.contractStatus)

                    values = {
                        ...values,
                        customers: customer.find((c) => c.id == values.customers),
                        productType: productTypes.find((pt) => pt.id == values.productType),
                        contractType: contractType.find((ct) => ct.id == values.contractType),
                        contractStatus:contractStatus.find((cs) => cs.id == values.contractStatus)
                    }
                    console.log(values)
                    const updateContract = async () => {
                        await contractService.updateContract(values);
                        navigate("/nav/info-store/transaction-history")
                    }
                    updateContract();
                }}>

                <div className="container mt-5 " style={{marginBottom: "5rem"}}>
                    <div className="row height d-flex justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="card px-5 py-4">
                                <div style={{textAlign: "center"}}>
                                    <h1>Chỉnh Sửa Hợp Đồng</h1>
                                </div>
                                <Form>
                                    <div className="mt-4 inputs"><label htmlFor="contractCode">Mã hợp đồng <span
                                        style={{color: "red"}}>*</span></label>
                                        <Field type="text" className="form-control" id="contractCode"
                                               name="contractCode"
                                        />
                                        <ErrorMessage name="contractCode" component="span" className="err-mess"/>
                                    </div>

                                    <div className="mt-2 inputs"><label htmlFor="productName">Tên Đồ <span
                                        style={{color: "red"}}>*</span></label>
                                        <Field type="text" className="form-control" name="productName"
                                        />
                                    </div>
                                    {/*<div className="mt-2 inputs"><label>Tên khách hàng<span*/}
                                    {/*    style={{color: "red"}}>*</span></label>*/}
                                    {/*<Field as="select" name="customers"  id="productType">*/}
                                    {/*    {*/}
                                    {/*        customer.map((customer) => (*/}
                                    {/*            <option key={customer.id} value={customer.id}>{customer.name}</option>*/}
                                    {/*        ))*/}
                                    {/*    }*/}
                                    {/*</Field>*/}
                                    {/*</div> */}
                                    <div className="mt-2 inputs"><label htmlFor="customers">Tên khách hàng<span
                                        style={{color: "red"}}>*</span></label>
                                        <Field as="select" name="customers"  id="customers"  className="form-control">
                                            {
                                                customer.map((customer) => (
                                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <div className="mt-2 inputs"><label>Loại đồ<span
                                        style={{color: "red"}}>*</span></label>
                                        <Field as="select" name="productType" className="form-control">
                                            {
                                                productTypes.map((productType)=>(
                                                    <option key={productType.id} value={productType.id}>{productType.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>

                                    <div className="mt-2 inputs"><label htmlFor="startDate">Ngày bắt đầu <span
                                        style={{color: "red"}}>*</span></label>
                                        <Field type="date" className="form-control" name="startDate" id="startDate"/>
                                        <ErrorMessage name="startDate" component="span" className="err-mess"/>
                                    </div>
                                    <div className="mt-2 inputs"><label htmlFor="endDate">Ngày kết thúc <span
                                        style={{color: "red"}}>*</span></label>
                                        <Field type="date" className="form-control" name="endDate" id="endDate"
                                        />
                                    </div>
                                    <div className="mt-2 inputs"><label htmlFor="contractType">Loại hợp đồng <span
                                        style={{color: "red"}}>*</span></label>
                                        <Field as="select" className="form-control" name="contractType" id="contractType">
                                            {
                                                contractType.map((contractType)=>(
                                                    <option key={contractType.id} value={contractType.id}>{contractType.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <div className="mt-2 inputs"><label htmlFor="contractStatus">Trạng Thái <span style={{color: "red"}}>*</span></label>
                                        <Field as="select" className="form-control" name="contractStatus" id="contractStatus">
                                            {
                                                contractStatus.map((contractStatus)=>(
                                                    <option key={contractStatus.id} value={contractStatus.id}>{contractStatus.name}</option>
                                                ))
                                            }
                                        </Field>
                                    </div>
                                    <div className=" mt-4 btn-group">
                                        <div className="text-center m-auto">
                                            <button type="button" className="btn btn-secondary" style={{marginRight: "76px",
                                                marginLeft: "15px"}}>
                                                <NavLink to="/top10NewContract" className="text-decoration-none"><b className="text-center text-white">Quay lại</b></NavLink>
                                            </button>
                                        </div>
                                        <div className="text-center m-auto">
                                            <button type="submit" className=" btn btn-success "
                                                    data-mdb-toggle="modal"
                                                    data-mdb-target="#exampleModalToggle1">
                                                <b className="text-center">Lưu</b>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>

                        </div>
                    </div>
                </div>
            </Formik>
        </>

    )

}