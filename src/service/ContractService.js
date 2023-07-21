import axios from "axios";

// export const showTop10NewContract = async () => {
//     try {
//         const result = await axios.get("http://localhost:8080/api/employee/contract/top10?_sort=createTime&_order=desc&_limit=10");
//         return result.data;
//     } catch (err) {
//         console.log(err);
//     }
// }
// export const findContractById = async (id) => {
//     try {
//         const result = await axios.get(`http://localhost:8080/api/employee/contract/findContractById/${id}`);
//         return result.data;
//     } catch (err) {
//         console.log(err)
//     }
// }
// export const updateContract=async (contract)=>{
//     try {
//         await axios.patch(`http://localhost:8080/api/employee/contract/update`,contract)
//     }catch (err) {
//       console.log(err)
//     }
// }
export const deleteTransactionHistoryByID = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/employee/contract/delete/${id}`);
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const findAllContractStatus = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/employee/contract/list-contract-status");
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const findAllContractType = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/employee/contract/list-contract-type");
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const getTransactionHistoryById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/contract/detail/${id}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const searchTransactionHistory = async (page, value) => {
    console.log(value)
    try {
        const res = await axios.post(`http://localhost:8080/api/employee/contract/transaction-history?page=${page}&limit=5`, value);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

//Dịnh

export const findAllProductType = async () => {
    try {
        const result = (await axios.get('http://localhost:8080/api/employee/type/contract/productType')).data
        return result
    } catch (e) {
        console.log(e)
    }
}
export const findAllAndEmployee = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/employee`);
        return result.data;
    } catch (error) {
        console.log(error)
    }
}
export const findAllCustomer = async (page,name) => {
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer/?page=${page}&name=${name}`)).data
        console.log(res)
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
export const searchCustomer = async (name, page) => {
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer/contract/search?name=${name}&page=${page}`)).data
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
        if (code >= 10000) {
            code = code.toString();
        } else if (code >= 1000) {
            code = "0" + code.toString();
        } else if (code >= 100) {
            code = "00" + code.toString();
        } else if (code >= 10) {
            code = "000" + code.toString();
        } else {
            code = "0000" + code.toString();
        }
        return code;
    } catch
        (e) {
        console.log(e)
    }
}

//Trí
export const showTop10NewContract = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/employee/contract/top10?_sort=createTime&_order=desc&_limit=10");
        return result.data;
    } catch (err) {
        console.log(err);
    }
}
export const findContractById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/employee/contract/findContractById/${id}`);
        return result.data;
    } catch (err) {
        console.log(err)
    }
}
export const updateContract=async (contract)=>{
    try {
        await axios.patch(`http://localhost:8080/api/employee/contract/update`,contract)
    }catch (err) {
        console.log(err)
    }
}











