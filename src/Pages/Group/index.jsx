import { useFetcher, useNavigate, useParams } from 'react-router-dom';
import { getGroupById, getUsersByGroupId } from '../../api/groups'
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import './index.css'

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';

const Group = () => {
    const userLvl = sessionStorage.getItem('userLvl');
    const userId = sessionStorage.getItem('userId');
    const { group_id } = useParams();
    const token = sessionStorage.getItem('token');
    const [group, setGroup] = useState({});
    const [GroupUsers, setGroupUsers] = useState([]);
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
    }, [token, group_id, userId]);

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
            <Navbar title={group.name} />
            <div className="group-page-time">
                <p className="group-page-day">{dayNumberToDayName(group.group_day)}</p>
                <p className="group-page-hours">
                    {group.start_time && toTimeWithourSeconds(group.start_time)} - {group.end_time && toTimeWithourSeconds(group.end_time)}
                </p>

            </div>
            <div className="group-page">

            </div>
        </>
    )
}

export default Group