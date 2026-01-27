<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) session_start();

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === '' || $password === '') {
        header("Location: ../codice%20html/Login.html?mode=login&error=1");
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            header("Location: ../codice%20html/Home.html");
            exit;
        }

        header("Location: ../codice%20html/Login.html?mode=login&error=1");
        exit;

    } catch (PDOException $e) {
        header("Location: ../codice%20html/Login.html?mode=login&error=1");
        exit;
    }
}

header("Location: ../codice%20html/Login.html?mode=login");
exit;