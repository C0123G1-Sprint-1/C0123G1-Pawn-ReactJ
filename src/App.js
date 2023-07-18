import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import EmployeeList from "./component/employee/ListEmployee";
import {CreateEmployee} from "./component/employee/CreateEmployee";
// your-app.js
import Swal from 'sweetalert2/src/sweetalert2.js';

// your-app.scss
// import '~@sweetalert2/themes/dark/dark.scss';

function App() {
  return (
    <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
    </Routes>
  );
}

export default App;
