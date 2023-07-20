import { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';



import Logo from '../Logo';
import Burger from './Burger';
import ModalMenu from './ModalMenu';

const Navbar = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <ModalMenu isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <nav className="navbar">
        <Link to="/home"><Logo size="6rem" /></Link>
        <h1 className="title">{title}</h1>
        <Burger isOpen={isMenuOpen} onClick={handleMenuToggle} />
      </nav>
    </>
  );
};

export default Navbar;
