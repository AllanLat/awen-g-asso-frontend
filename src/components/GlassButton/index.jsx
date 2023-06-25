import './index.css';

const GlassButton = ({onClick, text}) => {
  return (
    <button onClick={onClick} className='glass-button'>{text}</button>
  )
}

export default GlassButton