import axios from "axios";

export const findAllAndSearch = async (search) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/employee?search=${search}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createEmployee = async (employeeDTO) => {
    const token = localStorage.getItem('token')
    try {
        const result = await axios.post(`http://localhost:8080/api/employee/create-employee`, {...employeeDTO},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const search = async (name, page) => {
    const token = localStorage.getItem('token')
    // const headers = {
    //     Authorization: "Bearer " + auth,
    // };
    try {
        const res = await axios.get(
            `http://localhost:8080/api/employee?search=${name}&page=${
                page ? page : "0"
            }`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const checkEmailExists = async (email) => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.get(`http://localhost:8080/api/employee/check-email/${email}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }))
            .data;
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần thiết
        throw new Error("Đã xảy ra lỗi khi kiểm tra email");
    }
};

export const checkCitizenCodeExists = async (citizenCode) => {
    const token = localStorage.getItem('token')
    try {
        return (
            await axios.get(`http://localhost:8080/api/employee/check-citizen-code/${citizenCode}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
        ).data;
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần thiết
        throw new Error("Đã xảy ra lỗi khi kiểm tra CCCD");
    }
};
export const findById = async (id, auth) => {
    const headers = { Authorization: "Bearer " + auth };
    const token = localStorage.getItem('token')
    try {
        const result = await axios.get(`http://localhost:8080/api/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(result)
        return result.data
    } catch (e) {
        console.log(e);
    }
};
export const checkPhoneNumberExists = async (phone) => {
    const token = localStorage.getItem('token')
    try {
        return (await axios.get(`http://localhost:8080/api/employee/check-phone/${phone}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }))
            .data;
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần thiết
        throw new Error("Đã xảy ra lỗi khi kiểm tra số điên thoại");
    }
};
export const employeeService = {
    findAllAndSearch,
    search,
    createEmployee
}