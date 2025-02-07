<?php
require_once "config/Database.php";

class Data {
    private $conn;
    private $table = "datos";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function saveData($nombre, $correo, $telefono, $usuario) {
        $query = "INSERT INTO " . $this->table . " (nombre, correo, telefono, usuario) VALUES (:nombre, :correo, :telefono, :usuario)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":telefono", $telefono);
        $stmt->bindParam(":usuario", $usuario);
        return $stmt->execute();
    }

    public function getDataByUser($usuario) {
        $query = "SELECT * FROM " . $this->table . " WHERE usuario = :usuario AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":usuario", $usuario);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function updateData($id, $nombre, $correo, $telefono, $usuario) {
        $query = "UPDATE " . $this->table . " SET nombre = :nombre, correo = :correo, telefono = :telefono WHERE id = :id AND usuario = :usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":telefono", $telefono);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":usuario", $usuario);
        return $stmt->execute();
    }
    
    public function deleteData($id, $usuario) {
        $query = "UPDATE " . $this->table . " SET estado = 0 WHERE id = :id AND usuario = :usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":usuario", $usuario);
        return $stmt->execute();
    }
    
}
?>
