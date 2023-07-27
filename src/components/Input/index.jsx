import './index.css'

const Input = ({ value, type, text, register, required, onChange, placeholder, step }) => {

    return (
        <div className='input-group'>
            <label className={type==='file' ? 'custom-file-upload' : ''} htmlFor={value}>{type==='file' ? text : text + ' :'}</label>
           {onChange ? <input placeholder={placeholder} type={type} step={step} required={required} id={value} name={value} {...register(value)} onChange={onChange} /> : <input  placeholder={placeholder} type={type} step={step} required={required} id={value} name={value} {...register(value)} />}
        </div>
    )
}

export default Input