import './index.css'

const GlobalAmount = ({amount}) => {

    const isNegative = amount.includes("-")
    return(
        <div className='amount'>
            <p className={isNegative ? 'detail-amount red' : 'detail-amount green'}>{amount} €</p>
        </div>
    )
}

export default GlobalAmount