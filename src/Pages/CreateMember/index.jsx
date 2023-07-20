import './index.css';

import { useNavigate } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './customConfirm.css'


import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';
import MemberForm from '../../components/MemberForm';
import { useEffect } from 'react';



const CreateMember = () => {
    const navigate = useNavigate();
    const userLvl = sessionStorage.getItem('userLvl');


    useEffect(() => {
        if (userLvl < 1) {
            navigate('/error');
        }
    }, [navigate, userLvl]);

    const cancel = (e) => {
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
                <MemberForm method="post" />
            </div>
            <div className="create-member-footer">
                <GlassButton onClick={cancel} text="Annuler" />
                <GlassButton form='member-form' type="submit" text="Ajouter" />
            </div>
        </>
    );
};

export default CreateMember;
