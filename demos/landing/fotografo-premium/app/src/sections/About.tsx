import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Sessões Realizadas' },
  { value: 8, suffix: '', label: 'Anos de Experiência' },
  { value: 12, suffix: '', label: 'Países Visitados' },
  { value: 50, suffix: 'k+', label: 'Fotos Entregues' },
];

const cameras = [
  { name: 'Canon EOS R5', icon: '📷' },
  { name: 'Sony A7IV', icon: '📸' },
  { name: 'Leica Q3', icon: '🎞️' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const bioText = 'Acredito que cada rosto conta uma história única. Minha missão é capturar não apenas a imagem, mas a essência — aquele olhar, aquele gesto, aquele momento que nunca mais se repetirá. Com 8 anos de experiência e mais de 500 sessões, desenvolvi um olhar sensível para a luz, a emoção e a composição. Cada fotografia é uma colaboração entre o fotógrafo e o momento perfeito.';
  const typedRef = useRef(false);

  useEffect(() => {
    // Typewriter effect triggered on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        if (typedRef.current) return;
        typedRef.current = true;
        let i = 0;
        const interval = setInterval(() => {
          setTypedText(bioText.slice(0, i + 1));
          i++;
          if (i >= bioText.length) clearInterval(interval);
        }, 25);
      },
    });
  }, []);

  useEffect(() => {
    // Animate photo slide-in
    gsap.from('.about-photo', {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    // Animate stats
    const statEls = document.querySelectorAll('.stat-number');
    statEls.forEach((el, i) => {
      const target = stats[i].value;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          (el as HTMLElement).textContent = Math.round(obj.val).toString();
        },
      });
    });

    // Camera icons entrance
    gsap.from('.camera-item', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.camera-grid',
        start: 'top 90%',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Photo */}
          <div className="about-photo relative">
            <div className="relative overflow-hidden">
              <img
                src="/images/photographer.jpg"
                alt="Lucas Mendes - Fotógrafo"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <div className="grain-overlay" />
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-10">
            <div>
              <span className="font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-4">
                02 — Sobre
              </span>
              <h2 className="font-display text-[clamp(32px,4vw,56px)] font-light tracking-[0.05em] text-[#F5F5F0] mb-8">
                A Arte de Capturar Almas
              </h2>
              <p className="font-sans text-base leading-[1.8] text-[#888888] min-h-[120px]">
                {typedText}
                <span className="inline-block w-0.5 h-5 bg-gold ml-1 animate-pulse align-middle" />
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-[#2A2A2A] p-6">
                  <span className="stat-number font-display text-[clamp(28px,3vw,40px)] font-light text-gold">
                    0
                  </span>
                  <span className="font-display text-[clamp(28px,3vw,40px)] font-light text-gold">
                    {stat.suffix}
                  </span>
                  <p className="font-mono text-[10px] tracking-[0.12em] text-[#888888] uppercase mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Cameras */}
            <div className="camera-grid">
              <p className="font-mono text-[10px] tracking-[0.15em] text-[#555555] uppercase mb-4">
                Equipamento
              </p>
              <div className="flex flex-wrap gap-4">
                {cameras.map(cam => (
                  <div
                    key={cam.name}
                    className="camera-item flex items-center gap-3 px-4 py-3 border border-[#2A2A2A] hover:border-gold/40 transition-colors"
                  >
                    <span className="text-lg">{cam.icon}</span>
                    <span className="font-mono text-[11px] tracking-[0.1em] text-[#888888]">
                      {cam.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
