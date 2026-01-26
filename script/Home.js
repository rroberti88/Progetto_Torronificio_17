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
  
    const userIcon = document.getElementById("login");
    if (!userIcon) {
      console.error("Icona/login link non trovato!");
      return;
    }
  
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
          // premuto "No, procedo con la registrazione"
          window.location.href = "Login.html?mode=register";
        } else {
          // click fuori / ESC / X
          window.location.href = "Home.html";
        }
      });
    });
  });