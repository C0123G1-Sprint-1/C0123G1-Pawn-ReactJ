import axios from "axios";


export const getAllProductType = async () => {
    const token = localStorage.getItem('token')

    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/productType",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data;
    }catch (err) {
        console.log(err)
    }
}
export const getAllCustomer = async () => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/customers",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (err) {
        console.log(err)
    }
}
export const getContractType = async () => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/contractType",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (err) {
        console.log(err)
    }
}

export const getContractStatus = async () => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get("http://localhost:8080/api/employee/type/contract/contractStatus",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (err) {
        console.log(err)
    }
}