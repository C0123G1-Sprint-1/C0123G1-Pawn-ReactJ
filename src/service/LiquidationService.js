import axios from "axios";


export const getListCustomerAPI = (customerPage,name) => {
    return axios.get("http://localhost:8080/api/employee/liquidation/customers?page="+customerPage+ "&name=" + name);
};

export const getListProductTypeAPI = () => {
    return axios.get("http://localhost:8080/api/employee/type/contract/productType");
};
export const getListProductAPI = (contractPage, productName, productType, loans) => {
    return axios.get("http://localhost:8080/api/employee/liquidation/contracts?page="+ contractPage + "&productName=" + productName + "&productType=" + productType + "&loans=" + loans);
};
export const saveLiquidationAPI = (liquidation) => {
    return axios.post("http://localhost:8080/api/employee/liquidation", liquidation);
}