import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profit from "./component/profit/Profit";
import Interest from "./component/profit/Interest";
import React from "react";
import Liquidation from "./component/profit/Liquidation";
import Foresee from "./component/profit/Foresee";
import Navbars from "./component/navbar/Navbars";
import InfoStore from "./component/profit/InfoStore";

import './App.css';
import {Routes, Route} from "react-router-dom"
import React from "react";
// import {RegisterPawn} from "./component/register-pawn/RegisterPawn";
import {List} from "./component/register-pawn/List";
// import {Header} from "./component/register-pawn/Header";
// import {Footer} from "./component/register-pawn/Footer";
// import {Navigate} from "./component/register-pawn/Navigate";
import {Header} from "./component/register-pawn/Header";
import {Footer} from "./component/register-pawn/Footer";
import "./css/home.css"
import {RegisterPawn} from "./component/register-pawn/RegisterPawn";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<List/>}/>
                <Route path="/create" element={<RegisterPawn/>}/>
                <Route path={""} element={<Navbars/>}>
                    <Route path={"/info-store"} element={<InfoStore/>}>
                        <Route path={"/info-store/profit"} element={<Profit/>}>
                            <Route path="/info-store/profit/:type" element={<Interest/>}/>
                            <Route path="/info-store/profit/:type" element={<Liquidation/>}/>
                            <Route path="/info-store/profit/:type" element={<Foresee/>}/>
                        </Route>
                        {/*   Đây là component về thông tin cửa hàng
                     Mọi người muốn truyền tới component của mình thì có thể làm theo mẫu
                        <Route path={"/url"} element={<Component/>}/>
                    */}
                    </Route>

                    {/*    Đây là các component khác trên thanh navbar
                    <Route path={"/url các navbar"} element={<Component/>}>
                */}
                </Route>

            </Routes>
            <Footer/>
        </>
    );
}

export default App;
