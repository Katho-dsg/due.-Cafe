/* due. — interacciones de la landing */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var cop = function (n) { return "$" + n.toLocaleString("es-CO"); };

  /* ---------- Barra: fondo sólido al bajar ---------- */
  var bar = $("#bar"), hero = $(".hero");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { bar.classList.toggle("is-solid", !e[0].isIntersecting); }, { rootMargin: "-80px 0px 0px 0px" }).observe(hero);
  }

  /* ---------- Entrada del inicio y obturador del objeto ---------- */
  requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("is-in"); }); });

  /* ---------- Bolsa (simulada) y aviso ---------- */
  var toast = $("#toast"), toastT, count = 0, countEl = $("#bagCount"), bagBtn = $("#bagBtn");
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove("is-on"); }, 2800);
  }
  function addToBag(text) {
    count++;
    countEl.textContent = count;
    bagBtn.setAttribute("aria-label", "Bolsa de compra, " + count + (count === 1 ? " producto" : " productos"));
    countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump");
    notify(text);
  }
  bagBtn.addEventListener("click", function () {
    notify(count ? "Tiene " + count + (count === 1 ? " producto" : " productos") + " en la bolsa." : "Su bolsa está vacía.");
  });

  /* ---------- La carta: se escribe y se ve al instante ---------- */
  var to = $("#to"), from = $("#from"), msg = $("#msg");
  var slip = { to: $("#slipTo"), msg: $("#slipMsg"), from: $("#slipFrom") };
  var defaults = { to: slip.to.textContent, msg: slip.msg.textContent, from: slip.from.textContent };
  function renderCard() {
    slip.to.textContent = to.value.trim() ? "Para " + to.value.trim() : defaults.to;
    slip.msg.textContent = msg.value.trim() || defaults.msg;
    slip.from.textContent = from.value.trim() ? "De " + from.value.trim() : defaults.from;
    $("#msgCount").textContent = msg.value.length + "/140";
  }
  $("#cardForm").addEventListener("input", renderCard);
  $("#cardForm").addEventListener("submit", function (e) { e.preventDefault(); });

  /* ---------- Cierre: estuche, precio y las dos acciones ---------- */
  var buy = $("#buyForm"), buyMsg = $("#buyMsg");
  function chosen() { return $('input[name="box"]:checked', buy); }
  buy.addEventListener("change", function () { $("#boxPrice").textContent = cop(+chosen().dataset.price); });
  buy.addEventListener("submit", function (e) {
    e.preventDefault();
    var box = chosen().value, gift = e.submitter && e.submitter.value === "gift";
    if (gift && !to.value.trim()) {
      buyMsg.textContent = "Escriba primero para quién es la carta.";
      $("#carta").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      setTimeout(function () { to.focus({ preventScroll: true }); }, 600);
      return;
    }
    buyMsg.textContent = "";
    addToBag(gift ? "Estuche " + box + " para " + to.value.trim() + ", en su bolsa." : "Estuche " + box + " para usted, en su bolsa.");
  });

  /* ---------- Conexiones: cada fila muestra su imagen ---------- */
  var rows = $$(".moments__table tbody tr"), img = $("#momentImg"), swapT;
  function activate(row) {
    if (row.classList.contains("is-active")) return;
    rows.forEach(function (r) { r.classList.toggle("is-active", r === row); });
    var src = row.dataset.img;
    if (img.getAttribute("src") === src) return;
    img.classList.add("is-swapping");
    clearTimeout(swapT);
    swapT = setTimeout(function () { img.src = src; img.classList.remove("is-swapping"); }, 200);
  }
  rows[0].classList.add("is-active");
  rows.forEach(function (r) {
    r.addEventListener("mouseenter", function () { activate(r); });
    r.addEventListener("focus", function () { activate(r); });
    r.addEventListener("click", function () { activate(r); });
  });
  // Precarga para que el cambio sea inmediato
  rows.forEach(function (r) { var i = new Image(); i.src = r.dataset.img; });

  /* ---------- Aviso del próximo lote ---------- */
  var aviso = $("#avisoForm"), avisoMsg = $("#avisoMsg");
  aviso.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aviso.email.value.trim());
    avisoMsg.textContent = ok ? "Listo. Le escribiremos el día que salga el próximo lote." : "Revise el correo: parece incompleto.";
    if (ok) aviso.reset();
  });

  /* ---------- Entradas por sección, escalonadas ---------- */
  var items = $$(".rise");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, sib = $$(".rise", el.closest("section, footer") || document.body);
        el.style.transitionDelay = Math.max(0, sib.indexOf(el)) * 70 + "ms";
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }
  // Nada queda oculto si algo falla
  setTimeout(function () { items.forEach(function (el) { el.classList.add("is-in"); }); hero.classList.add("is-in"); }, 4000);
})();
