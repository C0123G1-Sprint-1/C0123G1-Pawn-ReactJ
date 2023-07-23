import axios from "axios";


export const getListCustomerAPI = async (customerPage,name) => {
    try {
        return  (await axios.get("http://localhost:8080/api/employee/liquidation/customers?page="+customerPage+ "&name=" + name));
    }catch (e) {
        console.log(e)
    }
};

export const getListProductTypeAPI = async () => {
    try {
        return (await axios.get("http://localhost:8080/api/employee/type/contract/productType"));
    }catch (e) {
        console.log(e)
    }
};
export const getListProductAPI =async (contractPage, productName, productType, loans) => {
    try {
        return (await axios.get("http://localhost:8080/api/employee/liquidation/contracts?page="+ contractPage + "&productName=" + productName + "&productType=" + productType + "&loans=" + loans));
    }catch (e) {
        console.log(e)
    }
};
export const saveLiquidationAPI =async (liquidation) => {
    try {
        return (await axios.post("http://localhost:8080/api/employee/liquidation", liquidation));
    }catch (e) {
        console.log(e)
    }
}