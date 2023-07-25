import './index.css';

import { useNavigate, useParams } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

import Navbar from '../../components/Navbar';
import GlassButton from '../../components/GlassButton';
import UserForm from '../../components/UserForm';
import { useEffect } from 'react';

const UpdateUser = () => {

    const navigate = useNavigate();
    const { user_id } = useParams();
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
                { label: 'Oui', onClick: () => { navigate(`/user/${user_id}`); } },
                { label: 'Non', onClick: () => { return; } }
            ]
        })
    }

    return (
        <>
        <Navbar title="Modifier le professeur" />
        <div className="update-user-page">
            <UserForm method="put" userId={user_id} />
        </div>
        <div className="update-user-footer">
            <GlassButton onClick={cancel} text="Annuler" />
            <GlassButton form='user-form' type="submit" text="Modifier" />
        </div>
    </>
    )
}

export default UpdateUser