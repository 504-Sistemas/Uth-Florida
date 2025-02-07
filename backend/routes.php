<?php
require_once "app/controllers/AuthController.php";
require_once "app/controllers/DataController.php";

$auth = new AuthController();

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_GET['action'])) {
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
            $data->saveData();
            break;
        case "updateData":
            $data->updateData();
            break;
        case "deleteData":
            $data->deleteData();
            break;
    }
}
if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['action'])) {
    switch ($_GET['action']) {
        case "checkSession":
            $auth->checkSession();
            break;
        case "getData":
            $data->getData();
            break;
    }
}

?>
