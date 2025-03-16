const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserResult = await pool.query(
      'INSERT INTO users (nombre, email, password, last_active) VALUES ($1, $2, $3, NOW()) RETURNING id, nombre, email',
      [nombre, email, hashedPassword]
    );
    const newUser = newUserResult.rows[0];

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, nombre: newUser.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registrando usuario' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = userResult.rows[0];

    if (user.active) {
      return res.status(403).json({ message: 'El usuario ya tiene una sesión iniciada. Cierre sesión antes de volver a ingresar.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await pool.query('UPDATE users SET active = true, last_active = NOW() WHERE id = $1', [user.id]);

    return res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el login' });
  }
};

exports.logout = async (req, res) => {
  const { userId } = req.body;

  try {
    await pool.query('UPDATE users SET active = false WHERE id = $1', [userId]);
    return res.json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};

// Cerrar sesión de usuarios inactivos cada 4 minutos
const cerrarSesionesInactivas = async () => {
    try {
        await pool.query(`
            UPDATE users 
            SET active = false 
            WHERE active = true AND last_active < NOW() - INTERVAL '4 minutes'
        `);
        console.log("Sesiones inactivas cerradas.");
    } catch (error) {
        console.error("Error cerrando sesiones inactivas:", error);
    }
};

// Ejecutar cada 4 minutos
setInterval(cerrarSesionesInactivas, 4 * 60 * 1000);
