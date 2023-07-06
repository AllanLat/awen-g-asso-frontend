import './index.css'

const Input = ({ value, type, text, register, required }) => {

    return (
        <div className='input-group'>
            <label className={type==='file' && 'custom-file-upload'} htmlFor={value}>{type==='file' ? text : text + ' :'}</label>
            <input type={type} required={required} id={value} name={value} {...register(value)}/>
        </div>
    )
}

export default Input