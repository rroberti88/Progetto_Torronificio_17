document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.getElementById("loginContainer");
    const registerContainer = document.getElementById("registerContainer");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    // Legge il parametro "mode" dalla query string
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode"); // "login" o "register"

    if (mode === "register") {
        loginContainer.style.display = "none";
        registerContainer.style.display = "flex";
    } else {
        loginContainer.style.display = "flex";
        registerContainer.style.display = "none";
    }

    // CLICK "Intendo registrarmi"
    showRegister.addEventListener("click", function(e) {
        e.preventDefault();
        loginContainer.style.display = "none";
        registerContainer.style.display = "flex";
    });

    // CLICK "Accedi"
    showLogin.addEventListener("click", function(e) {
        e.preventDefault();
        registerContainer.style.display = "none";
        loginContainer.style.display = "flex";
    });

    // LOGIN: abilitazione pulsante
    const loginUsername = document.getElementById('username');
    const loginPassword = document.getElementById('password');
    const loginBtn = document.querySelector('#loginContainer button');

    function checkLoginInputs() {
        loginBtn.disabled = loginUsername.value.trim() === '' || loginPassword.value.trim() === '';
    }
    loginUsername.addEventListener('input', checkLoginInputs);
    loginPassword.addEventListener('input', checkLoginInputs);

    // REGISTRAZIONE: abilitazione pulsante
    const regNome = document.getElementById('newName');
    const regCognome = document.getElementById('newCognome');
    const regEmail = document.getElementById('newMail');
    const regData = document.getElementById('data_nascita');
    const regUsername = document.getElementById('newUsername');
    const regPassword = document.getElementById('newPassword');
    const regBtn = document.querySelector('#registerContainer button');

    regData.setAttribute('max', new Date().toISOString().split('T')[0]);

    function checkRegInputs() {
        const emailValida = regEmail.value.includes('@') && regEmail.value.includes('.');
        const tuttiCompilati = regNome.value.trim() !== '' &&
                               regCognome.value.trim() !== '' &&
                               emailValida &&
                               regData.value.trim() !== '' &&
                               regUsername.value.trim() !== '' &&
                               regPassword.value.trim() !== '';
        regBtn.disabled = !tuttiCompilati;
    }

    [regNome, regCognome, regEmail, regData, regUsername, regPassword].forEach(field => {
        field.addEventListener('input', checkRegInputs);
    });
});
