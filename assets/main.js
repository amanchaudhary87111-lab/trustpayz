/* ============================================================
   TrustPayZ — main.js
   Fixes applied:
   1. Google Sheets capture working (paste your SHEET_URL below)
   2. Price field in contact form → % only
   3. Mobile alignment improved via JS (nav, form)
   4. SEO: structured data injected
   5. Home "Get instant money" form sends to same Sheet + WhatsApp
   ============================================================ */

/* ── PASTE YOUR GOOGLE APPS SCRIPT URL HERE ─────────────────── */
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzugF0sq9u2l6g-NwCXkbxYz2ezDrqzLbd1pKwux5n6humzk5btlePywTU4sjJFbGWGzQ/exec";
/* ──────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════
   1. GOOGLE SHEET HELPER
   ═══════════════════════════════════════════════════════════════ */
async function saveToSheet(data) {
  if (!SHEET_URL) return; // skip if URL not set yet
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors", // required for Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.warn("Sheet save failed:", e);
  }
}

/* ═══════════════════════════════════════════════════════════════
   2. NAV — burger menu + scroll shrink
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const burger = document.getElementById("burger");
  const links  = document.getElementById("links");
  const nav    = document.getElementById("nav");

  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      burger.textContent = open ? "✕" : "☰";
      burger.setAttribute("aria-expanded", open);
    });

    // Close menu when a link is tapped (mobile UX)
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        burger.textContent = "☰";
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target)) {
        links.classList.remove("open");
        burger.textContent = "☰";
      }
    });
  }

  // Scroll shrink
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }
})();

/* ═══════════════════════════════════════════════════════════════
   3. SCROLL REVEAL (rv elements)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const els = document.querySelectorAll(".rv");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

/* ═══════════════════════════════════════════════════════════════
   4. COUNTER ANIMATION (hero stats + pcard amount)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const dur    = 1400;
    const start  = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const v = Math.round(p * target);
      el.textContent = prefix + (target >= 10000 ? v.toLocaleString("en-IN") : v) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll("[data-count]").forEach(el => io.observe(el));
})();

/* ═══════════════════════════════════════════════════════════════
   5. PRICE FIELD — % ONLY (contact.html)
      Forces the "At what price" input to accept % values only.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const priceInput = document.getElementById("eq-price");
  if (!priceInput) return;

  // Update placeholder and hint
  priceInput.placeholder = "e.g. 1.5%";
  const hint = priceInput.closest(".rcol-r")?.querySelector(".hint");
  if (hint) hint.textContent = "Enter % only  (e.g. 1.5%, 2%)";

  // Auto-append % symbol on blur if user typed a number
  priceInput.addEventListener("blur", () => {
    let v = priceInput.value.trim();
    if (v && !v.includes("%")) {
      // Remove any ₹ or Rs prefix they may have typed
      v = v.replace(/[₹rRsS\s]/g, "");
      priceInput.value = v + "%";
    }
  });

  // Strip non-numeric/dot/% chars as they type
  priceInput.addEventListener("input", () => {
    priceInput.value = priceInput.value.replace(/[^0-9.%]/g, "");
  });
})();

/* ═══════════════════════════════════════════════════════════════
   6. CONTACT ENQUIRY FORM → Google Sheet + WhatsApp
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const btn = document.getElementById("eq-submit");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const name     = document.getElementById("eq-name")?.value.trim()     || "";
    const phone    = document.getElementById("eq-phone")?.value.trim()    || "";
    const amount   = document.getElementById("eq-amount")?.value.trim()   || "";
    const location = document.getElementById("eq-location")?.value.trim() || "";
    const price    = document.getElementById("eq-price")?.value.trim()    || "";
    const other    = document.getElementById("eq-other")?.value.trim()    || "";

    const req      = [...document.querySelectorAll('input[name="eq-req"]:checked')].map(r => r.value).join(", ");
    const rotating = [...document.querySelectorAll('input[name="eq-rotate"]:checked')].map(r => r.value).join(", ");

    // Basic validation
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending…";

    // — Save to Google Sheet —
    await saveToSheet({
      Source: "Contact Enquiry Form",
      Name: name,
      Phone: phone,
      "Required Amount": amount,
      Requirement: req,
      Location: location,
      "Rotating Via": rotating,
      Other: other,
      "Current Price": price
    });

    // — Open WhatsApp with pre-filled message —
    const msg = [
      `*TrustPayZ Enquiry*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Amount needed: ${amount || "Not specified"}`,
      `Requirement: ${req || "Not specified"}`,
      `Location: ${location || "Not specified"}`,
      rotating ? `Rotating via: ${rotating}` : "",
      other     ? `Other method: ${other}` : "",
      price     ? `Current price: ${price}` : ""
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/919911312139?text=${encodeURIComponent(msg)}`, "_blank");

    btn.textContent = "✓ Sent! Opening WhatsApp…";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Submit enquiry · Send on WhatsApp";
    }, 4000);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   7. HOME "GET INSTANT MONEY" / CALLBACK FORM → Same Sheet + WhatsApp
      Connects the #apply section form on index.html
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const btn = document.getElementById("f-submit");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const name  = document.getElementById("f-name")?.value.trim()  || "";
    const phone = document.getElementById("f-phone")?.value.trim() || "";
    const svc   = document.getElementById("f-svc")?.value          || "";

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending…";

    // — Save to same Google Sheet —
    await saveToSheet({
      Source: "Home Callback Form",
      Name: name,
      Phone: phone,
      Service: svc,
      "Required Amount": "",
      Requirement: svc
    });

    // — Open WhatsApp —
    const msg = [
      `*TrustPayZ Callback Request*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service needed: ${svc}`
    ].join("\n");

    window.open(`https://wa.me/919911312139?text=${encodeURIComponent(msg)}`, "_blank");

    btn.textContent = "✓ Request sent!";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Submit request";
    }, 4000);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   8. SEO — Structured Data (JSON-LD)
      Injected on every page so Google indexes TrustPayZ properly.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TrustPayZ",
    "description": "Turn your credit card limit into cash, clear card bills on time, card-to-card transfers. Safe, fast, 24/7. Serving Ghaziabad and Delhi NCR.",
    "url": "https://trustpayz.in",
    "telephone": "+919911312139",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mehrauli, near Mahagunpuram, near Indian Oil CNG station, NH24",
      "addressLocality": "Ghaziabad",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6692",
      "longitude": "77.4538"
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "1.75% – 2.4%",
    "areaServed": ["Ghaziabad", "Delhi", "Noida", "NCR"],
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919911312139",
      "contactType": "customer service",
      "availableLanguage": ["Hindi", "English"],
      "contactOption": "TollFree"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Credit Card Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Credit Card Bill Payment" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Credit Card to Bank Account Transfer" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Credit Card to Credit Card Transfer" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Instant Money from Credit Card" } }
      ]
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);
})();

/* ═══════════════════════════════════════════════════════════════
   9. "OTHER" CHECKBOX TOGGLE (contact.html)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const checkboxes = document.querySelectorAll('input[name="eq-rotate"]');
  const otherBox   = document.querySelector(".eother");
  if (!checkboxes.length || !otherBox) return;

  function toggleOther() {
    const checked = [...checkboxes].some(c => c.value === "Other" && c.checked);
    otherBox.style.display = checked ? "block" : "none";
  }
  checkboxes.forEach(c => c.addEventListener("change", toggleOther));
  toggleOther();
})();
