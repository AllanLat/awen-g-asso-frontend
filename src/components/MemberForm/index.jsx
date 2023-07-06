import './index.css';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Input from '../Input';

const MemberForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const [photoName, setPhotoName] = useState('');
    const [photoBlob, setPhotoBlob] = useState(null);

    const onSubmit = (data) => {
        console.log(data)
    }

    const handlePhotoName = (e) => {
        setPhotoName(e.target.files[0].name);

        try {
            const fr = new FileReader();
            const file = e.target.files[0];
            fr.readAsDataURL(file);
            fr.onloadend = () => {
                setPhotoBlob(fr.result);
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log(photoBlob)
        }
        
    }

    return (
        <form className='member-form' action="" onSubmit={handleSubmit(onSubmit)} >
            <Input value='lastname' text='Nom' type='text' required register={register} />
            <Input value='firstname' text='Prénom' type='text' required register={register} />
            <Input value='birthday' text='Né(e) le' type='date' required register={register} />
            <Input value='birthplace' text='Lieu de naissance' type='text' required register={register} />
            <Input value='photo' text={photoName === '' ? 'Ajouter une photo' : photoName}  onChange={handlePhotoName}  type='file' register={register} />
            <button type='submit'>ajouter</button>
        </form>
    )
}

export default MemberForm