import axios from "axios";
const token = localStorage.getItem('token')
export const getAllContract = async (startDate, endDate, page, profitType) => {
    try {
        return await axios.get("http://localhost:8080/api/employee/profit?startDate=" + startDate + "&endDate=" + endDate + "&page=" + (page || 0) + "&profitType=" + profitType,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    } catch (e) {
        return null;
    }
}
export const getDataChart = async (startDate, endDate, profitType) => {
    try {
        return await axios.get("http://localhost:8080/api/employee/profit/statistics-profit?startDate=" + startDate + "&endDate=" + endDate + "&profitType=" + profitType,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (e) {
        return null;
    }
}
export const getProfit = async (startDate, endDate, profitType) => {
    try {
        return await axios.get("http://localhost:8080/api/employee/profit/total-profit?startDate=" + startDate + "&endDate=" + endDate + "&profitType=" + profitType,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    } catch (e) {
        return null;
    }
}