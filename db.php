<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$host = "127.0.0.1";
$porta = "3306";
$usuario = "root";
$senha = "1234";
$banco = "tcc-ecosolidario";

$conn = new mysqli($host, $usuario, $senha, $banco, $porta);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
echo "!!!!BANCO CONECTADO COM SUCESSO!!!!!";
?>
