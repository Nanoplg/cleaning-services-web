(() => {
  const logoData = window.__APPROVED_LOGO || '';
  const heroData = window.__APPROVED_HERO || '';
  const logo = logoData ? `data:image/webp;base64,${logoData}` : '';
  const hero = heroData ? `data:image/webp;base64,${heroData}` : '';

  function applyApprovedAssets() {
    if (logo) {
      document.querySelectorAll('.m-logo img, .m2-top img').forEach((img) => {
        img.src = logo;
        img.style.display = 'block';
        img.style.objectFit = 'contain';
      });
    }

    if (hero) {
      document.querySelectorAll('.m-hero-img').forEach((element) => {
        element.style.setProperty('background-image', `url("${hero}")`, 'important');
        element.style.backgroundPosition = 'center';
        element.style.backgroundSize = 'cover';
        element.style.backgroundRepeat = 'no-repeat';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyApprovedAssets);
  } else {
    applyApprovedAssets();
  }

  window.addEventListener('load', applyApprovedAssets);
})();
