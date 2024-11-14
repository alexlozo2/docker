const { pool } = require('../config/db');

exports.crearLibro = async (req, res) => {
  try {
    const { nombreAutor, titulo, editorial, categoria, anioPublicacion, disponibilidad, img } = req.body;

    const query = `
        INSERT INTO Libro (nombreAutor, titulo, editorial, categoria, anioPublicacion, disponibilidad, img)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const connection = await (await pool).getConnection();
    await connection.query(query, [nombreAutor, titulo, editorial, categoria, anioPublicacion, disponibilidad, img]);
    connection.release();

    res.json({ msg: 'Libro creado exitosamente' });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.obtenerLibros = async (req, res) => {
  try {
    const query = 'SELECT * FROM Libro';
    const connection = await (await pool).getConnection();
    const libros = await connection.query(query);
    connection.release();

    console.log(libros);

    res.json(libros);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};


exports.obtenerLibrosSinToken = async (req, res) => {
  try {
    const query = 'SELECT * FROM Libro';
    const connection = await (await pool).getConnection();
    const libros = await connection.query(query);
    connection.release();

    console.log(libros);

    res.json(libros);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};


exports.obtenerLibro = async (req, res) => {
  try {
    const query = 'SELECT * FROM Libro WHERE id = ?';
    const connection = await (await pool).getConnection();
    const libro = await connection.query(query, [req.params.id]);
    connection.release();

    if (!libro[0]) {
      return res.status(404).json({ msg: 'El libro no existe' });
    }

    res.json(libro[0]);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.eliminarLibro = async (req, res) => {
  try {
    const query = 'DELETE FROM Libro WHERE id = ?';
    const connection = await (await pool).getConnection();
    const result = await connection.query(query, [req.params.id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'El libro no existe' });
    }

    res.json({ msg: 'Libro eliminado' });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

exports.actualizarLibro = async (req, res) => {
  try {
    const { nombreAutor, titulo, editorial, categoria, anioPublicacion, disponibilidad, img } = req.body;

    const query = `
        UPDATE Libro
        SET nombreAutor = ?, titulo = ?, editorial = ?, categoria = ?, anioPublicacion = ?, disponibilidad = ?, img = ?
        WHERE id = ?
    `;

    const connection = await (await pool).getConnection();
    const result = await connection.query(query, [nombreAutor, titulo, editorial, categoria, anioPublicacion, disponibilidad, img, req.params.id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'El libro no existe' });
    }

    res.json({ msg: 'Libro actualizado' });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};
