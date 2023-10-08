import './index.css'

const GlobalAmountMember = ({amount, subscription}) => {

    var isNegative = true;
    
    if(amount < subscription){
        isNegative = true;
    } else {
        isNegative = false;
    }
    
    return(
        <div className='amount'>
            <p className={isNegative ? "detail-amount red" : "detail-amount green"}>{amount}€</p>
        </div>
    )
}

export default GlobalAmountMember