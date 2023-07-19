import axios from "axios";

export const deleteTransactionHistoryByID = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/employee/contract/delete/${id}`);
        return res;
    } catch (e) {
        console.log(e)
    }
}


// export const findAllTransactionHistory = async (page) => {
//     try {
//         const res = await axios.get(`http://localhost:8080/api/employee/contract?page=${page}&limit=5`);
//         return res.data;
//     } catch (e) {
//         console.log(e)
//     }
// }

export const getTransactionHistoryById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/contract/detail/${id}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const searchTransactionHistory = async (page, value) => {
    try {
        console.log(value)
        const res = await axios.post(`http://localhost:8080/api/employee/contract/search-transaction-history?page=${page}&limit=5`, value);
        console.log(res.data)
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
