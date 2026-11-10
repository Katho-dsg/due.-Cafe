/* due. — versión club secreto con el brief: compra, WhatsApp, recuadro de lotes y suscripción */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const cop = (n) => '$' + n.toLocaleString('es-CO');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Datos del lote actual (de ejemplo) */
  const LOT = { price: 120000, left: 37, total: 100 };
  const WA_NUMBER = '573000000000'; // número de ejemplo: reemplazar por el de due.

  /* ---------- WhatsApp con mensaje prellenado ---------- */
  const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  $$('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa); });

  /* ---------- Contador de bolsas ---------- */
  $$('[data-left]').forEach((el) => { el.textContent = LOT.left; });
  const dots = $('[data-dots]');
  if (dots) {
    const sold = LOT.total - LOT.left;
    dots.innerHTML = Array.from({ length: LOT.total }, (_, i) => `<i class="${i >= sold ? 'is-free' : ''}" style="transition-delay:${i * 6}ms"></i>`).join('');
  }

  /* ---------- Cantidad junto a la ficha ---------- */
  let pickQty = 1;
  const qtyVal = $('[data-qty-val]');
  $$('[data-qty]').forEach((b) => b.addEventListener('click', () => {
    pickQty = Math.min(LOT.left, Math.max(1, pickQty + Number(b.dataset.qty)));
    qtyVal.textContent = pickQty;
  }));

  /* ---------- Bolsa de compra ---------- */
  const cart = $('[data-cart]');
  const panel = $('.cart__panel', cart);
  let inCart = 0, lastFocus = null, toastT;
  const toast = Object.assign(document.createElement('div'), { className: 'toast' });
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  const notify = (msg) => {
    toast.textContent = msg; toast.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('is-on'), 2600);
  };

  function renderCart() {
    const has = inCart > 0;
    $('[data-cart-empty]').hidden = has;
    $('[data-cart-item]').hidden = !has;
    $('[data-cart-foot]').hidden = !has;
    $('[data-cart-qty-val]').textContent = inCart;
    $('[data-cart-line]').textContent = cop(inCart * LOT.price);
    $('[data-cart-total]').textContent = cop(inCart * LOT.price);
    const count = $('[data-cart-count]');
    count.textContent = inCart;
    count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
    $('[data-cart-open]').setAttribute('aria-label', `Abrir tu bolsa, ${inCart} ${inCart === 1 ? 'producto' : 'productos'}`);
    $('[data-cart-wa]').href = waLink(`Hola, quiero ${inCart} ${inCart === 1 ? 'bolsa' : 'bolsas'} del lote 07 de Huila`);
    $('[data-checkout-msg]').textContent = '';
  }
  function openCart() {
    lastFocus = document.activeElement;
    cart.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => cart.classList.add('is-open')));
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('.cart__x', cart).focus(), reduce ? 0 : 200);
  }
  function closeCart() {
    cart.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { cart.hidden = true; if (lastFocus) lastFocus.focus(); }, reduce ? 0 : 320);
  }
  $$('[data-add]').forEach((b) => b.addEventListener('click', () => {
    const add = b.closest('.buy') ? pickQty : 1;
    inCart = Math.min(LOT.left, inCart + add);
    renderCart();
    if (cart.hidden) openCart();
    notify(`${add} ${add === 1 ? 'bolsa' : 'bolsas'} del lote 07 en tu bolsa`);
  }));
  $('[data-cart-open]').addEventListener('click', openCart);
  $$('[data-cart-close]').forEach((b) => b.addEventListener('click', closeCart));
  document.addEventListener('keydown', (e) => {
    if (cart.hidden) return;
    if (e.key === 'Escape') closeCart();
    if (e.key === 'Tab') {
      const f = $$('button, a[href]', panel).filter((el) => !el.closest('[hidden]'));
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  $$('[data-cart-qty]').forEach((b) => b.addEventListener('click', () => {
    inCart = Math.min(LOT.left, Math.max(0, inCart + Number(b.dataset.cartQty)));
    renderCart();
  }));
  $('[data-checkout]').addEventListener('click', () => {
    // Aquí se conectará el checkout de ePayco cuando la cuenta esté activa.
    $('[data-checkout-msg]').textContent = 'La pasarela ePayco todavía no está conectada. Mientras tanto, puedes pedir por WhatsApp.';
  });

  /* ---------- Suscripción por correo ---------- */
  $$('[data-join]').forEach((form) => {
    const input = $('input[type="email"]', form);
    const msg = form.nextElementSibling && form.nextElementSibling.matches('[data-join-msg]') ? form.nextElementSibling : $('[data-join-msg]', form.parentElement);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value.trim() || !input.checkValidity()) {
        msg.textContent = 'Revisa tu correo: debe verse como nombre@correo.com.';
        input.focus();
        return;
      }
      msg.textContent = 'Listo, ya eres de los que esperan el próximo lote. Te escribimos antes que a nadie.';
      input.value = '';
    });
  });

  /* ---------- Cuenta atrás del próximo lote ---------- */
  const cd = $('[data-countdown]');
  if (cd) {
    const target = new Date(cd.dataset.countdown).getTime();
    const pad = (n) => String(n).padStart(2, '0');
    const daysText = $('[data-days-text]');
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 864e5);
      $('[data-cd="d"]', cd).textContent = pad(d);
      $('[data-cd="h"]', cd).textContent = pad(Math.floor((diff / 36e5) % 24));
      $('[data-cd="m"]', cd).textContent = pad(Math.floor((diff / 6e4) % 60));
      const s = $('[data-cd="s"]', cd);
      if (s) s.textContent = pad(Math.floor((diff / 1e3) % 60));
      if (daysText) daysText.textContent = d === 1 ? '1 día' : `${d} días`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Carrusel de lotes ---------- */
  const track = $('[data-rail-track]');
  if (track) {
    const [prev, next] = $$('[data-rail]');
    const update = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    [prev, next].forEach((b) => b.addEventListener('click', () => {
      const step = track.firstElementChild.getBoundingClientRect().width + 10;
      track.scrollBy({ left: Number(b.dataset.rail) * step * 2, behavior: reduce ? 'auto' : 'smooth' });
    }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Aparición suave ---------- */
  const card = $('.float-card');
  requestAnimationFrame(() => requestAnimationFrame(() => card && card.classList.add('is-in')));
  const items = $$('.h2, .kicker, .arch, .society__pair figure, .glass, .steps li, .faq details, .ficha');
  const counts = $$('.count');
  if ('IntersectionObserver' in window && !reduce) {
    items.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    [...items, ...counts].forEach((el) => io.observe(el));
  } else {
    counts.forEach((el) => el.classList.add('is-in'));
  }
  setTimeout(() => { [...items, ...counts].forEach((el) => el.classList.add('is-in')); }, 4000);
})();
