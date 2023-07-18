import axios from "axios";

export const findByAll=async (name,page)=>{
    try {
        return (await axios.get(`http://localhost:8080/api/customer?page=${page ? page : "0"}&name=${name}`)).data
    }catch (e){
        console.log(e)
    }
}

export const deleteCustomer=async (id)=>{
    return await axios.delete(`http://localhost:8080/api/customer/${id}`)
}

export const registerPawn = async ()=>{
    try {
        return (await axios.get(`http://localhost:8080/api/register`)).data
    }catch (e){
        console.log(e)
    }
}