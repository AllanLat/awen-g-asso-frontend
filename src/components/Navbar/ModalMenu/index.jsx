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

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <div className={`modal-menu ${isOpen ? 'open' : ''}`}>
      <div className="modal-header">
        <h2 onClick={logout}>Se déconnecter</h2>
        <div className="cross" onClick={onClick}></div>
      </div>

    </div>
  );
};

export default ModalMenu;
