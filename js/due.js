/* due. — interacciones de la landing */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Header ---------- */
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 40); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var burger = $("#burger"), menu = $("#menu");
  var setMenu = function (open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- Hero: selector de lote (datos de ejemplo) ---------- */
  var lots = [
    { eyebrow: "Lote N.º 07 · Edición limitada", region: "HUILA", price: "$68.000", left: "37",
      lead: "Panela, mandarina y cacao dulce. Un lote del sur del Huila que llega una sola vez y, cuando se agota, deja paso al siguiente." },
    { eyebrow: "Lote N.º 08 · Últimas bolsas", region: "NARIÑO", price: "$74.000", left: "12",
      lead: "Uva roja, jazmín y miel. Cultivado a más de dos mil metros, entre montañas frías que hacen madurar el grano despacio." },
    { eyebrow: "Lote N.º 09 · Próximamente", region: "SIERRA", price: "Pronto", left: "100",
      lead: "Un lote que aún guarda su secreto. Los miembros del club lo conocerán 48 horas antes que nadie." }
  ];
  var current = 0, busy = false;
  var hero = $(".hero"), bag = $(".hero__bag"), vertical = $(".hero__vertical");
  var thumbs = $$(".thumb");

  // Ajusta el nombre vertical para que quepa en el panel, sea cual sea su longitud
  var panel = $(".hero__panel");
  function fitVertical() {
    var spans = $$("span", vertical);
    spans.forEach(function (sp) { sp.style.fontSize = ""; });
    var max = panel.clientHeight * 0.78, h = vertical.scrollHeight;
    if (h > max) {
      var size = parseFloat(getComputedStyle(spans[0]).fontSize) * max / h;
      spans.forEach(function (sp) { sp.style.fontSize = size + "px"; });
    }
  }
  fitVertical();
  window.addEventListener("resize", fitVertical);
  if (document.fonts) document.fonts.ready.then(fitVertical);

  function showLot(i) {
    i = (i + lots.length) % lots.length;
    if (i === current || busy) return;
    busy = true;
    current = i;
    hero.classList.add("is-fading");
    bag.classList.add("is-swapping");
    vertical.classList.add("is-swapping");
    thumbs.forEach(function (t, k) {
      t.classList.toggle("is-active", k === i);
      t.setAttribute("aria-selected", String(k === i));
    });
    setTimeout(function () {
      var l = lots[i];
      $$("[data-lot]", hero).forEach(function (el) {
        var key = el.getAttribute("data-lot");
        el.textContent = key === "region2" ? l.region : l[key];
      });
      fitVertical();
      hero.classList.remove("is-fading");
      bag.classList.remove("is-swapping");
      vertical.classList.remove("is-swapping");
      setTimeout(function () { busy = false; }, 450);
    }, 420);
  }
  thumbs.forEach(function (t) { t.addEventListener("click", function () { showLot(+t.dataset.index); }); });
  $("#prevLot").addEventListener("click", function () { showLot(current - 1); });
  $("#nextLot").addEventListener("click", function () { showLot(current + 1); });

  /* ---------- Bolsa de compra (simulada) ---------- */
  var count = 0, countEl = $("#bagCount"), bagBtn = $("#bagBtn"), toast = $("#toast"), toastT;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove("is-on"); }, 2600);
  }
  $$(".js-add").forEach(function (b) {
    b.addEventListener("click", function () {
      count++;
      countEl.textContent = count;
      bagBtn.setAttribute("aria-label", "Bolsa de compra, " + count + (count === 1 ? " producto" : " productos"));
      countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump");
      notify(b.dataset.name + " está en tu bolsa");
    });
  });

  /* ---------- Cuenta atrás del próximo lote ---------- */
  var launch = new Date(Date.now() + (4 * 24 + 9) * 36e5 + 22 * 6e4);
  var cd = { d: $('[data-cd="d"]'), h: $('[data-cd="h"]'), m: $('[data-cd="m"]') };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  function tick() {
    var s = Math.max(0, Math.floor((launch - Date.now()) / 1000));
    cd.d.textContent = pad(Math.floor(s / 86400));
    cd.h.textContent = pad(Math.floor(s % 86400 / 3600));
    cd.m.textContent = pad(Math.floor(s % 3600 / 60));
  }
  tick(); setInterval(tick, 30000);

  /* ---------- Club ---------- */
  var form = $("#clubForm"), msg = $("#clubMsg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = form.email.value.trim();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    msg.classList.toggle("is-error", !ok);
    msg.textContent = ok ? "Bienvenido al club. Te escribiremos antes del próximo lote." : "Revisa tu correo, parece incompleto.";
    if (ok) form.reset();
  });

  /* ---------- Revelado al hacer scroll ---------- */
  var targets = $$(".reveal, .senses__media");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var t = en.target;
          t.classList.add("is-in"); io.unobserve(t);
          setTimeout(function () { t.style.transitionDelay = ""; }, 1400);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (t, i) {
      t.style.transitionDelay = (i % 3) * 90 + "ms";
      io.observe(t);
    });
  } else {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  }

  /* ---------- Parallax suave en la cita ---------- */
  var mImg = $(".moment__img"), moment = $(".moment");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (mImg && !reduce) {
    window.addEventListener("scroll", function () {
      var r = moment.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      var p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      mImg.style.transform = "translateY(" + (p * -60) + "px)";
    }, { passive: true });
  }
})();
