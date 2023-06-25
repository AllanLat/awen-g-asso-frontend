import './index.css';

const Logo = ({img, size}) => {
  return (
    <div className='logo'>
      <img src={img} style={{width: size, height: size}} alt="logo" />
    </div>
  )
}

export default Logo