import './index.css';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { createMember, getMemberById, updateMember } from '../../api/members';

import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'
import SignatureComponent from './signature';

import Input from '../Input';



const MemberForm = ({ method, memberId }) => {
    const token = sessionStorage.getItem('token');
    const { register, handleSubmit, setValue } = useForm();

    const cotisations = [
        {name: "Babydo", price: "161"}, 
        {name: "Judo / Cross training", price: "181"},
        {name: "Taïso", price: "141"}
    ]

    const navigate = useNavigate();

    const [photoName, setPhotoName] = useState('');
    const [image_rights_signatureName, setImage_rights_signatureName] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        if (method === 'post') {
            return
        }
        const fetchMemberData = async () => {
            try {
                const memberData = await getMemberById(token, memberId);

                setValue('lastname', memberData.lastname);
                setValue('firstname', memberData.firstname);
                setValue('birthday', formatDate(memberData.member_detail.birthday));
                setValue('birthplace', memberData.member_detail.birthplace);

                setValue('living_with', memberData.member_detail.living_with);
                setValue('street', memberData.address.street);
                setValue('postal_code', memberData.address.postal_code);
                setValue('city', memberData.address.city);

                setValue('mail', memberData.member_detail.mail);
                setValue('phone_number', memberData.member_detail.phone_number);
                setValue('emergency_number', memberData.member_detail.emergency_number);
                setValue('subscription', memberData.subscription);

                setValue('contraindication', memberData.member_detail.contraindication);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMemberData();
    }, [method, memberId, token, setValue]);

    // on utilise la fonction getMemberById pour récupérer le membre si on est en update pour afficher les données



    const onSubmit = (data) => {
        confirmAlert({
            message: 'Voulez-vous vraiment soumettre ce formulaire ?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: 'Oui', onClick: () => {
                        // on construit ici la data simple pour créer un nouveau membre

                        // Reduction si checkbox coché
                        if (data.reduction === true) {
                            data.subscription -= 10;
                        }




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
                            "subscription": data.subscription,
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
                        if (method === 'put') {
                            updateMember(token, memberId, newMember)
                                .then(() => {
                                    navigate('/member/' + memberId);
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
            <h2>{method === 'post' ? 'Ajouter un membre' : 'Modifier un membre'}</h2>
            <Input value='lastname' text='Nom' type='text' required register={register} />
            <Input value='firstname' text='Prénom' type='text' required register={register} />
            <Input value='birthday' text='Né(e) le' type='date' required register={register} />
            <Input value='birthplace' text='Lieu de naissance' type='text' required register={register} />
            <Input value='photo' text={photoName === '' ? method === 'post' ? 'Ajouter une photo' : 'Modifier la photo' : photoName} onChange={handlePhotoName} type='file' register={register} />
            <h2>Adresse :</h2>
            <Input value='living_with' text='Vit chez (facultatif)' type='text' placeholder='ex : sa mère' register={register} />
            <Input value='street' text='Numéro et nom de la rue' type='text' required register={register} />
            <Input value='postal_code' text='Code postal' type='text' required register={register} />
            <Input value='city' text='Ville' type='text' required register={register} />
            <h2>Contacts :</h2>
            <Input value='mail' text='Adresse mail' type='email' required register={register} />
            <Input value='phone_number' text='N° de téléphone' type='tel' required register={register} />
            <Input value='emergency_number' text="Numéro en cas d'urgence" type='tel' required register={register} />
            <h2>Informations :</h2>
            <Input value='image_rights_signature' text={image_rights_signatureName === '' ? method === 'post' ? "Ajouter autorisation signée de droit à l'image" : "Modifier l'autorisation signée de droit à l'image" : image_rights_signatureName} onChange={handleImage_rights_signatureName} type='file' register={register} />
            <Input value='contraindication' text='Contraintes médicales (laisser vide si aucune)' type='text' register={register} />

            <div className='subscription'>
                <label htmlFor="subscription"><h2>Choix de la cotisation :</h2></label>
                <select {...register('subscription')} required>
                    {cotisations.map((cotisation) => (
                        <option key={cotisation.name} value={cotisation.price}>{cotisation.name + ' - ' + cotisation.price + '€'}</option>
                    ))}
                </select>
            </div>

            <Input value='reduction' text='Réduction 10€' type='checkbox' register={register} />

            <br />

            <h2>Signature </h2>
            {/* <SignatureComponent /> */}

            <h2>Choix du Groupe</h2>
            {/** Ajouter un fetch et un select */}




        </form>
    )
}

export default MemberForm