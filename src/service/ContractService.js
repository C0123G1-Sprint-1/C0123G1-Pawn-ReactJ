import axios from "axios";

export const deleteTransactionHistoryByID = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/employee/contract/delete/${id}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}


export const findAllTransactionHistory = async (page) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/contract?page=${page}&limit=5`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
export const searchTransactionHistory = async (page) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/contract?page=${page}&limit=5`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}