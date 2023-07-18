import './App.css';
import {CreateCustomer} from "./component/customer/CreateCustomer";
import React from "react";
import {Route, Routes} from "react-router";
import {UpdateCustomer} from "./component/customer/UpdateCustomer";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/update/:id"} element={<UpdateCustomer/>}/>
                <Route path={"/create"} element={<CreateCustomer/>}/>
            </Routes>
        </>
    );
}

export default App;
