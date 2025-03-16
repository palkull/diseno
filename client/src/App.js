// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UniversityServices from './components/UniversityServices';
import JobOffers from './components/JobOffers';
import Chat from './components/Chat';
import Calendar from './components/Calendar';
import LayoutWithNavbar from './components/LayoutWithNavbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública: Login y Registro */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas: se muestran con Navbar */}
        <Route
          path="/university"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <UniversityServices />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <JobOffers />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Chat />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Calendar />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
