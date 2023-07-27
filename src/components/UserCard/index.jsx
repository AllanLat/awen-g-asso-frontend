import './index.css';

const UserCard = ({ user, onClick }) => {
  return (
    <li className="user" onClick={onClick}>
      <div className="card-content">
        <p>Nom : {user.lastname.toUpperCase()}</p>
        <p>Prénom : {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</p>
      </div>
      <div className="card-button"></div>
    </li>
  )
}

export default UserCard