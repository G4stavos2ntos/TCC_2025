<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

$categoria = isset($_GET['categoria']) ? trim($_GET['categoria']) : '';
$pontos = [];

if ($categoria === 'reciclagem' || $categoria === 'doacao') {
    $table = ($categoria === 'reciclagem') ? 'pontos_reciclagem' : 'pontos_doacao';
    $sql = "SELECT id, nome, endereco, cidade, estado, cep, lat, lng, descricao FROM $table ORDER BY nome";
    $res = $conn->query($sql);
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $row['lat'] = isset($row['lat']) ? (float)$row['lat'] : null;
            $row['lng'] = isset($row['lng']) ? (float)$row['lng'] : null;
            $row['tipo'] = $categoria;
            $pontos[] = $row;
        }
    }
} else {
    // Pega todos os pontos se categoria não especificada
    foreach (['reciclagem', 'doacao'] as $cat) {
        $table = ($cat === 'reciclagem') ? 'pontos_reciclagem' : 'pontos_doacao';
        $res = $conn->query("SELECT id, nome, endereco, cidade, estado, cep, lat, lng, descricao FROM $table");
        if ($res) {
            while ($row = $res->fetch_assoc()) {
                $row['lat'] = isset($row['lat']) ? (float)$row['lat'] : null;
                $row['lng'] = isset($row['lng']) ? (float)$row['lng'] : null;
                $row['tipo'] = $cat;
                $pontos[] = $row;
            }
        }
    }
}

echo json_encode($pontos);
$conn->close();
