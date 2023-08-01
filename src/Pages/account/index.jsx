import './index.css'
import { Link } from 'react-router-dom'
import { getPaymentsAsso, getBalanceAsso } from '../../api/payments'


import Navbar from '../../components/Navbar'
import GlassButton from '../../components/GlassButton'
import { useState, useEffect } from 'react'
import ModalAccount from './ModalAccount'
import GlobalAmount from '../../components/GlobalAmount'
import TransactionCard from '../../components/TransactionCard'

const Account = () => {

    
    const token = sessionStorage.getItem('token')
    const [payments, setPayments] = useState([])
    const [total, setTotal] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    useEffect(() => {
        const fetchPayments = async() => {
            const getPay = await getPaymentsAsso(token)
            setPayments(getPay)
        }
        fetchPayments()
        
    }, [isModalOpen, token])

    useEffect(() => {
        
        const fetchBalance = async() => {
            const getBalance = await getBalanceAsso(token)
            setTotal(getBalance)    
        }
        fetchBalance()
    }, [isModalOpen, token])

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    
    return(
        <div>
            <Navbar title='Solde du compte' />
            
                <div className='global-amount'>
                    {total && total.map((i) => (
                        <GlobalAmount key={i} amount={i.balance} />
                    ))}                    
                </div>

                <div className='transaction-cards'>
                    {payments && payments.map((paymentI) => (
                        <TransactionCard key={paymentI.id} date={paymentI.payment_date.split('T')[0]} intitule={paymentI.description} 
                        moyen={paymentI.payment_method} credOrDeb={paymentI.credit === "0.00" ? paymentI.debit + "€" : paymentI.credit + "€"} amount={paymentI.balance + "€"} 
                        isCredOrDeb={paymentI.credit === "0.00" ? true : false}/>
                    ))} 
                </div>
        
            <ModalAccount isOpen={isModalOpen} toggleOpen={handleModal} total={total}/>
            <div className='footer-account'>
                <Link to={'/home'}><GlassButton text="Retour"/></Link>
                <GlassButton text="Ajouter transaction" onClick={handleModal} />
            </div>
        </div>
    )
}

export default Account