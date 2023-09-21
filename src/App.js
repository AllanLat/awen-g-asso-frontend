import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Pages/Login';
import Home from './Pages/Home';

import Members from './Pages/Members';
import Member from './Pages/Member';
import MemberPayments from './Pages/MemberPayments';
import CreateMember from './Pages/CreateMember';
import UpdateMember from './Pages/UpdateMember';

import Users from './Pages/Users';
import User from './Pages/User';
import CreateUser from './Pages/CreateUser';
import UpdateUser from './Pages/UpdateUser';

import Groups from './Pages/Groups';
import Group from './Pages/Group';
import CreateGroup from './Pages/CreateGroup';
import UpdateGroup from './Pages/UpdateGroup';
import AddUsersToGroup from './Pages/AddUsersToGroup';
import AddMembersToGroup from './Pages/AddMembersToGroup';
import RemoveMembersToGroup from './Pages/RemoveMembersToGroup';

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
        <Route path="/member/:member_id/payments" element={<MemberPayments />} />
        <Route path="/member/new" element={<CreateMember />} />
        <Route path="/member/update/:member_id" element={<UpdateMember />} />

        <Route path="/users" element={<Users />} />
        <Route path="/user/:user_id" element={<User />} />
        <Route path="/user/new" element={<CreateUser />} />
        <Route path="/user/update/:user_id" element={<UpdateUser />} />

        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:group_id" element={<Group />} />
        <Route path="/group/new" element={<CreateGroup />} />
        <Route path="/group/update/:group_id" element={<UpdateGroup />} />
        <Route path="/group/:group_id/addusers" element={<AddUsersToGroup />} />
        <Route path="/group/:group_id/removeusers" element={<RemoveMembersToGroup />} />
        <Route path="/group/:group_id/addmembers" element={<AddMembersToGroup />} />
        

        <Route path="/disclaimer" element={<Disclaimer />} />
        
        <Route path="/account" element={<Account />} />
        <Route component={<Error />} /> {/* à créer en page */}
      </Routes>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
