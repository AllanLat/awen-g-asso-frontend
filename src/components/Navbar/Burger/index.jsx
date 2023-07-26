import './index.css';

const Burger = ({ onClick }) => {
    return (
        <div className="burger" onClick={onClick}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
    );
};

export default Burger;