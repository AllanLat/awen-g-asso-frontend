import './index.css';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import Navbar from '../../components/Navbar';
import DaySelector from '../../components/DaySelector';
import GlassButton from '../../components/GlassButton';
import GroupCard from '../../components/GroupCard';

import { getGroupsByDayId } from '../../api/groups';

const Groups = () => {
  const token = sessionStorage.getItem('token');
  const userLvl = sessionStorage.getItem('userLvl');
  const [dayNumber, setDayNumber] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupsListRef = useRef();

  // Fonction de rappel pour mettre à jour dayNumber à partir de DaySelector
  const handleDayNumberChange = (number) => {
    setDayNumber(number);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      const groups = await getGroupsByDayId(token, dayNumber);
      setGroups(groups);
      setLoading(false);
    };
    fetchGroups();
  }, [token, dayNumber]);

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
        <Link to="/group/new"><GlassButton text="Ajouter un groupe" /></Link>
      </div>
    </>
  );
};

export default Groups;
