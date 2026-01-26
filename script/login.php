<?php
session_start();
include "db.php";

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM login WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        $_SESSION["login"] = $user["email"];
        header("Location: Home.html");
    } else {
        echo "Password errata";
    }
} else {
    echo "Utente non trovato";
}
?>
