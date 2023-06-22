import './index.css';
import { useState, useEffect } from 'react';

const ModalMenu = ({ isMenuOpen, onMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(isMenuOpen);

  useEffect(() => {
    setIsOpen(isMenuOpen);
  }, [isMenuOpen]);

  const onClick = () => {
    setIsOpen(!isOpen);
    onMenuToggle();
  };
  console.log(isMenuOpen);

  return (
    <div className={`modal-menu ${isOpen ? 'open' : ''}`}>
      <div className="modal-header">
        <div className="cross" onClick={onClick}></div>
      </div>

    </div>
  );
};

export default ModalMenu;
