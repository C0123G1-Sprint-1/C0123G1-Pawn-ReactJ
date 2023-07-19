import axios from "axios";


export const getContractList = async (page, contractCode, customerName, productName, startDate) => {
    try {
        return (await axios.get("http://localhost:8080/api/employee/redeem/search?page=" + page +
            "&contractCode=" + contractCode +
            "&customerName=" + customerName +
            "&productName=" + productName +
            "&startDate=" + startDate)).data
    } catch (e) {
        console.log(e)
    }
}


export const redeem = async (id, date) => {
    try {
     await axios.patch("http://localhost:8080/api/employee/redeem/pay/" + id +"?redeemDate=" + date)
    }catch (e) {
        console.log(e)
    }
}

