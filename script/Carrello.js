function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function formatEuro(n) {
    return "€" + Number(n).toFixed(2).replace(".", ",");
  }
  
  function updateCartBadge() {
    const cart = getCart();
    const totaleQta = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
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
  
  function clampQty(v) {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? Math.max(1, n) : 1;
  }
  
  function setItemQty(id, newQty) {
    const cart = getCart();
    const p = cart.find(x => x.id === id);
    if (!p) return;
    p.qty = clampQty(newQty);
    saveCart(cart);
  }
  
  function removeItem(id) {
    saveCart(getCart().filter(x => x.id !== id));
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
      container.innerHTML = `<p class="carrello-vuoto">Il carrello è vuoto.</p>`;
      if (subtotaleEl) subtotaleEl.textContent = formatEuro(0);
      if (spedizioneEl) spedizioneEl.textContent = formatEuro(0);
      if (totaleEl) totaleEl.textContent = formatEuro(0);
      updateCartBadge();
      return;
    }
  
    let totale = 0;
  
    cart.forEach((item) => {
      const prezzo = Number(item.prezzo) || 0;
      const qty = clampQty(item.qty);
      const subtotaleItem = prezzo * qty;
      totale += subtotaleItem;
  
      const row = document.createElement("div");
      row.className = "carrello-item";
  
      // ✅ 1ª colonna: X + immagine affiancate (NON sovrapposte)
      row.innerHTML = `
  <div class="product-cell">
    <button class="remove-btn" type="button" title="Rimuovi">✕</button>
    <div class="thumb">
      <img src="${item.img}" alt="${item.nome}">
    </div>
  </div>

  <div class="cart-name-cell" title="${item.nome}">${item.nome}</div>

  <div class="money">${formatEuro(prezzo)}</div>

  <div class="qty-wrap">
    <input class="qty-input" type="number" min="1" value="${qty}">
  </div>

  <div class="money">${formatEuro(subtotaleItem)}</div>
`;

      row.querySelector(".remove-btn").addEventListener("click", () => {
        removeItem(item.id);
        renderCart();
      });
  
      row.querySelector(".qty-input").addEventListener("change", (e) => {
        setItemQty(item.id, e.target.value);
        renderCart();
      });
  
      container.appendChild(row);
    });
  
    if (subtotaleEl) subtotaleEl.textContent = formatEuro(totale);
    if (spedizioneEl) spedizioneEl.textContent = formatEuro(0);
    if (totaleEl) totaleEl.textContent = formatEuro(totale);
  
    updateCartBadge();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartBadge();
  });