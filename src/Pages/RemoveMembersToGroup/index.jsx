import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getGroupById, getMembersByGroupId, removeMembersToGroup } from '../../api/groups';
import { toast, Slide } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

import GlassButton from "../../components/GlassButton";
import Navbar from "../../components/Navbar";
import MemberCard from "../../components/MemberCard";





const RemoveMembersToGroup = () => {
    
    const [groupName, setGroupName] = useState('');
    const [membersToDisplay, setMembersToDisplay] = useState([]);

    const navigate = useNavigate();

    const { group_id } = useParams();
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const group = await getGroupById(token, group_id);
                setGroupName(group.name);

                const members = await getMembersByGroupId(token, group_id);
                setMembersToDisplay(members)
            }catch(err){
                console.log(err)
            }
        }
        fetchGroup();
    },[token,group_id])

    const onCardClick = (memberId) => {
        console.log(memberId)
        confirmAlert({
            message : "Voulez-vous vraiment supprimer ce membre du goupe ?",
            closeOnClickOutside : false,
            buttons : [{
                label: 'Oui', onClick: () => {
                    const members_list = {
                        "members_list": []
                    }
                    members_list.members_list.push(memberId)
                    console.log(members_list)
                    try {
                        removeMembersToGroup(token, group_id, members_list)
                    } catch (error) {
                        console.log(error)
                    } finally {
                        toast.success('Adhérent supprimé du groupe', { transition: Slide, position: 'bottom-center', className: 'myCustomToast' });
                        navigate(`/group/${group_id}`);
                    }
                } },
                {label: 'Non', onClick: () => {return}}
            ]
        })
    }

    return (
        <>
            <Navbar title={groupName} />
            <h2 className='add-members-group-title'>Supprimer un membre du groupe</h2>
        <div className="add-members-group">
            <div className="add-members-list">
                <div className="add-members-members">
        
                    {membersToDisplay
                    .sort((a, b) => a.lastname.localeCompare(b.lastname))
                    .map(member => ( 
                        <MemberCard key={member.id} member={member} onClick={() => onCardClick(member.id)} /> 
                    ))}
                
                </div>
            </div>
        </div>
        <div className="add-members-footer">*
            <Link to={`/group/${group_id}`}><GlassButton text="Retour" /></Link>
        </div> 
    
    
        </>
    )
}
    
export default RemoveMembersToGroup