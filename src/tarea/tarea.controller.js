const tareaService = require('./tarea.service');

class TareaController {
  // Obtener clientes
  async obtenerTareas(req, res) {
    try {
      const tareas = await tareaService.obtenerTareas();
      // Lo siguiente devuelve un json con las claves y valores de success, message y result
      // res.json({
      //   success: true, 
      //   message: 'Tareas obtenidas exitosamente',
      //   result: tareas
      // });
      res.json(tareas);
    } catch(error) {
      console.error("Error al obtener tareas", error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener tareas',
        error: error.message
      });
    }
  }

  // Obtener tarea en específico
  async obtenerTareaId (req, res) {
    try{
      const tarea = await tareaService.obtenerTareaId(req.params.id);
      if (tarea) {
        res.status(200).json({
          // success: true,
          // message: 'Tarea encontrada',
          result: tarea
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
      }
    } catch (error) {
      console.error("Error al obtener tarea por ID", error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener tarea por ID',
        error: error.message
      })
    }
  }

  // Crear tarea
  async crearTarea(req, res) {
    try {
      const nuevaTarea = await tareaService.crearTarea(req.body);
      res.status(201).json({
        success: true,
        message: 'Tarea creada exitosamente',
        result: nuevaTarea
      });
    } catch (error) {
      console.error("Error al crear tarea: ", error);
      res.status(500).json({
        success: false,
        message: 'Error al crear tarea',
        error: error.message
      });
    }
  }

  // Actualizar tarea
  async actualizarTarea(req, res) {
    try {
      const tareaActualizada = await tareaService.actualizarTarea({ ...req.body, id: req.params.id });
      res.status(200).json({
        success: true, 
        message: 'Tarea actualizada exitosamente',
        result: tareaActualizada
      });      
    } catch (error) {
      console.log('Error al actualizar tarea', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar tarea',
        error: error.message
      });
    }
  }

  // Eliminar tarea
  async eliminarTarea(req, res) {
    try {
      const { id } = req.params;
      const resultado = await tareaService.eliminarTarea(id);

      res.json({
        success: true,
        message: resultado.message
      });
    } catch (error) {
      console.error("Error al eliminar tarea: ", error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar tarea',
        error: error.message
      });
    }
  }
}

module.exports = new TareaController();