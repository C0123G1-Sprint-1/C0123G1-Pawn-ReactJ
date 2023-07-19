import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profit from "./component/profit/Profit";
import Interest from "./component/profit/Interest";
import React from "react";
import Liquidation from "./component/profit/Liquidation";
import Foresee from "./component/profit/Foresee";
import Navbars from "./component/navbar/Navbars";
import InfoStore from "./component/profit/InfoStore";
import EmployeeList from "./component/employee/ListEmployee";
import {CreateEmployee} from "./component/employee/CreateEmployee";
import {ShowContract} from "./component/all_contract/ShowContract";
import {Redeeming} from "./component/redeem/Redeeming";

function App() {
    return (
        <>
            <div align="center" id="header">
                <h1>Header</h1>
            </div>
            <Routes>
                <Route path={"/nav"} element={<Navbars/>}>
                    <Route path={"/nav/info-store"} element={<InfoStore/>}>
                        <Route path={"/nav/info-store/profit"} element={<Profit/>}>
                            <Route path="/nav/info-store/profit" element={<Interest/>}/>
                            <Route path="/nav/info-store/profit/interest/:profitType" element={<Interest/>}/>
                            <Route path="/nav/info-store/profit/liquidation/:profitType" element={<Liquidation/>}/>
                            <Route path="/nav/info-store/profit/foresee/:profitType" element={<Foresee/>}/>
                        </Route>
                        <Route path={"/nav/info-store/all-contract"} element={<ShowContract/>}/>

                    </Route>
                    <Route path="/nav/api/employee" element={<EmployeeList/>}/>
                    <Route path="/nav/api/employee/create-employee" element={<CreateEmployee/>}/>
                    <Route path="/nav/redeem" element={<Redeeming/>}/>
                </Route>
            </Routes>
            <div align="center" id="footer">
                <h1>Footer</h1>
            </div>
        </>
    );
}

export default App;
