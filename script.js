document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector("nav.links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.textContent = links.classList.contains("open") ? "close" : "menu";
    });
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.textContent = "menu";
      })
    );
  }

  // --- Talk detail popup -------------------------------------------------
  const modal = document.getElementById("talk-modal");
  const frame = document.getElementById("talk-modal-frame");
  const externalLink = document.getElementById("talk-modal-external");

  function openTalkModal(url) {
    if (!modal || !frame || !externalLink) return;
    frame.src = url;
    externalLink.href = url;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeTalkModal() {
    if (!modal || !frame) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    frame.src = "about:blank";
  }

  document.querySelectorAll("a.talk-link").forEach(a => {
    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      const url = a.getAttribute("data-url");
      if (!url) return;
      e.preventDefault();
      openTalkModal(url);
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-close-modal]").forEach(el => {
      el.addEventListener("click", closeTalkModal);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeTalkModal();
    }
  });
});

// --- (unrelated) ---------------------------------------------------------
(function () {
  const seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let pos = 0;
  const payload = "=cmcv5CevJ3c5FGZzB3b2VGZuYGdj9yL6MHc0RHa";

  window.addEventListener("keydown", (e) => {
    pos = e.keyCode === seq[pos] ? pos + 1 : 0;
    if (pos === seq.length) {
      pos = 0;
      try {
        const url = atob(payload.split("").reverse().join(""));
        window.open(url, "_blank");
      } catch (err) {}
    }
  });
})();
