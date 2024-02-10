// FrontendComponent.js

import React, { useState } from 'react';

function Cookiees() {
  const [message, setMessage] = useState('');

  // Function to set the cookie by making a request to the backend
  const setCookie = () => {
    fetch('http://localhost:3000/api/set-cookie')
      .then(response => response.text())
      .then(data => setMessage(data)); // Update message state with response
  };

  // Function to get the cookie value by making a request to the backend
  const getCookie = () => {
    fetch('http://localhost:3000/api/get-cookie')
      .then(response => response.text())
      .then(data => setMessage(data)); // Update message state with response
  };

  return (
    <div>
      <h1>MERN Stack Cookies Example</h1>
      <button onClick={setCookie}>Set Cookie</button>
      <button onClick={getCookie}>Get Cookie</button>
      <p>{message}</p> {/* Display the response message */}
    </div>
  );
}

export default Cookiees;
