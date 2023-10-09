import { useNavigate, useParams } from 'react-router-dom';
import { getGroupById, getUsersByGroupId, getMembersByGroupId } from '../../api/groups'
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import './index.css'

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';
import MemberCard from '../../components/MemberCard';

const Group = () => {
    const userLvl = sessionStorage.getItem('userLvl');
    const userId = sessionStorage.getItem('userId');
    const { group_id } = useParams();
    const token = sessionStorage.getItem('token');
    const [group, setGroup] = useState({});
    const [GroupUsers, setGroupUsers] = useState([]);
    const [GroupMembers, setGroupMembers] = useState([]);
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
                        return
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
    }, [token, group_id, userId, navigate]);

    useEffect(() => {
        const fetchGroupMembers = async () => {
            setLoading(true);
            try {
                const groupMembers = await getMembersByGroupId(token, group_id);
                setGroupMembers(groupMembers);
                setLoading(false);
            } catch (error) {
                console.error(error);
                return [];
            }
        }
        fetchGroupMembers();
    }, [token, group_id]);



    useEffect(() => {
        const fetchGroup = async () => {
            setLoading(true);
            try {
                const group = await getGroupById(token, group_id);
                setGroup(group);
                setLoading(false);
            } catch (error) {
                console.error(error);
                return [];
            }
        }
        fetchGroup();
    }, [token, group_id]);

    useEffect(() => {
      if (!isUserInGroup && userLvl < 1) {
           navigate('/error');
    }
     }, [navigate, isUserInGroup, userLvl]);

    function dayNumberToDayName(dayNumber) {
        switch (dayNumber) {
            case 1:
                return 'Lundi';
            case 2:
                return 'Mardi';
            case 3:
                return 'Mercredi';
            case 4:
                return 'Jeudi';
            case 5:
                return 'Vendredi';
            case 6:
                return 'Samedi';
            case 7:
                return 'Dimanche';
            default:
                return 'N/A';
        }
    }

    function toTimeWithourSeconds(time) {
        return time.split(':').slice(0, 2).join(':');
    }

    return (
        <>
           <Navbar title="Groupe" />

            <div className="group-page-time">
                <p className="group-page-day">{dayNumberToDayName(group.group_day)}</p>
                <p className="group-page-hours">
                    {group.start_time && toTimeWithourSeconds(group.start_time)} - {group.end_time && toTimeWithourSeconds(group.end_time)}
                </p>
            </div>
            <div className="group-page-users">
                <div className="group-page-users-title">
                    <p>Professeurs : </p>
                    {userLvl > 0 && <Link to={`/group/${group_id}/addusers`}>Ajouter un professeur</Link>}
                </div>
                <div className="users">
                    {GroupUsers.map(user => {
                        return <p className='group-page-user' key={user.id}>{user.lastname} {user.firstname}</p>
                    })}
                </div>
            </div>

            <div className="group-page-members-title">
                <p>Adhérents : </p>
                <div className="button-add-suppr-member">
                    <Link to={`/group/${group_id}/addmembers`}>Ajouter un adhérent</Link>
                    <Link to={`/group/${group_id}/removeusers`}>Supprimer un adhérent</Link>
                </div>
            </div>
            
            <div className="group-page-members">
                <ul className="group-members-list">
                    {GroupMembers
                    .sort((a, b) => a.lastname.localeCompare(b.lastname))
                    .map(member => {
                        return <Link to ={`/member/${member.id}`} key={member.id}><MemberCard  member={member} /></Link>
                    })}
                </ul>
            </div>

            {loading && (
                <div className="loader-container">
                    <ClipLoader color='#fff' loading={loading} size={75} speedMultiplier={0.8} />
                </div>
            )}
            <div className="users-footer">
                <Link to="/groups"><GlassButton text="Retour" /></Link>
                <Link to={`/group/${group_id}/presences`}><GlassButton text="Valider les présences" /></Link>
                {userLvl > 0 && <Link to={`/group/update/${group_id}`}><GlassButton text="Modifier le groupe" /></Link>}
            </div>
        </>
    )
}

export default Group