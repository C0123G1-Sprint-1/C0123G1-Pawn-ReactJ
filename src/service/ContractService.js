import axios from "axios";

export const findAllTransactionHistory = async () => {
    try{
        const res = await axios.get("http://localhost:8080/api/employee/contract?page=0&limit=5");
        return res.data;
    } catch (e) {
        console.log(e)
    }
}