import { useEffect, useState } from 'react';
import { getMembersCount, getDayGroupsCount } from '../../api/counts';
import Navbar from '../../components/Navbar';

const Home = () => {
  const user = {
    id: sessionStorage.getItem('userId'),
    association: sessionStorage.getItem('associationId'),
    lvl: sessionStorage.getItem('userLvl'),
    token: sessionStorage.getItem('token')
  }
  console.log(user)

  const [members_count, setMembers_count] = useState(0);
  const [day_groups_count, setDay_groups_count] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const membersCount = await getMembersCount(user.token);
      setMembers_count(membersCount);
  
      const dayGroupsCount = await getDayGroupsCount(user.token);
      setDay_groups_count(dayGroupsCount);
    };
  
    fetchData();
  }, [user.token]);
  
  

  console.log(members_count, day_groups_count)

  return (
    <>
      <Navbar title="Tableau de bord" />

    </>
  )
}

export default Home