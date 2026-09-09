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

      body.guide-page .guide-notice-row {
        grid-template-columns: auto minmax(0, 1fr);
        gap: 24px;
        padding: 25px 30px;
        border: 1px solid rgba(var(--accent-rgb), .34);
        border-left: 4px solid var(--accent);
        background: linear-gradient(90deg, rgba(var(--accent-rgb), .07), #fff 18%);
        box-shadow: 0 18px 48px rgba(7, 26, 43, .12);
      }

      body.guide-page .guide-notice strong {
        min-height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        border-radius: 10px;
        background: var(--accent);
        color: #fff;
        font-size: 11px;
        line-height: 1;
        letter-spacing: .12em;
        white-space: nowrap;
        box-shadow: 0 8px 20px rgba(var(--accent-rgb), .20);
      }

      body.guide-page .guide-notice p {
        color: #294b5b;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.6;
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

        body.guide-page .guide-notice-row {
          padding: 20px 24px;
          box-shadow: none;
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

        body.guide-page .guide-notice-row {
          grid-template-columns: 1fr;
          gap: 14px;
          padding: 24px;
          border-radius: 0;
        }

        body.guide-page .guide-notice strong {
          min-height: 38px;
          justify-self: start;
          padding: 0 14px;
          font-size: 10px;
        }

        body.guide-page .guide-notice p {
          font-size: 15px;
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

  if (document.body.classList.contains('theme-hogar')) {
    const hero = document.querySelector('.cleaning30-hero');
    const firstSlide = hero?.querySelector('.cleaning30-layout');

    if (hero && firstSlide && !hero.hasAttribute('data-cleaning-carousel')) {
      hero.setAttribute('data-cleaning-carousel', 'true');
      hero.setAttribute('aria-roledescription', 'carrusel');
      hero.setAttribute('aria-label', 'Diferenciales Cleaning para hogares');

      const carouselStyles = document.createElement('style');
      carouselStyles.setAttribute('data-cleaning-hero-carousel', 'true');
      carouselStyles.textContent = `
        .theme-hogar .cleaning-hero-stage {
          position: relative;
          min-height: 560px;
          overflow: hidden;
          transition: height .35s ease;
        }

        .theme-hogar .cleaning-hero-stage > .cleaning30-layout {
          position: absolute;
          inset: 0;
          width: 100%;
          min-height: 560px;
        }

        .theme-hogar .cleaning-hero-slide {
          z-index: 1;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translateX(18px);
          transition: opacity .75s ease, transform .75s ease, visibility 0s linear .75s;
        }

        .theme-hogar .cleaning-hero-slide.is-active {
          z-index: 2;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(0);
          transition-delay: 0s;
        }

        .theme-hogar .cleaning15-slide .cleaning30-headline {
          max-width: 545px;
        }

        .theme-hogar .cleaning15-slide .cleaning30-body {
          max-width: 555px;
        }

        .theme-hogar .cleaning15-visual {
          background-image:
            linear-gradient(90deg, rgba(250,249,245,.82) 0%, rgba(250,249,245,.42) 8%, rgba(250,249,245,.12) 17%, rgba(250,249,245,0) 28%),
            url("https://images.unsplash.com/photo-1722078139165-981ce4808245?auto=format&fit=crop&w=1800&q=84");
          background-position: center 55%;
        }

        .theme-hogar .cleaning15-visual .cleaning30-signature {
          top: 92px;
          right: 13%;
        }

        @media (max-width: 1080px) {
          .theme-hogar .cleaning-hero-stage,
          .theme-hogar .cleaning-hero-stage > .cleaning30-layout {
            min-height: 520px;
          }

          .theme-hogar .cleaning15-visual {
            background-position: 58% 55%;
          }
        }

        @media (max-width: 860px) {
          .theme-hogar .cleaning-hero-stage {
            min-height: 0;
          }

          .theme-hogar .cleaning-hero-stage > .cleaning30-layout {
            min-height: 0;
          }

          .theme-hogar .cleaning15-visual {
            background-position: center 55%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .theme-hogar .cleaning-hero-stage,
          .theme-hogar .cleaning-hero-slide {
            transition: none !important;
          }
        }
      `;
      document.head.appendChild(carouselStyles);

      const stage = document.createElement('div');
      stage.className = 'cleaning-hero-stage';
      firstSlide.before(stage);
      stage.appendChild(firstSlide);

      firstSlide.classList.add('cleaning-hero-slide', 'is-active');
      firstSlide.setAttribute('data-cleaning-slide', '30');
      firstSlide.setAttribute('aria-hidden', 'false');
      firstSlide.querySelector('.cleaning30-number')?.setAttribute('data-cleaning-number', '');

      const slide15 = document.createElement('div');
      slide15.className = 'cleaning30-layout cleaning-hero-slide cleaning15-slide';
      slide15.setAttribute('data-cleaning-slide', '15');
      slide15.setAttribute('aria-hidden', 'true');
      slide15.innerHTML = `
        <div class="cleaning30-copy-wrap">
          <div class="cleaning30-copy" data-reveal>
            <span class="cleaning30-kicker">Servicio de limpieza profesional para hogares</span>
            <h2 class="cleaning30-title" id="cleaning15-title">Cleaning <span class="cleaning30-number" data-cleaning-number>15</span></h2>
            <p class="cleaning30-headline">La tranquilidad continúa después de la limpieza.</p>
            <p class="cleaning30-body">Durante 15 días, si ocurre un accidente sobre tu tapizado, Cleaning vuelve a asistirte sin cargo.</p>
            <a class="cleaning30-cta" href="https://wa.me/5491158817248?text=Hola%2C%20quiero%20cotizar%20una%20limpieza%20de%20tapizados%20en%20mi%20hogar" target="_blank" rel="noopener noreferrer"><span>Cotizá tu servicio</span><span class="cleaning30-cta-arrow" aria-hidden="true">→</span></a>
            <div class="cleaning30-footline">Más que limpieza, bienestar</div>
          </div>
        </div>
        <div class="cleaning30-visual cleaning15-visual" role="img" aria-label="Living cálido y luminoso con un sillón claro">
          <div class="cleaning30-signature">Hogares más limpios,<br>vidas más tranquilas</div>
        </div>`;
      stage.appendChild(slide15);

      const slides = Array.from(stage.querySelectorAll('.cleaning-hero-slide'));
      let activeIndex = 0;
      let rotationTimer = null;
      let resizeTimer = null;
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

      const syncStageHeight = slide => {
        if (!slide) return;
        requestAnimationFrame(() => {
          const height = slide.scrollHeight || slide.getBoundingClientRect().height;
          if (height > 0) stage.style.height = `${height}px`;
        });
      };

      const showSlide = nextIndex => {
        const normalizedIndex = (nextIndex + slides.length) % slides.length;
        if (normalizedIndex === activeIndex) return;

        slides.forEach((slide, index) => {
          const active = index === normalizedIndex;
          slide.classList.toggle('is-active', active);
          slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        });

        activeIndex = normalizedIndex;
        syncStageHeight(slides[activeIndex]);
      };

      const stopRotation = () => {
        if (!rotationTimer) return;
        window.clearInterval(rotationTimer);
        rotationTimer = null;
      };

      const startRotation = () => {
        if (reduceMotion || rotationTimer || slides.length < 2 || document.hidden) return;
        rotationTimer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
      };

      hero.addEventListener('mouseenter', stopRotation);
      hero.addEventListener('mouseleave', startRotation);
      hero.addEventListener('focusin', stopRotation);
      hero.addEventListener('focusout', event => {
        if (!hero.contains(event.relatedTarget)) startRotation();
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopRotation();
        else startRotation();
      });

      window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => syncStageHeight(slides[activeIndex]), 120);
      });

      syncStageHeight(slides[0]);
      startRotation();
    }
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