import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import * as contractService from "../../service/ContractService";

import * as productTypeService from "../../service/ProductTypeService"

export function UpdateContract() {
    const param = useParams();
    const navigate=useNavigate();
    const [contract, setContract] = useState();
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
    // const fetchEmpoyee=async ()=>{
    //
    // }

    useEffect(() => {
        fetchProductType();
    }, [])
    if (!contract){
        return null;
    }
    return (
        <>
            <Formik

                initialValues={{
                    productName: contract?.productName,
                    productType: contract?.productType
                }}
                onSubmit={(values)=>{
                    const updateContract=async ()=>{
                        values.productTypes=parseInt(values.productTypes)
                        const result=await contractService.updateContract(values);
                        navigate("/top10NewContract")
                    }
                    updateContract();
                }}>

                <Form>


                    <div>
                        <label htmlFor="productName">Product Name</label>
                    </div>
                    <div>
                        <Field name="productName" type="text" id="productName"/>
                    </div>
                    <div>
                        <label htmlFor="productType">Product Type</label>
                    </div>
                    <div>
                        <Field as="select" name="productType" id="productType">
                            {
                                productTypes.map((product)=>(
                                    <option value={product.id}>{product.name}</option>
                                ))
                            }
                        </Field>
                    </div>
                    <button type="submit">update</button>


                </Form>

            </Formik>
        </>

    )

}
