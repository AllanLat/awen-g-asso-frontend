import './index.css';

import { useForm } from 'react-hook-form';

import Input from '../Input';

const MemberForm = () => {
    const { register, handleSubmit, reset } = useForm();
    return (
        <form className='member-form' action="">
           <Input value='lastname' text='Nom' type='text' required register={register} />
           <Input value='firstname' text='Prénom' type='text' required register={register} />
           <Input value='birthday' text='Né(e) le' type='date' required register={register} />
           <Input value='birthplace' text='Lieu de naissance' type='text' required register={register} />
           <Input value='photo' text='Ajouter une photo' type='file' register={register} />
        </form>

    )
}

export default MemberForm