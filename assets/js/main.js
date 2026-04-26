/* ═══════════════════════════════════════════════════════════
   DuduStudio – Main JavaScript
   GSAP + ScrollTrigger + Microinteractions + Modal + Counters
═══════════════════════════════════════════════════════════ */

/* ── GSAP REGISTER ── */
gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

/* ═══════════════════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   HERO GSAP ENTRANCE
═══════════════════════════════════════════════════════════ */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
  .from('.hero-badge',    { opacity: 0, y: 20, duration: .8, delay: .3 })
  .from('.hero-title',    { opacity: 0, y: 30, duration: .8 }, '-=.4')
  .from('.hero-subtitle', { opacity: 0, y: 20, duration: .8 }, '-=.5')
  .from('.hero-buttons',  { opacity: 0, y: 20, duration: .7 }, '-=.4')
  .from('.hero-stats',    { opacity: 0, y: 20, duration: .7 }, '-=.3')
  .from('.mockup-card', {
    opacity: 0,
    y: 40,
    stagger: .15,
    duration: .9,
  }, '-=.5')
  .from('.hero-scroll-hint', { opacity: 0, duration: .6 }, '-=.2');

/* ═══════════════════════════════════════════════════════════
   REVEAL ON SCROLL (IntersectionObserver — lightweight)
═══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px 80px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════════ */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const startVal = 0;
  const update = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

// Hero stats counters
const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-number');
      if (numEl) {
        const target = parseInt(numEl.dataset.target);
        animateCounter(numEl, target);
      }
      heroStatsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(el => heroStatsObserver.observe(el));

// Bottom stats counters
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stats-num');
      if (numEl) {
        const target = parseInt(numEl.dataset.target);
        animateCounter(numEl, target);
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-item').forEach(el => statsObserver.observe(el));

// Hero stats bar counters (new Awwwards hero)
const hsbObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.hsb-num');
      if (numEl) {
        const target = parseInt(numEl.dataset.target);
        animateCounter(numEl, target);
      }
      hsbObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hsb-item').forEach(el => hsbObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   GSAP SCROLL ANIMATIONS (extra premium feel)
═══════════════════════════════════════════════════════════ */

// Stagger the step cards
gsap.from('.step-card', {
  scrollTrigger: { trigger: '#como-funciona', start: 'top 75%' },
  opacity: 0,
  y: 50,
  stagger: .2,
  duration: .9,
  ease: 'power3.out'
});

// Stagger diff cards
gsap.from('.diff-card', {
  scrollTrigger: { trigger: '#diferenciais', start: 'top 75%' },
  opacity: 0,
  y: 40,
  stagger: .1,
  duration: .8,
  ease: 'power3.out'
});

// Testimonial cards are handled by the infinite carousel — no GSAP needed here

// Garante que todos os cards começam visíveis (fix: cards sumindo antes do filtro)
document.querySelectorAll('.site-card').forEach(card => {
  card.style.opacity = '1';
  card.style.display = 'flex';
});

// Stagger vitrine cards
gsap.fromTo('.site-card',
  { opacity: 0, y: 50, scale: 0.97 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: .6,
    stagger: .08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#vitrine',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  }
);

// CTA section
gsap.from('#cta-final .cta-content', {
  scrollTrigger: { trigger: '#cta-final', start: 'top 75%' },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: 'power3.out'
});

/* ═══════════════════════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
const siteCards = document.querySelectorAll('.site-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    siteCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;

      if (show) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          duration: .4,
          ease: 'power2.out',
          clearProps: 'display',
          onStart: () => { card.style.display = 'flex'; }
        });
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: .95,
          duration: .3,
          ease: 'power2.in',
          onComplete: () => { card.style.display = 'none'; }
        });
      }
    });
  });
});

/* ═══════════════════════════════════════════════════════════
   MODAL SYSTEM
═══════════════════════════════════════════════════════════ */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBuyBtn = document.getElementById('modalBuyBtn');
const demoUrl = document.getElementById('demoUrl');
const browserBody = document.getElementById('browserBody');
const demoContent = document.getElementById('demoContent');
const modalPreviewInner = document.getElementById('modalPreviewInner');

const demoData = {
  doceria: {
    title: 'Doceria Premium',
    url: 'dudustudio.com.br/demo/doceria',
    wa: 'Quero%20o%20site%20Doceria%20Premium!',
    bg: 'linear-gradient(135deg, #1a0533 0%, #6b0f9e 100%)',
    accent: '#f2d798',
    navColor: '#d6b36a',
    emoji: '🍫',
    name: 'Doceria',
    sections: [
      { type: 'hero', title: 'Doces que encantam', sub: 'Encomendas especiais para momentos únicos', btnColor: '#f2d798', btnTextColor: '#1a0533' },
      { type: 'products', items: ['Bolo de Casamento', 'Brigadeiros Gourmet', 'Cake Pops'] },
      { type: 'cta', text: 'Faça seu pedido agora' }
    ]
  },
  clinica: {
    title: 'Clínica Estética',
    url: 'dudustudio.com.br/demo/clinica',
    wa: 'Quero%20o%20site%20Clínica%20Estética!',
    bg: 'linear-gradient(135deg, #0a1628 0%, #1e5f8e 100%)',
    accent: '#3a86ff',
    navColor: '#3a86ff',
    emoji: '🏥',
    name: 'Clínica',
    sections: [
      { type: 'hero', title: 'Sua beleza, nosso cuidado', sub: 'Tratamentos estéticos modernos com tecnologia avançada', btnColor: '#3a86ff', btnTextColor: '#fff' },
      { type: 'products', items: ['Limpeza de Pele', 'Botox', 'Peeling Químico'] },
      { type: 'cta', text: 'Agende sua consulta' }
    ]
  },
  salao: {
    title: 'Salão de Beleza',
    url: 'dudustudio.com.br/demo/salao',
    wa: 'Quero%20o%20site%20Salão%20de%20Beleza!',
    bg: 'linear-gradient(135deg, #1b0a1f 0%, #7b2d8b 100%)',
    accent: '#e040fb',
    navColor: '#e040fb',
    emoji: '✂️',
    name: 'Salão',
    sections: [
      { type: 'hero', title: 'Arte que transforma', sub: 'Cortes, coloração e tratamentos para você arrasar', btnColor: '#e040fb', btnTextColor: '#fff' },
      { type: 'products', items: ['Corte Feminino', 'Coloração', 'Escova Progressiva'] },
      { type: 'cta', text: 'Agende seu horário' }
    ]
  },
  advocacia: {
    title: 'Escritório de Advocacia',
    url: 'dudustudio.com.br/demo/advocacia',
    wa: 'Quero%20o%20site%20Advocacia!',
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #16213e 100%)',
    accent: '#d6b36a',
    navColor: '#d6b36a',
    emoji: '⚖️',
    name: 'Advocacia',
    sections: [
      { type: 'hero', title: 'Defenda seus direitos', sub: 'Advocacia especializada com atendimento humanizado', btnColor: '#d6b36a', btnTextColor: '#000' },
      { type: 'products', items: ['Direito Civil', 'Direito Trabalhista', 'Direito Penal'] },
      { type: 'cta', text: 'Fale com um advogado' }
    ]
  },
  nutricao: {
    title: 'Nutricionista',
    url: 'dudustudio.com.br/demo/nutricao',
    wa: 'Quero%20o%20site%20Nutricionista!',
    bg: 'linear-gradient(135deg, #0d1f0d 0%, #2d6a4f 100%)',
    accent: '#52b788',
    navColor: '#52b788',
    emoji: '🥗',
    name: 'Nutrição',
    sections: [
      { type: 'hero', title: 'Saúde que transforma', sub: 'Planos alimentares personalizados para sua vida', btnColor: '#52b788', btnTextColor: '#fff' },
      { type: 'products', items: ['Consulta Presencial', 'Consulta Online', 'Plano Alimentar'] },
      { type: 'cta', text: 'Agende sua consulta' }
    ]
  },
  construcao: {
    title: 'Construtora / Reforma',
    url: 'dudustudio.com.br/demo/construcao',
    wa: 'Quero%20o%20site%20Construtora!',
    bg: 'linear-gradient(135deg, #1a0e00 0%, #8b5e00 100%)',
    accent: '#f4a261',
    navColor: '#f4a261',
    emoji: '🏗️',
    name: 'Construtora',
    sections: [
      { type: 'hero', title: 'Construindo seus sonhos', sub: 'Obras residenciais e comerciais com qualidade garantida', btnColor: '#f4a261', btnTextColor: '#000' },
      { type: 'products', items: ['Construção Civil', 'Reformas', 'Projetos Personalizados'] },
      { type: 'cta', text: 'Solicitar orçamento' }
    ]
  }
};

function buildDemoHtml(data) {
  const heroSection = data.sections.find(s => s.type === 'hero');
  const productsSection = data.sections.find(s => s.type === 'products');
  const ctaSection = data.sections.find(s => s.type === 'cta');

  return `
    <div style="width:100%;height:100%;overflow-y:auto;font-family:'Inter',sans-serif;color:#fff;background:${data.bg};font-size:13px;">
      <!-- Nav -->
      <div style="background:rgba(0,0,0,.4);backdrop-filter:blur(10px);padding:10px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;border-bottom:1px solid rgba(255,255,255,.1);">
        <strong style="color:${data.accent};font-size:14px;">${data.emoji} ${data.name}</strong>
        <div style="display:flex;gap:12px;font-size:11px;color:rgba(255,255,255,.7);">
          <span>Início</span><span>Serviços</span><span>Contato</span>
        </div>
        <div style="background:${heroSection.btnColor};color:${heroSection.btnTextColor};padding:5px 14px;border-radius:50px;font-size:11px;font-weight:700;cursor:pointer;">WhatsApp</div>
      </div>

      <!-- Hero -->
      <div style="padding:40px 24px 32px;text-align:center;min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">
        <div style="font-size:9px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:50px;padding:4px 14px;color:rgba(255,255,255,.8);letter-spacing:.08em;text-transform:uppercase;">★ Bem-vindo(a)</div>
        <h1 style="font-size:20px;font-weight:800;line-height:1.2;margin:0;">${heroSection.title}</h1>
        <p style="font-size:12px;color:rgba(255,255,255,.7);max-width:300px;line-height:1.5;margin:0;">${heroSection.sub}</p>
        <div style="display:flex;gap:10px;margin-top:4px;">
          <div style="background:${heroSection.btnColor};color:${heroSection.btnTextColor};padding:9px 22px;border-radius:50px;font-size:12px;font-weight:700;cursor:pointer;">Entrar em contato</div>
          <div style="background:transparent;border:1.5px solid rgba(255,255,255,.3);color:#fff;padding:9px 22px;border-radius:50px;font-size:12px;cursor:pointer;">Ver serviços</div>
        </div>
      </div>

      <!-- Services -->
      <div style="padding:24px;background:rgba(0,0,0,.25);">
        <p style="text-align:center;font-size:10px;color:rgba(255,255,255,.5);letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px;">NOSSOS SERVIÇOS</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          ${productsSection.items.map(item => `
            <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:14px 18px;text-align:center;min-width:100px;flex:1;max-width:140px;">
              <div style="width:32px;height:32px;border-radius:8px;background:${data.accent};opacity:.3;margin:0 auto 8px;"></div>
              <div style="font-size:10px;font-weight:600;line-height:1.3;">${item}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- About strip -->
      <div style="padding:20px 24px;display:flex;gap:16px;align-items:center;background:rgba(0,0,0,.15);">
        <div style="flex:1;">
          <div style="height:8px;background:rgba(255,255,255,.1);border-radius:4px;margin-bottom:6px;width:80%;"></div>
          <div style="height:8px;background:rgba(255,255,255,.07);border-radius:4px;margin-bottom:6px;width:60%;"></div>
          <div style="height:8px;background:rgba(255,255,255,.07);border-radius:4px;width:70%;"></div>
        </div>
        <div style="width:80px;height:70px;border-radius:10px;background:rgba(255,255,255,.08);flex-shrink:0;"></div>
      </div>

      <!-- CTA Section -->
      <div style="padding:28px 24px;text-align:center;background:${data.accent}22;border-top:1px solid ${data.accent}33;">
        <p style="font-size:14px;font-weight:700;margin-bottom:12px;">${ctaSection.text}</p>
        <div style="background:#25d366;color:#fff;padding:10px 28px;border-radius:50px;font-size:12px;font-weight:700;display:inline-block;cursor:pointer;">📱 WhatsApp</div>
      </div>

      <!-- Footer -->
      <div style="padding:16px 24px;background:rgba(0,0,0,.5);text-align:center;border-top:1px solid rgba(255,255,255,.07);">
        <p style="font-size:10px;color:rgba(255,255,255,.4);">© 2025 ${data.name} · Todos os direitos reservados</p>
      </div>
    </div>
  `;
}

function openModal(siteKey) {
  const data = demoData[siteKey];
  if (!data) return;

  modalTitle.textContent = data.title;
  demoUrl.textContent = data.url;
  modalBuyBtn.href = `https://wa.me/5511999999999?text=${data.wa}`;
  
  browserBody.innerHTML = '';
  const preview = document.createElement('div');
  preview.id = 'demoContent';
  preview.className = 'demo-site-preview';
  preview.innerHTML = buildDemoHtml(data);
  browserBody.appendChild(preview);

  // Reset to desktop view
  setDevice('desktop');
  document.getElementById('btnDesktop').classList.add('active');
  document.getElementById('btnMobile').classList.remove('active');

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function setDevice(type) {
  const inner = document.getElementById('modalPreviewInner');
  const btn_d = document.getElementById('btnDesktop');
  const btn_m = document.getElementById('btnMobile');
  const placeholder = document.getElementById('modalPlaceholder');

  if (type === 'mobile') {
    inner.classList.add('mobile-view');
    btn_m.classList.add('active');
    btn_d.classList.remove('active');
    if (placeholder) placeholder.style.maxWidth = '390px';
  } else {
    inner.classList.remove('mobile-view');
    btn_d.classList.add('active');
    btn_m.classList.remove('active');
    if (placeholder) placeholder.style.maxWidth = '100%';
  }
}

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ═══════════════════════════════════════════════════════════
   BUTTON HOVER RIPPLE EFFECT
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.btn-gold, .btn-whatsapp').forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      width: 1px; height: 1px;
      left: ${x}px; top: ${y}px;
      transform: translate(-50%, -50%) scale(0);
      animation: rippleEffect .6s ease-out forwards;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Add ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to { transform: translate(-50%,-50%) scale(120); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ═══════════════════════════════════════════════════════════
   PARALLAX GLOW on mouse move (subtle, desktop only)
═══════════════════════════════════════════════════════════ */
const heroSection = document.getElementById('hero');
let ticking = false;

if (window.innerWidth > 1024) {
  document.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 10;
      const glow1 = document.querySelector('.hero-glow-1');
      const glow2 = document.querySelector('.hero-glow-2');
      if (glow1) {
        glow1.style.transform = `translate(${xPercent * .5}px, ${yPercent * .5}px)`;
      }
      if (glow2) {
        glow2.style.transform = `translate(${-xPercent * .3}px, ${-yPercent * .3}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   CARD TILT (very subtle on desktop)
═══════════════════════════════════════════════════════════ */
if (window.innerWidth > 768) {
  document.querySelectorAll('.site-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: .3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: .5,
        ease: 'power2.out',
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   STEP CARDS tilt
═══════════════════════════════════════════════════════════ */
if (window.innerWidth > 768) {
  document.querySelectorAll('.diff-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -6, duration: .3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: .4, ease: 'power2.out' });
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   SECTION TAG GLOW
═══════════════════════════════════════════════════════════ */
gsap.utils.toArray('.section-tag').forEach(tag => {
  ScrollTrigger.create({
    trigger: tag,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(tag,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: .6, ease: 'back.out(2)' }
      );
    },
    once: true
  });
});

/* ═══════════════════════════════════════════════════════════
   FLOATING MOCKUPS — subtle parallax on scroll
═══════════════════════════════════════════════════════════ */
if (window.innerWidth > 1100) {
  gsap.to('.mockup-1', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: -60,
    ease: 'none'
  });
  gsap.to('.mockup-2', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    },
    y: -40,
    ease: 'none'
  });
  gsap.to('.mockup-3', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    },
    y: -80,
    ease: 'none'
  });
}

/* ═══════════════════════════════════════════════════════════
   SECTION TITLE UNDERLINE ANIMATION
═══════════════════════════════════════════════════════════ */
gsap.utils.toArray('.section-title').forEach(title => {
  ScrollTrigger.create({
    trigger: title,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(title,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: .9, ease: 'power3.out' }
      );
    },
    once: true
  });
});

/* ═══════════════════════════════════════════════════════════
   GOLD LINE ANIMATION (decorative)
═══════════════════════════════════════════════════════════ */
const goldLineStyle = document.createElement('style');
goldLineStyle.textContent = `
  .step-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 24px; right: 24px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0;
    transition: opacity .4s;
  }
  .step-card:hover::after { opacity: 0.5; }
`;
document.head.appendChild(goldLineStyle);

/* ═══════════════════════════════════════════════════════════
   FILTER COUNT BADGE (Informative)
═══════════════════════════════════════════════════════════ */
function updateFilterCounts() {
  filterBtns.forEach(btn => {
    const filter = btn.dataset.filter;
    let count = 0;
    if (filter === 'all') {
      count = siteCards.length;
    } else {
      siteCards.forEach(card => {
        if (card.dataset.category === filter) count++;
      });
    }
    // Only add count if > 0
    const baseText = btn.textContent.replace(/\s*\(\d+\)$/, '');
    if (count > 0) btn.textContent = `${baseText} (${count})`;
  });
}
updateFilterCounts();

/* ═══════════════════════════════════════════════════════════
   LAZY IMAGE SHIMMER
═══════════════════════════════════════════════════════════ */
const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
  .card-image {
    background-size: 200% 100%;
  }
  @keyframes shimmer {
    0%{ background-position: -200% 0; }
    100%{ background-position: 200% 0; }
  }
`;
document.head.appendChild(shimmerStyle);

/* ═══════════════════════════════════════════════════════════
   PERFORMANCE: reduce animations on mobile
═══════════════════════════════════════════════════════════ */
if (window.innerWidth <= 768) {
  // Disable card tilt on mobile
  document.querySelectorAll('.site-card').forEach(card => {
    card.style.transform = 'none';
  });
  // Reduce GSAP stagger
  gsap.globalTimeline.timeScale(1.2);
}

/* ═══════════════════════════════════════════════════════════
   PARTÍCULAS DOURADAS — seção #sobre
═══════════════════════════════════════════════════════════ */
(function initSobreParticles() {
  const canvas = document.getElementById('sobreParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = Array.from({ length: 35 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.5 + 0.5,
    vx:    (Math.random() - 0.5) * 0.3,
    vy:    (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(214,179,106,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════════════════════════════
   LINHA ANIMADA — seção #como-funciona
═══════════════════════════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '#como-funciona',
  start: 'top 65%',
  onEnter: () => {
    const grid = document.querySelector('.steps-grid');
    if (grid) grid.classList.add('line-animated');
  }
});

/* ═══════════════════════════════════════════════════════════
   ÍCONES DIFERENCIAIS — rotação na entrada
═══════════════════════════════════════════════════════════ */
gsap.utils.toArray('.diff-icon').forEach((icon, i) => {
  gsap.from(icon, {
    scrollTrigger: {
      trigger: icon,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    rotation: -15,
    scale: 0.5,
    opacity: 0,
    duration: .6,
    delay: i * 0.08,
    ease: 'back.out(2)'
  });
});

/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════ */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}, { passive: true });

/* ═══════════════════════════════════════════════════════════
   FAQ DETAILS — icon rotation on toggle
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('details').forEach(detail => {
  detail.addEventListener('toggle', () => {
    const span = detail.querySelector('summary span');
    if (span) {
      span.style.transform = detail.open ? 'rotate(45deg)' : 'rotate(0deg)';
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   NÚMEROS DECORATIVOS nas seções (estilo editorial)
═══════════════════════════════════════════════════════════ */
const sectionNumbers = [
  { id: 'sobre',         num: '01' },
  { id: 'como-funciona', num: '02' },
  { id: 'landing-pages', num: '03' },
  { id: 'sites',         num: '04' },
  { id: 'diferenciais',  num: '05' },
  { id: 'depoimentos',   num: '06' },
];

sectionNumbers.forEach(({ id, num }) => {
  const section = document.getElementById(id);
  if (section) {
    const numEl = document.createElement('div');
    numEl.className = 'section-number';
    numEl.textContent = num;
    section.appendChild(numEl);
  }
});

/* ═══════════════════════════════════════════════════════════
   TEXTO GRADIENTE ANIMADO nos elementos .text-gold
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.text-gold').forEach(el => {
  el.classList.add('text-gradient-animated');
});

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS INFINITE CAROUSEL
═══════════════════════════════════════════════════════════ */
(function () {
  const wrap  = document.getElementById('testiCarouselWrap');
  const track = document.getElementById('testiTrack');
  if (!wrap || !track) return;

  let pos    = 0;
  let paused = false;
  const SPEED = 0.6; // px per frame

  wrap.addEventListener('mouseenter', () => { paused = true; });
  wrap.addEventListener('mouseleave', () => { paused = false; });

  function tick() {
    if (!paused) {
      pos -= SPEED;
      const half = track.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ═══════════════════════════════════════════════════════════
   INIT LOG
═══════════════════════════════════════════════════════════ */
console.log('%c DuduStudio 🚀 ', 'background:#d6b36a;color:#0a0a0a;font-size:14px;font-weight:800;padding:6px 12px;border-radius:4px;');
console.log('%c Site carregado com sucesso! ', 'color:#d6b36a;font-size:11px;');

/* ═══════════════════════════════════════════════════════════
   PAINEL DUDUSHIELD™
   Acesse: adicione #dudushield-panel na URL
═══════════════════════════════════════════════════════════ */
window.addEventListener('hashchange', function() {
  if (window.location.hash !== '#dudushield-panel') return;
  history.pushState('', '', window.location.pathname);

  var pass = prompt('🔒 DuduShield™ — Senha de acesso:');
  if (pass !== 'ds$2025!xK9') {
    if (pass !== null) alert('Senha incorreta.');
    return;
  }

  if (typeof DuduShield === 'undefined') {
    alert('DuduShield™ não carregado.');
    return;
  }

  var summary = DuduShield.getSummary();
  var logs = DuduShield.getLogs().slice(-20).reverse();

  var metricCards = [
    ['Total eventos', summary.total],
    ['Últimas 24h', summary.last24h],
    ['Fingerprints únicos', summary.uniqueFingerprints],
    ['Rate limits', summary.byEvent.rate_limit || 0]
  ].map(function(item) {
    return '<div style="background:#111;border:1px solid #222;border-radius:8px;padding:1rem;text-align:center;">' +
      '<div style="font-size:2rem;color:#d6b36a;font-weight:700;">' + item[1] + '</div>' +
      '<div style="font-size:.65rem;color:#555;margin-top:.25rem;">' + item[0] + '</div>' +
      '</div>';
  }).join('');

  function _esc(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
  }

  var logRows = logs.map(function(l) {
    var borderColor = l.event.includes('rate') ? '#ff4444' :
      l.event.includes('xss') ? '#ff0000' :
      l.event.includes('iframe') ? '#ff8800' :
      l.event.includes('domain') ? '#ffff00' : '#333';
    return '<div style="background:#0f0f0f;border:1px solid #1a1a1a;border-left:3px solid ' + borderColor + ';' +
      'border-radius:4px;padding:.75rem 1rem;margin-bottom:.5rem;font-size:.7rem;">' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:.25rem;">' +
      '<span style="color:#d6b36a;font-weight:700;">' + _esc(l.event) + '</span>' +
      '<span style="color:#333;">' + new Date(l.timestamp).toLocaleString('pt-BR') + '</span>' +
      '</div>' +
      '<div style="color:#666;">' + _esc(l.details) + '</div>' +
      '<div style="color:#444;margin-top:.25rem;">fp: ' + _esc(l.fingerprint) + ' | ' + _esc(l.url) + '</div>' +
      '</div>';
  }).join('');

  var panel = document.createElement('div');
  panel.id = 'ds-panel';
  panel.innerHTML = '<div style="position:fixed;inset:0;background:#0a0a0a;z-index:99999;overflow-y:auto;' +
    'font-family:monospace;padding:2rem;color:#f0f0f0;">' +
    '<div style="max-width:900px;margin:0 auto;">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;' +
    'margin-bottom:2rem;padding-bottom:1rem;border-bottom:1px solid #1a1a1a;">' +
    '<h1 style="color:#d6b36a;font-size:1.2rem;margin:0;">🔒 DuduShield™ v2.0</h1>' +
    '<button onclick="document.getElementById(\'ds-panel\').remove()" ' +
    'style="background:#d6b36a;color:#000;border:none;padding:.5rem 1rem;' +
    'border-radius:6px;cursor:pointer;font-weight:700;font-family:monospace;">✕ Fechar</button>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;">' +
    metricCards +
    '</div>' +
    '<div style="font-size:.75rem;color:#444;margin-bottom:1rem;">Últimos ' + logs.length + ' eventos</div>' +
    (logRows || '<div style="color:#333;font-size:.75rem;">Nenhum evento registrado.</div>') +
    '<button onclick="DuduShield.clearLogs();document.getElementById(\'ds-panel\').remove()" ' +
    'style="margin-top:1rem;background:transparent;color:#ff4444;' +
    'border:1px solid #ff4444;padding:.5rem 1rem;border-radius:6px;' +
    'cursor:pointer;font-family:monospace;">🗑 Limpar logs</button>' +
    '</div></div>';

  document.body.appendChild(panel);
});
