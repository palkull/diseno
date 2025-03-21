import React, { useEffect } from 'react';
import calendarImg from '../assets/calendar.png'; // Ruta a tu imagen
import '../styles/Calendar.css';

function Calendar() {
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

  return (
    <div className="calendar-page">
      <h1>Calendario 2025-2026</h1>
      <img src={calendarImg} alt="Calendario Académico" className="calendar-image" />
      <p>Consulta fechas importantes: inscripciones, exámenes, etc.</p>
    </div>
  );
}

export default Calendar;
