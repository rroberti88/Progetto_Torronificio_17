<?php
// Mostra tutti gli errori per debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Avvia la sessione solo se non è già attiva
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require 'db.php'; // Connessione al DB tramite PDO

// Controlla se il form è stato inviato
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Controlla che username e password siano stati inviati
    if (isset($_POST['username'], $_POST['password'])) {
        $username = trim($_POST['username']);
        $password = $_POST['password'];

        try {
            // Recupero utente dal DB
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                // Verifica password
                if (password_verify($password, $user['password'])) {
                    // Login riuscito: salvo dati in sessione
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];

                    // Redirect alla home
                    // Usa %20 se ci sono spazi nel nome cartella
                    header("Location: ../codice%20html/Home.html");
                    exit;
                } else {
                    $error = "Password errata!";
                }
            } else {
                $error = "Utente non trovato!";
            }

        } catch (PDOException $e) {
            $error = "Errore DB: " . $e->getMessage();
        }

    } else {
        $error = "Compila tutti i campi!";
    }

    // Mostra eventuale messaggio di errore
    if (isset($error)) {
        echo "<p style='color:red; text-align:center;'>$error</p>";
    }
}
?>

<!-- Form di login HTML -->
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <style>
        body { font-family: Arial, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; }
        form { border: 1px solid #ccc; padding: 20px; border-radius: 10px; }
        input { display:block; margin: 10px 0; padding: 8px; width: 100%; }
        button { padding: 10px; width: 100%; cursor:pointer; }
    </style>
</head>
<body>
    <form method="post" action="">
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Accedi</button>
    </form>
</body>
</html>
