document.addEventListener("DOMContentLoaded", function () {
    const carrello = document.getElementById("carrello");
    if (!carrello) {
        console.error("Link carrello non trovato!");
        return;
    }
    carrello.addEventListener("click", function(e){
        e.preventDefault(); // blocca temporaneamente il link
        Swal.fire({
            title: 'Vuoi andare al carrello?',
            text: 'Conferma per procedere',
            imageUrl: "../immagini jpg/LogoNardone.jpg",
            imageWidth: 120, // larghezza dell'immagine
            imageHeight: 80, // altezza dell'immagine
            imageAlt: "Logo Torronificio Nardone",
            showCancelButton: true,
            confirmButtonText: 'Sì',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = carrello.getAttribute("href");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const userIcon = document.getElementById("login");

    login.addEventListener("click", function(e) {
        e.preventDefault();

        Swal.fire({
            title: 'Hai già un account?',
            imageUrl: "../immagini jpg/LogoNardone.jpg",
            imageWidth: 120, // larghezza dell'immagine
            imageHeight: 80, // altezza dell'immagine
            imageAlt: "Logo Torronificio Nardone",
            showCancelButton: true,
            confirmButtonText: 'Sì, intendo loggarmi',
            cancelButtonText: 'No, procedo con la registrazione'
        }).then((result) => {
            if (result.isConfirmed) {
                // Vai alla pagina login mostrando il modulo login
                window.location.href = "Login.html?mode=login";
            } else {
                // Vai alla pagina login mostrando il modulo registrazione
                window.location.href = "Login.html?mode=register";
            }
        });
    });
});