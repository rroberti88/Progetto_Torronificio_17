<?php
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nome = trim($_POST["newName"]);
    $cognome = trim($_POST["newCognome"]);
    $email = trim($_POST["newMail"]);
    $data_nascita = $_POST["data_nascita"];
    $username = trim($_POST["newUsername"]);
    $password = $_POST["newPassword"];

    if (
        empty($nome) || empty($cognome) || empty($email) ||
        empty($data_nascita) || empty($username) || empty($password)
    ) {
        die("Tutti i campi sono obbligatori.");
    }

    // Controllo username / email
    $checkSql = "SELECT id FROM users WHERE username = :username OR email = :email";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->execute([
        ":username" => $username,
        ":email" => $email
    ]);

    if ($checkStmt->rowCount() > 0) {
        die("Username o email già registrati.");
    }

    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Inserimento utente
    $sql = "INSERT INTO users 
            (nome, cognome, email, data_nascita, username, password)
            VALUES 
            (:nome, :cognome, :email, :data_nascita, :username, :password)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":nome" => $nome,
        ":cognome" => $cognome,
        ":email" => $email,
        ":data_nascita" => $data_nascita,
        ":username" => $username,
        ":password" => $password_hash
    ]);

    // Dopo l'inserimento nel DB
    header("Location: ../codice html/RegisterSuccess.html"); // aggiusta il percorso se serve
    exit();
} else {
    echo "Accesso non valido.";
}
?>
