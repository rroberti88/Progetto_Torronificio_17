<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require 'db.php'; // Connessione PDO

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['username'], $_POST['password'])) {
        $username = trim($_POST['username']);
        $password = $_POST['password'];

        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                // Login corretto
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                header("Location: ../codice%20html/Home.html");
                exit;
            } else {
                // Login fallito → redirect a login_failed.html
                header("Location: ../codice html/LoginFailed.html");
                exit;
            }

        } catch (PDOException $e) {
            // In caso di errore DB → redirect con messaggio (opzionale)
            header("Location: ../codice html/LoginFailed.html");
            exit;
        }

    } else {
        // Campi mancanti → redirect a login_failed.html
        header("Location: ../codice html/LoginFailed.html");
        exit;
    }
}
?>
