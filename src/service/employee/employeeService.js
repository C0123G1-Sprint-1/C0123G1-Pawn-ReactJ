import axios from "axios";

export const findAllAndSearch = async (search) => {
    try {
        const result = await axios.get(`http://localhost:8080/api/employee?search=${search}`);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error)
    }
}

export const createEmployee = async (employeeDTO) => {
    try {
       const result = await axios.post(`http://localhost:8080/api/employee/create-employee`,{...employeeDTO});
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error)
    }
}

export const search = async (name, page) => {
    try {
        const res = await axios.get(
            `http://localhost:8080/api/employee?search=${name}&page=${
                page ? page : "0"
            }`
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const checkEmailExists = async (email) => {
    try {
        return (await axios.get(`http://localhost:8080/api/employee/check-email/${email}`))
            .data;
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần thiết
        throw new Error("Đã xảy ra lỗi khi kiểm tra email");
    }
};

export const checkIdentityCardExists = async (citizenCode) => {
    try {
        return (
            await axios.get(`http://localhost:8080/api/employee/check-citizen-code/${citizenCode}`)
        ).data;
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu cần thiết
        throw new Error("Đã xảy ra lỗi khi kiểm tra CCCD");
    }
};
export const checkPhoneExists = async (phone) => {
    try {
        return (await axios.get(`http://localhost:8080/api/employee/check-phone/${phone}`))
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