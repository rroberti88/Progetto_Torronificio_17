// shop.js – gestione aggiunta prodotti al carrello

// Recupera carrello dal localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Salva carrello su localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Aggiorna badge carrello
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

// Funzione per aggiungere prodotto al carrello
function addToCart(nome, prezzo, img, id) {
    const cart = getCart();
    const itemInCart = cart.find(i => i.id === id);

    if(itemInCart){
        itemInCart.qty += 1;
    } else {
        cart.push({ id, nome, prezzo, img, qty: 1 });
    }

    saveCart(cart);
    updateCartBadge();

    // Avviso con SweetAlert2
    Swal.fire({
        icon: 'success',
        title: 'Aggiunto al carrello',
        text: nome,
        timer: 1200,
        showConfirmButton: false
    });
}

// Inizializzazione
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();

    // Event delegation: ascolta tutti i click su bottoni all'interno di ".shop"
    const shopContainer = document.querySelector(".shop");
    if (!shopContainer) return;

    shopContainer.addEventListener("click", function(e) {
        if (e.target.tagName === "BUTTON") {
            const prodEl = e.target.closest(".prodotto");
            if (!prodEl) return;

            const nome = prodEl.querySelector(".nome-prodotto").textContent.trim();
            const prezzoText = prodEl.querySelector(".prezzo").textContent.replace("€","").replace(",",".").trim();
            const prezzo = parseFloat(prezzoText) || 0;
            const img = prodEl.querySelector("img").src;

            // Generiamo un id univoco basato sull'index tra i fratelli
            const parentList = prodEl.parentElement;
            const children = Array.from(parentList.querySelectorAll(".prodotto"));
            const id = children.indexOf(prodEl) + 1;

            addToCart(nome, prezzo, img, id);
        }
    });
});
