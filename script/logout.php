<?php
if (session_status() === PHP_SESSION_NONE) session_start();

$_SESSION = [];
session_unset();
session_destroy();

header('Content-Type: application/json; charset=utf-8');
echo json_encode(["ok" => true]);
exit;