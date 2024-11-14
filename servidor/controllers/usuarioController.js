const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../controllers/helpers/jwt');
const jwt = require('jsonwebtoken');
const {enviarCodigoVerificacion, envioToken} = require('../servicios/email');


const generarCodigoVerificacion = () => {
  // Genera un código alfanumérico aleatorio de longitud específica
  const longitudCodigo = 6; // Puedes ajustar la longitud según tus necesidades
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';
  for (let i = 0; i < longitudCodigo; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
};

const generarToken = () => {
  // Genera un código alfanumérico aleatorio de longitud específica
  const longitudCodigo = 12; // Puedes ajustar la longitud según tus necesidades
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo = '';
  for (let i = 0; i < longitudCodigo; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
};

/*---------------------------------------------*/ 
exports.generarYEnviarCodigo = async (req, res) => {
  try {
    const { email } = req.body;
    const codigoVerificacion = generarCodigoVerificacion();
    
    enviarCodigoVerificacion(email, codigoVerificacion);

    res.json(codigoVerificacion);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al generar y enviar el código de verificación');
  }
};

/**------------USUARIO Token--------------- */
exports.nuevC = async (req, res) => {
  try {
    const { email } = req.body;
    const codigoToken = generarToken();
    
    envioToken(email, codigoToken);

    res.json(codigoToken);


  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al generar y enviar el código de verificación');
  }
};

exports.actualizarContra = async (req, res) => {
  console.log('si entro al metodo')
  
  try {
    const { email, contrasena } = req.body;
    const salt = bcrypt.genSaltSync();
    const contrasenaEncriptada = bcrypt.hashSync(contrasena, salt);
    console.log(contrasenaEncriptada,email)
    
    const queryUpdate = 'UPDATE Usuario SET contrasena = ? WHERE email = ?';


    const connection = await (await pool).getConnection();
    await connection.query(queryUpdate, [contrasenaEncriptada, email]);
    const result = await connection.query(queryUpdate, [contrasenaEncriptada, email]);
    connection.release();
    console.log(contrasenaEncriptada,email)
    res.json({ msg: 'Contraseña actualizada exitosamente' });
    console.log('Si paso')
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar la contraseña');
  }
};


exports.crearUsuario = async (req, res) => {
  try {
    const { nombreUsuario, email, contrasena } = req.body;
    const rol = "Usuario";

    const salt = bcrypt.genSaltSync();
    const contrasenaEncriptada = bcrypt.hashSync(contrasena, salt);

    const query = `
        INSERT INTO Usuario (nombreUsuario, email, contrasena, rol)
        VALUES (?, ?, ?, ?)
    `;

    const connection = await (await pool).getConnection();
    const result = await connection.query(query, [nombreUsuario, email, contrasenaEncriptada, rol]);
    connection.release();

    res.json({ msg: 'Usuario creado exitosamente' });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.obtenerUsuario = async (req, res) => {
  try {
    const query = 'SELECT * FROM Usuario WHERE id = ?';
    const connection = await (await pool).getConnection();
    const usuario = await connection.query(query, [req.params.id]);
    connection.release();

    if (!usuario[0]) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    res.json(usuario[0]);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.login = async (req, res) => {
  const { email, contrasena } = req.body;
  try {
    const query = 'SELECT * FROM Usuario WHERE email = ?';
    const connection = await (await pool).getConnection();
    const usuario = await connection.query(query, [email]);

    
    connection.release();

    if (!usuario[0]) {
      return res.status(400).json({
        ok: false,
        msg: 'El email no existe'
      });
    }

    const validPassword = bcrypt.compareSync(contrasena, usuario[0].contrasena);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      });
    }

    const token = await generarJWT(usuario[0].id, usuario[0].nombreUsuario);

    console.log(usuario);

    res.json({
      ok: true,
      id: usuario[0].id,
      rol: usuario[0].rol,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hubo un problema',
      error
    });
  }
};

exports.loginWithGoogle = async (req, res) => {
  const { email, username } = req.body;
  try {

    const token = await generarJWT(email, username);


    res.json({
      ok: true,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hubo un problema',
      error
    });
  }
};


exports.verifyToken = function(req, res, next) {
  // Verificar si el token JWT está presente en la solicitud
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token no proporcionado.' });
  }

  // Verificar la validez del token JWT
  jwt.verify(token, process.env.SECRET_JWT, function(err, decoded) {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Error al autenticar el token.' });
    }

    // Si el token JWT es válido, almacenar el nombre de usuario en la solicitud para su posterior uso
    req.nomUsuario = decoded.nomUsuario;
    next();
  });
};


