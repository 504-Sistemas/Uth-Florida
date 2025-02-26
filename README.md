# 📌 Proyecto: UTH Florida

Este repositorio contiene una aplicación web con un **backend en PHP con MySQL** y un **frontend en React con Bootstrap**.

## 🚀 Tecnologías Usadas

### **Backend** (PHP + MySQL)

- PHP 8+
- MySQL (MariaDB en local)
- Apache (XAMPP)
- PDO para la conexión a la base de datos

### **Base de Datos**

- Nombre de la base de datos: `prueba_tecnica`
- MySQL con las siguientes tablas:
  - `users`: Maneja autenticación
  - `datos`: Almacena los registros del sistema
- Procedimientos Almacenados en PHP (no se usan consultas directas)

### **Frontend** (React + Bootstrap)

- React 18+
- React Bootstrap
- React Router DOM para la navegación

---

## 📂 **Estructura del Proyecto**

```
UTH-Florida/
├── backend/  (Carpeta para desarrollo local)
│   ├── app/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── db/
│   │   ├── models/
│   ├── config/
│   ├── public/
│   ├── routes.php
│
├── frontend/  (Carpeta del cliente en React)
│   ├── src/
│   │   ├── pages/
│   ├── public/
│   ├── package.json
│   ├── README.md
│
├── README.md
```

---

## 🚀 **Pasos para Clonar el Proyecto en una Nueva PC**

```sh
git clone https://github.com/504-Sistemas/Uth-Florida.git
cd UTH-Florida
```

---

## ⚙ **Configuración del Backend**

### 1️⃣ **Instalar Dependencias**

No se requieren dependencias adicionales en PHP. Asegúrate de tener **Apache y MySQL activos** en XAMPP.

### 2️⃣ **Configurar la Base de Datos**

Ejecuta el siguiente script SQL en MySQL para crear las tablas y procedimientos:

```sql
CREATE DATABASE IF NOT EXISTS prueba_tecnica;
USE prueba_tecnica;

/*
Navicat MySQL Data Transfer

Source Server         : MySql
Source Server Version : 100425
Source Host           : localhost:3306
Source Database       : prueba_tecnica

Target Server Type    : MYSQL
Target Server Version : 100425
File Encoding         : 65001

Date: 2025-02-20 19:27:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for datos
-- ----------------------------
DROP TABLE IF EXISTS `datos`;
CREATE TABLE `datos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Procedure structure for ActualizarDato
-- ----------------------------
DROP PROCEDURE IF EXISTS `ActualizarDato`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarDato`(IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_correo VARCHAR(100),
    IN p_telefono VARCHAR(20))
BEGIN
    UPDATE datos 
    SET nombre = p_nombre, correo = p_correo, telefono = p_telefono
    WHERE id = p_id AND estado = 1;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for AutenticarUsuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `AutenticarUsuario`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AutenticarUsuario`(
    IN p_username VARCHAR(50)
)
BEGIN
    SELECT * FROM users WHERE username = p_username;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for EliminarDato
-- ----------------------------
DROP PROCEDURE IF EXISTS `EliminarDato`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarDato`(IN p_id INT)
BEGIN
    UPDATE datos SET estado = 0 WHERE id = p_id;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for InsertarDato
-- ----------------------------
DROP PROCEDURE IF EXISTS `InsertarDato`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarDato`(IN p_nombre VARCHAR(100),
    IN p_correo VARCHAR(100),
    IN p_telefono VARCHAR(20))
BEGIN
    INSERT INTO datos (nombre, correo, telefono, estado)
    VALUES (p_nombre, p_correo, p_telefono, 1);
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for ObtenerDatos
-- ----------------------------
DROP PROCEDURE IF EXISTS `ObtenerDatos`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerDatos`()
BEGIN
    SELECT id, nombre, correo, telefono 
    FROM datos 
    WHERE estado = 1;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for RegistrarUsuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `RegistrarUsuario`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarUsuario`(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    INSERT INTO users (username, password) VALUES (p_username, p_password);
END
;;
DELIMITER ;
SET FOREIGN_KEY_CHECKS=1;

```

Modifica `config/Database.php` con tus credenciales de MySQL:

```php
private $host = "localhost";
private $db_name = "prueba_tecnica";
private $username = "root";
private $password = "";
```

### 3️⃣ **Ejecutar el Backend en Local**

Si estás usando XAMPP, mueve `backend/` a `htdocs/` y asegúrate de que Apache está corriendo en el puerto correcto.

📌 **Importante:** Si tu Apache usa un puerto diferente a `80`, debes cambiar la URL del backend. Por ejemplo, si Apache usa el puerto `9050`, accede a:

```
http://localhost:9050/backend/routes.php?action=getData
```

Si Apache usa el puerto por defecto (`80`), la URL será:

```
http://localhost/backend/routes.php?action=getData
```

---

## 🎨 **Configuración del Frontend**

### 1️⃣ **Instalar Dependencias**

```sh
cd frontend
npm install
```

### 2️⃣ **Configurar la API en el Frontend**

Edita `src/pages/Dashboard.js` , `src/pages/Register.js` , `src/pages/Login.js` para apuntar al backend:

```js
const API_URL = "http://localhost:9050/backend/routes.php"; // Cambiar según el puerto configurado en Apache
```

📌 **Si usas el puerto por defecto (**``**), cambia a:**

```js
const API_URL = "http://localhost/backend/routes.php";
```

### 3️⃣ **Ejecutar el Frontend**

```sh
npm start
```

---

### 🚀 Configuración de CORS en el Backend
Si encuentras problemas relacionados con CORS (Cross-Origin Resource Sharing) al hacer solicitudes desde el frontend, puedes configurar los encabezados en tu servidor Apache para permitir que el frontend en React se comunique con el backend en PHP, especialmente si están en diferentes puertos.

Agregar los encabezados CORS en el archivo .htaccess o httpd.conf de Apache:
apache
Copiar
```js
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
    Header set Access-Control-Allow-Credentials "true"
</IfModule>
```
Este bloque asegura que tu servidor backend permita solicitudes desde cualquier origen. Si deseas restringir los orígenes, reemplaza * por el dominio específico, como por ejemplo http://localhost:3000.

## 🎯 **Créditos**

Desarrollado por **504-Sistemas** 🚀.

Si tienes preguntas, abre un **issue** o contáctame.

