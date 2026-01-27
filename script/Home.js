document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.getElementById("login");
    if (!userIcon) return;

    userIcon.addEventListener("click", function (e) {
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
});

document.addEventListener("DOMContentLoaded", function () {

    const btnChiSiamo = document.getElementById("btnChiSiamo");
    const storia = document.getElementById("storia");
    const overlay = document.getElementById("overlay");

    if (!btnChiSiamo || !storia || !overlay) return;

    // Apri storia
    btnChiSiamo.addEventListener("click", function () {
        storia.classList.add("active");
        overlay.classList.add("active");
    });

    // Chiudi cliccando sull’overlay
    overlay.addEventListener("click", function () {
        storia.classList.remove("active");
        overlay.classList.remove("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const carrello = document.getElementById("carrello");
    if (carrello) {
      carrello.addEventListener("click", function (e) {
        e.preventDefault();
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
      });
    } else {
      console.error("Link carrello non trovato!");
    }
    
    
});