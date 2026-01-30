    <?php
    // La password che l'utente inserisce nel modulo
    $password = "www";

    // Cifra la password con bcrypt
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Mostra la password cifrata
    echo "Password cifrata: " . $hashed_password;
    ?>