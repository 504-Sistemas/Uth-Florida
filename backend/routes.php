<?php
// Incluir controladores necesarios
require_once __DIR__ . "/app/controllers/AuthController.php";
require_once __DIR__ . "/app/controllers/DataController.php";

// Crear instancias
$auth = new AuthController();
$data = new DataController(); // 🔹 Esta línea es fundamental para evitar el error

// Manejar solicitudes POST
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_GET['action'])) {
    $input = file_get_contents("php://input");
    $requestData = json_decode($input);

    switch ($_GET['action']) {
        case "register":
            $auth->register();
            break;

        case "login":
            $auth->login();
            break;

        case "logout":
            $auth->logout();
            break;

        case "saveData":
            $input = file_get_contents("php://input");
            $requestData = json_decode($input);
        
            if ($requestData && isset($requestData->nombre, $requestData->correo, $requestData->telefono)) {
                $data->saveData($requestData->nombre, $requestData->correo, $requestData->telefono);
            } else {
                echo json_encode(["error" => "Datos incompletos para guardar"]);
            }
            break;

        case "updateData":
            if ($requestData && isset($requestData->id, $requestData->nombre, $requestData->correo, $requestData->telefono)) {
                $data->updateData($requestData);
            } else {
                echo json_encode(["error" => "Datos incompletos para actualizar"]);
            }
            break;

        case "deleteData":
            if ($requestData && isset($requestData->id)) {
                $data->deleteData($requestData);
            } else {
                echo json_encode(["error" => "ID no proporcionado para eliminar"]);
            }
            break;

        default:
            echo json_encode(["error" => "Acción no reconocida"]);
            break;
    }
}

// Manejar solicitudes GET
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['action'])) {
    switch ($_GET['action']) {
        case "checkSession":
            $auth->checkSession();
            break;

        case "getData":
            $resultado = $data->getData();
            
            // Si no es nulo, devolver los resultados, de lo contrario, enviar un mensaje de error
            if ($resultado) {
                echo json_encode(["debug" => "Llamada a getData", "resultado" => $resultado]);
            } else {
                echo json_encode(["error" => "No se encontraron datos"]);
            }
            break;

        default:
            echo json_encode(["error" => "Acción GET no reconocida"]);
            break;
    }
}
?>
