// LoginLogout.js

import React, { useState } from 'react';
import './LoginLogout.css';

function LoginLogout() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    setMessage(data.message);
    if (data.success) {
      setLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    const response = await fetch('http://localhost:5000/api/logout', {
      method: 'POST'
    });
    const data = await response.json();
    setMessage(data.message);
    if (data.success) {
      setLoggedIn(false);
    }
  };

  return (
    <div className="container">
      <h1>Login/Logout Example</h1>
      <div className="form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {!loggedIn ? (
          <button className="login-button" onClick={handleLogin}>Login</button>
        ) : (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        )}
      </div>
      {message && (
        <div className={`alert ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default LoginLogout;
