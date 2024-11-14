const { pool } = require('../config/db');
const jwt = require('jsonwebtoken');


exports.crearPrestamo = async (req, res) => {
  try {
    const { emailUser, idLibro, fechaInicio, fechaFin } = req.body;

    console.log(emailUser, idLibro, fechaFin, fechaInicio);

    const query = `
          INSERT INTO Prestamo (emailUser, idLibro, fechaInicio, fechaFin)
          VALUES (?, ?, ?, ?)
      `;

    const connection = await (await pool).getConnection();
    const result = await connection.query(query, [emailUser, idLibro, fechaInicio, fechaFin]);
    connection.release();

    res.json({ msg: 'Prestamo creado exitosamente' });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.obtenerPrestamos = async (req, res) => {
  try {
    const emailUser = req.query.emailUser;



    const query = 'SELECT * FROM Prestamo WHERE emailUser = ?';
    const connection = await (await pool).getConnection();
    const prestamos = await connection.query(query, [emailUser]);
    connection.release();

    console.log(prestamos)

    res.json(prestamos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.prestamosUsuario = async (req, res) => {
  try {
    const emailUser = req.query.emailUser;
    const query = "SELECT l.titulo,l.img ,p.fechaInicio, p.fechaFin FROM Prestamo AS p INNER JOIN Libro AS l ON p.idLibro = l.id Where p.emailUser = ?;";
    const connection = await (await pool).getConnection();
    const prestamos = await connection.query(query, [emailUser]);
    connection.release();

    console.log(emailUser)

    console.log(prestamos)

    res.json(prestamos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}


exports.listaPrestamos = async (req, res) => {
  try {
    const query = "SELECT p.emailUser, l.titulo, p.fechaInicio, p.fechaFin FROM Prestamo AS p INNER JOIN Libro AS l ON p.idLibro = l.id;";
    const connection = await (await pool).getConnection();
    const prestamos = await connection.query(query);
    connection.release();

    console.log(prestamos)

    res.json(prestamos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}
