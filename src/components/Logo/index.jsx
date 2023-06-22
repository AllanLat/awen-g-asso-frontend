import './index.css';

const Logo = ({img}) => {
  return (
    <div className='logo'>
      <img src={img} alt="logo" />
    </div>
  )
}

export default Logo