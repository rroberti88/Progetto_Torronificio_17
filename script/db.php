<?php
$servername = "localhost";
$username = "root";
$password = "";  // lascia vuoto se non hai password per root
$dbname = "torronificio nardone"; // nome del database con spazio

// Crea connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
?>
