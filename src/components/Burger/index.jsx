import './index.css';

const Burger = ({ isOpen, onClick }) => {
    return (
        <div className={`burger ${isOpen ? 'open' : ''}`} onClick={onClick}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
    );
};

export default Burger;