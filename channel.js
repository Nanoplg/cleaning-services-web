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
})();
