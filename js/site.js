/* Gulfcoast Charm — site behaviour + configuration
   ---------------------------------------------------------------
   CONFIG: fill these in as services go live. Nothing else needs editing.
*/
const GC = {
  // OwnerRez → Settings → Widgets. Create a "Booking/Inquiry" widget for the property,
  // then paste the property ID (orp…) and widget ID (orw…) here.
  ownerrez: {
    propertyId: "168bb5192e3b4ab4a17d3141af0b7eee",
    widgetId: "e9510e2972d44301bae6e387376981f2",
    widgetType: "Website booking - Booking/Inquiry",
    hostedUrl: "https://app.ownerrez.com/widgets/e9510e2972d44301bae6e387376981f2?view=form&propertyKey=168bb5192e3b4ab4a17d3141af0b7eee"
  },

  // Formspree form IDs (https://formspree.io/forms). Used until OwnerRez handles inquiries.
  formspree: { stay: "", court: "", gather: "" },

  // Starting nightly rate shown on the booking panel. Leave null to hide the number.
  nightlyFrom: null,

  // Platform listings, only if you keep them as a secondary channel. Leave "" to hide.
  airbnb: "",
  vrbo: "",

  // Google Maps embed URL (Share → Embed a map → copy the src). Leave "" to hide the map.
  mapEmbed: "https://www.google.com/maps?q=South+Pasadena,+FL+33707&z=13&output=embed",

  // Shop
  shop: "https://shop.gulfcoastcharm.com"
};

(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Header: transparent over the hero, solid after scroll */
  var header = $(".site-header");
  function onScroll() { if (header) header.classList.toggle("solid", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  var burger = $(".burger"), mnav = $(".mobile-nav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", mnav).forEach(function (a) {
      a.addEventListener("click", function () { mnav.classList.remove("open"); document.body.style.overflow = ""; });
    });
  }

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* Lightbox for any [data-gallery] group */
  var items = $$("[data-gallery] a");
  if (items.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = '<button class="x" aria-label="Close">&times;</button><button class="prev" aria-label="Previous">&lsaquo;</button><img alt=""><button class="next" aria-label="Next">&rsaquo;</button>';
    document.body.appendChild(lb);
    var img = $("img", lb), i = 0;
    var show = function (n) {
      i = (n + items.length) % items.length;
      img.src = items[i].getAttribute("href");
      var inner = items[i].querySelector("img");
      img.alt = inner ? inner.alt : "";
      lb.classList.add("open");
    };
    var hide = function () { lb.classList.remove("open"); };
    items.forEach(function (a, n) { a.addEventListener("click", function (e) { e.preventDefault(); show(n); }); });
    $(".x", lb).onclick = hide;
    $(".prev", lb).onclick = function () { show(i - 1); };
    $(".next", lb).onclick = function () { show(i + 1); };
    lb.addEventListener("click", function (e) { if (e.target === lb) hide(); });
    window.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  }

  /* OwnerRez booking widget, with the inquiry form as the fallback until it is configured */
  var orMount = $("#ownerrez");
  if (orMount) {
    var pid = GC.ownerrez.propertyId, wid = GC.ownerrez.widgetId, wtype = GC.ownerrez.widgetType || "Booking/Inquiry";
    if (pid && wid) {
      var w = document.createElement("div");
      w.className = "ownerrez-widget";
      w.setAttribute("data-propertyId", pid);
      w.setAttribute("data-widget-type", wtype);
      w.setAttribute("data-widgetId", wid);
      orMount.appendChild(w);
      var s = document.createElement("script");
      s.src = "https://app.ownerrez.com/widget.js";
      s.async = true;
      document.body.appendChild(s);
      $$("[data-until-engine]").forEach(function (el) { el.hidden = true; });
    } else {
      $$("[data-when-engine]").forEach(function (el) { el.hidden = true; });
    }
  }

  /* Hosted booking page links */
  $$("[data-hosted-booking]").forEach(function (a) { if (GC.ownerrez.hostedUrl) a.href = GC.ownerrez.hostedUrl; else a.hidden = true; });

  /* Formspree IDs */
  $$("form[data-form]").forEach(function (f) {
    var id = GC.formspree[f.getAttribute("data-form")];
    if (id) f.action = "https://formspree.io/f/" + id;
  });

  /* Nightly rate */
  $$("[data-price-block]").forEach(function (block) {
    if (!GC.nightlyFrom) { block.hidden = true; return; }
    $$("[data-nightly]", block).forEach(function (el) { el.textContent = "$" + GC.nightlyFrom; });
    $$("[data-per-person]", block).forEach(function (el) { el.textContent = "$" + Math.round(GC.nightlyFrom / 8); });
  });

  /* Platform links */
  $$("[data-platforms]").forEach(function (el) {
    if (!GC.airbnb && !GC.vrbo) { el.hidden = true; return; }
    var a = $("[data-airbnb]", el), v = $("[data-vrbo]", el);
    if (a) { if (GC.airbnb) a.href = GC.airbnb; else a.hidden = true; }
    if (v) { if (GC.vrbo) v.href = GC.vrbo; else v.hidden = true; }
  });

  /* Map */
  var map = $("[data-map]");
  if (map) {
    if (GC.mapEmbed) {
      var f = document.createElement("iframe");
      f.className = "map"; f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
      f.src = GC.mapEmbed; f.title = "Map";
      map.appendChild(f);
    } else { map.hidden = true; }
  }

  /* Shop links + footer year */
  $$("[data-shop]").forEach(function (a) { a.href = GC.shop; });
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
