import './index.css'

const GlobalAmount = ({amount, total}) => {

    console.log(total)
    if(!total) {
        total = 0
    }
    
    const isNegative = amount < total
    console.log(isNegative);
    return(
        <div className='amount'>
            <p className={isNegative ? "detail-amount red" : "detail-amount green"}>{amount}€</p>
        </div>
    )
}

export default GlobalAmount