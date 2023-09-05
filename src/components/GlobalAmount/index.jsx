import './index.css'

const GlobalAmount = ({amount, total}) => {
    if(!total) {
        total = 0
    }
    const isNegative = amount < total;
    return(
        <div className='amount'>
            <p className={isNegative ? "detail-amount red" : "detail-amount green"}>{amount}€</p>
        </div>
    )
}

export default GlobalAmount