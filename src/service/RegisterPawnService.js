import axios from "axios";
export async function checkEmail(email) {
    const token = localStorage.getItem('token')
    try{
        const  result = await axios.get("http://localhost:8080/api/register/check-email/"+email,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    }catch (e) {
        console.log(e)
    }
}


export async function checkPhone(phone) {
    const token = localStorage.getItem('token')
    try{
        const  result = await axios.get("http://localhost:8080/api/register/check-phone/"+phone,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    }catch (e) {
        console.log(e)
    }
}


export async function getById(id) {
    const token = localStorage.getItem('token')
    try{
            await axios.delete("http://localhost:8080/api/register/"+id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

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