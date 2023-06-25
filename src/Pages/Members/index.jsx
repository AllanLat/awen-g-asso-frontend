import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { getMembers } from '../../api/members';
import Navbar from '../../components/Navbar';
import './index.css';

const Members = () => {
  const token = sessionStorage.getItem('token');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const members = await getMembers(token);
      setMembers(members);
      setLoading(false);
    };
    fetchMembers();
  }, [token]);

  return (
    <>
      <Navbar title="Adhérents" />
      <div className='members-page'>
        {members && (
          <ul>
            {members.map((member) => (
              <li key={member.id}>{member.firstname}</li>
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