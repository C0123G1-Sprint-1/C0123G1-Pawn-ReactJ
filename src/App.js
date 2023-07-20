// import './App.css';
import { Routes, Route } from "react-router-dom"
import React from "react";
// import {RegisterPawn} from "./component/register-pawn/RegisterPawn";
import { List } from "./component/register-pawn/List";
// import {Header} from "./component/register-pawn/Header";
// import {Footer} from "./component/register-pawn/Footer";
// import {Navigate} from "./component/register-pawn/Navigate";
import { Header } from "./component/register-pawn/Header";
import { Footer } from "./component/register-pawn/Footer";
import "./css/home.css"
import { RegisterPawn } from "./component/register-pawn/RegisterPawn";
import { LoginHome } from "./component/account/LoginHome";
import Navbars from "./component/navbar/Navbars";
import InfoStore from "./component/profit/InfoStore";
import Profit from "./component/profit/Profit";
import Interest from "./component/profit/Interest";
import Liquidation from "./component/profit/Liquidation";
import Foresee from "./component/profit/Foresee";
import { LoginForm } from "./component/account/LoginForm";
import { ForgotPassword } from "./component/account/ForgotPassword";
import { ConfirmCode } from "./component/account/ConfirmCode";
import { NewPassword } from "./component/account/NewPassword";
import { ListPosts } from "./component/post/ListPosts";
import { DetailPosts } from "./component/post/DetailPosts";
import { CreatePosts } from "./component/post/CreatePosts";
import { ShowContract } from "./component/all_contract/ShowContract";
import TransactionHistoryList from "./component/contract/TransactionHistoryList";
import { TransactionHistoryDetail } from "./component/contract/TransactionHistoryDetail";
import CustomerList from "./component/customer/CustomerList";
import { CreateLiquidation } from "./component/liquidation/CreateLiquidation";
import {UpdateContract} from "./component/contract/UpdateContract";
import {ToastContainer} from "react-toastify";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/nav"} element={<Navbars />}>
          <Route path={"/nav/info-store"} element={<InfoStore />}>

            <Route path={"/nav/info-store/profit"} element={<Profit />}>
              <Route path="/nav/info-store/profit" element={<Interest />} />
              <Route path="/nav/info-store/profit/interest/:profitType" element={<Interest />} />
              <Route path="/nav/info-store/profit/liquidation/:profitType" element={<Liquidation />} />
              <Route path="/nav/info-store/profit/foresee/:profitType" element={<Foresee />} />
            </Route>
            <Route path={"/nav/info-store/transaction-history"} element={<TransactionHistoryList/>}/>
            {/*<Route path={"/nav/info-store/transaction-history/create-contract"} element={<Cr/>}/>*/}
            <Route path={"/nav/info-store/transaction-history/detail/:id"} element={<TransactionHistoryDetail/>}/>
            <Route path={"/nav/info-store/transaction-history/update-contract/:id"} element={<UpdateContract/>}/>
            <Route path={"/nav/info-store/all-contract"} element={<ShowContract />} />
          </Route>
          <Route path={"/nav/info-store/liquidation"} element={<CreateLiquidation />} />

          {/* <Route path="/api/employee" element={<EmployeeList/>}/>
                    <Route path="/api/employee/create-employee" element={<CreateEmployee/>}/>
                    <Route path="/redeem" element={<Redeeming/>}/> */}
        </Route>
        <Route path='/create' element={<RegisterPawn />} />
        <Route path='/' element={<List />} />
        {/*<Route path="/" element={<Header/>} />*/}
        {/*<Route path="/" element={<Footer/>} />*/}
        {/*<Route path="/" element={<Navigate/>} />*/}
        <Route path="/create" element={<RegisterPawn />} />
        <Route path={"/login"} element={<LoginHome />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login/forgot" element={<ForgotPassword />} />
          <Route path="/login/confirmCode" element={<ConfirmCode />} />
          <Route path="/login/newPassword" element={<NewPassword />} />
        </Route>
        <Route path={'/listPost'} element={<ListPosts />} />
        <Route path={'/detail/:id'} element={<DetailPosts />} />
        <Route path={'/createPosts'} element={<CreatePosts />} />
        <Route path={'/manager-customer'} element={<CustomerList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
