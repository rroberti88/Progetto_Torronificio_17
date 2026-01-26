<?php
$conn = new mysqli("localhost", "root", "", "torronificio");

if ($conn->connect_error) {
    die("Errore di connessione");
}
?>