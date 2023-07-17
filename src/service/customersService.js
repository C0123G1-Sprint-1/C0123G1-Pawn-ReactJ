import axios from "axios";

export const findByAll=async (name,page)=>{
    return (await axios.get(`http://localhost:8080/api/customer?page=${page ? page : "0"
    }&name=${name}`)).data
}

export const deleteCustomer=async (id)=>{
    return await axios.delete(`http://localhost:8080/api/customer/${id}`)
}

export const registerPawn = async ()=>{
    return await axios.get(`http://localhost:8080/api/register/product-type`).data
}