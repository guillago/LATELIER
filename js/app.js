(function () {
  "use strict";
  var CFG = window.ATELIER || {};
  var OEUVRES = window.OEUVRES || [];

  var CATS = {
    "marque-page": { label: "Marque-page", pluriel: "Marque-pages", couleur: "var(--sauge)" },
    "carte":       { label: "Carte",       pluriel: "Cartes",        couleur: "var(--lagon)" },
    "grand":       { label: "Grand format", pluriel: "Grands formats", couleur: "var(--framboise)" },
    "cadre":       { label: "Encadré",     pluriel: "Encadrés",      couleur: "var(--miel)" }
  };

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function prix(p) { return p ? esc(p) : "Prix au stand"; }

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  toggle.addEventListener("click", function () {
    var ouvert = menu.classList.toggle("ouvert");
    toggle.setAttribute("aria-expanded", ouvert);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("ouvert"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Formats ---------- */
  var formats = document.getElementById("formats");
  (CFG.formats || []).forEach(function (f) {
    var nb = OEUVRES.filter(function (o) { return o.cat === f.cat; }).length;
    var c = el("article", { "class": "format", style: "--c:" + (CATS[f.cat] ? CATS[f.cat].couleur : "var(--lagon)") });
    c.innerHTML = '<span class="nb">' + nb + ' modèles</span><h3>' + esc(f.nom) + '</h3><p>' + esc(f.detail) + '</p><p class="prix">' + prix(f.prix) + "</p>";
    formats.appendChild(c);
  });

  /* ---------- Filtres + galerie ---------- */
  var filtres = document.getElementById("filtres");
  var galerie = document.getElementById("galerie");
  var visibles = [];
  var choix = [["tout", "Tout voir"]].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k].pluriel]; }));

  choix.forEach(function (c, i) {
    var b = el("button", { "class": "filtre", role: "tab", "aria-selected": i === 0 ? "true" : "false", "data-cat": c[0] }, esc(c[1]));
    b.addEventListener("click", function () {
      filtres.querySelectorAll(".filtre").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
      b.setAttribute("aria-selected", "true");
      afficher(c[0]);
    });
    filtres.appendChild(b);
  });

  function afficher(cat) {
    galerie.innerHTML = "";
    visibles = OEUVRES.filter(function (o) { return cat === "tout" || o.cat === cat; });
    visibles.forEach(function (o, i) {
      var b = el("button", { "class": "oeuvre", type: "button", "aria-label": "Voir « " + o.titre + " » en grand" });
      b.style.animationDelay = Math.min(i * 25, 400) + "ms";
      b.innerHTML =
        '<img src="img/oeuvres/' + o.slug + '-s.webp" alt="Aquarelle d\'Inès : ' + esc(o.titre) + '" loading="lazy" width="' + o.w + '" height="' + o.h + '">' +
        '<span class="legende"><span class="titre">' + esc(o.titre) + '</span><span class="tag">' + CATS[o.cat].label + "</span></span>";
      b.addEventListener("click", function () { ouvrir(i); });
      galerie.appendChild(b);
    });
  }
  afficher("tout");

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-cap");
  var courant = 0;

  function montrer(i) {
    courant = (i + visibles.length) % visibles.length;
    var o = visibles[courant];
    lbImg.src = "img/oeuvres/" + o.slug + "-l.webp";
    lbImg.alt = "Aquarelle d'Inès : " + o.titre;
    lbCap.innerHTML = "<strong>" + esc(o.titre) + "</strong><span>" + CATS[o.cat].label + " · pièce unique · " + (courant + 1) + " / " + visibles.length + "</span>";
  }
  function ouvrir(i) {
    montrer(i);
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
  }
  function fermer() { if (lb.close) lb.close(); else lb.removeAttribute("open"); }

  document.getElementById("lb-close").addEventListener("click", fermer);
  document.getElementById("lb-prev").addEventListener("click", function () { montrer(courant - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { montrer(courant + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) fermer(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.open) return;
    if (e.key === "ArrowLeft") montrer(courant - 1);
    if (e.key === "ArrowRight") montrer(courant + 1);
  });
  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) montrer(courant + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  /* ---------- Gourmandises (icônes aquarelle) ---------- */
  var ICONES = {
    cookie: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="52" cy="54" r="40" fill="#F3D7A8" opacity=".7"/><circle cx="50" cy="50" r="34" fill="#E3A857"/><circle cx="50" cy="50" r="34" fill="none" stroke="#462C3A" stroke-width="2.2"/><g fill="#462C3A"><circle cx="38" cy="40" r="4.5"/><circle cx="60" cy="36" r="3.5"/><circle cx="56" cy="58" r="5"/><circle cx="38" cy="62" r="3.5"/><circle cx="66" cy="52" r="2.8"/></g></svg>',
    sable: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="54" cy="52" r="40" fill="#F6C3CF" opacity=".7"/><path d="M50 16l9 18 20 3-14 14 3 20-18-9-18 9 3-20-14-14 20-3z" fill="#F7E3C2" stroke="#462C3A" stroke-width="2.2" stroke-linejoin="round"/><circle cx="50" cy="50" r="7" fill="#E0607E"/></svg>',
    gateau: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="56" r="40" fill="#BFD9F2" opacity=".7"/><path d="M18 70 L82 70 L82 52 L18 40 Z" fill="#8A5A44" stroke="#462C3A" stroke-width="2.2" stroke-linejoin="round"/><path d="M18 40 L82 52 L82 56 Q72 62 64 55 Q54 64 44 53 Q32 60 18 46 Z" fill="#F6C3CF" stroke="#462C3A" stroke-width="2.2" stroke-linejoin="round"/><circle cx="56" cy="40" r="6" fill="#E0607E" stroke="#462C3A" stroke-width="2"/></svg>',
    bocal: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="48" cy="56" r="40" fill="#9DBF9E" opacity=".55"/><rect x="28" y="30" width="44" height="52" rx="10" fill="#FFFDF9" stroke="#462C3A" stroke-width="2.2"/><rect x="32" y="20" width="36" height="12" rx="3" fill="#E0607E" stroke="#462C3A" stroke-width="2.2"/><circle cx="42" cy="66" r="7" fill="#E3A857"/><circle cx="58" cy="70" r="6" fill="#F6C3CF"/><circle cx="52" cy="54" r="6" fill="#E3A857"/><circle cx="40" cy="48" r="4" fill="#BFD9F2"/></svg>'
  };
  var douceurs = document.getElementById("douceurs");
  (CFG.douceurs || []).forEach(function (d) {
    var c = el("article", { "class": "douceur" });
    c.innerHTML = (ICONES[d.icone] || ICONES.cookie) + "<h3>" + esc(d.nom) + "</h3><p>" + esc(d.detail) + '</p><p class="prix">' + prix(d.prix) + "</p>";
    douceurs.appendChild(c);
  });

  /* ---------- Rendez-vous & contact ---------- */
  var rdv = CFG.rdv || {};
  document.getElementById("rdv-lieu").textContent = rdv.lieu || "À venir";
  document.getElementById("rdv-date").textContent = rdv.date || "À venir";
  document.getElementById("rdv-paiement").textContent = rdv.paiement || "Sur place";

  var ct = CFG.contact || {};
  document.getElementById("contact-texte").textContent = ct.texte || "";
  var liens = document.getElementById("contact-liens");
  var n = 0;
  if (ct.email) { liens.appendChild(el("a", { "class": "btn btn-primary", href: "mailto:" + ct.email }, "Écrire un e-mail")); n++; }
  if (ct.instagram) { liens.appendChild(el("a", { "class": "btn btn-ghost", href: ct.instagram, target: "_blank", rel: "noopener" }, "Instagram")); n++; }
  if (ct.facebook) { liens.appendChild(el("a", { "class": "btn btn-ghost", href: ct.facebook, target: "_blank", rel: "noopener" }, "Facebook")); n++; }
  if (!n) liens.appendChild(el("a", { "class": "btn btn-ghost", href: "#rendez-vous" }, "Venez nous voir au stand"));
})();
