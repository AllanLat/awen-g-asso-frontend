import './index.css';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './customConfirm.css'


import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';
import MemberForm from '../../components/MemberForm';

const CreateMember = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const cancel = () => {
        confirmAlert({
            message: 'Voulez-vous vraiment annuler ?',
            closeOnClickOutside: false,
            buttons: [
                { label: 'Oui', onClick: () => { navigate('/members'); } },
                { label: 'Non', onClick: () => { return; } }
            ]
        })
    };

    return (
        <>
            <Navbar title="Nouvel adhérent" />
            <div className="create-member-page">
                <MemberForm/>
            </div>
            <div className="create-member-footer">
                <GlassButton onClick={cancel} text="Annuler" />
                <GlassButton text="Ajouter" />
            </div>
        </>
    );
};

export default CreateMember;
