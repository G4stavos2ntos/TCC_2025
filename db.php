<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "127.0.0.1";
$porta = "3306";               // troque para 3307 se seu MySQL usa outra porta
$usuario = "root";
$senha = "1234";             // sua senha do MySQL
$banco = "tcc_ecosolidario"; // o banco que você criou

$conn = @new mysqli($host, $usuario, $senha, $banco, $porta);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]);
    exit;
}
$conn->set_charset("utf8mb4");
