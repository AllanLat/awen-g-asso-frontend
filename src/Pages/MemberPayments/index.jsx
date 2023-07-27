import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"
import GlassButton from "../../components/GlassButton";
import TransactionCard from "../../components/TransactionCard";
import GlobalAmount from "../../components/GlobalAmount";
import { Link, useParams } from 'react-router-dom';
import { getMemberById } from "../../api/members"
import { getMemberPayments } from "../../api/userPayments";
import "./index.css"

const MemberPayments  = () => {

    const token = sessionStorage.getItem('token')
    const {member_id} = useParams()
    const [member, setMember] = useState({})
    const [paymentMember, setPaymentsMember] = useState([])
     
    

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
        
        const fetchPayments = async () => {
            try{
                const getPayments = await getMemberPayments(token, member_id)
                setPaymentsMember(getPayments)
            }catch(err){
                console.log(err)
            }
        }
        fetchPayments()

    }, [token, member_id])
    
    console.log(paymentMember)

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
