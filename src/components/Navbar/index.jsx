import { useState, useEffect } from 'react';
import logoImage from '../../assets/img/association_logo.png';
import './index.css';

import Logo from '../Logo';
import Burger from '../Burger';
import ModalMenu from '../ModalMenu';

const Navbar = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoImg = logoImage;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(isMenuOpen); // Synchronize the state with the prop value
  }, [isMenuOpen]);

  return (
    <>
      <ModalMenu isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <nav className="navbar">
        <Logo img={logoImg} />
        <h1 className="title">{title}</h1>
        <Burger isOpen={isMenuOpen} onClick={handleMenuToggle} />
      </nav>
    </>
  );
};

export default Navbar;
