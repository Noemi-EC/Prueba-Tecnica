CREATE DATABASE prueba_tecnica;
USE prueba_tecnica;

CREATE TABLE usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(24) NOT NULL,
    apellido VARCHAR(24) NOT NULL,
    email VARCHAR(256) NOT NULL,
    contrasena VARCHAR(50) NOT NULL
);

INSERT INTO usuario(id, nombre, apellido, email, contrasena) VALUES(1, 'Noemi', 'Fernandez', 'nofe@gmail.com', 'contraseña');

CREATE TABLE tarea(
    id INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(1) NOT NULL,
    descripcion VARCHAR(356) NOT NULL
);

INSERT INTO tarea(id, estado, descripcion) VALUES(1, 'P', 'Culminar Proyecto 1');

SELECT * FROM tarea;
SELECT * FROM usuario;