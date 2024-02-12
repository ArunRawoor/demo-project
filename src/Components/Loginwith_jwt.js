import React, { useState } from 'react';
import axios from 'axios';

const Loginwith_jwt = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const register = async () => {
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setToken(response.data.token);
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
    return (
        <div>
            <h1>MERN JWT Authentication</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={profile}>Profile</button>
        </div>
    )
}

export default Loginwith_jwt
