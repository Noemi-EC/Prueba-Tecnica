const express = require('express');
const router = express.Router();
const tareaController = require('./tarea.controller');

router.get('/tareas', tareaController.obtenerTareas);
router.post('/tareas', tareaController.crearTarea);
router.get('/tareas/:id', tareaController.obtenerTareaId);
router.put('/tareas/:id', tareaController.actualizarTarea);
router.delete('/tareas/:id', tareaController.eliminarTarea.bind(tareaController));

module.exports = router;