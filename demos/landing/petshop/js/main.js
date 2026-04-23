/* ============================================================
   PetShopFeliz – main.js
   Patinhas animadas + scroll reveal + interatividade
   ============================================================ */

/* ---- PATINHAS FLUTUANTES ---- */
(function initPaws() {
  const container = document.getElementById('pawsContainer');
  if (!container) return;

  const PAW_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="36" height="36">
      <!-- Almofada central -->
      <ellipse cx="50" cy="65" rx="22" ry="18" fill="currentColor" opacity=".85"/>
      <!-- Dedos -->
      <ellipse cx="28" cy="46" rx="11" ry="9"  fill="currentColor" opacity=".85"/>
      <ellipse cx="72" cy="46" rx="11" ry="9"  fill="currentColor" opacity=".85"/>
      <ellipse cx="42" cy="38" rx="10" ry="8.5" fill="currentColor" opacity=".85"/>
      <ellipse cx="58" cy="38" rx="10" ry="8.5" fill="currentColor" opacity=".85"/>
    </svg>`;

  const COLORS = [
    '#4ECDC4', // verde-azulado
    '#FF6B35', // laranja
    '#FFD93D', // amarelo
    '#4A90D9', // azul
    '#b8f0ed', // verde claro
  ];

  const TOTAL = 14;

  for (let i = 0; i < TOTAL; i++) {
    const el = document.createElement('div');
    el.className = 'paw-float';
    el.innerHTML = PAW_SVG;

    const color    = COLORS[Math.floor(Math.random() * COLORS.length)];
    const left     = (Math.random() * 96).toFixed(1) + '%';
    const duration = (7 + Math.random() * 9).toFixed(1)  + 's';
    const delay    = (Math.random() * 12).toFixed(1)       + 's';
    const rot      = ((Math.random() - 0.5) * 40).toFixed(0) + 'deg';
    const scale    = (.55 + Math.random() * .6).toFixed(2);
    const hue      = Math.floor(Math.random() * 30) + 'deg';

    el.style.cssText = `
      left: ${left};
      bottom: -80px;
      color: ${color};
      --duration: ${duration};
      --delay: ${delay};
      --rot: ${rot};
      --hue: ${hue};
      transform: scale(${scale});
    `;
    container.appendChild(el);
  }
})();

/* ---- SCROLL REVEAL ---- */
(function initReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .testimonial-card, .proof-counter, .urgency-card, .cta-content, .section-header, .hero-text, .hero-image-wrap'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          // Stagger leve por índice dentro do grupo
          const delay = (e.target.dataset.delay || 0);
          setTimeout(() => e.target.classList.add('visible'), delay);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Atribuir delays escalonados nos cards do mesmo grupo pai
  document.querySelectorAll('.cards-grid, .testimonials').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.dataset.delay = i * 100;
    });
  });

  targets.forEach(el => observer.observe(el));
})();

/* ---- BARRA DE VAGAS ANIMADA ---- */
(function initSlotsBar() {
  const bar = document.querySelector('.slots-filled');
  if (!bar) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Anima de 0 → 80%
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = '80%'; }, 100);
        });
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(bar);
})();

/* ---- HEADER SHADOW ON SCROLL ---- */
(function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20
      ? '0 4px 20px rgba(0,0,0,.12)'
      : '0 2px 8px rgba(0,0,0,.06)';
  }, { passive: true });
})();

/* ---- CONTADOR ANIMADO ---- */
(function initCounter() {
  const el = document.querySelector('.counter-number');
  if (!el) return;

  const target = 200;
  const duration = 1800;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const start = performance.now();
        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = '+' + Math.floor(ease * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = '+200';
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(el);
})();

/* ---- CLICK TRACKING (simples) ---- */
document.querySelectorAll('.btn-primary, .whatsapp-float').forEach(btn => {
  btn.addEventListener('click', () => {
    // Efeito ripple
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      background:rgba(255,255,255,.35);
      border-radius:50%;
      transform:scale(0);
      animation:rippleAnim .55s linear;
      pointer-events:none;
      width:60px; height:60px;
      top:50%; left:50%;
      margin:-30px 0 0 -30px;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple keyframe (injetado dinamicamente)
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);
