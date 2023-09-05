import { useEffect, useState, useRef } from 'react';
import { ClipLoader } from 'react-spinners';
import { getUsers } from '../../api/users';
import { Link, useNavigate } from 'react-router-dom';

import UserCard from '../../components/UserCard';
import GlassButton from '../../components/GlassButton';
import Navbar from '../../components/Navbar';
import './index.css';

const Users = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const userLvl = sessionStorage.getItem('userLvl');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const usersListRef = useRef();

    useEffect(() => {
        if (userLvl < 1) {
            navigate('/error');
        }
    }, [navigate, userLvl]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const Theusers = await getUsers(token);
            setUsers(Theusers);
            setLoading(false);
        };
        fetchUsers();
    }, [token]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        usersListRef.current.scrollIntoView( { behavior: 'smooth' } );
    };

    return (
        <>
            <Navbar title="Professeurs" />
            <div className="search-bar-container">
                <div className="search-bar">
                    <input
                        className='search-input'
                        type="text"
                        placeholder="Trouver un professeur"
                        onChange={handleInputChange}
                    />
                    <button className='search-button' type="submit"></button>
                </div>
            </div>
            <div className='users-page'>
                
                {Array.isArray(users) && (
                  <ul className="users-list" ref={usersListRef}>
                    {users
                      .filter((user) =>
                        user.lastname.toLowerCase().includes(searchValue.toLowerCase())
                      )
                      .sort((userA, userB) =>
                        userA.lastname.localeCompare(userB.lastname)
                      )
                      .map((user) => (
                        <Link to={`/user/${user.id}`} key={user.id}>
                          <UserCard key={user.id} user={user} />
                        </Link>
                      ))}
                  </ul>
                )}
                
                {loading && (
                    <div className="loader-container">
                        <ClipLoader color='#fff' loading={loading} size={75} speedMultiplier={0.8} />
                    </div>
                )}

                <div className="users-footer">
                    <Link to="/home"><GlassButton text="Retour" /></Link>
                    <Link to="/user/new"><GlassButton text="Nouveau professeur" /></Link>
                </div>
            </div>
        </>
    )
}

export default Users