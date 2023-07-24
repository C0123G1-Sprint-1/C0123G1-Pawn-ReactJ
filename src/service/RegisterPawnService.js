import axios from "axios";
import {useState} from "react";

export async function getById(id) {
        try{
            await axios.delete("http://localhost:8080/api/register/"+id)

        }catch (e) {
            console.log(e)
        }
}


export async function save(registerPawn) {
    const token = localStorage.getItem('token')
    try {
        await axios.post("http://localhost:8080/api/register/create", registerPawn,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    }catch (e) {
        return e;
    }
}


export const getAllServicePawn = async () => {
    // const token = localStorage.getItem('token')
    try {
        const res = await axios.get("http://localhost:8080/api/employee/type/contract/productType")
        return res.data
    }catch (e) {
        console.log(e)
    }

}