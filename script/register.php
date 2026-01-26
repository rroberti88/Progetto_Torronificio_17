<?php
include "db.php";

// Recupera dati dal form
$email = $_POST["email"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

// Controlla se l'email esiste già
$sql_check = "SELECT * FROM `login` WHERE email='$email'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    echo "Errore: email già registrata";
} else {
    // Inserisci nuovo utente
    $sql = "INSERT INTO `login` (email, password) VALUES ('$email', '$password')";

    if ($conn->query($sql)) {
        header("Location: Login.html"); // torna al login dopo registrazione
        exit();
    } else {
        echo "Errore durante la registrazione: " . $conn->error;
    }
}
?>

