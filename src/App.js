import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import EmployeeList from "./component/employee/ListEmployee";

function App() {
  return (
    <Routes>
        <Route path="/" element={<EmployeeList />} />
    </Routes>
  );
}

export default App;
