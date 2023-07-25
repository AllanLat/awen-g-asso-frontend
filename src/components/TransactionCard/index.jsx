import './index.css'


const TransactionCard = ({date, intitule, moyen, credOrDeb, amount, isCredOrDeb}) => {
     
    return(
    <div className="global-transaction">
        <div className='transaction-detail'>
            <div className="date-intitule">
                <p>{date}</p>
                <p>{intitule}</p>
            </div>

            <div className="moyen-cred">
                <p>{moyen}</p>
                <p className={isCredOrDeb === true ? 'deb-red' : 'cred-green' }>{credOrDeb} €</p>
            </div>
        </div>

        <div className='total-view'>
            <p>{amount} €</p>
        </div>
    </div>
    )
    
}

export default TransactionCard