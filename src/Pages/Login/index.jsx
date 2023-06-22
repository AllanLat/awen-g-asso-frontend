import './index.css';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        // transform data to json
        const body = JSON.stringify(data);
        try {
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            })
            const result = await response.json();
            if (response.status === 200) {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('token', result.token);
                sessionStorage.setItem('userId', parseInt(result.userId));
                sessionStorage.setItem('associationId', result.associationId);
                sessionStorage.setItem('userLvl', parseInt(result.userLvl));
                navigate('/home');
            }

            if (response.status === 401) {
                alert('Identifiant ou mot de passe incorrect');
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="login-page">
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Connectez-vous</h1>
                <Input value='login' text='Login' type='text' register={register} />
                <Input value='password' text='Mot de passe' type='password' required register={register} />
                <FormButton type='submit' text='Se connecter' />
            </form>
        </div>

    )
}

export default Login;
