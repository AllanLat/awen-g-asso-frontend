const Input = ({ value, type, register, required }) => {
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='input-group'>
            <label htmlFor={value}>{capitalize(value)} :</label>
            <input type={type} required={required} id={value} name={value} {...register(value)}/>
        </div>
    )
}

export default Input