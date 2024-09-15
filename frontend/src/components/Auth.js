// frontend/src/components/Auth.js
import React, { useState } from 'react';
import api from '../api/axios';

function Auth({ setIsAuthenticated }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setCredentials({ username: '', email: '', password: '' });
  };

const handleChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
};
    


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegisterMode ? 'auth/register' : 'auth/login';
      const { data } = await api.post(endpoint, credentials);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
      } else {
        alert(data.message || 'Registration successful!');
        toggleMode();
      }
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegisterMode && (
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isRegisterMode ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={toggleMode} className="toggle-button">
        {isRegisterMode ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
}

export default Auth;
