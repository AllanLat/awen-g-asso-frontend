import './index.css';

const UserCard = ({ user }) => {
  return (
    <li className="user">
      <div className="card-content">
        <p>Nom : {user.lastname.toUpperCase()}</p>
        <p>Prénom : {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}</p>
      </div>
      <div className="card-button"></div>
    </li>
  )
}

export default UserCard