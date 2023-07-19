import { Route, Routes } from 'react-router';
import './App.css';
import { LoginHome } from './component/account/LoginHome';

function App() {
  return (
    <>
    <Routes>
   
      <Route path='/loginHome'  element={<LoginHome />}/>
   </Routes>
   </>
  );
}

export default App;
