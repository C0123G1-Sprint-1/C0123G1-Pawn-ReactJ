import './App.css';
import React from "react";
import {Route,Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionHistoryList from "./component/contract/TransactionHistoryList";

function App() {
  return (
     <Routes>
         <Route path={""} element={<TransactionHistoryList/>}/>
     </Routes>
  );
}

export default App;
