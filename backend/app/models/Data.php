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
        $query = "CALL InsertarDato(:nombre, :correo, :telefono, :usuario)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":telefono", $telefono);
        $stmt->bindParam(":usuario", $usuario);
        return $stmt->execute();
    }

    public function getDataByUser($usuario) {
        $query = "CALL ObtenerDatos(:usuario)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":usuario", $usuario);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function updateData($id, $nombre, $correo, $telefono, $usuario) {
        $query = "CALL ActualizarDato(:id, :nombre, :correo, :telefono, :usuario)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":telefono", $telefono);
        $stmt->bindParam(":usuario", $usuario);
        return $stmt->execute();
    }
    
    public function deleteData($id, $usuario) {
        $query = "CALL EliminarDato(:id, :usuario)";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":usuario", $usuario);
    return $stmt->execute();
    }
    
}
?>
