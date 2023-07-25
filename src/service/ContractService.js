import axios from "axios";
export const deleteTransactionHistoryByID = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.delete(`http://localhost:8080/api/employee/contract/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const findAllContractStatus = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get("http://localhost:8080/api/employee/contract/list-contract-status",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const findAllContractType = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get("http://localhost:8080/api/employee/contract/list-contract-type",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const getTransactionHistoryById = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/contract/detail/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const searchTransactionHistory = async (page, value) => {
    console.log(value)
    const token = localStorage.getItem('token')
    try {
        const res = await axios.post(`http://localhost:8080/api/employee/contract/transaction-history?page=${page}&limit=5`, value,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

//Dịnh

export const findAllProductType = async () => {
    try {
        const result = (await axios.get('http://localhost:8080/api/employee/type/contract/productType',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
        return result
    } catch (e) {
        console.log(e)
    }
}
export const findAllAndEmployee = async () => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/employee`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}
export const findAllCustomer = async (page,name) => {
    const token = localStorage.getItem('token')
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer/?page=${page}&name=${name}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
        console.log(res)
        return res;
    } catch (e) {
        console.log(e)
    }
}
export const createContract = async (contract) => {
    const token = localStorage.getItem('token')
    try {
        await axios.post(`http://localhost:8080/api/employee/contract/createContract`, contract,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
    } catch (e) {
        console.log(e)
    }
}
export const searchCustomer = async (name, page) => {
    const token = localStorage.getItem('token')
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer/contract/search?name=${name}&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
        return res
    } catch (e) {
        console.log(e)
    }
}
export const getByIdCustomers = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const res = (await axios.get(`http://localhost:8080/api/employee/contract/customer/contract/` + id,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
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
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get("http://localhost:8080/api/employee/contract/top10?_sort=createTime&_order=desc&_limit=10",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return result.data;
    } catch (err) {
        console.log(err);
    }
}
export const findContractById = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/employee/contract/findContractById/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return result.data;
    } catch (err) {
        console.log(err)
    }
}
export const updateContract=async (contract)=>{
    const token = localStorage.getItem('token')
    try {
        await axios.patch(`http://localhost:8080/api/employee/contract/update`,contract,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
    }catch (err) {
        console.log(err)
    }
}











