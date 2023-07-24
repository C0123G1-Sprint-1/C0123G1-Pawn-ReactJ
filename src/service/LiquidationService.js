import axios from "axios";


export const getListCustomerAPI = (page) => {
    return axios.get("http://localhost:8080/api/employee/liquidation/customers?page="+page);
};
export const searchCustomerAPI = (page, name) => {
    return axios.get("http://localhost:8080/api/employee/liquidation/customers/search?page=" + page + "&name=" + name);
};
export const searchContractAPI = (page, productName, productType, loans) => {
    return axios.get("http://localhost:8080/api/employee/liquidation/contracts/search?page=" + page + "&productName=" + productName + "&productType=" + productType + "&loans=" + loans);
};

export const getListProductTypeAPI = async () => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.get("http://localhost:8080/api/employee/type/contract/productType",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }));
    }catch (e) {
        console.log(e)
    }
};
export const getListProductAPI =async (contractPage, productName, productType, loans) => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.get("http://localhost:8080/api/employee/liquidation/contracts?page="+ contractPage + "&productName=" + productName + "&productType=" + productType + "&loans=" + loans,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }));
    }catch (e) {
        console.log(e)
    }
};
export const saveLiquidationAPI =async (liquidation) => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.post("http://localhost:8080/api/employee/liquidation", liquidation,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }));
    }catch (e) {
        console.log(e)
    }
}