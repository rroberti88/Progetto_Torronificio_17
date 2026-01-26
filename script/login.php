<?php
session_start();
include "db.php";

$username = $_POST["username"];
$password = $_POST["password"];

$stmt = $conn->prepare("SELECT * FROM login WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        $_SESSION["user"] = $user["username"];
        header("Location: ../codice html/Home.html");
        exit();
    } else {
        echo "Password errata";
    }
} else {
    echo "Utente non trovato";
}
?>