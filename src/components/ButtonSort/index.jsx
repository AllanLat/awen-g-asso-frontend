import './index.css'

const ButtonSort = ({onClick}) => {

    return(
        <select onClick={onClick}>
            <option value={"id"}>Trier par..</option>
            <option value={"date"}>Date</option>
            <option value={"credit"}>Crédit</option>
            <option value={"debit"}>Débit</option>
            <option value={"CB"}>CB</option>
            <option value={"cheque"}>Chèque</option>
        </select>
    )
}

export default ButtonSort