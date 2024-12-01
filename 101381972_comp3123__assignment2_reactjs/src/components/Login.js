import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Login Data:', { email, password });

    try {
        const response = await api.post('/login', { email, password });
        console.log('Response from backend:', response.data);
    
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          alert('Login successful!');
          navigate('./employees');
        } else {
          alert('Login failed: Token not received.');
        }
      } catch (error) {
        console.log('Error response:', error.response || error.message);

        if (error.response) {
          alert(`Error: ${error.response.data.message || 'Login failed'}`);
        } else if (error.request) {
          alert('Error: No response from the server.');
        } else {
          alert(`Error: ${error.message}`);
        }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;