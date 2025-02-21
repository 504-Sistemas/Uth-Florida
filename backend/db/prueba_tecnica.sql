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
-- Records of datos
-- ----------------------------
INSERT INTO `datos` VALUES ('2', 'Jose Angel Leon', 'joseleon_angel16@hotmail.com', '89779351', '1');
INSERT INTO `datos` VALUES ('3', 'Angel Leon Ortiz', 'jose@gmail.com', '8977951', '0');
INSERT INTO `datos` VALUES ('4', 'juan perez', 'juan@gmail.com', '84779351', '1');
INSERT INTO `datos` VALUES ('5', 'pedro ortiz', 'pedro@gmail.com', '87654132', '1');

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
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'aleon', '$2y$10$4gOg17ZsHZQGmo0C5ZL2zO0hsgdgY8LhsPtAaUlALyukxTtVrdFRK');
INSERT INTO `users` VALUES ('2', 'admin', '$2y$10$pJNKI2bDr/Pauve/S.NVGeFEk/dmAhKWNpcLvG6/gG/UGEttHdkg2');
INSERT INTO `users` VALUES ('3', 'user1', '$2y$10$pA5IxtXoNZ7DWPgQyB9E7.D4xfyEa8dE5CDliHra6u2uXyrcfW87G');

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
