import './index.css'

const Input = ({ value, type, text, register, required, onChange, placeholder, step, checkeds, multiple }) => {

    return (
        <div className={type==='checkbox' ? 'input-group-checkbox' : 'input-group'}>
            <label className={type==='file' ? 'custom-file-upload' : ''} htmlFor={value}>{type==='file' ? text : text + ' :'}</label>
           {onChange && multiple === true ? <input placeholder={placeholder} type={type} step={step} required={required} id={value} checked={checkeds} name={value} {...register(value)} onChange={onChange} multiple /> : <input  placeholder={placeholder} type={type} step={step} required={required} id={value} checked={checkeds} name={value} {...register(value)} />}
        </div>
    )
}

export default Input