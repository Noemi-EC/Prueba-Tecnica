const express = require('express');
const router = express.Router();
const usuarioController = require('./usuario.controller');

router.get('/usuarios', usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioId);
router.post('/usuarios', usuarioController.crearUsuario);
router.put('/usuarios/:id', usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', usuarioController.eliminarUsuario.bind(usuarioController));

// siempre se debe exportar un router de Express.
// Un router permite agrupar las rutas de manera modular,
// y es lo que necesitas pasar a app.use() para que funcione correctamente
module.exports = router;