import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import Navbar from "../../components/Navbar"
import GlassButton from "../../components/GlassButton";
import TransactionCard from "../../components/TransactionCard";
import GlobalAmount from "../../components/GlobalAmount";
import ModalAccount from "../account/ModalAccount";
import ButtonSort from "../../components/ButtonSort";


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
                    subscription: memberFetch.subscription,
                    paid: memberFetch.paid
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
    

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const sortBy = (e) => {

        switch(e.target.value) {

            case 'date' : 
                const paymentDate = [...paymentMember].sort((a, b) => {
                    const date1 = new Date(a.payment_date)
                    const date2 = new Date(b.payment_date)

                    return date2 - date1
                }) 
                setPaymentsMember(paymentDate)
                break

            case 'id': 
                const idPayments = [...paymentMember].sort((a, b) => (b.id - a.id))
                setPaymentsMember(idPayments)
                break

            case 'credit':
                const creditPayments= [...paymentMember].sort((a, b) => {
                     return b.credit - a.credit
                })
                setPaymentsMember(creditPayments)
                break

            case 'debit':
                const debitPayments = [...paymentMember].sort((a, b) => {
                    return b.debit - a.debit
                })
                setPaymentsMember(debitPayments)
                break
        
            default: 
                console.log("Il y a un problème")
        }     
        
    }

    return (
        <div>
            <Navbar title={member.lastname + " " + member.firstname}/>

            <div className="member-global-amount">
                <GlobalAmount amount={member.paid} />
                <p className="cotisation">Cotisation à  <strong>{member.subscription}€</strong></p>
            </div>

            <div className='sort-button'>
                <ButtonSort onClick={sortBy}/>
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
