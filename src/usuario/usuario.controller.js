const usuarioService = require('./usuario.service');

class UsuarioContoller {
  // Obtener todos los usuarios
  async obtenerUsuarios(req, res) {
    try {
      const usuario = await usuarioService.obtenerUsuarios();
      res.json(usuario);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios',
        error: error.message
      });
    }
  }

  // Obtener usuario específico
  async obtenerUsuarioId(req, res) {
    try {
      const usuario = await usuarioService.obtenerUsuarioId(req.params.id);
      if(usuario) {
        res.status(200).json({
          result: usuario
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
    } catch (error) {
      console.error('Error al obtener usuario', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener usuario por ID',
        error: error.message
      })
    }
  }

  // Crear usuario
  async crearUsuario(req, res) {
    try {
      const nuevoUsuario = await usuarioService.crearUsuario(req.body);
      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        result: nuevoUsuario
      });
    } catch (error) {
      console.error('Error al crear tarea: ', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear usuario',
        error: error.message
      });
    }
  }

  // Actualizar usuario
  async actualizarUsuario(req, res) {
    try{
      const usuarioActualizado = await usuarioService.actualizarUsuario({ ...req.body, id: req.params.id });
      res.status(200).json({
        success: true, 
        message: 'Usuario actualizado exitosamente',
        rseult: usuarioActualizado
      });
    } catch (error) {
      console.log('Error al actualizar usuario', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar usuario',
        error: error.message
      });
    }
  }

  // Eliminar usuario
  async eliminarUsuario(req, res){
    try{
      const { id } = req.params;
      const resultado = await usuarioService.eliminarUsuario(id);
      res.json({
        success: true,
        message: resultado.message
      });
    } catch (error) {
      console.log('Error al eliminar usuario: ', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar usuario',
        error: error.message
      });
    }
  }
}

module.exports = new UsuarioContoller();