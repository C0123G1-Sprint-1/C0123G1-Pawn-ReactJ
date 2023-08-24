import axios from "axios";
export const getProductTypeList = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get("http://localhost:8080/api/employee/showContract/getProductType",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return res.data
    }catch (e) {
        console.log(e)
    }
}


export const getAllContractPage = async (page, productName, productType) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get("http://localhost:8080/api/employee/showContract/showAllContract?page=" + page
                                                                                                                + "&productName=" + productName
                                                                                                                + "&productType=" + productType,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return res.data
    }catch (e) {
        console.log(e)
    }
}