import { useEffect, useState, useRef } from 'react';
import { ClipLoader } from 'react-spinners';
import { getMembers } from '../../api/members';
import { Link } from 'react-router-dom';

import MemberCard from '../../components/MemberCard';
import GlassButton from '../../components/GlassButton';
import Navbar from '../../components/Navbar';
import './index.css';

const Members = () => {
  const token = sessionStorage.getItem('token');
  const userLvl = sessionStorage.getItem('userLvl');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const membersListRef = useRef();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const Themembers = await getMembers(token);
      setMembers(Themembers);
      setLoading(false);
    };
    fetchMembers();
  }, [token]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    membersListRef.current.scrollIntoView( { behavior: 'smooth' } );
  };

  console.log(members)
  return (
    <>
      <Navbar title="Adhérents" />
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            className='search-input'
            type="text"
            placeholder="Trouver un adhérent"
            onChange={handleInputChange}
          />
          <button className='search-button' type="submit"></button>
        </div>
      </div>
      <div className='members-page'>

      {Array.isArray(members) && (
        <ul className="members-list" ref={membersListRef}>
          {members
            .filter((member) =>
              member.lastname.toLowerCase().includes(searchValue.toLowerCase())
            )
            .sort((memberA, memberB) =>
              memberA.lastname.localeCompare(memberB.lastname)
            )
            .map((member) => (
              <Link to={`/member/${member.id}`} key={member.id}>
                <MemberCard key={member.id} member={member} />
              </Link>
            ))}
        </ul>
      )}

        {loading && (
          <div className="loader-container">
            <ClipLoader color='#fff' loading={loading} size={75} speedMultiplier={0.8} />
          </div>
        )}

        <div className="members-footer">
          <Link to="/home"><GlassButton text="Retour" /></Link>
          {userLvl > 0 && <Link to="/member/new"><GlassButton text="Nouvel Adhérent" /></Link>}
        </div>
      </div>
    </>
  );
}

export default Members;
