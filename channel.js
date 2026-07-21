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
    { name: 'Café Martínez', src: 'assets/clients/cafe-martinez.webp' },
    { name: 'Panning', src: 'assets/clients/panning.webp' },
    { name: 'La Veneciana', src: 'assets/clients/la-veneciana.webp' },
    { name: 'Starbucks', src: 'assets/clients/starbucks.webp' },
    { name: 'Hotel Continental', src: 'assets/clients/hotel-continental.webp' },
    { name: 'RE/MAX', src: 'assets/clients/remax.webp' },
    { name: 'Toyota', src: 'assets/clients/toyota.webp' },
    { name: 'Fiat', src: 'assets/clients/fiat.webp' }
  ];

  if (document.body.classList.contains('theme-empresas')) {
    const trustBar = document.querySelector('.trust-bar');

    if (trustBar && !document.querySelector('.clients-section')) {
      const section = document.createElement('section');
      section.className = 'clients-section';
      section.setAttribute('aria-label', 'Empresas que confiaron en Cleaning Services');

      const card = ({ name, src }) =>
        `<div class="client-logo" role="listitem"><img src="${src}" alt="${name}" loading="lazy" decoding="async"></div>`;
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

  if (document.body.classList.contains('theme-provider')) {
    const image = document.querySelector('.provider-platform-visual img');
    const sources = [
      'provider-image-bytes-1.js',
      'provider-image-bytes-2.js',
      'provider-image-bytes-3.js',
      'provider-image-bytes-4.js'
    ];

    const loadScript = src => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    if (image) {
      image.style.visibility = 'hidden';
      window.__providerImageBytes = [];

      (async () => {
        try {
          for (const src of sources) await loadScript(src);
          const bytes = new Uint8Array(window.__providerImageBytes);
          const url = URL.createObjectURL(new Blob([bytes], { type: 'image/avif' }));
          image.onload = () => {
            image.style.visibility = 'visible';
            URL.revokeObjectURL(url);
          };
          image.src = url;
        } catch (error) {
          image.style.visibility = 'visible';
          console.error('No se pudo cargar la imagen de Provider.', error);
        }
      })();
    }
  }
})();