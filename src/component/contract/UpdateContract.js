import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import * as contractService from "../../service/ContractService";
import * as productTypeService from "../../service/ProductTypeService"

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

        console.log(result);
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
                    createDate:contract?.createDate,
                    updateDate:new Date(),
                    isDelete:contract?.isDelete,
                    customers: contract?.customers.id,
                    productType: contract?.productType.id,
                    startDate: contract?.startDate,
                    endDate: contract?.endDate,
                    contractType: contract?.contractType.id,
                    contractStatus: contract?.contractStatus.id,
                    employees:contract?.employees
                }}
                onSubmit={(values) => {
                    console.log(values.productType)
                    console.log(values.customers)
                    console.log(values.contractType)
                    console.log(values.contractStatus)

                    values = {
                        ...values,
                        customers: customer.find((c) => c.id === values.customers),
                        productType: productTypes.find((pt) => pt.id === values.productType),
                        contractType: contractType.find((ct) => ct.id === values.contractType),
                        contractStatus:contractStatus.find((cs) => cs.id === values.contractStatus)
                    }
                    const updateContract = async () => {
                        await contractService.updateContract(values);
                        navigate("/top10NewContract")
                    }
                    updateContract();
                }}>


                {/*<div>*/}
                {/*    <label htmlFor="productName">Product Name</label>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <Field name="productName" type="text" id="productName"/>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <label htmlFor="productType">Product Type</label>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <Field as="select" name="productType" type="number" id="productType">*/}
                {/*        {*/}
                {/*            productTypes.map((productType) => (*/}
                {/*                <option key={productType.id} value={productType.id}>{productType.name}</option>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </Field>*/}
                {/*</div>*/}
                {/*<button type="submit">update</button>*/}
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
                                    </div>

                                    <div className="mt-2 inputs"><label htmlFor="productName">Tên Đồ <span
                                        style={{color: "red"}}>*</span></label>
                                        <Field type="text" className="form-control" name="productName"
                                        />
                                    </div>
                                    <div className="mt-2 inputs"><label>Tên khách hàng<span
                                        style={{color: "red"}}>*</span></label>
                                    <Field as="select" name="customers"  id="productType">
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
                                        <Field type="text" className="form-control" name="startDate" id="startDate"/>
                                    </div>
                                    <div className="mt-2 inputs"><label htmlFor="endDate">Ngày kết thúc <span
                                        style={{color: "red"}}>*</span></label>
                                        <Field type="text" className="form-control" name="endDate" id="endDate"
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
                                            <button type="button" className="btn btn-secondary">
                                                <b className="text-center ">Quay lại</b>
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
