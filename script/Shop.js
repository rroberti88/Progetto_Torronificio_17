document.addEventListener("DOMContentLoaded", () => {
    // ====== ELEMENTI UI ======
    const searchBar = document.getElementById("searchBar");
    const categorieLinks = document.querySelectorAll(".categoria");
    const prodotti = document.querySelectorAll(".lista-prodotti .prodotto"); // solo card vere
    const sezioni = document.querySelectorAll(".sezione-prodotti");
    const noResults = document.getElementById("noResults");
    const titoloCategoria = document.getElementById("titolo-categoria");
  
    let currentCategory = "all";
  
    // ====== (OPZIONALE) categoria da URL ?categoria=torrone ======
    const params = new URLSearchParams(window.location.search);
    const catFromHome = params.get("categoria");
    if (catFromHome) {
      currentCategory = catFromHome;
      categorieLinks.forEach(l => l.classList.remove("active"));
      const toActive = document.querySelector(`.categoria[data-category="${catFromHome}"]`);
      if (toActive) toActive.classList.add("active");
    }
  
    function filterProducts() {
      const searchTerm = (searchBar?.value || "").toLowerCase().trim();
      let visibleCount = 0;
  
      // 1) filtra prodotti
      prodotti.forEach(card => {
        const nome = (card.querySelector(".nome-prodotto")?.textContent || "").toLowerCase();
        const category = card.dataset.category || "";
  
        const titoliSezione = document.querySelectorAll(".titolo-sezione");
        titoliSezione.forEach(t => {
        t.style.display = (currentCategory === "all") ? "" : "none";
        });

        const okCategoria = (currentCategory === "all" || currentCategory === category);
        const okRicerca = (searchTerm === "" || nome.includes(searchTerm));
  
        if (okCategoria && okRicerca) {
          card.style.display = "";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });
  
      // 2) nascondi/mostra sezioni se vuote
      sezioni.forEach(sezione => {
        const cards = sezione.querySelectorAll(".lista-prodotti .prodotto");
        const anyVisible = Array.from(cards).some(p => p.style.display !== "none");
        sezione.style.display = anyVisible ? "" : "none";
      });
  
      // 3) messaggio "nessun prodotto"
      if (noResults) noResults.style.display = visibleCount === 0 ? "block" : "none";
  
      // 4) titolo sopra (se esiste)
      if (titoloCategoria) {
        const nomeCat =
          currentCategory === "all"
            ? "Tutti i prodotti"
            : (document.querySelector(".categoria.active")?.textContent.trim() || "Prodotti");
  
        if (searchTerm) {
          titoloCategoria.textContent = `${nomeCat} — risultati per: "${searchBar.value.trim()}"`;
        } else {
          titoloCategoria.textContent = nomeCat;
        }
      }
    }
  
    // eventi filtro
    if (searchBar) searchBar.addEventListener("input", filterProducts);
  
    categorieLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        categorieLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
  
        currentCategory = link.dataset.category || "all";
        filterProducts();
      });
    });
  
    // ====== CARRELLO (localStorage) ======
    function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }
  
    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function updateCartBadge() {
      const cart = getCart();
      const totaleQta = cart.reduce((sum, item) => sum + item.qty, 0);
      const carrelloLink = document.querySelector("#carrello");
      if (!carrelloLink) return;
  
      let badge = carrelloLink.querySelector(".cart-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-badge";
  
        carrelloLink.style.position = "relative";
        badge.style.position = "absolute";
        badge.style.top = "-8px";
        badge.style.right = "-10px";
        badge.style.background = "red";
        badge.style.color = "white";
        badge.style.fontSize = "12px";
        badge.style.fontWeight = "700";
        badge.style.padding = "2px 6px";
        badge.style.borderRadius = "999px";
        badge.style.lineHeight = "1";
  
        carrelloLink.appendChild(badge);
      }
  
      badge.textContent = totaleQta;
      badge.style.display = totaleQta > 0 ? "inline-block" : "none";
    }
  
    function addToCart({ id, nome, prezzo, img }) {
      const cart = getCart();
      const existing = cart.find(i => i.id === id);
  
      if (existing) existing.qty += 1;
      else cart.push({ id, nome, prezzo, img, qty: 1 });
  
      saveCart(cart);
      updateCartBadge();
  
      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: "success",
          title: "Aggiunto al carrello",
          text: nome,
          timer: 1200,
          showConfirmButton: false
        });
      }
    }
  
    updateCartBadge();
  
    // click sui bottoni "Aggiungi al carrello"
    const shopContainer = document.querySelector(".shop");
    if (shopContainer) {
      shopContainer.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
  
        const prodEl = btn.closest(".prodotto");
        if (!prodEl) return;
  
        const nome = prodEl.querySelector(".nome-prodotto")?.textContent?.trim() || "Prodotto";
        const prezzoText = (prodEl.querySelector(".prezzo")?.textContent || "€0")
          .replace("€", "")
          .replace(",", ".")
          .trim();
        const prezzo = parseFloat(prezzoText) || 0;
        const img = prodEl.querySelector("img")?.src || "";
  
        // ID stabile: meglio nome (o data-id se lo aggiungi in HTML)
        const id = prodEl.dataset.id || nome;
  
        addToCart({ id, nome, prezzo, img });
      });
    }
  
    // prima applicazione filtro
    filterProducts();
  });