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

    try {
         await axios.post("http://localhost:8080/api/register/create", registerPawn);
    }catch (e) {
        return e;
    }
}


export const getAllServicePawn = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/register/product-type")
        return res.data
    }catch (e) {
        console.log(e)
    }

}