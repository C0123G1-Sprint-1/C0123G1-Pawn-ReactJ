import logo from './logo.svg';
import './App.css';
import CustomerList from "./component/customer/CustomerList";
import {Route, Routes} from "react-router";
import RegisterPawn from "./component/customer/RegisterPawn";

function App() {
  return (
    <>
      <Routes>
        <Route path='/listCustomer' element={<CustomerList/>}/>
        <Route path='/listCustomerRegisterPawn' element={<RegisterPawn/>}/>
      </Routes>
    </>
  );
}

export default App;
