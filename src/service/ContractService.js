import axios from "axios";

export const findAllContract = async () => {
    try {
        const res = (await axios.get('http://localhost:8080/api/employee/contract/list')).data
        return res
    } catch (e) {
        console.log(e)
    }
}
export const findAllProductType = async () => {
    try {
        const result = (await axios.get('http://localhost:8080/api/employee/type/contract/productType')).data
        return result
    } catch (e) {
        console.log(e)
    }
}
export const findAllContractStatus = async () => {
    try {
        const result = (await axios.get('http://localhost:8080/api/employee/type/contract/contractStatus')).data
        return result
    } catch (e) {
        console.log(e)
    }
}
export const findAllContractType = async () => {
    try {
        const result = (await axios.get('http://localhost:8080/api/employee/type/contract/contractType')).data
        return result
    } catch (e) {
        console.log(e)
    }
}
export const findAllAndEmployee = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/employee`);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error)
    }
}
export const findAllCustomer = async () => {
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer`)).data
        return res;
    } catch (e) {
        console.log(e)
    }
}
export const createContract = async (contract) => {
    try {
        await axios.post(`http://localhost:8080/api/employee/contract/createContract`, contract)
    } catch (e) {
        console.log(e)
    }
}
export const searchCustomer = async (name) => {
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer/contract/search?name=${name}`)).data
        return res
    } catch (e) {
        console.log(e)
    }
}
export const getByIdCustomers = async (id) => {
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer/contract/` + id)).data
        return res
    } catch (e) {
        console.log(e)
    }
}

export const createCodeContract = async () => {
    try {
        let code = (Math.floor(Math.random() * 10000) + 1);
        if(code>=10000){
            code = code.toString();
        }else if(code>=1000){
            code = "0"+ code.toString();
        }else if(code>=100){
            code = "00"+code.toString();
        }else if (code>=10){
            code = "000" + code.toString();
        }else {
            code = "0000" + code.toString();
        }
        return code;
    } catch
        (e) {
        console.log(e)
    }
}
