import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import './index.css'
import GlassButton from '../../../components/GlassButton'
import { createNewTransac } from '../../../api/payments'



const ModalAccount = ({isOpen, toggleOpen, total}) => {

    
    const token = sessionStorage.getItem('token')
    

    const [isTransacOpen, setIsTransacOpen] = useState(isOpen)
    const {register, handleSubmit, formState:{isValid}, reset} = useForm({mode: 'onChange'})

    useEffect(() => {
        setIsTransacOpen(isOpen)
    }, [isOpen])

    const onCloseAccount = () => {
        toggleOpen()
    }
    
    const onSubmit = async (data) => {

        //on regarde si c'est un credit ou un débit
        if (isValid === true) {
            if(data.credOrDeb === "Débit"){
                data.debit = data.amount
                data.credit = 0
            } else {
                data.credit = data.amount
                data.debit = 0
            }
    
            const tot = total[0].balance
    
            data.balance = tot
    
            delete data.amount
            await createNewTransac(token, data)
            reset()     
            onCloseAccount()
            
        } else {
            console.log('champ mal rempli')
        }
        
    }

    return (
            <div className={`modal-account ${isTransacOpen ? 'open-account': ''}`}>
                <div className='global-form'>
                    <form id="account-form" className='form' onSubmit={handleSubmit(onSubmit)}>
                    
                        <label htmlFor="date" className='label'>Date</label>
                        <input type="date" className='date' {...register("payment_date", {required: true})}/>

                        <label htmlFor="description" className='label'>Intitulé</label>
                        <input type="text" id="description" maxLength="40" {...register("description", {required: true})} />

                        <label htmlFor="montant" className='label'>Montant</label>
                        <input type='number' step="0.01"  id='montant' {...register('amount', {required: true})}/>

                        <select id='sens' {...register('credOrDeb', {required: true})} className='select-deb-cred'>
                            <option value="Crédit" className='opto-pay'>Crédit</option>
                            <option value="Débit" className='opto-pay'>Débit</option>
                        </select>

                        <label htmlFor='moyen' className='label'>Moyen de paiement</label>
                        <select id='moyen' {...register('payment_method', {required: true})} className='select'>
                            <option value="cb" className='opto-pay'>CB</option>
                            <option value="cheque" className='opto-pay'>Chèque</option>
                            <option value="autre" className='opto-pay'>Autre</option>
                        </select>
                        
                        <div className="footer-modal-account">
                            <GlassButton text="Retour" onClick={onCloseAccount}/>
                            <GlassButton form='account-form' type="submit" text="Enregistrer paiement"/>
                        </div>  

                    </form>
                </div> 
                
            </div>
        
    )
}

export default ModalAccount