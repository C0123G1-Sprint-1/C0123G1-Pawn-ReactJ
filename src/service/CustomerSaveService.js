import axios from "axios";

export const save = async (customer) => {
    try {
        await axios.post(`http://localhost:8080/api/customer/`, {...customer},
            // {
            //     headers:
            //         {
            //             'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
            //             //   'Authorization': 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUaG9uZ0FkbWluIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg1NDIxMDcsImV4cCI6MTY4ODYyODUwN30.HvyaQWe8aJdKeByZqB6_8nwVyoVa890IKdiFDMnH5g3YKIt1Leg9Ek8rqsrIVfrR1lDKeIEIttrnZv_mrUydDg"
            //         },
            // }
        );
    } catch (e) {
        console.log(e)
    }
}
export const update = async (customer) => {
    try {
        await axios.patch(`http://localhost:8080/api/customer/${customer.id}`, {...customer},
            // {
            //     headers:
            //         {
            //             'Authorization': 'Bearer ' + sessionStorage.getItem("TOKEN"),
            //             //   'Authorization': 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUaG9uZ0FkbWluIiwiaXNzIjoiQ29kZUphdmEiLCJpYXQiOjE2ODg1NDIxMDcsImV4cCI6MTY4ODYyODUwN30.HvyaQWe8aJdKeByZqB6_8nwVyoVa890IKdiFDMnH5g3YKIt1Leg9Ek8rqsrIVfrR1lDKeIEIttrnZv_mrUydDg"
            //         },
            // }
        );
    } catch (e) {
        console.log(e)
    }
}

export const findAllRegisterPawn = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/api/register-pawn`)
        return result.data
    } catch (error) {
        console.log(error)
    }
};


export const findByIdCustomer = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/${id}`)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const checkPhoneNumberExists = async (phoneNumber) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/check-phone/${phoneNumber}`)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const checkEmailExists = async (email) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/check-email/${email}`)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const checkCitizenCodeExists = async (citizenCode) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/customer/check-citizen-code/${citizenCode}`)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

