const db = require('../../config/database').default;

const tareaService = {
  // Obtener todas las tareas
  async obtenerTareas () {
    // db.promise() <- soporte de Promises, +.query() <- consulta devuelve un promise
    return db.promise().query('SELECT * FROM tarea')
    .then(([results, fields]) => {
        // la promise que devuelve query() proporciona una rreglo con dos elementos
        // results: array de registros de tabla
        // fields: información sobre las columnas de la tabla
        // console.log(results);
        return results;
    })
    .catch(error => {
        console.error(error);
        throw error; // Lanzamos el error para manejarlo en el controlador
    });
  },

  // Obtener tarea específica
  async obtenerTareaId(idTarea) {
    return db.promise().query('SELECT * FROM tarea WHERE id = ?', [idTarea])
      .then(([result, fields]) => {
        if(result.length > 0) {
          return result[0];
        } else {
          throw new Error('Tarea no encontrada');
        }
      })
      .catch(error => {
        console.error('Error al obtener tarea por ID', error);
        throw error;
      })
  },

  // Crear tarea
  async crearTarea(datosTarea) {
    const { estado, descripcion } = datosTarea; // Sintaxis de desestructuración. Extraer los datos de la tarea
    
    return db.promise().query('INSERT INTO tarea (estado, descripcion) VALUES (?, ?)', [estado, descripcion])
      .then(([result]) => {
        return {
          id: result.insertId,
          estado: estado,
          descripcion: descripcion
        };
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  },

  // Actualizar tarea
  // Permitir como mínimo un dato actualizado
  async actualizarTarea(datosTarea) {
    const { id } = datosTarea;
  
    try {
      // Obtener los datos actuales
      const tareaActual = await this.obtenerTareaId(id);
      
      // Ningún dato vacío
      const estado = datosTarea.estado !== undefined ? datosTarea.estado : tareaActual.estado;
      const descripcion = datosTarea.descripcion !== undefined ? datosTarea.descripcion : tareaActual.descripcion;
  
      // Actualizar solo los datos combinados
      const [result] = await db.promise().query(
        'UPDATE tarea SET estado = ?, descripcion = ? WHERE id = ?',
        [estado, descripcion, id]
      );
  
      if (result.affectedRows === 0) throw new Error('No se pudo actualizar la tarea');
  
      return { id, estado, descripcion }; // Devolver los datos actualizados
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      throw error;
    }
  },  

  // Eliminar tarea
  async eliminarTarea(idTarea) {
    try {
      // Intentar eliminar la tarea por su ID
      const [result] = await db.promise().query('DELETE FROM tarea WHERE id = ?', [idTarea]);
  
      // Verificar si se eliminó alguna fila
      if (result.affectedRows === 0) {
        throw new Error('Tarea no encontrada'); // Lanza un error si no se encontró la tarea
      }
      return { message: `Tarea con id ${idTarea} eliminada exitosamente` };
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      throw error; // Pasar el error al controlador para manejarlo
    }
  }
  
}


module.exports = tareaService;