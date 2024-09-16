import axios from "axios";

export const getAllContract = async (startDate, endDate,years, page, profitType) => {
    const token = localStorage.getItem('token')
    try {
        return await axios.get("http://localhost:8080/api/employee/profit?startDate=" + startDate + "&endDate=" + endDate + "&years="+ years + "&page=" + (page || 0) + "&profitType=" + profitType
            ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
    } catch (e) {
        console.log(e)
        return null;
    }
}
export const getDataChart = async (startDate, endDate,years, profitType) => {
    const token = localStorage.getItem('token')
    try {
        return await axios.get("http://localhost:8080/api/employee/profit/statistics-profit?startDate=" + startDate + "&endDate=" + endDate + "&years="+ years  + "&profitType=" + profitType
            ,
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
export const getProfit = async (startDate, endDate,years, profitType) => {
    const token = localStorage.getItem('token')
    try {
        return await axios.get("http://localhost:8080/api/employee/profit/total-profit?startDate=" + startDate + "&endDate=" + endDate+ "&years="+ years  + "&profitType=" + profitType
            ,
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