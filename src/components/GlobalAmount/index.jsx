import './index.css'

const GlobalAmount = ({amount}) => {

    console.log(amount)
    const isNegative = amount <= 0
    return(
        <div className='amount'>
            <p className={isNegative ? "detail-amount red" : "detail-amount green"}>{amount}€</p>
        </div>
    )
}

export default GlobalAmount