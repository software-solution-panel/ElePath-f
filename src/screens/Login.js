import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const success = await authService.login(email, mobile);
        if (success) {
            navigate('/home');
        } else {
            alert("Login failed! Please check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
