import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"
import GlassButton from "../../components/GlassButton";
import TransactionCard from "../../components/TransactionCard";
import GlobalAmount from "../../components/GlobalAmount";
import { Link, useParams } from 'react-router-dom';
import { getMemberById } from "../../api/members"
import "./index.css"

const MemberPayments  = () => {

    const token = sessionStorage.getItem('token')
    const {member_id} = useParams()
    const [member, setMember] = useState({})
     
    console.log(member_id)

    useEffect(() => {
        const fetchName = async () => {
            try{
                const memberFetch = await getMemberById(token, member_id)
                const setObject = {
                    firstname: memberFetch.firstname.charAt(0).toUpperCase() + ".",
                    lastname: memberFetch.lastname.toUpperCase()
                }
                setMember(setObject)
            } catch(err){
                console.log(err)
            }
        }  
        fetchName()       
    }, [token, member_id])
    

    return (
        <div>
            <Navbar title={member.lastname + " " + member.firstname}/>

            <div className="member-global-amount">
                <GlobalAmount amount={100} />
            </div>
            <div className="member-transaction-cards">
            <TransactionCard intitule={"test affichage"} />
            </div>

            <div className="footer-member-payments">
                <Link to={`/member/${member_id}`}><GlassButton text={"Retour"} /></ Link>
                <GlassButton text={"Ajouter paiement"} />
            </div>
        </div>
    )
}

export default MemberPayments
