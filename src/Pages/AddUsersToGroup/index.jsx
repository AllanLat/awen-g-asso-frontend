import './index.css';

import { toast, Slide } from 'react-toastify';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getGroupById, getUsersByGroupId, addUsersToGroup } from '../../api/groups';
import { getUsers } from '../../api/users';

import Navbar from '../../components/Navbar';
import UserCard from '../../components/UserCard';
import GlassButton from '../../components/GlassButton';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

const AddUsersToGroup = () => {
    const { group_id } = useParams();
    const [groupName, setGroupName] = useState('');
    const [usersToDisplay, setUsersToDisplay] = useState([]);
    const token = sessionStorage.getItem('token');
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const group = await getGroupById(token, group_id);
                setGroupName(group.name);

                const users = await getUsersByGroupId(token, group_id);
                
                const allUsers = await getUsers(token);
                setUsersToDisplay(allUsers.filter(
                    user => !users.map(user => user.id).includes(user.id)
                ));
            } catch (error) {
                console.error(error);
            }
        }
        fetchGroup();
    }, [group_id, token]);

    
    const onCardClick = (userId) => {
        confirmAlert({
            message: 'Voulez-vous vraiment ajouter ce professeur au groupe ?',
            closeOnClickOutside: false,
            buttons: [
                { label: 'Oui', onClick: () => { 
                    const users_list = {
                        "users_list": []
                    }
                    users_list.users_list.push(userId)
                    console.log(users_list)
                    try {
                        addUsersToGroup(token, group_id, users_list)
                    } catch (error) {
                        console.log(error)
                    } finally {
                        toast.success('Professeur ajouté au groupe', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
                        navigate(`/group/${group_id}`);
                    }
                 } },
                { label: 'Non', onClick: () => { return; } }
            ]
        }) 
    }


    
    
    return (
        <>
            <Navbar title={groupName} />
            <h2 className='add-users-group-title'>Ajouter un professeur au groupe</h2>
            <div className="add-users-group">
                <div className="add-users-list">
                    <div className="add-users-users">
                        {usersToDisplay
                        .sort((a, b) => a.lastname.localeCompare(b.lastname))
                        .map(user => (
                            <UserCard onClick={() => onCardClick(user.id)} key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="add-users-footer">
                <Link to={`/group/${group_id}`}><GlassButton text="Retour" /></Link>
            </div>
            

        </>
    )
}

export default AddUsersToGroup