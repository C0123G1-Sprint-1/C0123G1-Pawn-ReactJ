import './App.css';
import {CreateCustomer} from "./component/customer/CreateCustomer";
import React from "react";
import {Route, Routes} from "react-router";
import {UpdateCustomer} from "./component/customer/UpdateCustomer";
import EmployeeInformation from "./component/employee/EmployeeInformation";
import ImageUploaderFile from "./component/customer/OCRCitizen";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/update/:id"} element={<UpdateCustomer/>}/>
                <Route path={"/scanfile"} element={<ImageUploaderFile/>}/>
                <Route path={"/create"} element={<CreateCustomer/>}/>
                <Route path={"/api/employee/detail/:id"} element={<EmployeeInformation/>}/>
            </Routes>
        </>
    );
}

export default App;
