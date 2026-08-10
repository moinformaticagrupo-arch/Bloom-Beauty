<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);

    exit;

}


$nombre = trim($_POST["nombre"] ?? "");

$comentario = trim($_POST["comentario"] ?? "");

$estrellas = intval($_POST["estrellas"] ?? 0);


if ($nombre === "" || $comentario === "") {

    echo json_encode([
        "success" => false,
        "message" => "Completá todos los campos."
    ]);

    exit;

}


if ($estrellas < 1 || $estrellas > 5) {

    echo json_encode([
        "success" => false,
        "message" => "La valoración debe ser de 1 a 5 estrellas."
    ]);

    exit;

}


if (mb_strlen($nombre) > 100) {

    echo json_encode([
        "success" => false,
        "message" => "El nombre es demasiado largo."
    ]);

    exit;

}


if (mb_strlen($comentario) > 500) {

    echo json_encode([
        "success" => false,
        "message" => "La opinión es demasiado larga."
    ]);

    exit;

}


$sql = "INSERT INTO opiniones
        (nombre, comentario, estrellas)
        VALUES
        (:nombre, :comentario, :estrellas)";


$stmt = $conexion->prepare($sql);


$stmt->execute([

    ":nombre" => $nombre,

    ":comentario" => $comentario,

    ":estrellas" => $estrellas

]);


echo json_encode([

    "success" => true,

    "message" => "¡Gracias por tu opinión! Quedó pendiente de aprobación."

]);