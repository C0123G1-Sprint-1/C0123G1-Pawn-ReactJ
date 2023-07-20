import axios from "axios";

export const findById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/employee/detail/${id}`)
        return result.data
    } catch (e) {
        console.log(e)
    }
}

export const update = async (employee) => {
    try {
        await axios.patch(`http://localhost:8080/api/employee/detail/${employee.id}`, {...employee},
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

