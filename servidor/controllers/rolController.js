//const Rol = require("../models/Rol");
const { pool } = require('../config/db');

exports.obtenerRoles = async (req, res) => {
    try {
      const query = 'SELECT * FROM Rol';
      
      const connection = await (await pool).getConnection();
      const roles = await connection.query(query);

      res.json(roles);
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error!!! :(');
    }
  };
  



