<?php
include "db.php";

$email = $_POST["email"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$sql = "INSERT INTO utenti ( email, password)
        VALUES ('$email', '$password')";

if ($conn->query($sql)) {
    header("Location: Login.html");
} else {
    echo "Errore: email già registrata";
}
?>
