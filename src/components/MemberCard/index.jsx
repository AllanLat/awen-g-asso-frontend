import './index.css';
import placeholderImage from '../../assets/img/placeholder.png';
import redDot from '../../assets/img/Basic_red_dot.png';
import orangeDot from '../../assets/img/orange_dot.png';
import greenDot from '../../assets/img/Basic_green_dot.png';

const MemberCard = ({ member, onClick }) => {
  //console.log(member)
  const photoConverted = member ? "data:image/png;base64,"+ member.photo : placeholderImage;

  let paidAndAdmin = true;
  let paidOrAdmin = false;
  let noPayNoAdmin = false;

  if(member.certificate === null && member.paid < member.subscription){
    noPayNoAdmin = true;
    paidAndAdmin = false;
    paidOrAdmin = false;
  } else if(member.certificate === null || member.paid < member.subscription){
    paidOrAdmin = true;
    paidAndAdmin = false;
    noPayNoAdmin = false;
  } else if(member.certificate !== null && member.paid === member.subscription){
    paidOrAdmin = false;
    paidAndAdmin = true;
    noPayNoAdmin = false;
  }

  return (
    <li className="member" onClick={onClick}>
      <div className="card-content">
        <p>Nom : {member && member.lastname.toUpperCase()}</p>
        <p>Prénom : {member && member.firstname.charAt(0).toUpperCase() + member.firstname.slice(1)}</p>
      </div>
      <img className='member-state' src={paidAndAdmin ? greenDot : paidOrAdmin ? orangeDot : noPayNoAdmin ? redDot : ''} alt='Etat du dossier'/>
      <div className="card-picture" style={{ backgroundImage: member && member.photo !== null ? `url(${photoConverted})` : `url(${placeholderImage})` }}></div> 
      <div className="card-button"></div>
    </li>
  );
};

export default MemberCard;
