(() => {
  const currentScript = document.currentScript;
  const coreScript = document.createElement('script');
  coreScript.src = 'channel-core.js';

  coreScript.addEventListener('load', () => {
    const hero = document.querySelector('.cleaning30-hero');
    if (!hero) return;

    hero.querySelectorAll('.cleaning30-cta').forEach(button => button.remove());

    let manualTimer = null;

    hero.addEventListener('click', event => {
      if (event.target.closest('a, button, input, select, textarea, details, summary')) return;

      const slide30 = hero.querySelector('[data-cleaning-slide="30"]');
      const slide15 = hero.querySelector('[data-cleaning-slide="15"]');
      if (!slide30 || !slide15) return;

      const showing30 = parseFloat(window.getComputedStyle(slide30).opacity || '0') >= 0.5;

      hero.classList.remove('is-manual-30', 'is-manual-15');
      hero.classList.add(showing30 ? 'is-manual-15' : 'is-manual-30');

      if (manualTimer) window.clearTimeout(manualTimer);
      manualTimer = window.setTimeout(() => {
        hero.classList.remove('is-manual-30', 'is-manual-15');
      }, 6000);
    });
  });

  if (currentScript?.parentNode) currentScript.parentNode.insertBefore(coreScript, currentScript.nextSibling);
  else document.body.appendChild(coreScript);
})();
