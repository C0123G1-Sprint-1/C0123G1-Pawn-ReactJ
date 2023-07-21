import axios from "axios";
import {useState} from "react";

export async function checkEmail(email) {
    try{
        const  result = await axios.get("http://localhost:8080/api/register/check-email/"+email)
        return result.data
    }catch (e) {
        console.log(e)
    }
}


export async function checkPhone(phone) {
    try{
        const  result = await axios.get("http://localhost:8080/api/register/check-phone/"+phone)
        return result.data
    }catch (e) {
        console.log(e)
    }
}


export async function getById(id) {
        try{
            await axios.delete("http://localhost:8080/api/register/"+id)

        }catch (e) {
            console.log(e)
        }
}


export async function save(registerPawn) {

    try {
        await axios.post("http://localhost:8080/api/register/create", registerPawn);
    }catch (e) {
        return e;
    }
}


export const getAllServicePawn = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/employee/type/contract/productType")
        return res.data
    }catch (e) {
        console.log(e)
    }

}