import './index.css';
import { useState, useEffect } from 'react';

const ModalMenu = ({ isMenuOpen, onMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(isMenuOpen);

  const onClick = () => {
    setIsOpen(!isOpen);
    onMenuToggle(); // Call the onMenuToggle function to update isMenuOpen in Navbar
  };

  useEffect(() => {
    setIsOpen(isMenuOpen); // Update the state when the prop value changes
  }, [isMenuOpen]);

  return (
    <div className="modal-menu" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="cross" onClick={onClick}></div>
    </div>
  );
};

export default ModalMenu;
