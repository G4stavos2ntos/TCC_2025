<?php
include 'db.php'; // conexão $conn

header('Content-Type: application/json; charset=utf-8');

$tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';

if ($tipo === 'reciclagem') {
    $sql = "SELECT nome, endereco, lat, lng FROM pontos_reciclagem";
} elseif ($tipo === 'doacao') {
    $sql = "SELECT nome, endereco, lat, lng FROM pontos_doacao";
} else {
    echo json_encode(["erro" => "Tipo de página inválido"]);
    exit;
}

$resultado = $conn->query($sql);

$pontos = [];
while ($row = $resultado->fetch_assoc()) {
    $pontos[] = $row;
}

echo json_encode($pontos);
?>
