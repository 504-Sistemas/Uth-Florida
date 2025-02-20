<?php
session_start(); // Inicia la sesión en todas las peticiones 

// Permitir CORS
header("Access-Control-Allow-Origin: *"); // Permite acceso desde cualquier origen (puedes cambiar "*" por "http://localhost:3000")
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Encabezados permitidos
header("Access-Control-Allow-Credentials: true"); // Permitir envío de cookies/sesiones

// Manejar preflight requests (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8"); // Respuesta en formato JSON

require_once "../routes.php";
?>
