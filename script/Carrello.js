function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function formatEuro(n) {
    return "€" + n.toFixed(2).replace(".", ",");
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

function renderCart() {
    const cart = getCart();
    const container = document.querySelector("#carrello-items");
    const subtotaleEl = document.querySelector("#subtotale");
    const spedizioneEl = document.querySelector("#spedizione");
    const totaleEl = document.querySelector("#totale");

    if (!container) return;

    container.innerHTML = "";
    if (cart.length === 0) {
        container.innerHTML = `<p>Il carrello è vuoto</p>`;
        if(subtotaleEl) subtotaleEl.textContent = formatEuro(0);
        if(spedizioneEl) spedizioneEl.textContent = formatEuro(0);
        if(totaleEl) totaleEl.textContent = formatEuro(0);
        updateCartBadge();
        return;
    }

    let totale = 0;
    cart.forEach(item => {
        const subtotaleItem = item.prezzo * item.qty;
        totale += subtotaleItem;

        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
            <div class="cart-left">
                <img src="${item.img}" alt="${item.nome}" class="cart-img">
                <div class="cart-info">
                    <p class="cart-name">${item.nome}</p>
                    <p class="cart-price">${formatEuro(item.prezzo)}</p>
                </div>
            </div>
            <div class="cart-right">
                <div class="cart-qty">
                    <button class="qty-minus">-</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-plus">+</button>
                </div>
                <p class="cart-subtotal">${formatEuro(subtotaleItem)}</p>
                <button class="cart-remove">Rimuovi</button>
            </div>
        `;

        row.querySelector(".qty-minus").addEventListener("click", () => {
            const c = getCart();
            const p = c.find(x => x.id === item.id);
            if(!p) return;
            p.qty--;
            if(p.qty <= 0) saveCart(c.filter(x => x.id !== item.id));
            else saveCart(c);
            renderCart();
        });

        row.querySelector(".qty-plus").addEventListener("click", () => {
            const c = getCart();
            const p = c.find(x => x.id === item.id);
            if(!p) return;
            p.qty++;
            saveCart(c);
            renderCart();
        });

        row.querySelector(".cart-remove").addEventListener("click", () => {
            saveCart(getCart().filter(x => x.id !== item.id));
            renderCart();
        });

        container.appendChild(row);
    });

    if(subtotaleEl) subtotaleEl.textContent = formatEuro(totale);
    if(spedizioneEl) spedizioneEl.textContent = formatEuro(0);
    if(totaleEl) totaleEl.textContent = formatEuro(totale);
    updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
