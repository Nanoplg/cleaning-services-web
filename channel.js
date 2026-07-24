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
      body.guide-page .guide-hero-layout {
        padding-top: 112px;
        padding-bottom: 72px;
      }

      body.guide-page .guide-hero-card {
        transform: translateY(-48px);
      }

      body.guide-page .material-card-top {
        display: block;
        margin-bottom: 24px;
      }

      body.guide-page .first-steps-grid article {
        min-height: 238px;
        padding: 26px;
      }

      body.guide-page .step-card-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 17px;
      }

      body.guide-page .step-card-head > span {
        width: 42px;
        height: 42px;
        flex: 0 0 42px;
        margin: 0;
      }

      body.guide-page .step-card-head > h3 {
        margin: 0;
        font-size: 18px;
        line-height: 1.25;
      }

      body.guide-page .guide-notice {
        margin-top: -26px;
      }

      body.guide-page .guide-library {
        padding-top: 84px;
        padding-bottom: 46px;
      }

      body.guide-page .first-steps {
        padding-top: 54px;
        padding-bottom: 54px;
      }

      body.guide-page .channel-cta {
        padding-top: 46px;
        padding-bottom: 46px;
      }

      @media print {
        body.guide-page .material-card-top {
          margin-bottom: 10px;
        }

        body.guide-page .first-steps-grid article {
          min-height: 0;
        }

        body.guide-page .step-card-head {
          margin-bottom: 8px;
        }
      }

      @media (max-width: 980px) {
        body.guide-page .guide-hero-layout {
          padding-top: 118px;
          padding-bottom: 62px;
        }

        body.guide-page .guide-hero-card {
          transform: translateY(-14px);
        }
      }

      @media (max-width: 640px) {
        body.guide-page .guide-hero-layout {
          padding-top: 104px;
          padding-bottom: 48px;
        }

        body.guide-page .guide-hero-card {
          transform: none;
        }

        body.guide-page .first-steps-grid article {
          min-height: 0;
        }

        body.guide-page .guide-notice {
          margin-top: 0;
        }

        body.guide-page .guide-library {
          padding-top: 58px;
          padding-bottom: 36px;
        }

        body.guide-page .first-steps {
          padding-top: 44px;
          padding-bottom: 44px;
        }

        body.guide-page .channel-cta {
          padding-top: 40px;
          padding-bottom: 40px;
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

    document.querySelector('.guide-hero-card span')?.remove();
    document.querySelectorAll('.material-symbol').forEach(symbol => symbol.remove());

    document.querySelectorAll('.first-steps-grid article').forEach(card => {
      if (card.querySelector('.step-card-head')) return;

      const step = Array.from(card.children).find(element => element.tagName === 'SPAN');
      const title = Array.from(card.children).find(element => element.tagName === 'H3');
      if (!step || !title) return;

      const header = document.createElement('div');
      header.className = 'step-card-head';
      card.insertBefore(header, step);
      header.append(step, title);
    });

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