import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionHistoryList from "./component/contract/TransactionHistoryList";
import {TransactionHistoryDetail} from "./component/contract/TransactionHistoryDetail";

function App() {
    return (
        <Routes>
            <Route path={""} element={<TransactionHistoryList/>}/>
            <Route path={"/transaction-history/detail/:id"} element={<TransactionHistoryDetail/>}/>
        </Routes>
    );
}

export default App;
