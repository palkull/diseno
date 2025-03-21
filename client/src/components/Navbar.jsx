import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import icono from '../assets/Logo.jpeg';

import { FaUniversity, FaBriefcase, FaComments, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  useEffect(() => {
      // Cargar el script de Google Analytics
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-E50NMJBKY5";
      document.head.appendChild(script);
  
      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-E50NMJBKY5');
      `;
      document.head.appendChild(script2);
    }, []);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    if (user) {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="logo">
          <img src={icono} alt="Logo" className="navbar-logo" />
        </div>
        {user && <p className="user-name"><p>Sesión iniciada con:</p>{user.nombre}</p>}
      </div>

      <div className="navbar-middle">
        <ul className="nav-links">
          <li>
            <Link to="/university" className="nav-item">
              <FaUniversity className="nav-icon" />
              Universidad
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-item">
              <FaBriefcase className="nav-icon" />
              Ofertas de Trabajo
            </Link>
          </li>
          <li>
            <Link to="/chat" className="nav-item">
              <FaComments className="nav-icon" />
              Mensajería
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="nav-item">
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
