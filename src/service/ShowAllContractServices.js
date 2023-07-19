import axios from "axios";

export const getProductTypeList = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/employee/showContract/getProductType")
        return res.data
    }catch (e) {
        console.log(e)
    }
}


export const getAllContractPage = async (page, productName, productType) => {
    try {
        const res = await axios.get("http://localhost:8080/api/employee/showContract/showAllContract?page=" + page
                                                                                                                + "&productName=" + productName
                                                                                                                + "&productType=" + productType)
        return res.data
    }catch (e) {
        console.log(e)
    }
}