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


export const redeem = async (id) => {
    try {
     await axios.patch("http://localhost:8080/api/employee/redeem/pay/" + id )
    }catch (e) {
        console.log(e)
    }
}

