import axios from "axios";
export const findById = async () => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/employee/detail`,
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

export const update = async (employee) => {
    const token = localStorage.getItem('token')
    try {
        await axios.patch(`http://localhost:8080/api/employee/detail/${employee.id}`, {...employee},
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

