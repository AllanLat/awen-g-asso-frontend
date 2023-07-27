import './index.css';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import Navbar from '../../components/Navbar';
import DaySelector from '../../components/DaySelector';
import GlassButton from '../../components/GlassButton';
import GroupCard from '../../components/GroupCard';

import { getGroupsByDayId } from '../../api/groups';
import { getGroupsByUserId } from '../../api/users';

const Groups = () => {
  const token = sessionStorage.getItem('token');
  const userLvl = sessionStorage.getItem('userLvl');
  const userId = sessionStorage.getItem('userId');
  const [dayNumber, setDayNumber] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupsListRef = useRef();

  // Fonction de rappel pour mettre à jour dayNumber à partir de DaySelector
  const handleDayNumberChange = (number) => {
    setDayNumber(number);
    groupsListRef.current.scrollIntoView( { behavior: 'smooth' } );
  };

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const groups = await getGroupsByDayId(token, dayNumber);
        
        const userGroups = await getGroupsByUserId(token, userId);
        
        if (userLvl < 1) {
          // ne garder dans groups que les group qui font partie de userGroups
          setGroups(groups.filter(group => userGroups.some(userGroup => userGroup.id === group.id)))
        } else {
          setGroups(groups);
        } 
      } catch (error) {
        console.log('Error while fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, [token, dayNumber, userLvl]);

  return (
    <>
      <Navbar title="Groupes" />
      {/* Utilisation du composant DaySelector avec la fonction de rappel */}
      <DaySelector onDayNumberChange={handleDayNumberChange} />
      <div className="groups-page">
        {groups && (
          <ul className="groups-list" ref={groupsListRef}>
            {groups
            .sort((groupA, groupB) => groupA.start_time.localeCompare(groupB.start_time)) // Tri les groupes de 00:00 à 23:59
            .map((group) => (
              <Link to={`/group/${group.id}`} key={group.id}><GroupCard  group={group}/></Link>
            ))}
          </ul>
        )}
        
      </div>

      {loading && (
        <div className="loader-container">
          <ClipLoader color='#fff' loading={loading} size={75} speedMultiplier={0.8} />
        </div>
      )}

      <div className="groups-footer">
        <Link to="/home"><GlassButton text="Retour" /></Link>
        {userLvl > 0 && <Link to="/group/new"><GlassButton text="Ajouter un groupe" /></Link>}
      </div>
    </>
  );
};

export default Groups;