(() => {
  const currentScript = document.currentScript;
  const existingHero = document.querySelector('.cleaning30-hero');

  existingHero?.setAttribute('data-cleaning-carousel', 'refined');

  const insertAfter = (script, anchor) => {
    if (anchor?.parentNode) anchor.parentNode.insertBefore(script, anchor.nextSibling);
    else document.body.appendChild(script);
  };

  const coreScript = document.createElement('script');
  coreScript.src = 'channel-core.js?v=20260909-6';

  coreScript.addEventListener('load', () => {
    if (!document.body.classList.contains('theme-hogar')) return;

    const heroScript = document.createElement('script');
    heroScript.src = 'hogar-hero.js?v=20260909-6';
    insertAfter(heroScript, coreScript);
  });

  insertAfter(coreScript, currentScript);
})();
