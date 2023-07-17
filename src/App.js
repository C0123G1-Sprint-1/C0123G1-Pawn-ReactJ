import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import Profit from "./component/profit/Profit";
import Interest from "./component/profit/Interest";
import React from "react";
import Liquidation from "./component/profit/Liquidation";
import Foresee from "./component/profit/Foresee";

function App() {
  return (
      <Routes>
        <Route path={"/profit"} element={<Profit/>}>
          <Route path="/profit/interest/:type" element={<Interest/>}/>
          <Route path="/profit/liquidation/:type" element={<Liquidation/>}/>
          <Route path="/profit/foresee/:type" element={<Foresee/>}/>
        </Route>
      </Routes>
  );
}

export default App;
