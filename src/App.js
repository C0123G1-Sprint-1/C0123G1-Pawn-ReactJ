import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profit from "./component/profit/Profit";
import Interest from "./component/profit/Interest";
import React from "react";
import Liquidation from "./component/profit/Liquidation";
import Foresee from "./component/profit/Foresee";
import Navbars from "./component/navbar/Navbars";
import InfoStore from "./component/profit/InfoStore";
import EmployeeList from "./component/employee/ListEmployee";
import { CreateEmployee } from "./component/employee/CreateEmployee";
import CustomerList from "./component/customer/CustomerList";
import { LoginHome } from "./component/account/LoginHome";
import { LoginForm } from "./component/account/LoginForm";
import { ForgotPassword } from "./component/account/ForgotPassword";
import { ConfirmCode } from "./component/account/ConfirmCode";
import { NewPassword } from "./component/account/NewPassword";

function App() {
  return (
    <>
      <div align="center" id="header">
        <h1>Header</h1>
      </div>
      <Routes>
        <Route path={"/login"} element={<LoginHome />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login/forgot" element={<ForgotPassword />} />
          <Route path="/login/confirmCode" element={<ConfirmCode />} />
          <Route path="/login/newPassword" element={<NewPassword />} />
        </Route>
      </Routes>
      {/*<div align="center" id="footer">*/}
      {/*    <h1>Footer</h1>*/}
      {/*</div>*/}
    </>
  );
}

export default App;
