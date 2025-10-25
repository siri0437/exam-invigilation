import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <Dashboard />
    </div>
  );
};

export default Admin;
