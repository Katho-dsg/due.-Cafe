/* due. — interacciones de la landing */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var cop = function (n) { return "$" + n.toLocaleString("es-CO"); };

  /* ---------- Imágenes editoriales: provisional si aún no se han subido ---------- */
  $$("img[data-fallback]").forEach(function (img) {
    var swap = function () { img.onerror = null; img.src = img.dataset.fallback; };
    if (img.complete && !img.naturalWidth) swap(); else img.onerror = swap;
  });

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

  /* ---------- Toast y bolsa (simulada) ---------- */
  var toast = $("#toast"), toastT;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove("is-on"); }, 2800);
  }
  var count = 0, countEl = $("#bagCount"), bagBtn = $("#bagBtn");
  function addToBag(name) {
    count++;
    countEl.textContent = count;
    bagBtn.setAttribute("aria-label", "Bolsa de compra, " + count + (count === 1 ? " producto" : " productos"));
    countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump");
    notify(name + " está en tu bolsa");
  }
  $$(".js-add").forEach(function (b) {
    b.addEventListener("click", function () { addToBag(b.dataset.name); });
  });

  /* ---------- Configurador de regalo ---------- */
  var form = $("#giftForm");
  var pv = { to: $("#pvTo"), msg: $("#pvMsg"), from: $("#pvFrom"), box: $("#pvBox"), price: $("#pvPrice") };
  var defaults = { to: pv.to.textContent, msg: pv.msg.textContent, from: pv.from.textContent };
  var msgCount = $("#msgCount"), giftMsg = $("#giftMsg");

  function render() {
    var to = form.to.value.trim(), from = form.from.value.trim(), msg = form.msg.value.trim();
    pv.to.textContent = to ? "Para " + to + "," : defaults.to;
    pv.msg.textContent = msg || defaults.msg;
    pv.from.textContent = from ? "— " + from : defaults.from;
    msgCount.textContent = form.msg.value.length + "/160";
    var box = $('input[name="box"]:checked', form);
    pv.box.textContent = box.dataset.label;
    pv.price.textContent = cop(+box.dataset.price);
  }
  form.addEventListener("input", render);
  form.addEventListener("change", render);

  // Fecha mínima: pasado mañana (tiempo de tueste y envío)
  var date = $("#giftDate"), min = new Date(Date.now() + 2 * 864e5);
  date.min = min.toISOString().slice(0, 10);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.to.value.trim()) {
      giftMsg.classList.add("is-error");
      giftMsg.textContent = "Dinos para quién es el regalo.";
      form.to.focus();
      return;
    }
    giftMsg.classList.remove("is-error");
    giftMsg.textContent = "";
    addToBag($('input[name="box"]:checked', form).dataset.label + " para " + form.to.value.trim());
  });
  render();

  /* ---------- Aviso del próximo lote ---------- */
  var aviso = $("#avisoForm"), avisoMsg = $("#avisoMsg");
  aviso.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aviso.email.value.trim());
    avisoMsg.classList.toggle("is-error", !ok);
    avisoMsg.textContent = ok ? "Listo. Te escribiremos el día que salga el próximo lote." : "Revisa tu correo, parece incompleto.";
    if (ok) aviso.reset();
  });

  /* ---------- Número de pieza: cuenta hasta 064 al aparecer ---------- */
  var serial = $("#serialNum"), counted = false;
  function countUp() {
    if (counted) return; counted = true;
    var end = 64, t0 = performance.now(), dur = 1600;
    (function step(t) {
      var p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      serial.textContent = ("00" + v).slice(-3);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- Revelado al hacer scroll ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = $$(".reveal, .edition, .serial");
  if ("IntersectionObserver" in window && !reduce) {
    serial.textContent = "000";
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target;
        t.classList.add("is-in"); io.unobserve(t);
        if (t.classList.contains("serial")) countUp();
        setTimeout(function () { t.style.transitionDelay = ""; }, 1500);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (t, i) {
      if (t.classList.contains("reveal")) t.style.transitionDelay = (i % 4) * 100 + "ms";
      io.observe(t);
    });
  } else {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  }
})();
