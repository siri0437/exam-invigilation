import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={toggleTheme}>Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme</button>
      <Dashboard />
    </div>
  );
};

export default Settings;
