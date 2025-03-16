import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setMessage("Por favor, completa el captcha.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, captcha: captchaValue }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/university');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Ocurrió un error al iniciar sesión.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <label>
            Correo:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {/* Contenedor del Captcha centrado */}
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6LeW0fAqAAAAAKhW6gWux26t_euhE_Qg3VP4NVBv" // Reemplaza con tu clave de sitio de Google reCAPTCHA
              onChange={handleCaptchaChange}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        {message && <p className="error-msg">{message}</p>}

        <div className="auth-link">
          <p>¿No tienes una cuenta?</p>
          <button type="button" onClick={goToRegister}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
