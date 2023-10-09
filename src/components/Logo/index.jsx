import './index.css';
import { useEffect, useState } from 'react';
import { getLogo } from '../../api/association';

const Logo = ({ size }) => {
  const [logo, setLogo] = useState();
  const token = sessionStorage.getItem('token');
  const associationId = sessionStorage.getItem('associationId');

  useEffect(() => {
    const fetchLogo = async () => {
      const storedLogo = sessionStorage.getItem('logo');

      if (storedLogo) {
        setLogo(storedLogo);
      } else {
        try {
          const logoData = await getLogo(token, associationId);
          const logoUrl = "data:image/png;base64," + logoData;
          sessionStorage.setItem('logo', logoUrl);
          setLogo(logoUrl);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchLogo();
  }, [associationId, token]);

  return (
    <div className='logo'>
      <img src={logo} style={{ width: size, height: size }} alt="logo" />
    </div>
  );
};

export default Logo;
