import logo from './logo.svg';
import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import {CreateLiquidation} from "./component/liquidation/CreateLiquidation";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<CreateLiquidation />}/>
        </Routes>    );
}

export default App;
