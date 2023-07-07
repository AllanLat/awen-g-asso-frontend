import { useEffect, useState } from 'react';
import { getMembersCount, getDayGroupsCount } from '../../api/counts';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import Navbar from '../../components/Navbar';
import DashMenu from '../../components/DashMenu';

import './index.css';

const Home = () => {
  const user = {
    id: sessionStorage.getItem('userId'),
    association: sessionStorage.getItem('associationId'),
    lvl: sessionStorage.getItem('userLvl'),
    token: sessionStorage.getItem('token')
  }

  const [members_count, setMembers_count] = useState(0);
  const [day_groups_count, setDay_groups_count] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const membersCount = await getMembersCount(user.token);
      setMembers_count(membersCount);
  
      const dayGroupsCount = await getDayGroupsCount(user.token);
      setDay_groups_count(dayGroupsCount);
      setLoading(false);
    };
  
    fetchData();
  }, [user.token]);

  return (
    <>
      <Navbar title="Tableau de bord" />
      <div className="home">
          <Link to='/members'><DashMenu count={members_count} title='Adhérents' /></Link>
          <Link to='/account'><DashMenu title='Solde du compte' /></Link>
          <Link to='/groups'><DashMenu count={day_groups_count} title='Groupes du jour' /></Link>

      </div>
      {loading && (
        <div className="loader-container">
          <ClipLoader color='#fff' loading={loading} size={75} speedMultiplier={0.8}/>
        </div>
      )}
    </>
  )
}

export default Home