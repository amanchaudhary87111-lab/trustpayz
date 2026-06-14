/* ============================================================
   TrustPayZ — enhance.js
   Scroll progress bar + small interactive polish
   ============================================================ */

(function () {
  /* ── SCROLL PROGRESS BAR ── */
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  document.body.appendChild(bar);

  function updateProgress() {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled / height) * 100 : 0;
    bar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();
})();
