import { useParams, useNavigate } from "react-router-dom"
import { getMemberById } from "../../api/members.jsx";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

import "./index.css";

import Navbar from "../../components/Navbar";
import GlassButton from "../../components/GlassButton";
import SingleMemberCard from "../../components/SingleMemberCard";

import placeholderImage from '../../assets/img/placeholder.png';

const Member = () => {
    const userLvl = sessionStorage.getItem('userLvl');
    const { member_id } = useParams();
    const token = sessionStorage.getItem('token');
    const [member, setMember] = useState({});
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();

    const toOneInitial = (firstname) => {
        return firstname.charAt(0).toUpperCase() + '.'
    }

    const dateConverter = (date) => {
        return new Date(date).toLocaleDateString('fr-FR');
    }

    useEffect(() => {
        const fetchMember = async () => {
            setLoading(true);
            try {
                const member = await getMemberById(token, member_id);
                if (!member || member === "Le membre n'existe pas.") {
                    navigate('/error');
                }
                // Mettre en forme les données ici
                const formattedMember = {
                    ...member,
                    lastname: member.lastname.toUpperCase(),
                    firstname: member.firstname.charAt(0).toUpperCase() + member.firstname.slice(1),
                    birthday: dateConverter(member.member_detail.birthday),
                    birthplace: member.member_detail.birthplace,
                    photo: "data:image/jpeg;base64,"+ member.photo,
    
                    city: member.address.city,
                    postal_code: member.address.postal_code,
                    street: member.address.street,
                    living_with: member.member_detail.living_with,
                    
                    mail: member.member_detail.mail,
                    phone: member.member_detail.phone_number,
                    emergency_number: member.member_detail.emergency_number,
                    image_rights_signature: member.member_detail.image_rights_signature,
                    contraindication: member.member_detail.contraindication,
    
                    paid: member.paid,
                    subscription: member.subscription
                };
    
                setMember(formattedMember);
                setLoading(false);
            } catch (error) {
                if (error === 'Not found') {
                    navigate('/error');
                } else {
                    console.error(error);
                }
            }
        };

        fetchMember();
    }, [token, member_id, navigate]);

    return (
        <>
            <Navbar title={member.lastname && member.lastname + " " + toOneInitial(member.firstname)} />
            <div className='member-page'>
                <div className="member-page-header">
                
                    <div className="member-page-header-content">
                        <p className="member-name">{member.lastname}</p>
                        <p className="member-firstname">{member.firstname}</p>
                        <p className="member-birthday">Né(e) le {member.birthday} à {member.birthplace}</p>
                    </div>
                    <div className="member-page-picture">
                        <div className="member-picture" style={{ backgroundImage: member.photo ?  `url(${member.photo})`  : `url(${placeholderImage})` }}></div>
                        
                    </div>
                </div>
                <div className="emergency-number">
                    <a href={`tel:${member.emergency_number}`}>En cas d'urgence : {member.emergency_number}</a>
                </div>
                <div className="member-page-body">
                    <div className="card member-address">
                        <h2>Adresse {member.living_with && <span className="member-living-with">(vit chez {member.living_with})</span>} :</h2>
                        <p>{member.street}</p>
                        <p>{member.postal_code} {member.city}</p>

                    </div>
                    <div className="card member-contacts">
                        <h2>Contacts :</h2>
                        <p>{member.mail}</p>
                        <p>{member.phone}</p>
                    </div>
                    <div className="card member-infos">
                        <h2 className="image-rights">Droits à l'image : {member.image_rights_signature ? "Oui" : "Non"} </h2>
                        <h2>Contre-indication(s) :</h2> 
                        <p>{member.contraindication ? member.contraindication : "Non"}</p>
                    </div>
                    {userLvl > 0 && <Link to={`/member/${member_id}/payments`}>
                        <SingleMemberCard title="Paiement" paid={member.paid} subscription={member.subscription} />
                        </Link >}
                    <SingleMemberCard title="Pièces jointes" />
                </div>


            </div>
            <div className="member-footer">
                <Link to="/members"><GlassButton text="Retour" /></Link>
                {userLvl > 0 && <Link to={`/member/update/${member_id}`}><GlassButton text="Modifier" /></Link>}
            </div>
            {loading && (
                <div className="loader-container">
                    <ClipLoader color="#fff" loading={loading} size={75} speedMultiplier={0.8} />
                </div>
            )}
        </>
    )
}

export default Member