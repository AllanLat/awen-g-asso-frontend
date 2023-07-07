import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Pages/Login';
import Home from './Pages/Home';
import Members from './Pages/Members';
import Groups from './Pages/Groups';
import Error from './Pages/Error';
import Disclaimer from './Pages/Disclaimer';
import Account from './Pages/account';

function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (

    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Error />} /> {/* à créer en page */}
      </Routes>
      <ToastContainer  autoClose={1500}/>
    </div>
  );
}

export default App;
