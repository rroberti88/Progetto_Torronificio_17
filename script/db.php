<?php
$host = "localhost";
$dbname = "gruppo_17";  
$user = "www";          
$pass = "www";         

try {
    // Connessione a PostgreSQL
    $pdo = new PDO(
        "pgsql:host=$host;dbname=$dbname", // Stringa di connessione per PostgreSQL
        $user,
        $pass
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Errore DB: " . $e->getMessage());
}
?>
