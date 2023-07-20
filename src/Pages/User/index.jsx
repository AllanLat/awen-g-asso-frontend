import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../api/users';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import './index.css';

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';


const User = () => {
    const userLvl = sessionStorage.getItem('userLvl');
    const { user_id } = useParams();
    const token = sessionStorage.getItem('token');
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const toOneInitial = (firstname) => {
        return firstname.charAt(0).toUpperCase() + '.'
    }

    useEffect(() => {
        if (userLvl < 1) {
            navigate('/error');
        }
    }, [navigate, userLvl]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await getUserById(token, user_id);
                setUser(user);
                setLoading(false);
            } catch (error) {
                console.error(error);
                return [];
            }
        };
        fetchUser();
    }, [token, user_id, navigate]);
    console.log(user)

    return (
        
        <>
            <Navbar title={user.lastname && user.lastname.toUpperCase() + " " + toOneInitial(user.firstname)} />
            <div className='user-page'>   
                <div className='user-page-header'>
                    <div className="user-page-header-content">
                        <p className="user-name">{user.lastname && user.lastname.toUpperCase()}</p>
                        <p className="user-firstname">{user.firstname && user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</p>
                    </div>
                </div>

                <div className="user-page-body">
                    <div className="phonecall-number">
                        <a href={`tel:${user.phone_number}`}>Appeler : {user.phone_number}</a>
                    </div>
                    <div className="card user-groups">
                        <h2>Groupes :</h2>
                    </div>
                </div>
            </div>
            <div className="user-footer">
                <Link to="/users"><GlassButton text="Retour" /></Link>
                <Link to={`/user/update/${user_id}`}><GlassButton text="Modifier" /></Link>
            </div>
            {loading && (
                <div className="loader-container">
                    <ClipLoader color="#fff" loading={loading} size={75} speedMultiplier={0.8} />
                </div>
            )}
        </>
    )

}


export default User