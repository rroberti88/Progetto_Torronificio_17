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
