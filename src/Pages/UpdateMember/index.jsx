import './index.css';

import { useNavigate, useParams } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';
import MemberForm from '../../components/MemberForm';

const UpdateMember = () => {

    const navigate = useNavigate();
    const { member_id } = useParams();

    const cancel = (e) => {
        confirmAlert({
            message: 'Voulez-vous vraiment annuler ?',
            closeOnClickOutside: false,
            buttons: [
                { label: 'Oui', onClick: () => { navigate(`/member/${member_id}`); } },
                { label: 'Non', onClick: () => { return; } }
            ]
        })
    };

    return (
        <>
            <Navbar title="Modifier l'adhérent" />
            <div className="update-member-page">
                <MemberForm method="put" memberId={member_id} />
            </div>
            <div className="update-member-footer">
                <GlassButton onClick={cancel} text="Annuler" />
                <GlassButton form='member-form' type="submit" text="Modifier" />
            </div>
        </>
    );
}

export default UpdateMember