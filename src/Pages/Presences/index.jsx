import './index.css'

import Navbar from "../../components/Navbar";
import GlassButton from "../../components/GlassButton";
import MemberCardPresence from '../../components/MemberCardPresence';
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getMembersByGroupId, updateMembersCount,addMemberList } from "../../api/groups";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

const Presences = () =>{

    const { group_id } = useParams();
    const token = sessionStorage.getItem('token');

    const [membersToDisplay, setMembersToDisplay] = useState([]);
    const [membersPresent, setMembersPresent] = useState([]);
    const [membersPresentId, setMembersPresentId ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembers = async () => {
            try{
                const members = await getMembersByGroupId(token, group_id)
                setMembersToDisplay(members)
            }catch(err){
                console.log(err)
            }
        }
        fetchMembers();
    }, [token, group_id]);

    const handleOnClick = (member) => {

        const completeName = member.lastname + " " + member.firstname;
        let isPresent = false;
        let indexAlreadyPresent;

        membersPresent.forEach((element, index) => {
            if(element === completeName){
                isPresent = true;
                indexAlreadyPresent = index;
            }
        })

        if (isPresent === false){
            const newPresence = [...membersPresent, completeName.toUpperCase()];
            const addMemberId = [...membersPresentId, member.id];
            setMembersPresent(newPresence);
            setMembersPresentId(addMemberId);
        } else if (isPresent === true){
            membersPresent.splice(indexAlreadyPresent, 1)
            membersPresentId.splice(indexAlreadyPresent, 1)
        }        
    }

    const validerTest = async () => {

        const listOfPresence = membersPresent.join("/")
        //console.log(listOfPresence)
        const listDetail = {
            "associationId": sessionStorage.getItem('associationId'),
            "group_id": group_id,
            "presence": listOfPresence,
            "userId": sessionStorage.getItem('userId')
        }
        console.log(listDetail)
        try{
            const res = await updateMembersCount(token, group_id, membersPresentId);
            console.log(res);
            const result = await addMemberList(token, listDetail)
            console.log(result);
            //Ajouter popup de confirmation
            confirmAlert({
                message: 'Les présences ont bien été validées',
                closeOnClickOutside: false,
                buttons: [
                    { label: 'Ok', onClick: () => { navigate(`/group/${group_id}`); } }
                ]
            })

        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Navbar title={"Presences"} />
            <h2 className='presence-group-title'>Valider les présences</h2>
            <div className="members-display">
                {membersToDisplay.map(member => 
                    <MemberCardPresence key={member.id} member={member} onClick={() => handleOnClick(member)}/>
                    )}
            </div>
            <div className="users-footer">
                <GlassButton text={"Retour"} />
                <GlassButton text={"Valider"} onClick={validerTest}/>
            </div>
        </>
    )
}

export default Presences