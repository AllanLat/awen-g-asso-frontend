import './index.css';

import { useNavigate } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';
import GroupForm from '../../components/GroupForm';
import { useEffect } from 'react';

const CreateGroup = () => {
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
                { label: 'Oui', onClick: () => { navigate('/groups'); } },
                { label: 'Non', onClick: () => { return; } }
            ]
        })
    };

    return (
        <>
            <Navbar title="Nouveau groupe" />
            <div className="create-group-page">
                <GroupForm method="post" />
            </div>
            <div className="create-group-footer">
                <GlassButton onClick={cancel} text="Annuler" />
                <GlassButton form='group-form' type="submit" text="Ajouter" />
            </div>
        </>
    )
}

export default CreateGroup