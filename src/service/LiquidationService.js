import axios from "axios";


export const getListCustomerAPI = async (customerPage,name) => {
    const token = localStorage.getItem('token')
    try {
        return  (await axios.get("http://localhost:8080/api/employee/liquidation/customers?page="+customerPage+ "&name=" + name,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }));
    }catch (e) {
        console.log(e)
    }
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