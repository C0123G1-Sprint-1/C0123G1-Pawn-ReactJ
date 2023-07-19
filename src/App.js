import './App.css';
import {Routes ,Route} from "react-router-dom"
import React from "react";
// import {RegisterPawn} from "./component/register-pawn/RegisterPawn";
import {List} from "./component/register-pawn/List";
// import {Header} from "./component/register-pawn/Header";
// import {Footer} from "./component/register-pawn/Footer";
// import {Navigate} from "./component/register-pawn/Navigate";
import {Header} from "./component/register-pawn/Header";
import {Footer} from "./component/register-pawn/Footer";
import "./css/home.css"
import {RegisterPawn} from "./component/register-pawn/RegisterPawn";
function App() {
  return (
    <>
        <Header/>
      <Routes>
        {/*<Route  path='/create' element={<RegisterPawn/>} />*/}
        <Route  path='/' element={<List/>} />
        {/*<Route path="/" element={<Header/>} />*/}
        {/*<Route path="/" element={<Footer/>} />*/}
        {/*<Route path="/" element={<Navigate/>} />*/}
          <Route path="/create" element={<RegisterPawn/>} />
      </Routes>
        <Footer/>

    </>
  );
}

export default App;
