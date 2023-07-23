import axios from "axios";

export const getContractList = async (page, contractCode, customerName, productName, startDate) => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.get("http://localhost:8080/api/employee/redeem/search?page=" + page +
            "&contractCode=" + contractCode +
            "&customerName=" + customerName +
            "&productName=" + productName +
            "&startDate=" + startDate,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
    } catch (e) {
        console.log(e)
    }
}


export const redeem = async (id) => {
    const token = localStorage.getItem('token')
    try {
     await axios.patch("http://localhost:8080/api/employee/redeem/pay/" + id,id,{
         headers: {
             Authorization: `Bearer ${token}`,
         }
     })
    }catch (e) {
        console.log(e)
    }
}

