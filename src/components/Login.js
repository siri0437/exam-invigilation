import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import Dashboard from './Dashboard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({ email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data));
      setIsLoggedIn(true);
      alert('Login successful!');
      window.location.href = '/profile';
    } else {
      alert(data.message || 'Login failed!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
      <Dashboard />
    </div>
  );
};

export default Login;
