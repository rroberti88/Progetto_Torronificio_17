document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.getElementById("loginContainer");
    const registerContainer = document.getElementById("registerContainer");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");
  
    const globalMsg = document.getElementById("globalMsg");
  
    function showMessage(text, type = "error") {
      if (!globalMsg) return;
      globalMsg.textContent = text;
      globalMsg.className = `msg ${type}`;
      globalMsg.hidden = false;   // ✅ mostra
    }
    
    function hideMessage() {
      if (!globalMsg) return;
      globalMsg.hidden = true;    // ✅ nasconde
      globalMsg.textContent = "";
      globalMsg.className = "msg";
    }
  
    // Parametri URL
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");               // login/register
    const error = params.get("error");             // 1 => login errato
    const registered = params.get("registered");   // 1 => registrazione ok
    const reg_error = params.get("reg_error");     // exists/1 => errori registrazione
  
    // Tab base
    if (mode === "register") {
      loginContainer.style.display = "none";
      registerContainer.style.display = "flex";
    } else {
      loginContainer.style.display = "flex";
      registerContainer.style.display = "none";
    }
  
    // CASO 1: LOGIN ERRATO
    if (error) {
      loginContainer.style.display = "flex";
      registerContainer.style.display = "none";
      showMessage("Credenziali errate! Controlla username e password.", "error");
    }
  
    // CASO 2: REGISTRAZIONE OK
    if (registered) {
      loginContainer.style.display = "flex";
      registerContainer.style.display = "none";
      showMessage("Registrazione completata con successo! Ora puoi effettuare il login.", "success");
    }
  
    // Eventuali errori registrazione (opzionale)
    if (reg_error) {
      loginContainer.style.display = "none";
      registerContainer.style.display = "flex";
      if (reg_error === "exists") showMessage("Username o email già registrati.", "error");
      else showMessage("Errore in fase di registrazione. Riprova.", "error");
    }
  
    // Switch manuale
    showRegister.addEventListener("click", function (e) {
      e.preventDefault();
      hideMessage();
      loginContainer.style.display = "none";
      registerContainer.style.display = "flex";
      history.replaceState(null, "", "Login.html?mode=register");
    });
  
    showLogin.addEventListener("click", function (e) {
      e.preventDefault();
      hideMessage();
      registerContainer.style.display = "none";
      loginContainer.style.display = "flex";
      history.replaceState(null, "", "Login.html?mode=login");
    });
  
    // LOGIN
    const loginUsername = document.getElementById("username");
    const loginPassword = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");
  
    function checkLoginInputs() {
      loginBtn.disabled = loginUsername.value.trim() === "" || loginPassword.value.trim() === "";
    }
    loginUsername.addEventListener("input", checkLoginInputs);
    loginPassword.addEventListener("input", checkLoginInputs);
    checkLoginInputs();
  
    // REGISTRAZIONE
    const regNome = document.getElementById("newName");
    const regCognome = document.getElementById("newCognome");
    const regEmail = document.getElementById("newMail");
    const regData = document.getElementById("data_nascita");
    const regUsername = document.getElementById("newUsername");
    const regPassword = document.getElementById("newPassword");
    const regBtn = document.getElementById("regBtn");
  
    regData.setAttribute("max", new Date().toISOString().split("T")[0]);
  
    function checkRegInputs() {
      const emailValida = regEmail.value.includes("@") && regEmail.value.includes(".");
      const tuttiCompilati =
        regNome.value.trim() !== "" &&
        regCognome.value.trim() !== "" &&
        emailValida &&
        regData.value.trim() !== "" &&
        regUsername.value.trim() !== "" &&
        regPassword.value.trim() !== "";
  
      regBtn.disabled = !tuttiCompilati;
    }
  
    [regNome, regCognome, regEmail, regData, regUsername, regPassword].forEach((field) => {
      field.addEventListener("input", checkRegInputs);
    });
    checkRegInputs();
  });