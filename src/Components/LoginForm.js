import React, { useState } from 'react';
import axios from 'axios';   // axios package it will handel the HTTP request and response 

const  LoginForm = () => {
  const [formData, setFormData] = useState({
    loginName: '',
    loginPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setSubmitting(true);

    try {
      // Send the form data to the server
      const response = await axios.post('http://localhost:5000/insert0001', formData);

      console.log(response.data);
      setError('');
      alert('Login successfully.');
    } catch (error) {
      console.error(error);
      setError('Internal Server Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="loginName" // Make sure the name matches the key in formData
            value={formData.loginName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="loginPassword" // Make sure the name matches the key in formData
            value={formData.loginPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;