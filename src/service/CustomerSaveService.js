import axios from "axios";


export const save = async (customer) => {
    const token = localStorage.getItem('token')
    try {
        await axios.post(`http://localhost:8080/api/customer/`, {...customer},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
    } catch (e) {
        console.log(e)
    }
}
export const update = async (customer) => {
    const token = localStorage.getItem('token')
    try {
        await axios.patch(`http://localhost:8080/api/customer/${customer.id}`, {...customer},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
    } catch (e) {
        console.log(e)
    }
}

export const findAllRegisterPawn = async () => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/register/list`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (error) {
        console.log(error)
    }
};


export const findByIdCustomer = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const checkPhoneNumberExists = async (phoneNumber) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/check-phone/${phoneNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const checkEmailExists = async (email) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/check-email/${email}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const checkCitizenCodeExists = async (citizenCode) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/check-citizen-code/${citizenCode}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return result.data
    } catch (e) {
        console.log(e)
    }
}

