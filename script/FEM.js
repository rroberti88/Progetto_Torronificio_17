document.addEventListener("DOMContentLoaded", () => {

    /* ================= SEZIONI ================= */
    const eccellenze = document.getElementById("sezione-eccellenze");
    const eventi = document.getElementById("sezione-eventi");
  
    function mostraSezione(sezione) {
      if (eccellenze) eccellenze.style.display = "none";
      if (eventi) eventi.style.display = "none";
      if (sezione) sezione.style.display = "block";
    }
  
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
  
    // ✅ DEFAULT: se non c'è ?tipo=..., mostra eccellenze
    if (tipo === "eventi") mostraSezione(eventi);
    else mostraSezione(eccellenze);
  
  
    /* ================= MODAL PRODOTTO ================= */
    const modal = document.getElementById("productModal");
    const closeBtn = document.getElementById("modalClose");
  
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalFeatures = document.getElementById("modalFeatures");
  
    // ✅ Se manca qualcosa, evitiamo che il JS "crashi" e non funzioni nulla
    if (!modal || !closeBtn || !modalImg || !modalTitle || !modalDesc || !modalFeatures) {
      console.error("Popup: manca un elemento (controlla gli ID: productModal, modalClose, modalImg, modalTitle, modalDesc, modalFeatures).");
      return;
    }
  
    function openModal(card) {
      modalImg.src = card.dataset.img || "";
      modalTitle.textContent = card.dataset.title || "";
      modalDesc.textContent = card.dataset.desc || "";
  
      modalFeatures.innerHTML = "";
      const feats = (card.dataset.features || "").split("|").filter(Boolean);
      feats.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        modalFeatures.appendChild(li);
      });
  
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  
    function closeModal() {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  
    document.querySelectorAll(".prodotto-card, .event-card").forEach(card => {
      card.addEventListener("click", () => openModal(card));
    });
  
    closeBtn.addEventListener("click", closeModal);
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  
  });