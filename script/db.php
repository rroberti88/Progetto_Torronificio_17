<?php
$host = "localhost";
$dbname = "gruppo_17";
$port = "5432";
$user = "www";
$pass = "www";

try {
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$dbname",
        $user,
        $pass
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("Errore DB: " . $e->getMessage());
}
?>