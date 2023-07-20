import './index.css';
import { useState, useEffect } from 'react';
import { toast, Slide } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import GlassButton from '../../GlassButton';
import { Link } from 'react-router-dom';

import Logo from '../../Logo';

const ModalMenu = ({ isMenuOpen, onMenuToggle }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(isMenuOpen);;

  useEffect(() => {
    setIsOpen(isMenuOpen);
  }, [isMenuOpen]);

  const onClose = () => {
    onMenuToggle();
  };

  const logout = (event) => {
    event.stopPropagation();
    sessionStorage.clear();
    toast.success('Vous êtes déconnecté', {transition: Slide, position: 'bottom-center', className: 'myCustomToast'});
    navigate('/login');
  }

  return (
    <div className={`modal-menu ${isOpen ? 'open' : ''}`}>
      
      <div className="modal-header">
      
      <div className="cross" onClick={onClose}/>
      </div>
      
      <div className="modal-body">
      
        <ul className='menus'>
          <li className='menu'><Link to="/home" onClick={onClose}>Accueil</Link></li>
          <li className='menu'><Link to="/members" onClick={onClose}>Adhérents</Link></li>
          <li className='menu'><Link to="/groups" onClick={onClose}>Groupes</Link></li>
        </ul>
        <Logo size="12rem" />
      </div>
      <div className="modal-footer">
        <Link to="/disclaimer"><GlassButton  text="Mentions Légales" /></Link>
        <GlassButton onClick={logout} text="Se déconnecter" />
      </div>
    </div>
  );
};

export default ModalMenu;
