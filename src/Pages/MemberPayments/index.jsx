import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import Navbar from "../../components/Navbar"
import GlassButton from "../../components/GlassButton";
import TransactionCard from "../../components/TransactionCard";
import GlobalAmount from "../../components/GlobalAmount";
import ModalAccount from "../account/ModalAccount";


import { getMemberById } from "../../api/members"
import { getMemberPayments } from "../../api/userPayments";
import { getBalanceAsso } from "../../api/payments";
import "./index.css"

const MemberPayments  = () => {

    const token = sessionStorage.getItem('token')
    const {member_id} = useParams()
    const [member, setMember] = useState({})
    const [paymentMember, setPaymentsMember] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [balance, setBalance] = useState()
    

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

    }, [token, member_id, isModalOpen])

    useEffect(() => {
        
        const fetchBalance = async() => {
            const getBalance = await getBalanceAsso(token)
            setBalance(getBalance)    
        }
        fetchBalance()
    }, [isModalOpen, token])
    
    let totalMemberPayments = [];
    

    function arrayPayment() {
       
        for(let i = 0; i<paymentMember.length; i++){   
            totalMemberPayments.push(parseFloat(paymentMember[i].credit))
            totalMemberPayments.push(-parseFloat(paymentMember[i].debit))
        }
        
    }
    
    
    arrayPayment();

    const initialValue = 0;
    const totalPayments = totalMemberPayments.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)


    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div>
            <Navbar title={member.lastname + " " + member.firstname}/>

            <div className="member-global-amount">
                <GlobalAmount amount={totalPayments} />
                <p className="cotisation">Cotisation à  <strong>{member.subscription}€</strong></p>
            </div>
            <div className="member-transaction-cards">
                {paymentMember && paymentMember.map((paymentI) => (
                    <TransactionCard 
                    key={paymentI.member_id && paymentI.member_id + paymentI.created_at}
                    date={paymentI.payment_date && paymentI.payment_date.split('T')[0]}
                    intitule={paymentI.description && paymentI.description}
                    moyen={paymentI.payment_method && paymentI.payment_method}
                    amount={paymentI.credit && paymentI.credit === "0.00" ? "Débit" : "Crédit"}
                    isCredOrDeb={paymentI.credit === "0.00" ? true : false}
                    credOrDeb={paymentI.credit === "0.00" ? paymentI.debit + "€" : paymentI.credit + "€"}
                    />
                ))}
            
            </div>

            <ModalAccount isOpen={isModalOpen} toggleOpen={handleModal} total={balance} member_id={member_id}/>

            <div className="footer-member-payments">
                <Link to={`/member/${member_id}`}><GlassButton text={"Retour"} /></ Link>
                <GlassButton text={"Ajouter paiement"} onClick={handleModal}/>
            </div>
        </div>
    )
}

export default MemberPayments
