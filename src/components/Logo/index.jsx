import './index.css';
import { useEffect, useState } from 'react';
import { getLogo } from '../../api/association';

const Logo = ({size}) => {
  const [logo, setLogo] = useState();
  const token = sessionStorage.getItem('token');
  const associationId = sessionStorage.getItem('associationId');

  useEffect(() => {
    const fetchLogo = async () => {
      const logo = await getLogo(token, associationId);
      setLogo("data:image/png;base64,"+ logo);
    };
    fetchLogo();
  }, [associationId, token]);

  return (
    <div className='logo'>
      <img src={logo} style={{width: size, height: size}} alt="logo" />
    </div>
  )
}

export default Logo