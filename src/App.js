// import './App.css';
import {Routes, Route} from "react-router-dom"
import React from "react";
// import {RegisterPawn} from "./component/register-pawn/RegisterPawn";

// import {Header} from "./component/register-pawn/Header";
// import {Footer} from "./component/register-pawn/Footer";
// import {Navigate} from "./component/register-pawn/Navigate";

import "./css/home.css"

import {LoginHome} from "./component/account/LoginHome";
import Navbars from "./component/navbar/Navbars";
import InfoStore from "./component/profit/InfoStore";
import Profit from "./component/profit/Profit";
import Interest from "./component/profit/Interest";
import Liquidation from "./component/profit/Liquidation";
import Foresee from "./component/profit/Foresee";
import {LoginForm} from "./component/account/LoginForm";
import {ForgotPassword} from "./component/account/ForgotPassword";
import {ConfirmCode} from "./component/account/ConfirmCode";
import {NewPassword} from "./component/account/NewPassword";
import {ListPosts} from "./component/post/ListPosts";
import {DetailPosts} from "./component/post/DetailPosts";
import {CreatePosts} from "./component/post/CreatePosts";
import {ShowContract} from "./component/all_contract/ShowContract";
import TransactionHistoryList from "./component/contract/TransactionHistoryList";
import {TransactionHistoryDetail} from "./component/contract/TransactionHistoryDetail";
import {CreateLiquidation} from "./component/liquidation/CreateLiquidation";
import EmployeeList from "./component/employee/ListEmployee";
import {CreateEmployee} from "./component/employee/CreateEmployee";
import {Redeeming} from "./component/redem/Redeeming";
import EmployeeInformation from "./component/customer/EmployeeInformation";
import {CreateCustomer} from "./component/customer/CreateCustomer";
import ImageUploaderFile from "./component/customer/OCRCitizen";
import {UpdateCustomer} from "./component/customer/UpdateCustomer";
import {Top10NewContract} from "./component/contract/Top10NewContract";
import {CreateContracts} from "./component/contract/CreateContracts";
import {List} from "./component/register-pawn/List";
import {Header} from "./component/register-pawn/Header";
import {RegisterPawn} from "./component/register-pawn/RegisterPawn";
import {Footer} from "./component/register-pawn/Footer";
import {UpdateContract} from "./component/contract/UpdateContract";
import {Condition} from "./component/register-pawn/Condition";
import {CustomerListMOI} from "./component/customer/CustomerListMOI";
import {RegisterPawnAnhQoc} from "./component/customer/RegisterPawnAnhQoc";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<List/>}/>
                <Route path='/condition' element={<Condition/>}/>
                <Route path={"/nav"} element={<Navbars/>}>
                    <Route path={"/nav/info-store"} element={<InfoStore/>}>
                        <Route path={"/nav/info-store"} element={<Profit/>}>
                            <Route path="/nav/info-store/" element={<Interest/>}/>
                            <Route path="/nav/info-store/profit" element={<Interest/>}/>
                            <Route path="/nav/info-store/profit/interest/:profitType" element={<Interest/>}/>
                            <Route path="/nav/info-store/profit/liquidation/:profitType" element={<Liquidation/>}/>
                            <Route path="/nav/info-store/profit/foresee/:profitType" element={<Foresee/>}/>
                        </Route>
                        <Route path={"/nav/info-store/transaction-history"} element={<TransactionHistoryList/>}/>
                        <Route path={"/nav/info-store/top-10"} element={<Top10NewContract/>}/>
                        <Route path={"/nav/info-store/transaction-history/detail/:id"}
                               element={<TransactionHistoryDetail/>}/>
                        <Route path={"/nav/info-store/all-contract"} element={<ShowContract/>}/>
                    </Route>
                    <Route path={"/nav/transaction-history/create-contract"} element={<CreateContracts/>}/>
                    <Route path={"/nav/liquidation"} element={<CreateLiquidation/>}/>
                    <Route path="/nav/api/employee" element={<EmployeeList/>}/>
                    <Route path="/nav/api/employee/create-employee" element={<CreateEmployee/>}/>
                    <Route path="/nav/redeem" element={<Redeeming/>}/>
                    <Route path={"/nav/manager-customer"} element={<CustomerListMOI/>}/>
                    <Route path={"/nav/register"} element={<RegisterPawnAnhQoc/>}/>
                    <Route path={"/nav/manager-customer/create"} element={<CreateCustomer/>}/>
                    <Route path={"/nav/manager-customer/update/:id"} element={<UpdateCustomer/>}/>
                    <Route path={"/nav/detail/employee/:id"} element={<EmployeeInformation/>}/>
                    <Route path={"/nav/info-store/transaction-history/update-contract/:id"}
                           element={<UpdateContract/>}/>
                </Route>


                <Route path='/create' element={<RegisterPawn/>}/>
                <Route path={"/login"} element={<LoginHome/>}>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/login/forgot" element={<ForgotPassword/>}/>
                    <Route path="/login/confirmCode" element={<ConfirmCode/>}/>
                    <Route path="/login/newPassword" element={<NewPassword/>}/>
                </Route>
                <Route path={'/listPosts'} element={<ListPosts/>}/>
                <Route path={'/listPosts/detail/:id'} element={<DetailPosts/>}/>
                <Route path={'/listPosts/createPosts'} element={<CreatePosts/>}/>
                <Route path={"/scanfile"} element={<ImageUploaderFile/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;