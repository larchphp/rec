document.addEventListener('DOMContentLoaded', () => {

  // ===== STICKY HEADER =====
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== MOBILE NAV =====
  const burger = document.querySelector('.header__burger');
  const mobileNav = document.getElementById('mobileNav');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ===== FLOATING MESSENGER WIDGET (FAB) =====
  const fab = document.getElementById('fab');
  const fabToggle = document.getElementById('fabToggle');
  const fabOptions = document.getElementById('fabOptions');
  let fabOpen = false;

  // Show FAB after scrolling past hero
  const heroSection = document.getElementById('hero');
  if (heroSection && fab) {
    const fabObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        fab.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0.3 });

    fabObserver.observe(heroSection);
  }

  // Toggle FAB options
  if (fabToggle && fabOptions) {
    fabToggle.addEventListener('click', () => {
      fabOpen = !fabOpen;
      fabOptions.classList.toggle('hidden', !fabOpen);
      fabOptions.classList.toggle('visible', fabOpen);
      fabToggle.classList.toggle('active', fabOpen);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && fabOpen) {
        fabOpen = false;
        fabOptions.classList.add('hidden');
        fabOptions.classList.remove('visible');
        fabToggle.classList.remove('active');
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (fabOpen && !fab.contains(e.target)) {
        fabOpen = false;
        fabOptions.classList.add('hidden');
        fabOptions.classList.remove('visible');
        fabToggle.classList.remove('active');
      }
    });
  }

});
