// controllers/login.js
const bcrypt = require('bcryptjs');
const { User } = require('../db');

// controllers/login.js
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca al usuario por correo electrónico
    let user = await User.findOne({ where: { email } });

    // Si no se encuentra al usuario, créalo
    if (!user) {
      user = await User.create({ email, password });
      return res.status(200).json({ success: true, message: 'Registro exitoso' });
    }

    // Verifica la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = {
  login,
};
