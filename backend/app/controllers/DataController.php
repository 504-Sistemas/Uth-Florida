<?php
require_once "app/middleware/AuthMiddleware.php";
require_once __DIR__ . "/../models/Data.php";

class DataController {
    private $dataModel;

    public function __construct() {
        $this->dataModel = new Data(); // ✅ Se crea la instancia correctamente
    }
    public function saveData() {
        $data = json_decode(file_get_contents("php://input"));
        // Validar que los datos requeridos estén presentes
        if (!isset($data->nombre) || !isset($data->correo) || !isset($data->telefono)) {
            echo json_encode(["error" => "Datos incompletos. Se requieren: nombre, correo, teléfono"]);
            return;
        }        
        if ($this->dataModel->saveData($data->nombre, $data->correo, $data->telefono,1)) {
            echo json_encode(["message" => "Datos guardados con éxito"]);
        } else {
            echo json_encode(["error" => "Error al guardar datos"]);
        }
    }

    public function getData() {
        
        return $this->dataModel->getData(true); // Pasamos 'true' para filtrar solo los activos
    }

    public function updateData() {
        $data = json_decode(file_get_contents("php://input"));
    
        if ($this->dataModel->updateData($data->id, $data->nombre, $data->correo, $data->telefono)) {
            echo json_encode(["message" => "Datos actualizados con éxito"]);
        } else {
            echo json_encode(["error" => "Error al actualizar datos"]);
        }
    }
    
    public function deleteData() {
        $data = json_decode(file_get_contents("php://input"));
    
        if ($this->dataModel->deleteData($data->id)) {
            echo json_encode(["message" => "Registro eliminado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar registro"]);
        }
    }
    
}
?>
