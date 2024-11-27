
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './componets/Home';
import Login from './componets/Login';
import Registration from './componets/Registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure Toastify styles are imported
import AppHeader from './componets/AppHeader'
import Customer from './Customer';

function App() {
  return (
    <div className="App">
      {/* ToastContainer to show notifications */}
      <ToastContainer  theme='colored' position='top-center'/>
      
      {/* BrowserRouter for routing */}

      <BrowserRouter>
      <AppHeader/>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='/customer' element={<Customer/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
