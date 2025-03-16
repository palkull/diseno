// client/src/components/LayoutWithNavbar.jsx
import React from 'react';
import Navbar from './Navbar';
import { NavLink, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapeo de nombres de rutas en inglés a español
  const breadcrumbNames = {
    university: "Universidad",
    jobs: "Oferta de trabajo",
    chat: "Mensajería",
    calendar: "Calendario",
  };

  return (
    <nav
      style={{
        backgroundColor: '#f8f9fa',
        padding: '8px 16px',
        borderRadius: '4px',
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '14px',
        color: '#495057',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <NavLink
        to="/university"
        style={{
          textDecoration: 'none',
          color: '#007bff',
          marginRight: '8px',
          fontWeight: '500',
        }}
      >
        Home
      </NavLink>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const displayName = breadcrumbNames[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <React.Fragment key={to}>
            <span style={{ margin: '0 4px' }}>{'>'}</span>
            <NavLink
              to={to}
              style={{
                textDecoration: 'none',
                color: '#007bff',
                marginRight: '8px',
                fontWeight: '500',
              }}
            >
              {displayName}
            </NavLink>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

function LayoutWithNavbar({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ marginLeft: '250px', padding: '1rem' }}>
        <Breadcrumbs />
        {children}
      </div>
    </>
  );
}

export default LayoutWithNavbar;
