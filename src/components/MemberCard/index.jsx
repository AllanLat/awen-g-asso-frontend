import './index.css';
import placeholderImage from '../../assets/img/placeholder.png';

const MemberCard = ({ member, onClick }) => {
  console.log(member)
  const photoConverted = member ? "data:image/png;base64,"+ member.photo : placeholderImage;
  return (
    <li className="member" onClick={onClick}>
      <div className="card-content">
        <p>Nom : {member && member.lastname.toUpperCase()}</p>
        <p>Prénom : {member && member.firstname.charAt(0).toUpperCase() + member.firstname.slice(1)}</p>
      </div>
      <div className="card-picture" style={{ backgroundImage: member && member.photo !== null ? `url(${photoConverted})` : `url(${placeholderImage})` }}></div> 
      <div className="card-button"></div>
    </li>
  );
};

export default MemberCard;
