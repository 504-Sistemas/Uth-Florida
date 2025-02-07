<?php
require_once "app/middleware/AuthMiddleware.php";
require_once "app/models/Data.php";

class DataController {
    public function saveData() {
        AuthMiddleware::checkAuth();
        $data = json_decode(file_get_contents("php://input"));
        $usuario = $_SESSION["user"];
        
        $dataModel = new Data();
        if ($dataModel->saveData($data->nombre, $data->correo, $data->telefono, $usuario)) {
            echo json_encode(["message" => "Datos guardados con éxito"]);
        } else {
            echo json_encode(["error" => "Error al guardar datos"]);
        }
    }

    public function getData() {
        AuthMiddleware::checkAuth();
        $usuario = $_SESSION["user"];
        
        $dataModel = new Data();
        echo json_encode($dataModel->getDataByUser($usuario));
    }

    public function updateData() {
        AuthMiddleware::checkAuth();
        $data = json_decode(file_get_contents("php://input"));
        $usuario = $_SESSION["user"];
    
        $dataModel = new Data();
        if ($dataModel->updateData($data->id, $data->nombre, $data->correo, $data->telefono, $usuario)) {
            echo json_encode(["message" => "Datos actualizados con éxito"]);
        } else {
            echo json_encode(["error" => "Error al actualizar datos"]);
        }
    }
    
    public function deleteData() {
        AuthMiddleware::checkAuth();
        $data = json_decode(file_get_contents("php://input"));
        $usuario = $_SESSION["user"];
    
        $dataModel = new Data();
        if ($dataModel->deleteData($data->id, $usuario)) {
            echo json_encode(["message" => "Registro eliminado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar registro"]);
        }
    }
    
}
?>
