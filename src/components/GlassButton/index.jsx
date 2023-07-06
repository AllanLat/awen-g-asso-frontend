import './index.css';

const GlassButton = ({onClick, text, type}) => {
  return (
    <button onClick={onClick} type={type} className='glass-button'>{text}</button>
  )
}

export default GlassButton