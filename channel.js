(() => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  const closeMenu = () => {
    mobileNav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  menuToggle?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));

  const corporateClients = [
    'Café Martínez',
    'Panning',
    'La Veneciana',
    'Starbucks',
    'YPF',
    'Hotel Continental',
    'RE/MAX',
    'Toyota',
    'Fiat'
  ];

  if (document.body.classList.contains('theme-empresas')) {
    const trustBar = document.querySelector('.trust-bar');

    if (trustBar && !document.querySelector('.clients-section')) {
      const section = document.createElement('section');
      section.className = 'clients-section';
      section.setAttribute('aria-label', 'Empresas que confiaron en Cleaning Services');

      const card = name => `<div class="client-logo" role="listitem"><span>${name}</span></div>`;
      const group = corporateClients.map(card).join('');

      section.innerHTML = `
        <div class="clients-heading">
          <span>Experiencia corporativa</span>
          <h2>Empresas que confiaron en nuestro trabajo.</h2>
        </div>
        <div class="clients-marquee" role="list">
          <div class="clients-track">
            <div class="clients-group">${group}</div>
            <div class="clients-group" aria-hidden="true">${group}</div>
          </div>
        </div>`;

      trustBar.insertAdjacentElement('afterend', section);
    }
  }
})();
