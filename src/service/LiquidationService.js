import axios from "axios";

export const saveLiquidation = (liquidation) => {
    return axios.post("http://localhost:8080/api/employee/liquidation", liquidation);
}