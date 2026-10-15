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

  /* Aparición suave de bloques */
  const items = document.querySelectorAll('.h2, .kicker, .arch, .society__pair figure, .values__list li, .glass');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach((el) => io.observe(el));
  }
})();
