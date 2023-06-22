import './index.css';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import { useNavigate } from 'react-router-dom';
import login from '../../api/login';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        login(data, navigate);
        reset();
    }

    return (

        <div className="login-page">
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Connectez-vous</h1>
                <Input value='login' text='Login' type='text' required register={register} />
                <Input value='password' text='Mot de passe' type='password' required register={register} />
                <FormButton type='submit' text='Se connecter' />
            </form>
        </div>

    )
}

export default Login;
