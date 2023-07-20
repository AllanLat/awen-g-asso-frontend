import './index.css';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createMember } from '../../api/members';

import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../Pages/CreateMember/customConfirm.css'

import Input from '../Input';
import FormButton from '../FormButton';

const token = sessionStorage.getItem('token');

const MemberForm = ({ method }) => {

    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate();

    const [photoName, setPhotoName] = useState('');
    const [image_rights_signatureName, setImage_rights_signatureName] = useState('');

    const onSubmit = (data) => {
        confirmAlert({
            message: 'Voulez-vous vraiment soumettre ce formulaire ?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: 'Oui', onClick: () => {
                        // on construit ici la data simple pour créer un nouveau membre
                        const newData = {
                            "street": data.street,
                            "postal_code": data.postal_code,
                            "city": data.city,
                            "mail": data.mail,
                            "birthday": data.birthday,
                            "contraindication": data.contraindication,
                            "phone_number": data.phone_number,
                            "emergency_number": data.emergency_number,
                            "birthplace": data.birthplace,
                            "living_with": data.living_with,
                            "firstname": data.firstname,
                            "lastname": data.lastname,
                            "file_status": 0,
                            "payment_status": 0,
                            "certificate": null,
                            "subscription": 0,
                            "paid": 0
                        }


                        // on construit ici les formData pour les fichiers s'ils existent
                        const formData = new FormData();

                        if (data.photo.name) {
                            formData.append('photo', data.photo);
                        }

                        if (data.image_rights_signature.name) {
                            formData.append('image_rights_signature', data.image_rights_signature);
                        }


                        // on transforme la data en JSON
                        const jsonData = JSON.stringify(newData);

                        // on crée un nouveau formData avec le tout
                        const newMember = new FormData();

                        // on ajoute les données JSON au formData
                        newMember.append('data', jsonData);

                        // on ajoute les fichiers au formData
                        formData.forEach((file, index) => {
                            newMember.append(index, file);
                        })
                        if (method === 'post') {
                            createMember(token, newMember)
                                .then((insertId) => {
                                    navigate('/member/' + insertId);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }
                },
                { label: 'Non', onClick: () => { return; } }
            ]
        })


    }

    const handlePhotoName = (e) => {
        e.target.files[0].name && setPhotoName(e.target.files[0].name);
        setValue('photo', e.target.files[0]);
    }

    const handleImage_rights_signatureName = (e) => {
        e.target.files[0].name && setImage_rights_signatureName(e.target.files[0].name);
        setValue('image_rights_signature', e.target.files[0]);
    }

    return (
        <form id='member-form' className='member-form' action="" onSubmit={handleSubmit(onSubmit)} >
            <h2>Ajouter un adhérent</h2>
            <Input value='lastname' text='Nom' type='text' required register={register} />
            <Input value='firstname' text='Prénom' type='text' required register={register} />
            <Input value='birthday' text='Né(e) le' type='date' required register={register} />
            <Input value='birthplace' text='Lieu de naissance' type='text' required register={register} />
            <Input value='photo' text={photoName === '' ? 'Ajouter une photo' : photoName} onChange={handlePhotoName} type='file' register={register} />
            <h2>Adresse :</h2>
            <Input value='living_with' text='Vit chez (facultatif)' type='text' placeholder='ex : sa mère' register={register} />
            <Input value='street' text='Numéro et nom de la rue' type='text' required register={register} />
            <Input value='postal_code' text='Code postal' type='text' required register={register} />
            <Input value='city' text='Ville' type='text' required register={register} />
            <h2>Contacts :</h2>
            <Input value='mail' text='Adresse mail' type='email' required register={register} />
            <Input value='phone_number' text='N° de téléphone' type='number' required register={register} />
            <Input value='emergency_number' text="Numéro en cas d'urgence" type='number' required register={register} />
            <h2>Informations :</h2>
            <Input value='image_rights_signature' text={image_rights_signatureName === '' ? "Ajouter autorisation signée de droit à l'image" : image_rights_signatureName} onChange={handleImage_rights_signatureName} type='file' register={register} />
            <Input value='contraindication' text='Contraintes médicales (laisser vide si aucune)' type='text' register={register} />
            <FormButton type='submit' text='Valider' />
        </form>
    )
}

export default MemberForm