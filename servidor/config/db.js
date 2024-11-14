const mysql = require('promise-mysql');
require('dotenv').config({ path: 'variables.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database: process.env.DB_NAME,
    connectionLimit: 10

});

const conectarDB = async () => {
    try {
        const connection = await (await pool).getConnection(); 
        console.log('Conexión exitosa a la base de datos MySQL');
        return connection; // Devuelve la conexión para que pueda ser liberada más adelante
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = { conectarDB, pool };
