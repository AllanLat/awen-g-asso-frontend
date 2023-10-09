import './index.css';

const FormButton = ({type, text}) => {
    return (
        <button className='form-button' type={type}>{text}</button>
    )
}

export default FormButton