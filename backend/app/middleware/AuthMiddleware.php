<?php
class AuthMiddleware {
    public static function checkAuth() {
        if (!isset($_SESSION["user"])) {
            echo json_encode(["error" => "No tienes permisos para acceder"]);
            http_response_code(401);
            exit();
        }
    }
}
?>
