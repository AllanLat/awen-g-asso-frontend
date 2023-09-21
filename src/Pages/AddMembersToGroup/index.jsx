import './index.css';

import { toast, Slide } from 'react-toastify';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getGroupById, getMembersByGroupId, addMembersToGroup } from '../../api/groups';
import { getMembers } from '../../api/members';

import Navbar from '../../components/Navbar';
import MemberCard from '../../components/MemberCard';
import GlassButton from '../../components/GlassButton';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

const AddMembersToGroup = () => {
    const { group_id } = useParams();
    const [groupName, setGroupName] = useState('');
    const [membersToDisplay, setMembersToDisplay] = useState([]);
    const token = sessionStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const group = await getGroupById(token, group_id);
                setGroupName(group.name);

                const members = await getMembersByGroupId(token, group_id);

                const allMembers = await getMembers(token);
                
                setMembersToDisplay(allMembers.filter(
                    member => !members.map(member => member.id).includes(member.id)
                ))
            } catch (error) {
                console.error(error);
            }
        }
        fetchGroup();
    }, [group_id, token]);


    const onCardClick = (memberId) => {
        confirmAlert({
            message: 'Voulez-vous vraiment ajouter cet adhérent au groupe ?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: 'Oui', onClick: () => {
                        const members_list = {
                            "members_list": []
                        }
                        members_list.members_list.push(memberId)
                        console.log(members_list)
                        try {
                            addMembersToGroup(token, group_id, members_list)
                        } catch (error) {
                            console.log(error)
                        } finally {
                            toast.success('Adhérent ajouté au groupe', { transition: Slide, position: 'bottom-center', className: 'myCustomToast' });
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
                <h2 className='add-members-group-title'>Ajouter un membre au groupe</h2>
            <div className="add-members-group">
                <div className="add-members-list">
                    <div className="add-members-members">
                        {membersToDisplay
                        .sort((a, b) => a.lastname.localeCompare(b.lastname))
                        .map(member => (
                            <MemberCard onClick={() => onCardClick(member.id)} key={member.id} member={member} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="add-members-footer">
                <Link to={`/group/${group_id}`}><GlassButton text="Retour" /></Link>
            </div> 


            </>
        )
    }

    export default AddMembersToGroup 