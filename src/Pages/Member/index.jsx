import { useParams } from "react-router-dom"
import { getMemberById } from "../../api/members.jsx";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

import "./index.css";

import Navbar from "../../components/Navbar";
import GlassButton from "../../components/GlassButton";

import placeholderImage from '../../assets/img/placeholder.png';

const Member = () => {
    const { member_id } = useParams();
    const token = sessionStorage.getItem('token');
    const [member, setMember] = useState({});
    const [loading, setLoading] = useState(true);

    const toOneInitial = (firstname) => {
        return firstname.charAt(0).toUpperCase() + '.'
    }

    const dateConverter = (date) => {
        return new Date(date).toLocaleDateString('fr-FR');
    }

    useEffect(() => {
        const fetchMember = async () => {
            setLoading(true);
            const member = await getMemberById(token, member_id);

            // Mettre en forme les données ici
            const formattedMember = {
                ...member,
                lastname: member.lastname.toUpperCase(),
                firstname: member.firstname.charAt(0).toUpperCase() + member.firstname.slice(1),
                birthday: dateConverter(member.member_detail.birthday),
                birthplace: member.member_detail.birthplace,
                photo: member.photo
            };

            setMember(formattedMember);
            setLoading(false);
        };

        fetchMember();
    }, [token, member_id]);



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
                        <div className="member-picture" style={{ backgroundImage: member.photo ? `url(${member.photo})` : `url(${placeholderImage})` }}></div>
                    </div>
                </div>


            </div>
            <div className="member-footer">
                <Link to="/members"><GlassButton text="Retour" /></Link>
                <GlassButton text="Modifier" />
                <GlassButton text="Supprimer" />
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