import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import React from "react";
import {Top10NewContract} from "./component/contract/Top10NewContract";
import {UpdateContract} from "./component/contract/UpdateContract";

function App() {
  return (
   <>
     <Routes>
         <Route path="/top10NewContract" element={<Top10NewContract/>}/>
         <Route path="/updateContract/:id" element={<UpdateContract/>}/>
     </Routes>
     </>
  );
}

export default App;
