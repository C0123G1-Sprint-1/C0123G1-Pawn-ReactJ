import axios from "axios";

export const getAllProductType = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/productType")
        return result.data;
    }catch (err) {
        console.log(err)
    }
}
export const getAllCustomer = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/customers")
        return result.data
    } catch (err) {
        console.log(err)
    }
}
export const getContractType = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/contractType")
        return result.data
    } catch (err) {
        console.log(err)
    }
}

export const getContractStatus = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/contractStatus")
        return result.data
    } catch (err) {
        console.log(err)
    }
}