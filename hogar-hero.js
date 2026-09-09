(() => {
  const hero = document.querySelector('.cleaning30-hero');
  if (!hero) return;

  hero.classList.add('cleaning-hero');
  hero.setAttribute('data-cleaning-hero', 'true');
  hero.removeAttribute('aria-labelledby');
  hero.setAttribute('aria-label', 'Diferenciales Cleaning para tapizados');

  const heroStyle = document.createElement('style');
  heroStyle.setAttribute('data-cleaning-hero-adjustments', 'true');
  heroStyle.textContent = `
    .theme-hogar .cleaning30-kicker {
      color: #16b9cc !important;
    }
  `;
  document.head.appendChild(heroStyle);

  hero.innerHTML = `
    <div class="cleaning-hero-stage">
      <article class="cleaning30-layout cleaning-hero-slide is-active" data-cleaning-slide="30" aria-hidden="false">
        <div class="cleaning30-copy-wrap cleaning-hero-copy-wrap">
          <div class="cleaning30-copy cleaning-hero-copy">
            <span class="cleaning30-kicker">Limpieza profesional de tapizados</span>
            <h1 class="cleaning30-title cleaning-hero-title">
              <span class="cleaning-hero-product">Respaldo</span>
              <span class="cleaning-hero-brand">Cleaning <span class="cleaning30-number">30</span></span>
              <span class="sr-only">Respaldo Cleaning 30</span>
            </h1>
            <p class="cleaning30-headline">Estamos tan seguros de nuestra calidad que te damos 30 días de respaldo.</p>
            <p class="cleaning30-body">Garantizamos cada detalle de nuestro protocolo. Si algo quedó fuera del estándar Cleaning, volvemos a corregirlo sin cargo.</p>
            <div class="cleaning-hero-footline"><span>Más que limpieza, bienestar</span></div>
          </div>
        </div>
        <div class="cleaning30-visual cleaning-hero-visual cleaning-hero-visual-30" role="img" aria-label="Control final profesional de un sillón claro recién tratado" style="background-image:url('assets/cleaning30-respaldo.svg');background-position:58% 57%;"></div>
      </article>

      <article class="cleaning30-layout cleaning-hero-slide" data-cleaning-slide="15" aria-hidden="true">
        <div class="cleaning30-copy-wrap cleaning-hero-copy-wrap">
          <div class="cleaning30-copy cleaning-hero-copy">
            <span class="cleaning30-kicker">Limpieza profesional de tapizados</span>
            <h2 class="cleaning30-title cleaning-hero-title">
              <span class="cleaning-hero-product">Protección Accidental</span>
              <span class="cleaning-hero-brand">Cleaning <span class="cleaning30-number">15</span></span>
              <span class="sr-only">Protección Accidental Cleaning 15</span>
            </h2>
            <p class="cleaning30-headline">La tranquilidad continúa después de la limpieza.</p>
            <p class="cleaning30-body">Durante 15 días, si ocurre un accidente sobre tu tapizado, Cleaning vuelve a asistirte sin cargo.</p>
            <div class="cleaning-hero-footline"><span>Más que limpieza, bienestar</span></div>
          </div>
        </div>
        <div class="cleaning30-visual cleaning-hero-visual cleaning-hero-visual-15" role="img" aria-label="Accidente cotidiano con café derramado sobre un sillón claro" style="background-image:url('assets/cleaning15-proteccion-accidental.svg');background-position:58% 57%;"></div>
      </article>
    </div>

    <div class="cleaning-hero-switcher" aria-label="Elegir diferencial Cleaning">
      <button type="button" class="cleaning-hero-tab is-active" data-hero-tab="30" aria-pressed="true">
        <span class="cleaning-hero-tab-index">01</span>
        <span class="cleaning-hero-tab-label">Respaldo Cleaning 30</span>
      </button>
      <span class="cleaning-hero-tab-divider" aria-hidden="true"></span>
      <button type="button" class="cleaning-hero-tab" data-hero-tab="15" aria-pressed="false">
        <span class="cleaning-hero-tab-index">02</span>
        <span class="cleaning-hero-tab-label">Protección Accidental Cleaning 15</span>
      </button>
    </div>`;

  const slides = Array.from(hero.querySelectorAll('[data-cleaning-slide]'));
  const tabs = Array.from(hero.querySelectorAll('[data-hero-tab]'));
  let active = '30';
  let timer = null;
  const intervalMs = 7000;

  const show = value => {
    const target = String(value);
    if (target === active) return;

    slides.forEach(slide => {
      const isActive = slide.dataset.cleaningSlide === target;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    tabs.forEach(tab => {
      const isActive = tab.dataset.heroTab === target;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    active = target;
  };

  const next = () => show(active === '30' ? '15' : '30');
  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    if (!document.hidden) timer = window.setInterval(next, intervalMs);
  };

  tabs.forEach(tab => tab.addEventListener('click', () => {
    show(tab.dataset.heroTab);
    start();
  }));

  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', event => {
    if (!hero.contains(event.relatedTarget)) start();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();
})();
