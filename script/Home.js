const SESSION_URL = "../script/session_user.php";
const LOGOUT_URL  = "../script/logout.php";

// ===================== SESSIONE E LOGOUT =====================
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

// ===================== APPLICA UI AUTENTICAZIONE =====================
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

// ===================== DOMCONTENTLOADED =====================
document.addEventListener("DOMContentLoaded", async function () {
  const loginLink = document.getElementById("login");

  // leggo sessione
  const session = await fetchSessionUser();
  const isAuth = session.authenticated;
  const username = session.username;

  // applica UI
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

  // ===================== CHI SIAMO =====================
// ===================== CHI SIAMO (4 PARTI, STESSA ALTEZZA) =====================
const btnChiSiamo = document.getElementById("btnChiSiamo");

if (btnChiSiamo) {
    btnChiSiamo.addEventListener("click", function () {
        Swal.fire({
            html: `
            <div style="
                display: flex;
                flex-direction: column;
                gap: 30px;
                font-family: Georgia, serif;
                max-width: 950px;
            ">
                <!-- ===================== RIGA 1: TESTO SINISTRA, IMMAGINE DESTRA ===================== -->
                <div style="
                    display: flex; 
                    flex-direction: row; 
                    gap: 20px; 
                    align-items: stretch; 
                    flex-wrap: wrap;
                ">
                    <div style="flex: 2; min-width: 250px; text-align: justify; line-height: 1.6; font-size: 0.95em; display: flex; flex-direction: column; justify-content: center;">
                        <h3>La nostra storia</h3>
                        <p>
                            Il torronificio Nardone, dal 1903, ha impiantato le proprie radici nella cittadina di Dentecane.
                            Da circa 3 generazioni la famiglia tramanda la ricetta originale dei prodotti, in particolar modo del Pannardone:
                            una variante del torrone classico alle mandorle con la base di pan di spagna imbevuta di liquore e ricoperta da 
                            puro cioccolato extra fondente con burro di cacao. 
                            Nonostante le radici ben salde nella tradizione l'azienda cerca sempre di restare al passo con la modernità,
                            proponendo continuamente innovazioni sia nella lavorazione che nei packaging.
                        </p>
                    </div>
                    <div style="flex: 1; min-width: 200px; display: flex; justify-content: center; align-items: center;">
                        <!-- SOSTITUISCI QUI IL PERCORSO DELLA TUA PRIMA IMMAGINE -->
                        <img src="../immagini jpg/caldaia2.jpg" alt="Chi siamo" style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 16px;
                            box-shadow: 0 8px 28px rgba(0,0,0,0.25);
                        ">
                    </div>
                </div>

                <!-- ===================== RIGA 2: IMMAGINE SINISTRA, TESTO DESTRA ===================== -->
                <div style="
                    display: flex; 
                    flex-direction: row; 
                    gap: 20px; 
                    align-items: stretch; 
                    flex-wrap: wrap;
                ">
                    <div style="flex: 1; min-width: 200px; display: flex; justify-content: center; align-items: center;">
                        <!-- SOSTITUISCI QUI IL PERCORSO DELLA TUA SECONDA IMMAGINE -->
                        <img src="../immagini jpg/torronificio.jpg" alt="Chi siamo" style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 16px;
                            box-shadow: 0 8px 28px rgba(0,0,0,0.25);
                        ">
                    </div>
                    <div style="flex: 2; min-width: 250px; text-align: justify; line-height: 1.6; font-size: 0.95em; display: flex; flex-direction: column; justify-content: center;">
                        <p>
                            La vasta gamma di prodotti si è estesa ulteriormente nei tempi recenti adattandosi al mercato con le monoporzioni: Torroncini,
                            Biscotti e Croccanti da gustare in pochi morsi ma che sono una prelibatezza per il palato; un'esplosione
                            unica di sapori che arrivano dritti al cuore dei clienti. 
                            L'azienda vanta anche, dal 2004, della certificazione ISO 9001: una certificazione che garantisce la gestione qualitativa dei 
                            processi di produzione dimostrando la salubrità e l'elevata qualità di tutti i prodotti di laboratorio. Permette anche la 
                            tracciabilità del prodotto e delle materie prime che lo compongono perché la qualità è l'interesse maggiore dell'azienda 
                            per garantire al cliente un'esperienza unica.
                            La gioia dei clienti è la nostra priorità assoluta: se il cliente mostra felicità e contentezza l'azienda Nardone è stata all'altezza.
                        </p>
                    </div>
                </div>
            </div>
            `,
            width: 950,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                popup: 'swal2-custom-popup'
            }
        });
    });
}
  // ===================== BLOCCO CARRELLO =====================
  // intercetta QUALSIASI link verso Carrello.html
  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // intercetta solo link verso Carrello.html
    if (!href.includes("Carrello.html")) return;

    // blocco default
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
          window.location.href = href;
        }
      });
      return;
    }

    // utente NON autenticato → popup login
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
});
