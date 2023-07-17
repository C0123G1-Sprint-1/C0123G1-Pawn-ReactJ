import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<ListContract/>}/>
          <Route path="/create" element={<CreateContracts/>}/>
        </Routes>


      </>
  );
}

export default App;
