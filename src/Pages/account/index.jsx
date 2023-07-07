import './index.css'
import "react-datepicker/dist/react-datepicker.css"
import { Link } from 'react-router-dom'


import Navbar from '../../components/Navbar'
import GlassButton from '../../components/GlassButton'
import { useState } from 'react'
import ModalAccount from './ModalAccount'
import GlobalAmount from '../../components/GlobalAmount'
import TransactionCard from '../../components/TransactionCard'

const Account = () => {

    
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return(
        <div>
            <Navbar title='Solde du compte' />
            
                <div className='global-amount'>
                    <GlobalAmount amount={12000} />
                </div>
                <div className='transaction-cards'>
                    <TransactionCard date="12/12/12" intitule="Paiement cotis Jean-Sébastien" 
                    moyen="CB" credOrDeb={125} amount={12000} />
                </div>
        
            <ModalAccount isOpen={isModalOpen} toggleOpen={handleModal} />
            <div className='footer-account'>
                <Link to={'/home'}><GlassButton text="Retour"/></Link>
                <GlassButton text="Ajouter transaction" onClick={handleModal} />
            </div>
        </div>
    )
}

export default Account