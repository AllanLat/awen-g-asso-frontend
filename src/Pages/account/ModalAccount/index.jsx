import { useEffect, useState } from "react"
import './index.css'
import ReactDatePicker from 'react-datepicker'
import GlassButton from '../../../components/GlassButton'


const ModalAccount = ({isOpen, toggleOpen}) => {

    const [startDate, setStartDate] = useState(new Date())
    const [isTransacOpen, setIsTransacOpen] = useState(isOpen)

    useEffect(() => {
        setIsTransacOpen(isOpen)
    }, [isOpen])

    const onCloseAccount = () => {
        toggleOpen()
    }

    return (
            <div className={`modal-account ${isTransacOpen ? 'open-account': ''}`}>
                <div className='global-form'>
                    <form className='form'>
                        <label for="date" className='label'>Date</label>
                        <ReactDatePicker className='date' selected={startDate} onChange={(date) => setStartDate(date)} />

                        <label for="intitule" className='label'>Intitulé</label>
                        <input type="text" id="intitule" name="intitule" />

                        <label for="montant" className='label'>Montant</label>
                        <input type='text' id='montant' name='montant'/>

                        <fieldset className='radio'>
                            <div className='radio-button'>
                                <input type="radio" name="radio" id="credit" value='value' />     
                                <label for="credit" className='credit'>Crédit</label>
                            </div>

                            <div className='radio-button'>
                                <input type='radio' name='radio' id='debit' value='debit' />
                                <label for='debit' className='debit'>Débit</label>
                            </div>
                        </fieldset>

                        <label for='moyen' className='label'>Moyen de paiement</label>
                        <select id='moyen' name='moyen' className='select'>
                            <option value="cb" className='opto-pay'>CB</option>
                            <option value="cheque" className='opto-pay'>Chèque</option>
                            <option value="autre" className='opto-pay'>Autre</option>
                        </select>
                    </form>
                </div> 
                <div className="footer-modal-account">
                    <GlassButton text="Retour" onClick={onCloseAccount}/>
                    <GlassButton text="Enregistrer paiement" />
                </div>  
            </div>
        
    )
}

export default ModalAccount