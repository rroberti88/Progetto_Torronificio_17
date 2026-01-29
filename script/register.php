<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../codice_html/Login.html?mode=register&reg_error=1");
    exit();
}

// Preleva e normalizza i dati
$nome = trim($_POST["newName"] ?? "");
$cognome = trim($_POST["newCognome"] ?? "");
$email = strtolower(trim($_POST["newMail"] ?? ""));
$data_nascita = $_POST["data_nascita"] ?? "";
$username = strtolower(trim($_POST["newUsername"] ?? ""));
$password = $_POST["newPassword"] ?? "";

// Controllo campi vuoti
if ($nome === "" || $cognome === "" || $email === "" || $data_nascita === "" || $username === "" || $password === "") {
    header("Location: ../codice_html/Login.html?mode=register&reg_error=1");
    exit();
}

try {
    // Controllo se username o email esistono già
    $checkSql = "SELECT id FROM users WHERE username = :username OR email = :email";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([
        ":username" => $username,
        ":email" => $email
    ]);

    if ($checkStmt->fetch(PDO::FETCH_ASSOC)) {
        header("Location: ../codice_html/Login.html?mode=register&reg_error=exists");
        exit();
    }

    // Hash della password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Inserimento utente
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

    // Redirect con messaggio di registrazione completata
    header("Location: ../codice_html/Login.html?mode=login&registered=1");
    exit();

} catch (PDOException $e) {
    // In caso di errore generico, redirect con errore
    header("Location: ../codice_html/Login.html?mode=register&reg_error=1");
    exit();
}
