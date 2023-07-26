import './index.css'

import { useNavigate } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';
import UserForm from '../../components/UserForm';
import { useEffect } from 'react';

const CreateUser = () => {
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
                { label: 'Oui', onClick: () => { navigate('/users'); } },
                { label: 'Non', onClick: () => { return; } }
            ]
        })
    };

    return (
        <>
            <Navbar title="Nouveau professeur" />
            <div className="create-user-page">
                <UserForm method="post" />
            </div>
            <div className="create-user-footer">
                <GlassButton onClick={cancel} text="Annuler" />
                <GlassButton form='user-form' type="submit" text="Ajouter" />
            </div>
        </>
    )
}

export default CreateUser