(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const euro = (n) => `${n.toLocaleString('es-ES')} €`;

  const TOTAL_BAGS = 100;
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
    if (fill) {
      fill.style.width = `${sold}%`;
      fill.parentElement.setAttribute('aria-valuenow', sold);
    }
  }

  /* ---------- Carrito ---------- */
  const STORAGE_KEY = 'due-cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { /* sin almacenamiento */ } };

  const drawer = $('[data-drawer]');
  const backdrop = $('.drawer-backdrop');
  const itemsEl = $('[data-cart-items]');

  function renderCart() {
    const count = cart.reduce((a, i) => a + i.qty, 0);
    const total = cart.reduce((a, i) => a + i.qty * i.price, 0);
    const countEl = $('[data-cart-count]');
    countEl.textContent = count;
    countEl.classList.toggle('has-items', count > 0);
    $('[data-cart-total]').textContent = euro(total);

    if (!cart.length) {
      itemsEl.innerHTML = `<div class="drawer__empty"><p>Aún no hay nada aquí.</p><p>El Lote Nº 07 te está esperando.</p></div>`;
      return;
    }
    itemsEl.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item__thumb"><img src="assets/logo-due-cream.png" alt=""></div>
        <div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.detail)}</p>
          <p>Cantidad: ${item.qty}</p>
        </div>
        <div class="cart-item__side">
          <span class="cart-item__price">${euro(item.qty * item.price)}</span>
          <button type="button" class="cart-item__remove" data-remove="${idx}">Quitar</button>
        </div>
      </div>`).join('');
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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
    backdrop.hidden = false;
    requestAnimationFrame(() => { backdrop.classList.add('is-open'); drawer.classList.add('is-open'); });
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.drawer__close').focus();
  }
  function closeCart() {
    backdrop.classList.remove('is-open');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => (backdrop.hidden = true), 400);
  }

  $$('[data-open-cart]').forEach((b) => b.addEventListener('click', openCart));
  $$('[data-close-cart]').forEach((b) => b.addEventListener('click', closeCart));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeCart(); });
  itemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    cart.splice(Number(btn.dataset.remove), 1);
    save();
    renderCart();
  });
  $('[data-checkout]').addEventListener('click', () => {
    if (!cart.length) { showToast('Tu selección está vacía.'); return; }
    showToast('Pasarela de pago en preparación. ¡Gracias por tu interés!');
  });

  /* ---------- Formulario de compra ---------- */
  const buyForm = $('[data-buy-form]');
  const qtyInput = $('input[name="qty"]', buyForm);
  const priceOut = $('[data-buy-price]');

  function updateBuyPrice() {
    const fmt = $('input[name="format"]:checked', buyForm);
    priceOut.textContent = euro(Number(fmt.dataset.price) * Number(qtyInput.value));
  }
  $$('[data-qty]', buyForm).forEach((b) => b.addEventListener('click', () => {
    const max = Math.min(3, bagsLeft);
    qtyInput.value = Math.max(1, Math.min(max, Number(qtyInput.value) + Number(b.dataset.qty)));
    updateBuyPrice();
  }));
  buyForm.addEventListener('change', updateBuyPrice);
  buyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const qty = Number(qtyInput.value);
    if (bagsLeft < qty) { showToast('No quedan suficientes bolsas de este lote.'); return; }
    const fmt = $('input[name="format"]:checked', buyForm);
    const grind = $('input[name="grind"]:checked', buyForm).value;
    addToCart({ name: `Lote Nº 07 · ${fmt.value}`, detail: grind, price: Number(fmt.dataset.price), qty });
    bagsLeft -= qty;
    renderStock();
    showToast(`Bolsa${qty > 1 ? 's' : ''} reservada${qty > 1 ? 's' : ''}. Quedan ${bagsLeft} de 100.`);
    openCart();
  });

  /* ---------- Regalo ---------- */
  const giftForm = $('[data-gift-form]');
  const giftName = $('[data-gift-name]');
  const giftMsg = $('[data-gift-msg]');
  const previewName = $('[data-gift-preview-name]');
  const previewMsg = $('[data-gift-preview-msg]');
  const giftPrice = $('[data-gift-price]');
  const dateInput = $('input[name="date"]', giftForm);

  const tomorrow = new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10);
  dateInput.min = tomorrow;

  giftName.addEventListener('input', () => { previewName.textContent = giftName.value.trim() || 'Lucía'; });
  giftMsg.addEventListener('input', () => { previewMsg.textContent = giftMsg.value.trim() || giftMsg.placeholder; });
  giftForm.addEventListener('change', () => {
    giftPrice.textContent = euro(Number($('input[name="gift"]:checked', giftForm).dataset.price));
  });
  giftForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const opt = $('input[name="gift"]:checked', giftForm);
    const to = giftName.value.trim();
    const detail = [to ? `Para ${to}` : 'Regalo', dateInput.value ? `entrega ${dateInput.value.split('-').reverse().join('/')}` : null]
      .filter(Boolean).join(' · ');
    addToCart({ name: opt.value, detail, price: Number(opt.dataset.price), qty: 1 });
    showToast('Regalo preparado. Escribiremos tu mensaje a mano.');
    openCart();
  });

  /* ---------- Planes del club ---------- */
  $$('[data-plan]').forEach((a) => a.addEventListener('click', () => {
    const input = $('#join-email');
    input.dataset.plan = a.dataset.plan;
    setTimeout(() => input.focus({ preventScroll: true }), 700);
  }));

  /* ---------- Unirse ---------- */
  const joinForm = $('[data-join-form]');
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#join-email');
    const plan = input.dataset.plan || 'Círculo';
    $('[data-join-msg]').textContent = `Bienvenido al ${plan}. Te avisaremos antes que a nadie del Lote Nº 08.`;
    input.value = '';
    showToast('Ya formas parte de due.');
  });

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
  const nav = $('.nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => {
    menuBtn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }));

  /* ---------- Revelado al hacer scroll ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      io.observe(el);
    });
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  renderStock();
  renderCart();
})();
