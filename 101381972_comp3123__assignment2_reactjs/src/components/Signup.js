import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Signup.css'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/signup', { username, email, password });

        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          alert('Registration successful!');
          navigate('/employees');
        } else {
          alert('Registration successful, but token was not received.');
          navigate('/');
        }
      } catch (error) {
        alert(`Error: ${error.response?.data?.message || 'Registration failed'}`);
      }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSignup} className='signup-form'>
      <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="register-button">Register</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default Signup;