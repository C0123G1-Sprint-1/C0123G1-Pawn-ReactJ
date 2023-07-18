import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profit from "./component/profit/Profit";
import Interest from "./component/profit/Interest";
import React from "react";
import Liquidation from "./component/profit/Liquidation";
import Foresee from "./component/profit/Foresee";
import Navbars from "./component/navbar/Navbars";
import InfoStore from "./component/profit/InfoStore";

function App() {
    return (
        <>
            <div align="center" id="header">
                <h1>Header</h1>
            </div>
            <Routes>
                <Route path={""} element={<Navbars/>}>
                    <Route path={"/info-store"} element={<InfoStore/>}>
                        <Route path={"/info-store/profit"} element={<Profit/>}>
                            <Route path="/info-store/profit/:type" element={<Interest/>}/>
                            <Route path="/info-store/profit/:type" element={<Liquidation/>}/>
                            <Route path="/info-store/profit/:type" element={<Foresee/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
            <div align="center" id="footer">
                <h1>Footer</h1>
            </div>
        </>
    );
}

export default App;
