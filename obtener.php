<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";


$sql = "SELECT
            id,
            nombre,
            comentario,
            estrellas,
            fecha
        FROM opiniones
        WHERE estado = 'aprobada'
        ORDER BY fecha DESC";


$stmt = $conexion->query($sql);

$opiniones = $stmt->fetchAll();


echo json_encode([

    "success" => true,

    "opiniones" => $opiniones

], JSON_UNESCAPED_UNICODE);