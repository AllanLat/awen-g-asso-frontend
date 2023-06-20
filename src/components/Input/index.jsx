import './index.css'

const Input = ({ value, type, text, register, required }) => {

    return (
        <div className='input-group'>
            <label htmlFor={value}>{text} :</label>
            <input type={type} required={required} id={value} name={value} {...register(value)}/>
        </div>
    )
}

export default Input