<?php
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../codice%20html/Login.html?mode=register&reg_error=1");
    exit();
}

$nome = trim($_POST["newName"] ?? "");
$cognome = trim($_POST["newCognome"] ?? "");
$email = trim($_POST["newMail"] ?? "");
$data_nascita = $_POST["data_nascita"] ?? "";
$username = trim($_POST["newUsername"] ?? "");
$password = $_POST["newPassword"] ?? "";

if ($nome === "" || $cognome === "" || $email === "" || $data_nascita === "" || $username === "" || $password === "") {
    header("Location: ../codice%20html/Login.html?mode=register&reg_error=1");
    exit();
}

try {
    $checkSql = "SELECT id FROM users WHERE username = :username OR email = :email";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([
        ":username" => $username,
        ":email" => $email
    ]);

    if ($checkStmt->fetch(PDO::FETCH_ASSOC)) {
        header("Location: ../codice%20html/Login.html?mode=register&reg_error=exists");
        exit();
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (nome, cognome, email, data_nascita, username, password)
            VALUES (:nome, :cognome, :email, :data_nascita, :username, :password)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":nome" => $nome,
        ":cognome" => $cognome,
        ":email" => $email,
        ":data_nascita" => $data_nascita,
        ":username" => $username,
        ":password" => $password_hash
    ]);

    header("Location: ../codice%20html/Login.html?mode=login&registered=1");
    exit();

} catch (PDOException $e) {
    header("Location: ../codice%20html/Login.html?mode=register&reg_error=1");
    exit();
}