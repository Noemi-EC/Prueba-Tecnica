import { createConnection } from 'mysql2';

const db = createConnection({
  host: HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

db.connect((error) => {
  if(error){
    console.error('Error en la conexión con la base de datos');
    return;
  }
  console.log('Conexión con la base de datos MySQL');
});

export default db;