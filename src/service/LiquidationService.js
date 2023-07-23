import axios from "axios";

export const getListCustomerAPI = (customerPage,name) => {
    const token = localStorage.getItem('token')
    return axios.get("http://localhost:8080/api/employee/liquidation/customers?page="+customerPage+ "&name=" + name,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
};

export const getListProductTypeAPI = () => {
    const token = localStorage.getItem('token')
    return axios.get("http://localhost:8080/api/employee/type/contract/productType",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
};
export const getListProductAPI = (contractPage, productName, productType, loans) => {
    const token = localStorage.getItem('token')
    return axios.get("http://localhost:8080/api/employee/liquidation/contracts?page="+ contractPage + "&productName=" + productName + "&productType=" + productType + "&loans=" + loans,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
};
export const saveLiquidationAPI = (liquidation) => {
    const token = localStorage.getItem('token')
    return axios.post("http://localhost:8080/api/employee/liquidation", liquidation,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
}