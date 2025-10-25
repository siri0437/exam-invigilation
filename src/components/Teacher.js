import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Teacher = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Teacher Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <Dashboard />
    </div>
  );
};

export default Teacher;
