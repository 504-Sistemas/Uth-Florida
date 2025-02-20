📌 Proyecto: UTH Florida

Este repositorio contiene una aplicación web con un backend en PHP con MySQL y un frontend en React con Bootstrap.

🚀 Tecnologías Usadas

Backend (PHP + MySQL)

PHP 8+

MySQL (MariaDB en local)

Apache (XAMPP)

PDO para la conexión a la base de datos

Base de Datos

Nombre de la base de datos: prueba_tecnica

MySQL con las siguientes tablas:

usuarios: Maneja autenticación

datos: Almacena los registros del sistema

Consultas SQL directas en PHP (no se usan procedimientos almacenados)

Frontend (React + Bootstrap)

React 18+

React Bootstrap

React Router DOM para la navegación

📂 Estructura del Proyecto

UTH-Florida/
├── backend/  (Carpeta para desarrollo local)
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   ├── config/
│   ├── public/
│   ├── routes.php
│   ├── index.php
│
├── frontend/  (Carpeta del cliente en React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   ├── public/
│   ├── package.json
│   ├── .env
│
├── README.md

🚀 Pasos para Clonar el Proyecto en una Nueva PC

git clone https://github.com/504-Sistemas/Uth-Florida.git
cd UTH-Florida

⚙ Configuración del Backend

1️⃣ Instalar Dependencias

No se requieren dependencias adicionales en PHP. Asegúrate de tener Apache y MySQL activos en XAMPP.

2️⃣ Configurar la Base de Datos

Ejecuta el siguiente script SQL en MySQL para crear las tablas y procedimientos:

CREATE DATABASE IF NOT EXISTS prueba_tecnica;
USE prueba_tecnica;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE datos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    estado TINYINT(1) DEFAULT 1,  -- 1: Activo, 0: Eliminado (eliminación lógica)
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Modifica config/Database.php con tus credenciales de MySQL:

private $host = "localhost";
private $db_name = "prueba_tecnica";
private $username = "root";
private $password = "";

3️⃣ Ejecutar el Backend en Local

Si estás usando XAMPP, mueve backend/ a htdocs/ y asegúrate de que Apache está corriendo en el puerto correcto.

📌 Importante: Si tu Apache usa un puerto diferente a 80, debes cambiar la URL del backend. Por ejemplo, si Apache usa el puerto 9050, accede a:

http://localhost:9050/backend/routes.php?action=getData

Si Apache usa el puerto por defecto (80), la URL será:

http://localhost/backend/routes.php?action=getData

🎨 Configuración del Frontend

1️⃣ Instalar Dependencias

cd frontend
npm install

2️⃣ Configurar la API en el Frontend

Edita src/config.js o src/services/api.js para apuntar al backend:

const API_URL = "http://localhost:9050/backend/routes.php"; // Cambiar según el puerto configurado en Apache

📌 Si usas el puerto por defecto (80), cambia a:

const API_URL = "http://localhost/backend/routes.php";

3️⃣ Ejecutar el Frontend

npm start

🎯 Créditos

Desarrollado por 504-Sistemas 🚀.
