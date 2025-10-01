<?php
$host = "127.0.0.1";   // ou localhost
$porta = "3306";       // porta do MySQL
$usuario = "root";     // usuário do MySQL
$senha = "1234";  // senha do MySQL
$banco = "tcc-ecosolidario"; // banco que você já criou

$conn = new mysqli($host, $usuario, $senha, $banco, $porta);

if ($conn->connect_error) {
    die("Erro ao conectar: " . $conn->connect_error);
} else {
    echo "Conexão bem-sucedida!";
}
?>
