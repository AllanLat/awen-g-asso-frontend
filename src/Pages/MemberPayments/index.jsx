import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar"
import GlassButton from "../../components/GlassButton";
import TransactionCard from "../../components/TransactionCard";
import GlobalAmount from "../../components/GlobalAmount";
import ModalAccount from "../account/ModalAccount";
import { Link, useParams } from 'react-router-dom';
import { getMemberById } from "../../api/members"
import { getMemberPayments } from "../../api/userPayments";
import "./index.css"

const MemberPayments  = () => {

    const token = sessionStorage.getItem('token')
    const {member_id} = useParams()
    const [member, setMember] = useState({})
    const [paymentMember, setPaymentsMember] = useState([])
    // const [totalPayments, setTotalPayments] = useState(0)
     
    

    useEffect(() => {
        const fetchName = async () => {
            try{
                const memberFetch = await getMemberById(token, member_id)
                const setObject = {
                    firstname: memberFetch.firstname.charAt(0).toUpperCase() + ".",
                    lastname: memberFetch.lastname.toUpperCase(),
                    subscription: memberFetch.subscription
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
    
    let total = [];
    

    function arrayPayment() {
       
        for(let i = 0; i<paymentMember.length; i++){   
            total.push(parseFloat(paymentMember[i].credit))
        }
        
    }
    
    arrayPayment();
    console.log(total)

    const initialValue = 0;
    const totalPayments = total.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)


    return (
        <div>
            <Navbar title={member.lastname + " " + member.firstname}/>

            <div className="member-global-amount">
                <GlobalAmount amount={totalPayments + "/" + member.subscription} />
            </div>
            <div className="member-transaction-cards">
                {paymentMember && paymentMember.map((paymentI) => (
                    <TransactionCard 
                    key={paymentI.member_id + paymentI.created_at}
                    date={paymentI.payment_date.split('T')[0]}
                    intitule={paymentI.description}
                    moyen={paymentI.payment_method}
                    amount={paymentI.credit === "0.00" ? paymentI.debit : paymentI.credit}
                    />
                ))}
            
            </div>

            <ModalAccount isOpen={isModalOpen} toggleOpen={handleModal} total={total}/>

            <div className="footer-member-payments">
                <Link to={`/member/${member_id}`}><GlassButton text={"Retour"} /></ Link>
                <GlassButton text={"Ajouter paiement"} />
            </div>
        </div>
    )
}

export default MemberPayments
