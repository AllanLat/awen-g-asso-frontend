import './index.css'
import { Link } from 'react-router-dom'
import { getPaymentsAsso, getBalanceAsso } from '../../api/payments'


import Navbar from '../../components/Navbar'
import GlassButton from '../../components/GlassButton'
import { useState, useEffect } from 'react'
import ModalAccount from './ModalAccount'
import GlobalAmount from '../../components/GlobalAmount'
import TransactionCard from '../../components/TransactionCard'
import ButtonSort from '../../components/ButtonSort'

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

    

    const sortBy = (e) => {

        switch(e.target.value) {

            case 'date' : 
                const paymentDate = [...payments].sort((a, b) => {
                    const date1 = new Date(a.payment_date)
                    const date2 = new Date(b.payment_date)

                    return date2 - date1
                }) 
                setPayments(paymentDate)
                break

            case 'id': 
                const idPayments = [...payments].sort((a, b) => (b.id - a.id))
                setPayments(idPayments)
                break

            case 'credit':
                const creditPayments= [...payments].sort((a, b) => {
                     return b.credit - a.credit
                })
                setPayments(creditPayments)
                break

            case 'debit':
                const debitPayments = [...payments].sort((a, b) => {
                    return b.debit - a.debit
                })
                setPayments(debitPayments)
                break
        
            default: 
                console.log("Il y a un problème")
        }     
        
    }
    
    window.scroll({top:0, left:0, behavior: 'smooth'})

    return(
        <div>
            <Navbar title='Solde du compte' />
            
                <div className='global-amount'>
                    {total && total.map((i) => (
                        <GlobalAmount key={i} amount={i.balance} />
                    ))}                    
                </div>

                <div className='sort-button'>
                    <ButtonSort onClick={sortBy} />
                </div>

                <div className='transaction-cards'>      
                    {payments &&
                        payments.map((paymentI) => (
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