import { useNavigate, useParams } from 'react-router-dom';
import { getGroupById, getUsersByGroupId } from '../../api/groups'
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import './index.css'

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';

const Group = () => {
  const userLvl = sessionStorage.getItem('userLvl');
  const userId = sessionStorage.getItem('userId');
  const { group_id } = useParams();
  const token = sessionStorage.getItem('token');
  const [group, setGroup] = useState({});
  const [GroupUsers, setGroupUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserInGroup, setIsUserInGroup] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
      const fetchGroupUsers = async () => {
          setLoading(true);
          try {
              const groupUsers = await getUsersByGroupId(token, group_id);
              if (!groupUsers) {
                  setIsUserInGroup(false);
              }
              if (groupUsers.length === 0) {
                  setIsUserInGroup(false);
              }
              groupUsers.forEach(user => {
                  if (user.id === parseInt(userId)) {
                      setIsUserInGroup(true);
                  } else {
                      setIsUserInGroup(false);
                  }
              });
              setGroupUsers(groupUsers);
              setLoading(false);
          } catch (error) {
              console.error(error);
              return [];
          } 
      }
      fetchGroupUsers();
  }, [token, group_id]);


  useEffect(() => {
    if (!isUserInGroup && userLvl < 1) {
      navigate('/error');
    }
  }, [navigate, isUserInGroup]);

  console.log("user id : " + userId)
  console.log(GroupUsers);
  console.log(isUserInGroup);
  

  return (
    <div>Group</div>
  )
}

export default Group