import './index.css';
import placeholderImage from '../../assets/img/placeholder.png';

const index = ({ member }) => {
  console.log(member.photo)
  return (
    <li className="member">
      <div className="card-content">
        <p>Nom : {member.lastname.toUpperCase()}</p>
        <p>Prénom : {member.firstname.charAt(0).toUpperCase() + member.firstname.slice(1)}</p>
      </div>
      <div className="card-picture" style={{ backgroundImage: member.photo ? `url(${member.photo})` : `url(${placeholderImage})` }}></div> 
      <div className="card-button"></div>
    </li>
  );
};

export default index;
