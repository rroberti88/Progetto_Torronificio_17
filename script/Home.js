const SESSION_URL = "../script/session_user.php";
const LOGOUT_URL  = "../script/logout.php";

async function doLogout() {
  const res = await fetch(LOGOUT_URL, { method: "POST", credentials: "include" });
  return res.ok;
}

async function fetchSessionUser() {
  try {
    const res = await fetch(SESSION_URL, {
      method: "GET",
      credentials: "include",
      headers: { "Accept": "application/json" }
    });

    if (!res.ok) return { authenticated: false, username: null };
    const data = await res.json();

    return {
      authenticated: !!data.authenticated,
      username: data.username || null
    };
  } catch (e) {
    return { authenticated: false, username: null };
  }
}

function applyAuthUI(isAuth, username) {
  const loginLink = document.getElementById("login");
  const saluto = document.getElementById("salutoUtente");
  const categorie = document.getElementById("categoriePrincipali");

  if (isAuth) {
    if (loginLink) loginLink.classList.add("hidden");

    if (saluto) {
      saluto.textContent = `Ciao, ${username}`;
      saluto.classList.remove("hidden");
      saluto.style.cursor = "pointer";

      // logout popup
      saluto.addEventListener("click", function () {
        Swal.fire({
          title: "Vuoi effettuare il logout?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Logout",
          cancelButtonText: "Annulla",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const ok = await doLogout();
            if (ok) {
            localStorage.removeItem("cart"); 
            window.location.href = "Home.html";
            } else {
              Swal.fire("Errore", "Logout non riuscito.", "error");
            }
          }
        });
      });
    }

    if (categorie) categorie.classList.remove("hidden");
  } else {
    if (loginLink) loginLink.classList.remove("hidden");
    if (saluto) saluto.classList.add("hidden");
    if (categorie) categorie.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const loginLink = document.getElementById("login");
  const carrello = document.getElementById("carrello");

  // leggo sessione
  const session = await fetchSessionUser();
  const isAuth = session.authenticated;
  const username = session.username;

  // UI
  applyAuthUI(isAuth, username);

  // popup login/registrazione solo se NON autenticato
  if (loginLink) {
    loginLink.addEventListener("click", function (e) {
      if (isAuth) return;
      e.preventDefault();

      Swal.fire({
        title: "Hai già un account?",
        imageUrl: "../immagini jpg/LogoNardone.jpg",
        imageWidth: 120,
        imageHeight: 80,
        imageAlt: "Logo Torronificio Nardone",
        showCancelButton: true,
        confirmButtonText: "Sì, intendo loggarmi",
        cancelButtonText: "No, procedo con la registrazione",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "Login.html?mode=login";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = "Login.html?mode=register";
        }
      });
    });
  }

  // chi siamo (come avevi tu)
  const btnChiSiamo = document.getElementById("btnChiSiamo");
  const storia = document.getElementById("storia");
  const overlay = document.getElementById("overlay");

  if (btnChiSiamo && storia && overlay) {
    btnChiSiamo.addEventListener("click", function () {
      storia.classList.add("active");
      overlay.classList.add("active");
    });

    overlay.addEventListener("click", function () {
      storia.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  // carrello: popup diverso se auth / no-auth
  if (carrello) {
    carrello.addEventListener("click", function (e) {
      e.preventDefault();

      if (isAuth) {
        Swal.fire({
          title: "Vuoi andare al carrello?",
          text: "Conferma per procedere",
          imageUrl: "../immagini jpg/LogoNardone.jpg",
          imageWidth: 120,
          imageHeight: 80,
          imageAlt: "Logo Torronificio Nardone",
          showCancelButton: true,
          confirmButtonText: "Sì",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = carrello.getAttribute("href");
          }
        });
        return;
      }

      Swal.fire({
        icon: "warning",
        title: "Devi autenticarti prima",
        text: "Per accedere al carrello effettua il login.",
        imageUrl: "../immagini jpg/LogoNardone.jpg",
        imageWidth: 120,
        imageHeight: 80,
        imageAlt: "Logo Torronificio Nardone",
        showCancelButton: true,
        confirmButtonText: "Vai al login",
        cancelButtonText: "Annulla",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "Login.html?mode=login";
        }
      });
    });
  }
});