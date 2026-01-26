document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("searchBar");
    const categorieLinks = document.querySelectorAll(".categoria");
    const prodotti = document.querySelectorAll(".lista-prodotti .prodotto"); // SOLO prodotti veri
    const sezioni = document.querySelectorAll(".sezione-prodotti");
    const noResults = document.getElementById("noResults");
    const titoloCategoria = document.getElementById("titolo-categoria");

    let currentCategory = "all";

    function getNomeCategoriaAttiva() {
        const linkAttivo = document.querySelector(".categoria.active");
        return linkAttivo ? linkAttivo.textContent.trim() : "Tutti i prodotti";
    }

    function filterProducts() {
        const searchTerm = searchBar.value.toLowerCase().trim();
        let visibleCount = 0;

        // 1) Filtra i singoli prodotti
        prodotti.forEach(prodotto => {
            const nome = prodotto.querySelector(".nome-prodotto")?.textContent.toLowerCase() || "";
            const category = prodotto.dataset.category;

            const okCategoria = (currentCategory === "all" || currentCategory === category);
            const okRicerca = nome.includes(searchTerm);

            if (okCategoria && okRicerca) {
                prodotto.style.display = "block";
                visibleCount++;
            } else {
                prodotto.style.display = "none";
            }
        });

        // 2) Nascondi/mostra le sezioni in base ai prodotti visibili dentro
        sezioni.forEach(sezione => {
            const prodottiInSezione = sezione.querySelectorAll(".lista-prodotti .prodotto");
            let almenoUnoVisibile = false;

            prodottiInSezione.forEach(p => {
                if (p.style.display !== "none") almenoUnoVisibile = true;
            });

            sezione.style.display = almenoUnoVisibile ? "block" : "none";
        });

        // 3) No results
        noResults.style.display = visibleCount === 0 ? "block" : "none";

        // 4) Aggiorna titolo sopra
        const nomeCat = (currentCategory === "all") ? "Tutti i prodotti" : getNomeCategoriaAttiva();
        if (searchTerm.length > 0) {
            titoloCategoria.textContent = `${nomeCat} — risultati per: "${searchBar.value.trim()}"`;
        } else {
            titoloCategoria.textContent = nomeCat;
        }
    }

    // Ricerca
    searchBar.addEventListener("input", filterProducts);

    // Click categoria
    categorieLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            categorieLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            currentCategory = this.dataset.category;
            filterProducts();
        });
    });

    filterProducts();
});