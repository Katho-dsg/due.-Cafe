(() => {
  'use strict';
  document.documentElement.classList.add('js');

  /* Lista de espera / contraseña */
  document.querySelectorAll('[data-join]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const msg = form.parentElement.querySelector('[data-join-msg]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value.trim() || !input.checkValidity()) {
        msg.textContent = 'Revisa tu correo: debe verse como nombre@correo.com.';
        input.focus();
        return;
      }
      msg.textContent = 'Estás en la lista. La contraseña llegará antes del próximo lote.';
      input.value = '';
    });
  });

  /* Cuenta atrás del próximo lote */
  const cd = document.querySelector('[data-countdown]');
  if (cd) {
    const target = new Date(cd.dataset.countdown).getTime();
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      cd.querySelector('[data-cd="d"]').textContent = pad(Math.floor(diff / 864e5));
      cd.querySelector('[data-cd="h"]').textContent = pad(Math.floor((diff / 36e5) % 24));
      cd.querySelector('[data-cd="m"]').textContent = pad(Math.floor((diff / 6e4) % 60));
    };
    tick();
    setInterval(tick, 30000);
  }

  /* Archivo: botones anterior / siguiente */
  const track = document.querySelector('[data-rail-track]');
  if (track) {
    const [prev, next] = document.querySelectorAll('[data-rail]');
    const update = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    [prev, next].forEach((b) => b.addEventListener('click', () => {
      const step = track.querySelector('.plate').getBoundingClientRect().width + 16;
      track.scrollBy({ left: Number(b.dataset.rail) * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* Aparición suave de bloques */
  const items = document.querySelectorAll('.h2, .kicker, .arch, .society__pair figure, .plate, .glass');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach((el) => io.observe(el));
  }
})();
