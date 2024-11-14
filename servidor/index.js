const express = require('express');
const { conectarDB } = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();
app.use(cors());
app.use(express.json());

const usuarioRoutes = require('./routes/usuario');
app.use('/api/Usuario', usuarioRoutes);

const libroRoutes = require('./routes/libro');
app.use('/api/Libro', libroRoutes);

const rolRoutes = require('./routes/rol');
app.use('/api/Rol', rolRoutes);

const prestamoRoutes = require('./routes/prestamo');
app.use('/api/Prestamo', prestamoRoutes);

app.listen(3000, () => {
    console.log('El servidor está corriendo perfectamente!!!');
});