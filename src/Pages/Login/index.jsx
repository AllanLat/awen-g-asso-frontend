import './index.css';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // transform data to json
        data = JSON.stringify(data);
        console.log(data);
    }

    return (
        <>
            <h1>Login</h1>
            <div className="login-page">
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <h1>Connectez-vous</h1>
                    <Input value='login' type='text' register={register}/>
                    <Input value='password' type='password' required register={register}/>
                    <button type='submit'>Se connecter</button>
                </form>
            </div>
        </>
    )
}

export default Login;
