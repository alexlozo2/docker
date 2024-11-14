const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamoController');

//api rutas
router.post('/',prestamoController.crearPrestamo);
router.get('/',  prestamoController.obtenerPrestamos);
router.get('/usuarioL', prestamoController.prestamosUsuario);
router.get('/listaPres', prestamoController.listaPrestamos);
// router.post('/generarCodico', usuarioController.generarYEnviarCodigo)
// router.post('/login', usuarioController.login);
// router.post('/loginWithGoogle', usuarioController.loginWithGoogle);
// router.get('/:id',  usuarioController.obtenerUsuario);
// router.post('/nuevaContra', usuarioController.nuevC)
// router.put('/cambioC', usuarioController.actualizarContra)


module.exports = router;