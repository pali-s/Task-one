import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useAuth } from '../../context/AuthContext';

interface LoginFormInputs {
    username: string;
    password: string;
}

const Login: React.FC = () => {

    const navigate = useNavigate();
    const {login}=useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        console.log(data);
        login(data.username);
        navigate('/dashboard');
    }

    return (
        <div className='login-container'>
            <h1>Login Page</h1>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input {...register('username', { required: 'Username is required' })} type="text" />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>
                <div>
                    <label>Password:</label>
                    <input {...register('password', { required: 'Password is required' })} type="password" />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <button className='submit' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;