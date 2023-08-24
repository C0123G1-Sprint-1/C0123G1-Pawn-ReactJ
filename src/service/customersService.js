import axios from "axios";


export const findByAll = async (name, page) => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.get(`http://localhost:8080/api/customer?page=${page ? page : "0"}&name=${name}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
    } catch (e) {
        console.log(e)
    }
}

export const deleteCustomer = async (id) => {
    const token = localStorage.getItem('token')
    return await axios.delete(`http://localhost:8080/api/customer/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
}

export const registerPawn = async (page) => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.get(`http://localhost:8080/api/register?page=${page ? page : "0"}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
    } catch (e) {
        console.log(e)
    }
}