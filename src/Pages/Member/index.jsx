import { useParams } from "react-router-dom"
import { getMemberById } from "../../api/members.jsx";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

import "./index.css";

import Navbar from "../../components/Navbar";
import GlassButton from "../../components/GlassButton";

const Member = () => {
    const { member_id } = useParams();
    const token = sessionStorage.getItem('token');
    const [member, setMember] = useState({});
    const [loading, setLoading] = useState(true);

    const toOneInitial = (firstname) => {
        return firstname.charAt(0).toUpperCase() + '.'
    }

    useEffect(() => {
        const fetchMember = async () => {
            console.log("member");
            setLoading(true);
            const member = await getMemberById(token, member_id);
            setMember(member);
            setLoading(false);
        };
        fetchMember();
    }, [token, member_id]);

    return (
        <>
            <Navbar title={member.lastname && member.lastname.toUpperCase() + " " + toOneInitial(member.firstname)} />
            <div className='member-page'>

               
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
            </div>

        </>
    )
}

export default Member