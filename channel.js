(() => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const desktopNav = document.querySelector('.desktop-nav');

  const hasCleaningLabLink = nav => {
    if (!nav) return false;

    return Array.from(nav.querySelectorAll('a')).some(link => {
      const href = (link.getAttribute('href') || '').replace(/^\.\//, '');
      return href === 'guia-materiales.html'
        || href === 'index.html#lab'
        || href === '#lab'
        || link.hasAttribute('data-cleaning-lab-nav');
    });
  };

  const addCleaningLabLink = (nav, beforeElement = null) => {
    if (!nav || hasCleaningLabLink(nav)) return;

    const link = document.createElement('a');
    link.href = 'guia-materiales.html';
    link.textContent = 'Cleaning Lab';
    link.setAttribute('data-cleaning-lab-nav', 'true');
    nav.insertBefore(link, beforeElement);
  };

  addCleaningLabLink(desktopNav, desktopNav?.querySelector('.nav-cta') || null);

  const firstSectionLink = mobileNav
    ? Array.from(mobileNav.querySelectorAll('a')).find(link => link.getAttribute('href')?.startsWith('#'))
    : null;
  addCleaningLabLink(mobileNav, firstSectionLink || null);

  if (document.body.classList.contains('guide-page')) {
    const guideStyles = document.createElement('style');
    guideStyles.setAttribute('data-cleaning-lab-spacing', 'true');
    guideStyles.textContent = `
      body.guide-page {
        --container: min(1180px, calc(100% - 56px));
      }

      body.guide-page .guide-hero-layout {
        padding-top: 132px;
        padding-bottom: 72px;
      }

      body.guide-page .guide-notice {
        margin-top: -26px;
      }

      body.guide-page .guide-library,
      body.guide-page .first-steps {
        padding-top: 96px;
        padding-bottom: 96px;
      }

      body.guide-page .channel-cta {
        padding-top: 72px;
        padding-bottom: 72px;
      }

      @media (max-width: 980px) {
        body.guide-page .guide-hero-layout {
          padding-top: 118px;
          padding-bottom: 62px;
        }
      }

      @media (max-width: 640px) {
        body.guide-page {
          --container: min(100% - 36px, 1180px);
        }

        body.guide-page .guide-hero-layout {
          padding-top: 104px;
          padding-bottom: 48px;
        }

        body.guide-page .guide-notice {
          margin-top: 0;
        }

        body.guide-page .guide-library,
        body.guide-page .first-steps {
          padding-top: 64px;
          padding-bottom: 64px;
        }

        body.guide-page .channel-cta {
          padding-top: 56px;
          padding-bottom: 56px;
        }
      }
    `;
    document.head.appendChild(guideStyles);

    const heroPrintButton = document.querySelector('.guide-hero [data-print]');
    if (heroPrintButton) {
      const stepsLink = document.createElement('a');
      stepsLink.className = heroPrintButton.className;
      stepsLink.href = '#primeros-pasos';
      stepsLink.textContent = 'Qué hacer ante una mancha';
      heroPrintButton.replaceWith(stepsLink);
    }

    document.querySelector('.channel-cta [data-print]')?.remove();
  }

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
})();