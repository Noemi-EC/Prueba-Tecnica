const db = require('../config/database');

const usuarioService = {
  // Obtener todos los usuarios
  async obtenerUsuarios() {
    return db.promise().query('SELECT * FROM usuario')
    .then(([result]) => {
      return result;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
  },

  // Obtener un usuario específico
  async obtenerUsuarioId(idUsuario) {
    return db.promise().query('SELECT * FROM usuario WHERE id = ?', idUsuario)
    .then(([result]) => {
      if(result.length > 0) {
        return result[0]; 
      } else {
        throw new Error('Usuario no encontrado');
      }
    })
    .catch( error => {
      console.error('Error al obtener usuario por ID', error);
      throw error;
    });
  },

  // Crear usuario
  async crearUsuario(datosUsuario) {
    const { nombre, apellido, email, contrasena } = datosUsuario;

    return db.promise().query(
      'INSERT INTO usuario (nombre, apellido, email, contrasena) VALUES(?, ?, ?, ?)',
    [nombre, apellido, email, contrasena])
      .then(([result]) => {
        return {
          id: result.insertId,
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasena: contrasena
        };
      })
      .catch ( error => {
        console.error(error);
        throw error;
      });
  },

  // Actualizar usuario
  async actualizarUsuario(datosUsuario){
    const { id } = datosUsuario;

    try {
      const usuarioActual = await this.obtenerUsuarioId(id);

      const nombre = datosUsuario.nombre !== undefined ? datosUsuario.nombre : usuarioActual.nombre;
      const apellido = datosUsuario.apellido !== undefined ? datosUsuario.apellido : usuarioActual.apellido;
      const email = datosUsuario.email !== undefined ? datosUsuario.email : usuarioActual.email;
      const contrasena = datosUsuario.contrasena !== undefined ? datosUsuario.contrasena : usuarioActual.contrasena;contrasena

      const [result] = await db.promise().query(
        'UPDATE usuario SET nombre = ?, apellido = ?, email = ?, contrasena = ? WHERE id = ?', 
        [nombre, apellido, email, contrasena, id]
      );

      if (result.affectedRows === 0) throw new Error('No se puede actualizar la tarea');

      return { id, nombre, apellido, email, contrasena };
    } catch (error) {
      console.error('Error al actualizar usuario', error);
      throw error;
    }
  },

  // Eliminar usuario
  async eliminarUsuario(idUsuario) {
    try{
      const [result] = await db.promise().query('DELETE FROM usuario WHERE id = ?', [idUsuario]);

      if(result.affectedRows === 0){
        throw new Error('Usuario no encontrado');
      }
      return { message: `Usuario con id ${idUsuario} eliminado`};
    } catch (error) {
      console.error("Error al eliminar usuario: ", error);
      throw error;
    }
  }

}

module.exports = usuarioService;