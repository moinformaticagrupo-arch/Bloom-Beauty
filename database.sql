CREATE DATABASE IF NOT EXISTS bloom_beauty
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE bloom_beauty;

CREATE TABLE opiniones (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    comentario TEXT NOT NULL,

    estrellas TINYINT UNSIGNED NOT NULL,

    estado ENUM('pendiente', 'aprobada') NOT NULL DEFAULT 'pendiente',

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);