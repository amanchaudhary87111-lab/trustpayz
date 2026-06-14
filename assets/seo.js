/* ============================================================
   TrustPayZ — seo.js
   Full SEO: Schema, FAQ, Breadcrumbs, LocalBusiness
   ============================================================ */

(function () {

  /* ── 1. LOCAL BUSINESS SCHEMA ── */
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "TrustPayZ",
    "alternateName": "Trust PayZ",
    "description": "TrustPayZ offers credit card to bank account transfers, credit card bill payments, card to card transfers and instant money services in Ghaziabad and Delhi NCR. Safe, fast and available 24/7.",
    "url": "https://trustpayz.in",
    "logo": "https://trustpayz.in/assets/logo.png",
    "image": "https://trustpayz.in/assets/logo.png",
    "telephone": "+919911312139",
    "priceRange": "1.75% – 2.4%",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Credit Card",
    "openingHours": "Mo-Su 00:00-24:00",
    "areaServed": [
      { "@type": "City", "name": "Ghaziabad" },
      { "@type": "City", "name": "Noida" },
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Greater Noida" },
      { "@type": "City", "name": "Lucknow" },
      { "@type": "City", "name": "Indirapuram" },
      { "@type": "City", "name": "Vaishali" },
      { "@type": "City", "name": "Vasundhara" },
      { "@type": "City", "name": "Faridabad" },
      { "@type": "City", "name": "Gurugram" }
    ],
    "location": [
      {
        "@type": "Place",
        "name": "TrustPayZ — Mehrauli Branch",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ansal Tanushree, Near Mahagunpuram, Indian Oil CNG Station, Mehrauli, NH24",
          "addressLocality": "Ghaziabad",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201010",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "28.6692",
          "longitude": "77.4538"
        }
      },
      {
        "@type": "Place",
        "name": "TrustPayZ — Jaipuria Sunrise Greens Branch",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shop No. UG15, Esquire Market, Ruchira Sapphire, Jaipuria Sunrise Greens, Near Rise Organic Homes, NH24",
          "addressLocality": "Ghaziabad",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201010",
          "addressCountry": "IN"
        }
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919911312139",
      "contactType": "customer service",
      "availableLanguage": ["Hindi", "English"],
      "hoursAvailable": "Mo-Su 00:00-24:00"
    },
    "sameAs": [
      "https://wa.me/919911312139"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Credit Card Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Credit Card to Bank Account Transfer",
            "description": "Transfer your credit card limit directly to your bank account. Charges from 1.75% per month."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Credit Card Bill Payment",
            "description": "We pay your credit card bill on time so you avoid late fees and penalties."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Credit Card to Credit Card Transfer",
            "description": "Transfer money from any credit card to any credit card. Charges from 1.8% per month."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instant Money from Credit Card",
            "description": "Get instant money from your credit card limit — digitally or in-person swipe at our Ghaziabad office."
          }
        }
      ]
    }
  };

  /* ── 2. FAQ SCHEMA ── */
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does TrustPayZ work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TrustPayZ helps you turn your credit card limit into cash in your bank account, pay your card bills on time, or transfer money card to card. Just WhatsApp us on 9911312139 or fill the form and we handle everything safely."
        }
      },
      {
        "@type": "Question",
        "name": "What are TrustPayZ charges for credit card to bank transfer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For Visa and MasterCard, charges are 2.15% for single month. For monthly rotation above 10 lakhs, charges go as low as 1.9%. RuPay charges are slightly higher."
        }
      },
      {
        "@type": "Question",
        "name": "Is TrustPayZ safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TrustPayZ handles all transactions safely and confidentially. Your card and personal details are never shared with anyone."
        }
      },
      {
        "@type": "Question",
        "name": "Where is TrustPayZ located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TrustPayZ has two locations in Ghaziabad: (1) Ansal Tanushree, Near Mahagunpuram, Indian Oil CNG Station, Mehrauli, NH24 and (2) Shop No. UG15, Esquire Market, Ruchira Sapphire, Jaipuria Sunrise Greens, NH24, Ghaziabad."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum and maximum amount for credit card transfer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TrustPayZ handles credit card transfers from ₹5 Lakhs up to ₹50 Lakhs per request."
        }
      },
      {
        "@type": "Question",
        "name": "How to contact TrustPayZ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reach TrustPayZ 24/7 on WhatsApp or call 9911312139. You can also fill the enquiry form on our website at trustpayz.in/contact.html"
        }
      },
      {
        "@type": "Question",
        "name": "Does TrustPayZ provide card swipe on POS machine and home service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TrustPayZ provides card swipe facility on our own POS machine at our Ghaziabad office. Home service is also available — we can come to you anywhere in Ghaziabad, Noida and Delhi NCR."
        }
      },
      {
        "@type": "Question",
        "name": "Is TrustPayZ a utility or education payment portal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. TrustPayZ is a Non-Utility and Non-Education portal. We only process personal credit card transactions such as card to bank transfer, card to card transfer and credit card bill payments."
        }
      },
      {
        "@type": "Question",
        "name": "Which cities does TrustPayZ serve for credit card to cash and transfers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TrustPayZ provides credit card to bank transfer, credit card to credit card payment and credit card to cash services in Ghaziabad, Noida, Greater Noida, Delhi, Lucknow, Faridabad and Gurugram."
        }
      }
    ]
  };

  /* ── 3. BREADCRUMB SCHEMA ── */
  const path = window.location.pathname;
  let breadcrumb = null;

  const pageMap = {
    "/about.html":    [["Home","https://trustpayz.in/"],["About","https://trustpayz.in/about.html"]],
    "/features.html": [["Home","https://trustpayz.in/"],["Features","https://trustpayz.in/features.html"]],
    "/pricing.html":  [["Home","https://trustpayz.in/"],["Pricing","https://trustpayz.in/pricing.html"]],
    "/contact.html":  [["Home","https://trustpayz.in/"],["Contact","https://trustpayz.in/contact.html"]]
  };

  const crumbItems = pageMap[path];
  if (crumbItems) {
    breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": crumbItems.map(([name, url], i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": name,
        "item": url
      }))
    };
  }

  /* ── INJECT ALL SCHEMAS ── */
  [localBusiness, faq, breadcrumb].filter(Boolean).forEach(schema => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  });

})();
