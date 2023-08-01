import './index.css'

const ButtonSort = () => {

    return(
        <select>
            <option>Trier par..</option>
            <option value={"date"}>Date</option>
            <option value={"credit"}>Crédit</option>
            <option value={"debit"}>Débit</option>
            <option value={"CB"}>CB</option>
            <option value={"cheque"}>Chèque</option>
        </select>
    )
}

export default ButtonSort