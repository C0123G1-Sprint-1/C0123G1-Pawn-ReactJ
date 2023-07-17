import axios from "axios";

export const getAllProductType=async ()=>{
    const result=await axios.get("http://localhost:8080/api/employee/type/contract/productType")
    return result.data;
}