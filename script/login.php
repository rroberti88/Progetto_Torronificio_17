<?php
session_start();
include "db.php"; // Assumendo che login.php sia in "script/"

// Prendi i dati dal form
$email = $_POST["username"];  // il form manda "username" anche se in realtà è l'email
$password = $_POST["password"];

// Controlla che l'utente esista
$sql = "SELECT * FROM `login` WHERE `email`='$email'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        $_SESSION["login"] = $user["email"];
        // Redirect corretto alla home, salendo di una cartella e entrando in codice html
        header("Location: ../codice html/Home.html");
        exit();
    } else {
        echo "Password errata";
    }
} else {
    echo "Utente non trovato";
}
?>
