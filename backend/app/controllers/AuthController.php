<?php
require_once "app/models/User.php";

class AuthController {
    public function register() {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $data = json_decode(file_get_contents("php://input"));
            $user = new User();
            if ($user->register($data->username, $data->password)) {
                echo json_encode(["message" => "Usuario registrado con éxito"]);
            } else {
                echo json_encode(["error" => "Error en el registro"]);
            }
        }
    }

    public function login() {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $data = json_decode(file_get_contents("php://input"));
            $user = new User();
            $result = $user->login($data->username, $data->password);
            if ($result) {
                session_start();
                $_SESSION["user"] = $result["username"]; // Guardamos el usuario en la sesión
                echo json_encode(["message" => "Inicio de sesión exitoso"]);
            } else {
                echo json_encode(["error" => "Credenciales incorrectas"]);
            }
        }
    }
    public function checkSession() {
        session_start();
        if (isset($_SESSION["user"])) {
            echo json_encode(["loggedIn" => true, "user" => $_SESSION["user"]]);
        } else {
            echo json_encode(["loggedIn" => false]);
        }
    }
    public function logout() {
        session_start();
        session_destroy();
        echo json_encode(["message" => "Sesión cerrada"]);
    }
    
}
?>
