import './index.css';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createMember } from '../../api/members';

import Input from '../Input';
import FormButton from '../FormButton';

const token = sessionStorage.getItem('token');

const MemberForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const [photoName, setPhotoName] = useState('');
    const [photoBlob, setPhotoBlob] = useState(null);
    const [image_rights_signatureName, setImage_rights_signatureName] = useState('');
    const [image_rights_signatureBlob, setImage_rights_signatureBlob] = useState(null);

    const onSubmit = (data) => {
        if (data.contraindication === "" ) {data.contraindication = null;}
        data.photo = photoBlob;
        data.image_rights_signature = image_rights_signatureBlob;
        console.log(token, data)
        /* createMember(token, data); */
    }

    const handlePhotoName = (e) => {
        e.target.files[0].name && setPhotoName(e.target.files[0].name);
        try {
            const fr = new FileReader();
            const file = e.target.files[0];
            fr.readAsArrayBuffer(file);
            fr.onloadend = () => {
                setPhotoBlob(fr.result);
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const handleImage_rights_signatureName = (e) => {
        e.target.files[0].name && setImage_rights_signatureName(e.target.files[0].name);
        try {
            const fr = new FileReader();
            const file = e.target.files[0];
            fr.readAsArrayBuffer(file);
            fr.onloadend = () => {
                setImage_rights_signatureBlob(fr.result);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='member-form' action="" onSubmit={handleSubmit(onSubmit)} >
            <h2>Ajouter un adhérent</h2>
            <Input value='lastname' text='Nom' type='text' required register={register} />
            <Input value='firstname' text='Prénom' type='text' required register={register} />
            <Input value='birthday' text='Né(e) le' type='date' required register={register} />
            <Input value='birthplace' text='Lieu de naissance' type='text' required register={register} />
            <Input value='photo' text={photoName === '' ? 'Ajouter une photo' : photoName}  onChange={handlePhotoName}  type='file' register={register} />
            <h2>Adresse :</h2>
            <Input value='livingwith' text='Vit chez (facultatif)' type='text' placeholder='ex : sa mère' register={register} />
            <Input value='street' text='Numéro et nom de la rue' type='text' required register={register} />
            <Input value='postal_code' text='Code postal' type='text' required register={register} />
            <Input value='city' text='Ville' type='text' required register={register} />
            <h2>Contacts :</h2>
            <Input value='mail' text='Adresse mail' type='email' required register={register} />
            <Input value='phone_number' text='N° de téléphone' type='number' required register={register} />
            <Input value='emergency_number' text="Numéro en cas d'urgence" type='number' required register={register} />
            <h2>Informations :</h2>
            <Input value='image_rights_signature' text={image_rights_signatureName === '' ? "Ajouter autorisation signée de droit à l'image" : image_rights_signatureName}  onChange={handleImage_rights_signatureName}  type='file' register={register} />
            <Input value='contraindication' text='Contraintes médicales (laisser vide si aucune)' type='text' register={register} />
            <FormButton type='submit' text='Valider' />
        </form>
    )
}

export default MemberForm