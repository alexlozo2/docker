const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//api rutas
router.post('/',usuarioController.crearUsuario);
router.post('/generarCodico', usuarioController.generarYEnviarCodigo)
router.post('/login', usuarioController.login);
router.post('/loginWithGoogle', usuarioController.loginWithGoogle);
router.get('/:id',  usuarioController.obtenerUsuario);
router.post('/nuevaContra', usuarioController.nuevC)
router.put('/cambioC', usuarioController.actualizarContra)


module.exports = router;