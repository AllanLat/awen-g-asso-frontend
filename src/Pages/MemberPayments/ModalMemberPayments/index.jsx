import { useEffect } from "react"
import "./index.css"



const ModalMemberPayments = ({isOpen, toggleOpen, total}) => {

    const [isTransacOpen, setIsTransacOpen] = useState(isOpen)

    useEffect(() => {
        setIsTransacOpen(isOpen)
    }, [isOpen])

    const onCloseAccount = () => {
        toggleOpen()
    }


    return( 
        <div className={`modal-account ${isTransacOpen ? 'open-account': ''}`}>

            <div className="footer-modal-account">
                <GlassButton text="Retour" onClick={onCloseAccount}/>
                <GlassButton form='account-form' type="submit" text="Enregistrer paiement"/>
            </div>  
        </div>
    )

}
