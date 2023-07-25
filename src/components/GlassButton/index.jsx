import './index.css';

const GlassButton = ({onClick, text, type, form}) => {
  return (
    <button onClick={onClick} form={form} type={type} className='glass-button'>{text}</button>
  )
}

export default GlassButton