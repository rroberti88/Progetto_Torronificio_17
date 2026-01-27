<?php
if (session_status() === PHP_SESSION_NONE) session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

if (!empty($_SESSION['user_id']) && !empty($_SESSION['username'])) {
    echo json_encode([
        "authenticated" => true,
        "username" => $_SESSION['username']
    ]);
    exit;
}

echo json_encode([
    "authenticated" => false,
    "username" => null
]);
exit;