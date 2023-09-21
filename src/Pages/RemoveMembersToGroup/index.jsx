import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGroupById, getMembersByGroupId } from '../../api/groups';

import GlassButton from "../../components/GlassButton";
import Navbar from "../../components/Navbar";
import MemberCard from "../../components/MemberCard";



const RemoveMembersToGroup = () => {
    
    const [groupName, setGroupName] = useState('');
    const [membersToDisplay, setMembersToDisplay] = useState([]);

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
                        <MemberCard key={member.id} member={member} /> 
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