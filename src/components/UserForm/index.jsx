import './index.css';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { createUser, getUserById, updateUser } from '../../api/users';

import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

import Input from '../Input';

const UserForm = ({ method, userId }) => {
    const token = sessionStorage.getItem('token');
    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        if (method === 'post') {
            return
        }
        const fetchUserData = async () => {
            try {
                const userData = await getUserById(token, userId);

                setValue('lastname', userData.lastname);
                setValue('firstname', userData.firstname);
                setValue('mail', userData.mail);
                setValue('phone_number', userData.phone_number);
                setValue('login', userData.login);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, [method, userId, token, setValue])

    const onSubmit = (data) => {
        confirmAlert({
            message: 'Voulez-vous vraiment soumettre ce formulaire ?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: 'Oui', onClick: () => {
                        const newData = {
                            "firstname": data.firstname,
                            "lastname": data.lastname,
                            "mail": data.mail,
                            "login": data.login,
                            "password": data.password,
                            "phone_number": data.phone_number
                        }
                        
                        if (method === 'post') {
                            createUser(token, newData)
                                .then((insertId) => {
                                    navigate(`/user/${insertId}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                        if (method === 'put') {
                            updateUser(token, userId, newData)
                                .then(() => {
                                    navigate(`/user/${userId}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                    }
                },
                { label: 'Non', onClick: () => { return; } }
            ]
        })
    }


    return (
        <form id='user-form' className='user-form' action="" onSubmit={handleSubmit(onSubmit)}>
            <h2>{method === 'post' ? 'Ajouter un professeur' : 'Modifier un professeur'}</h2>
            <Input value='lastname' text='Nom' type='text' required register={register} />
            <Input value='firstname' text='Prénom' type='text' required register={register} />
            <Input value='mail' text='Adresse mail' type='email' required register={register} />
            <Input value='phone_number' text='N° de téléphone' type='tel' required register={register} />
            <Input value='login' text='Login' type='text' required register={register} />
            <Input value='password' text='Mot de passe' type='password' required register={register} />
        </form>
    )
}

export default UserForm