<?php
session_start();//Inicia la sesion en todas las peticiones 

header("Access-Control-Allow-Origin: *"); //Indica que el servidor permite el acceso a sus recursos desde cualquier origen
header("Content-Type: application/json; charset=UTF-8");//Establecer la cabecera Content-Type a application/json y el charset a UTF-8

require_once "../routes.php";
?>
