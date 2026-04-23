/* ============================================================
   LA DOUCEUR — Main JavaScript
   ============================================================ */

'use strict';

/* ----------------------------------------
   1. SCROLL REVEAL ANIMATIONS
   ---------------------------------------- */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.product-card, .testimonial, .differentials__item, ' +
    '.social-proof__badge, .urgency__inner, .cta-final__inner, ' +
    '.section-header'
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
})();

/* ----------------------------------------
   2. WHATSAPP FLOAT BUTTON — Hide on hero
   ---------------------------------------- */
(function initFloatVisibility() {
  const floatBtn = document.querySelector('.whatsapp-float');
  const hero = document.querySelector('#hero');
  if (!floatBtn || !hero) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          floatBtn.style.opacity = '0';
          floatBtn.style.pointerEvents = 'none';
        } else {
          floatBtn.style.opacity = '1';
          floatBtn.style.pointerEvents = 'auto';
        }
      });
    },
    { threshold: 0.3 }
  );

  floatBtn.style.transition = 'opacity 0.4s ease';
  observer.observe(hero);
})();

/* ----------------------------------------
   3. URGENCY SLOTS — Animated fill effect
   ---------------------------------------- */
(function initUrgencySlots() {
  const takenSlots = document.querySelectorAll('.urgency__slot--taken');
  if (!takenSlots.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        takenSlots.forEach((slot, i) => {
          slot.style.transform = 'scaleX(0)';
          slot.style.transformOrigin = 'left';
          slot.style.transition = `transform 0.5s ease ${i * 0.15}s`;
          requestAnimationFrame(() => {
            setTimeout(() => {
              slot.style.transform = 'scaleX(1)';
            }, 50);
          });
        });
        sectionObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  const urgencySection = document.querySelector('#urgencia');
  if (urgencySection) sectionObserver.observe(urgencySection);
})();

/* ----------------------------------------
   4. SMOOTH ANCHOR SCROLLING (safety)
   ---------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ----------------------------------------
   5. PRODUCT CARDS — Touch ripple feedback
   ---------------------------------------- */
(function initRipple() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointerdown', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple-anim 0.55s ease-out forwards;
        pointer-events: none;
      `;

      if (getComputedStyle(btn).position === 'static') {
        btn.style.position = 'relative';
      }
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ----------------------------------------
   6. HERO — Subtle parallax on scroll
   ---------------------------------------- */
(function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const limit = hero.offsetHeight;
        if (scrollY < limit) {
          hero.style.backgroundPositionY = `calc(50% + ${scrollY * 0.3}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ----------------------------------------
   7. WHATSAPP TRACKING (optional logging)
   ---------------------------------------- */
document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener('click', function () {
    const section = this.closest('section');
    const sectionId = section ? section.id : 'unknown';
    console.log(`[La Douceur] WhatsApp CTA clicked — section: ${sectionId}`);
  });
});

/* ----------------------------------------
   8. URGENCY COUNTER — Live feel
   ---------------------------------------- */
(function initUrgencyCounter() {
  const label = document.querySelector('.urgency__slots-label');
  if (!label) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      label.style.animation = 'none';
      label.style.transition = 'color 0.4s ease';
      setTimeout(() => {
        label.style.color = '#D53F8C';
      }, 800);
      observer.disconnect();
    }
  }, { threshold: 0.8 });

  observer.observe(label);
})();
