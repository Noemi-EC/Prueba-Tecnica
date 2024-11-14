const express = require('express');
const app = express();

// ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());

// Archivos de rutas
const tareaRoutes = require('./tarea/tarea.routes');
const usuarioRoutes = require('./usuario/usuario.routes');


app.use('/api', tareaRoutes);
app.use('/api', usuarioRoutes);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto ${PUERTO}`);
});
