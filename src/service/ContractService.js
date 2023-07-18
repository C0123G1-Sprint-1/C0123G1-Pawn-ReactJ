import axios from "axios";

export const showTop10NewContract = async () => {
    try {
        const result = await axios.get("http://localhost:8080/api/employee/contract/top10?_sort=createDate&_order=desc&_limit=10");
        return result.data;
    } catch (err) {
        console.log(err);
    }
}
export const findContractById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/employee/contract/findContractById/${id}`);
        return result.data;
    } catch (err) {
        console.log(err)
    }
}
export const updateContract=async (contract)=>{
    try {
        await axios.patch(`http://localhost:8080/api/employee/contract/update`,contract)
    }catch (err) {
      console.log(err)
    }
}
export const getAllCustomer=async ()=>{
    try {
        const result= axios.get("http://localhost:8080/api/employee/contract/")
    }catch (err) {
        console.log(err)
    }
}
