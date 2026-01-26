

document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.getElementById("loginContainer");
    const registerContainer = document.getElementById("registerContainer");

    // Legge il parametro dalla query string
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode"); // "login" o "register"

    if (mode === "login") {
        loginContainer.style.display = "block";
        registerContainer.style.display = "none";
    } else if (mode === "register") {
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    }
});




// login.js

// ==========================
// LOGIN
// ==========================
const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const loginBtn = document.querySelector('div:nth-of-type(2) form button[type="submit"]'); // Pulsante login

// Abilita il pulsante se username e password non sono vuoti
function checkLoginInputs() {
    if (loginUsername.value.trim() !== '' && loginPassword.value.trim() !== '') {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}

loginUsername.addEventListener('input', checkLoginInputs);
loginPassword.addEventListener('input', checkLoginInputs);


    

// ==========================
// REGISTRAZIONE
// ==========================
const regNome = document.getElementById('newName');
const regCognome = document.getElementById('newCognome');
const regEmail = document.getElementById('newMail');
const regData = document.getElementById('data-nascita');
const regUsername = document.getElementById('newUsername');
const regPassword = document.getElementById('newPassword');
const regBtn = document.querySelector('div:nth-of-type(3) form button[type="submit"]'); // Pulsante registrazione


// Controlla tutti i campi della registrazione
function checkRegInputs() {
    // Controllo email base
    const emailValida = regEmail.value.includes('@') && regEmail.value.includes('.');
    // Controllo campi non vuoti
    const today = new Date().toISOString().split('T')[0];
    regData.setAttribute('max', today);
    if (
        regNome.value.trim() !== '' &&
        regCognome.value.trim() !== '' &&
        emailValida &&
        regData.value.trim() !== '' &&
        regUsername.value.trim() !== '' &&
        regPassword.value.trim() !== ''
    ) {
        regBtn.disabled = false;
    } else {
        regBtn.disabled = true;
    }
}

// Aggiungi eventi a tutti i campi della registrazione
[regNome, regCognome, regEmail, regData, regUsername, regPassword].forEach(field => {
    field.addEventListener('input', checkRegInputs);
});


