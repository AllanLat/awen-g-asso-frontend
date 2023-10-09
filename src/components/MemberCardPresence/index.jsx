import { useState } from 'react';
import placeholderImage from '../../assets/img/placeholder.png';
import checkIcon from '../../assets/img/greenCheck.png'
import './index.css'


const MemberCardPresence = ({member, onClick}) => {

    const [isChecked, setIsChecked] = useState(false);
    const photoConverted = member ? "data:image/png;base64,"+ member.photo : placeholderImage;

    
    const handleOnClick = () => {
        setIsChecked(!isChecked);
        console.log(isChecked);
        onClick();
    }

    return(
        <li className={`member-f-pre ${isChecked ? 'checked' : ''}`} onClick={handleOnClick}>
            <div className="card-picture-pre" style={{ backgroundImage: member && member.photo !== null ? `url(${photoConverted})` : `url(${placeholderImage})` }}>
            </div>
            <div className="card-content-pre">
                <p>Nom: {member && member.lastname.toUpperCase()}</p>
                <p>Prénom: {member && member.firstname.toUpperCase()}</p>
            </div>
            <div className="is-here" >
                <img className={`is-here-img ${isChecked ? 'vue' : ''}`} src={checkIcon} alt='présent ou non'/>
            </div>
        </li>
    )
}

export default MemberCardPresence