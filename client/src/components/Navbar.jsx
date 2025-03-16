import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import icono from '../assets/Logo.jpeg';

import { FaUniversity, FaBriefcase, FaComments, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="logo">
          <img src={icono} alt="Logo" className="navbar-logo" />
        </div>
      </div>

      <div className="navbar-middle">
        <ul className="nav-links">
          <li>
            <Link to="/university">
              <FaUniversity className="nav-icon" />
              Universidad
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <FaBriefcase className="nav-icon" />
              Ofertas de Trabajo
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <FaComments className="nav-icon" />
              Mensajería
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <FaCalendarAlt className="nav-icon" />
              Calendario
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-bottom">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="nav-icon" />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
