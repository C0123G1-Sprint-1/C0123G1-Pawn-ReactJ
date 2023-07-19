import axios from "axios";

export const deleteTransactionHistoryByID = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/employee/contract/delete/${id}`);
        return res;
    } catch (e) {
        console.log(e)
    }
}

export const findAllContractStatus = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/employee/contract/list-contract-status");
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const findAllContractType = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/employee/contract/list-contract-type");
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const getTransactionHistoryById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/employee/contract/detail/${id}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const searchTransactionHistory = async (page, value) => {
    console.log(value)
    try {
        const res = await axios.post(`http://localhost:8080/api/employee/contract/transaction-history?page=${page}&limit=5`, value,
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGllbjEyMyIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNjg5NzM2NTMxLCJleHAiOjE2ODk3NTQ1MzF9.gutLuXtzc0rV0-8znvY5HdISvcB8-zTCjTU6hASvgEfIR2Wwgc3KHljuXTy0aHN_1hgs-4D19MZRKo36CVnKGQ",
                },
            }
            );
        return res.data;
    } catch (e) {
        console.log(e);
    }
}
