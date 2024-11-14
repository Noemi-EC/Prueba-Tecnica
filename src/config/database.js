const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'prueba_tecnica'
});

db.connect((error) => {
  if(error){
    console.error('Error en la conexión con la base de datos');
    return;
  }
  console.log('Conexión con la base de datos MySQL');
});

module.exports = db;