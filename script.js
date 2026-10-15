(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const cop = (n) => '$' + Math.round(n).toLocaleString('es-CO');

  const TOTAL_BAGS = 100;
  const MAX_PER_ORDER = 3;
  const FREE_SHIPPING = 150000;
  let bagsLeft = 37;

  /* ---------- Toast ---------- */
  const toast = $('[data-toast]');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-show'), 3200);
  }

  /* ---------- Stock ---------- */
  function renderStock() {
    $$('[data-bags-left]').forEach((el) => (el.textContent = bagsLeft));
    const sold = TOTAL_BAGS - bagsLeft;
    const fill = $('[data-stock-fill]');
    fill.style.width = sold + '%';
    fill.parentElement.setAttribute('aria-valuenow', sold);
  }

  /* ---------- Carrito ---------- */
  const STORAGE_KEY = 'due-cart-v2';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { /* sin almacenamiento */ } };

  bagsLeft = Math.max(0, bagsLeft - cart.reduce((a, i) => a + (i.bags ? i.qty : 0), 0));

  const drawer = $('[data-drawer]');
  const scrim = $('.scrim');
  const itemsEl = $('[data-cart-items]');
  let lastFocus = null;

  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderCart() {
    const count = cart.reduce((a, i) => a + i.qty, 0);
    const total = cart.reduce((a, i) => a + i.qty * i.price, 0);
    $('[data-cart-count]').textContent = count;
    $('[data-cart-total]').textContent = cop(total);
    const missing = FREE_SHIPPING - total;
    $('[data-ship-note]').textContent = total === 0
      ? 'Envío gratis en Colombia desde ' + cop(FREE_SHIPPING) + '.'
      : missing > 0 ? 'Te faltan ' + cop(missing) + ' para el envío gratis.' : 'Tu envío en Colombia es gratis.';

    if (!cart.length) {
      itemsEl.innerHTML = '<div class="drawer__empty"><p>Todavía no hay nada aquí.</p><p>El Lote Nº 07 está disponible esta temporada.</p></div>';
      return;
    }
    itemsEl.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item__thumb"><img src="${item.gift ? 'assets/img/regalo-caja.jpg' : 'assets/img/mano-cerezas.jpg'}" alt=""></div>
        <div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.detail)}</p>
          <p>Cantidad: ${item.qty}</p>
        </div>
        <div class="cart-item__side">
          <span class="cart-item__price">${cop(item.qty * item.price)}</span>
          <button type="button" class="cart-item__remove" data-remove="${idx}">Quitar</button>
        </div>
      </div>`).join('');
  }

  function addToCart(item) {
    const existing = cart.find((i) => i.name === item.name && i.detail === item.detail);
    if (existing) existing.qty += item.qty; else cart.push(item);
    save();
    renderCart();
    const btn = $('.cart-btn');
    btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
  }

  function openCart() {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    drawer.inert = false;
    drawer.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => { scrim.classList.add('is-open'); drawer.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    $('.drawer__close').focus({ preventScroll: true });
  }
  function closeCart() {
    scrim.classList.remove('is-open');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    document.body.style.overflow = '';
    setTimeout(() => { if (!drawer.classList.contains('is-open')) scrim.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  $$('[data-open-cart]').forEach((b) => b.addEventListener('click', openCart));
  $$('[data-close-cart]').forEach((b) => b.addEventListener('click', closeCart));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart(); });
  itemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    const [removed] = cart.splice(Number(btn.dataset.remove), 1);
    if (removed && removed.bags) { bagsLeft += removed.bags * removed.qty; renderStock(); }
    save();
    renderCart();
  });
  $('[data-checkout]').addEventListener('click', () => {
    showToast(cart.length ? 'El pago en línea llega muy pronto. Gracias por elegir due.' : 'Tu selección está vacía.');
  });

  /* ---------- Compra del lote ---------- */
  const buyForm = $('[data-buy-form]');
  const qtyOut = $('output[name="qty"]', buyForm);
  const [minus, plus] = $$('[data-qty]', buyForm);
  let qty = 1;

  function updateBuy() {
    const max = Math.max(1, Math.min(MAX_PER_ORDER, bagsLeft));
    qty = Math.min(Math.max(1, qty), max);
    qtyOut.textContent = qty;
    minus.disabled = qty <= 1;
    plus.disabled = qty >= max;
    const fmt = $('input[name="format"]:checked', buyForm);
    $('[data-buy-price]').textContent = cop(Number(fmt.dataset.price) * qty);
  }
  $$('[data-qty]', buyForm).forEach((b) => b.addEventListener('click', () => { qty += Number(b.dataset.qty); updateBuy(); }));
  buyForm.addEventListener('change', updateBuy);

  function reserve(format, grind, n) {
    if (bagsLeft < n) { showToast('No quedan suficientes bolsas de este lote.'); return false; }
    addToCart({ name: 'Lote Nº 07 · ' + format.value, detail: grind, price: Number(format.dataset.price), qty: n, bags: 1 });
    bagsLeft -= n;
    renderStock();
    updateBuy();
    return true;
  }

  buyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fmt = $('input[name="format"]:checked', buyForm);
    const grind = $('input[name="grind"]:checked', buyForm).value;
    if (reserve(fmt, grind, qty)) {
      showToast(qty > 1 ? 'Reservamos tus ' + qty + ' bolsas.' : 'Reservamos tu bolsa.');
      openCart();
    }
  });

  $('[data-quick-add]').addEventListener('click', () => {
    const fmt = $('input[name="format"][value="Bolsa 250 g"]', buyForm);
    if (reserve(fmt, 'Grano entero', 1)) { showToast('Reservamos tu bolsa del Lote Nº 07.'); openCart(); }
  });

  /* ---------- Regalo ---------- */
  const giftForm = $('[data-gift-form]');
  const giftName = $('[data-gift-name]');
  const giftMsg = $('[data-gift-msg]');
  const giftDate = $('[data-gift-date]');
  const previewName = $('[data-gift-preview-name]');
  const previewMsg = $('[data-gift-preview-msg]');

  const minDate = new Date(Date.now() + 2 * 864e5);
  giftDate.min = minDate.toISOString().slice(0, 10);

  giftName.addEventListener('input', () => { previewName.textContent = giftName.value.trim() || 'Lucía'; });
  giftMsg.addEventListener('input', () => { previewMsg.textContent = giftMsg.value.trim() || giftMsg.placeholder; });
  giftForm.addEventListener('change', () => {
    $('[data-gift-price]').textContent = cop(Number($('input[name="gift"]:checked', giftForm).dataset.price));
  });
  giftForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const opt = $('input[name="gift"]:checked', giftForm);
    const to = giftName.value.trim();
    const when = giftDate.value ? 'llega el ' + giftDate.value.split('-').reverse().join('/') : null;
    const detail = [to ? 'Para ' + to : 'Regalo', when].filter(Boolean).join(' · ');
    addToCart({ name: opt.value, detail, price: Number(opt.dataset.price), qty: 1, gift: true });
    showToast('Regalo listo. Escribiremos tu mensaje a mano.');
    openCart();
  });

  /* ---------- Club y lista de espera ---------- */
  const joinForm = $('[data-join-form]');
  const joinInput = $('#join-email');
  const joinMsg = $('[data-join-msg]');
  let chosenPlan = 'Círculo';
  $$('[data-plan]').forEach((a) => a.addEventListener('click', () => {
    chosenPlan = a.dataset.plan;
    joinMsg.classList.remove('is-error');
    joinMsg.textContent = 'Elegiste ' + chosenPlan + '. Déjanos tu correo para continuar.';
    setTimeout(() => joinInput.focus({ preventScroll: true }), 700);
  }));
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!joinInput.checkValidity() || !joinInput.value.trim()) {
      joinForm.classList.add('is-error');
      joinMsg.classList.add('is-error');
      joinMsg.textContent = 'Revisa tu correo: debe verse como nombre@correo.com.';
      joinInput.focus();
      return;
    }
    joinForm.classList.remove('is-error');
    joinMsg.classList.remove('is-error');
    joinMsg.textContent = 'Bienvenido a ' + chosenPlan + '. Te escribiremos antes de que llegue el Lote Nº 08.';
    joinInput.value = '';
  });
  joinInput.addEventListener('input', () => { joinForm.classList.remove('is-error'); joinMsg.classList.remove('is-error'); });

  /* ---------- Cuenta atrás ---------- */
  const cd = $('[data-countdown]');
  if (cd) {
    const target = new Date(cd.dataset.countdown).getTime();
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      $('[data-cd="d"]', cd).textContent = pad(Math.floor(diff / 864e5));
      $('[data-cd="h"]', cd).textContent = pad(Math.floor((diff / 36e5) % 24));
      $('[data-cd="m"]', cd).textContent = pad(Math.floor((diff / 6e4) % 60));
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Navegación ---------- */
  const nav = $('[data-nav]');
  const hero = $('.hero');
  const menuBtn = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  const setSolid = () => nav.classList.toggle('is-solid', window.scrollY > hero.offsetHeight - 90 || !menu.hidden);
  window.addEventListener('scroll', setSolid, { passive: true });
  window.addEventListener('resize', setSolid);
  setSolid();

  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
    setSolid();
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => {
    menuBtn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    setSolid();
  }));

  /* ---------- Revelado de fotografías ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    $$('.reveal-img').forEach((el) => io.observe(el));
  } else {
    $$('.reveal-img').forEach((el) => el.classList.add('is-in'));
  }

  renderStock();
  updateBuy();
  renderCart();
})();
