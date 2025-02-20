<?php
require_once "config/Database.php";

class Data {
    private $conn;
    private $table = "datos";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function saveData($nombre, $correo, $telefono) {
        try {
            $query = "CALL InsertarDato(:nombre, :correo, :telefono)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":nombre", $nombre);
            $stmt->bindParam(":correo", $correo);
            $stmt->bindParam(":telefono", $telefono);
            
            if ($stmt->execute()) {
                return ["message" => "Datos guardados con éxito"];
            } else {
                return ["error" => "Error al ejecutar la consulta"];
            }
        } catch (PDOException $e) {
            return ["error" => "Error en saveData(): " . $e->getMessage()];
        }
    }

    public function getData() {
        try {
            $query = "CALL ObtenerDatos()";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            if ($result) {
                return $result;
            } else {
                return [];
            }
        } catch (PDOException $e) {
            return ["error" => "Error en getData(): " . $e->getMessage()];
        }
    }
    public function updateData($id, $nombre, $correo, $telefono) {
        try {
            $query = "CALL ActualizarDato(:id, :nombre, :correo, :telefono)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
            $stmt->bindParam(":nombre", $nombre);
            $stmt->bindParam(":correo", $correo);
            $stmt->bindParam(":telefono", $telefono);
    
            if ($stmt->execute()) {
                return ["message" => "Datos actualizados con éxito"];
            } else {
                return ["error" => "Error al ejecutar la actualización"];
            }
        } catch (PDOException $e) {
            return ["error" => "Error en updateData(): " . $e->getMessage()];
        }
    }
    
    public function deleteData($id) {
        try {
            $query = "CALL EliminarDato(:id)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
    
            if ($stmt->execute()) {
                return ["message" => "Registro eliminado correctamente"];
            } else {
                return ["error" => "Error al eliminar el registro"];
            }
        } catch (PDOException $e) {
            return ["error" => "Error en deleteData(): " . $e->getMessage()];
        }
    }
    
}
?>
