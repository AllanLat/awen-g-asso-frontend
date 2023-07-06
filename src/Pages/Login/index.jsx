import './index.css';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/login';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import Input from '../../components/Input';
import FormButton from '../../components/FormButton';

const Login = () => {

    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        login(data, navigate)
        .finally(() => {
            setLoading(false);
        });
        reset();
    }

    return (
        <div className="login-page">
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Connectez-vous</h1>
                <Input value='login' text='Login' type='text' required register={register} />
                <Input value='password' text='Mot de passe' type='password' required register={register} />
                <FormButton type='submit' text='Se connecter'/>
                {loading && (
                    <div className="loader-container">
                        <ClipLoader color='#fff' loading={loading} size={75} speedMultiplier={0.8}/>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Login;
