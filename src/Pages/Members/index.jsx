import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { getMembers } from '../../api/members';
import Navbar from '../../components/Navbar';
import './index.css';

const Members = () => {
  const token = sessionStorage.getItem('token');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');  // Ajouté

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const members = await getMembers(token);
      setMembers(members);
      setLoading(false);
    };
    fetchMembers();
  }, [token]); 

  const handleInputChange = (e) => {  // Ajouté
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Navbar title="Adhérents" />
      <div className='members-page'>
        <div className="search-bar">
          <input 
            className='search-input' 
            type="text" 
            placeholder="Trouver un adhérent"
            onChange={handleInputChange}  // Ajouté
          />
          <button className='search-button' type="submit"></button>
        </div>     
        {members && (
          <ul className="members-list">
            {members
              .filter(member => member.lastname.toLowerCase().includes(searchValue.toLowerCase()))  // Affiche seulement les members dont le nom contient la recherche
              .sort((memberA, memberB) => memberA.lastname.localeCompare(memberB.lastname))
              .map((member) => (
                <li className="member" key={member.id}><h1>{member.lastname}</h1></li>
            ))}
          </ul>
        )
        }

        {loading && (
          <div className="loader-container">
            <ClipLoader color='#fff' loading={loading} size={75} speedMultiplier={0.8} />
          </div>
        )}
      </div>
    </>
  );
}

export default Members;
