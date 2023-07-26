import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Pages/Login';
import Home from './Pages/Home';

import Members from './Pages/Members';
import Member from './Pages/Member';
import CreateMember from './Pages/CreateMember';
import UpdateMember from './Pages/UpdateMember';

import Users from './Pages/Users';
import User from './Pages/User';
import CreateUser from './Pages/CreateUser';
import UpdateUser from './Pages/UpdateUser';

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
        <Route path="/member/:member_id" element={<Member />} />
        <Route path="/member/new" element={<CreateMember />} />
        <Route path="/member/update/:member_id" element={<UpdateMember />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:user_id" element={<User />} />
        <Route path="/user/new" element={<CreateUser />} />
        <Route path="/user/update/:user_id" element={<UpdateUser />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Error />} /> {/* à créer en page */}
      </Routes>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
