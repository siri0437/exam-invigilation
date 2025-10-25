import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/login">Login</Link>
      {token && (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
