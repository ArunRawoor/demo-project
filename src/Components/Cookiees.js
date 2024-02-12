// // FrontendComponent.js  this one is old login code 

// import React, { useState } from 'react';

// function Cookiees() {
//   const [message, setMessage] = useState('');

//   // Function to set the cookie by making a request to the backend
//   const setCookie = () => {
//     fetch('http://localhost:3000/api/set-cookie')
//       .then(response => response.text())
//       .then(data => setMessage(data)); // Update message state with response
//   };

//   // Function to get the cookie value by making a request to the backend
//   const getCookie = () => {
//     fetch('http://localhost:3000/api/get-cookie')
//       .then(response => response.text())
//       .then(data => setMessage(data)); // Update message state with response
//   };

//   return (
//     <div>
//       <h1>MERN Stack Cookies Example</h1>
//       <button onClick={setCookie}>Set Cookie</button>
//       <button onClick={getCookie}>Get Cookie</button>
//       <p>{message}</p> {/* Display the response message */}
//     </div>
//   );
// }

// export default Cookiees;




// FrontendComponent.js

import React, { useState } from 'react';

function Cookiees() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => setMessage(data.message)); // Update message state with response
  };

  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => setMessage(data.message)); // Update message state with response
  };

  const handleRegister = () => {
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => setMessage(data.message)); // Update message state with response
  };

  return (
    <div>
      <h1>MERN Stack User Authentication Example</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p> {/* Display the response message */}
    </div>
  );
}

export default Cookiees;

