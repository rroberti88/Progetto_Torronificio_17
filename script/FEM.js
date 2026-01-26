document.addEventListener("DOMContentLoaded", function() {
    // Riferimenti alle sezioni
    const eccellenze = document.getElementById("sezione-eccellenze");
    const eventi = document.getElementById("sezione-eventi");

    // Funzione per mostrare solo la sezione desiderata
    function mostraSezione(sezioneDaMostrare) {
        eccellenze.style.display = "none";
        eventi.style.display = "none";
        sezioneDaMostrare.style.display = "block";
    }

    // Controllo query string per capire quale sezione mostrare
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo"); // 'eccellenze' o 'eventi'

    if (tipo === "eccellenze") {
        mostraSezione(eccellenze);
    } else if (tipo === "eventi") {
        mostraSezione(eventi);
    }
});