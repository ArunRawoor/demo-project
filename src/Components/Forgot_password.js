import React, { useState } from 'react';
import axios from 'axios';

const Forgot_password = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    const register = async () => {
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            alert('Registration successful');
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setToken(response.data.token);
            alert('Login successful')
            console.log('Login successful');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    const profile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Profile fetch failed:', error.message);
        }
    };

    const forgotPassword = async () => {
        try {
            await axios.post('http://localhost:5000/forgot-password', { email });
            setResetSuccess(true);
        } catch (error) {
            console.error('Forgot password request failed:', error.message);
        }
    };

    const resetPassword = async () => {
        try {
            await axios.post('http://localhost:5000/reset-password', { email, token: resetToken, newPassword });
            setResetSuccess(true);
        } catch (error) {
            console.error('Password reset failed:', error.message);
        }
    };

    return (
        <div>
            <h1>MERN JWT Authentication</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={profile}>Profile</button>
            
            <div>
                <h2>Forgot Password</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {resetSuccess ? <p>Password reset instructions sent to your email</p> : <button onClick={forgotPassword}>Forgot Password</button>}
            </div>

            <div>
                <h2>Reset Password</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Reset Token" value={resetToken} onChange={(e) => setResetToken(e.target.value)} />
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                {resetSuccess ? <p>Password reset successful</p> : <button onClick={resetPassword}>Reset Password</button>}
            </div>
        </div>
    )
}

export default Forgot_password;

