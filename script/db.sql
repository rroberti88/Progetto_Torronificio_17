
DROP TABLE IF EXISTS users cascade;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    data_nascita DATE
);
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO www;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO www;
INSERT INTO users  (nome, cognome, email, data_nascita, username, password) VALUES ( --esempio di utente
    'Robi', 
    'Ribi', 
    'Robi@esempio.com', 
    '1990-01-01', 
    'CdkLover', 
    '$2y$10$hQtudPbcp5/vTNqvRBex.eFuBVj8GVns0PTMt3VKaJ0VBHn6OWTTO' -- Questo è un hash d'esempio per '1234'
);


-- UPDATE users
-- SET email = 'nuova@email.com'
-- WHERE username = 'CdkLover';

-- UPDATE users
-- SET password = 'HASH_NUOVO'
-- WHERE id = 1;

-- UPDATE users
-- SET nome = 'Mario', cognome = 'Rossi'
-- WHERE id = 1;