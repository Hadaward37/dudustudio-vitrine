import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  { before: 'Cabelo ressecado', after: 'Hidratação profunda', desc: 'Reconstrução capilar completa: antes com pontas quebradiças e sem vida, depois com brilho intenso e movimento.', image: './before-after-1.jpg' },
  { before: 'Cor desbotada', after: 'Balayage dourada', desc: 'Transformação de cor: antes com tom alaranjado desbotado, depois com balayage multidimensional em tons quentes.', image: './before-after-2.jpg' },
  { before: 'Cabelo rebelde', after: 'Alinhamento perfeito', desc: 'Progressiva orgânica: antes com volume excessivo e frizz, depois com fios lisos naturais e saudáveis.', image: './before-after-3.jpg' },
  { before: 'Sem definição', after: 'Brilho extremo', desc: 'Tratamento intensivo: antes sem definição ou brilho, depois com fios ultra-hidratados e luminosos.', image: './before-after-4.jpg' },
];

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [dividerPos, setDividerPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-item') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % transformations.length);
    }, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    updateDivider(e);
  };

  const updateDivider = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setDividerPos(Math.max(5, Math.min(95, pos)));
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const pos = ((clientX - rect.left) / rect.width) * 100;
      setDividerPos(Math.max(5, Math.min(95, pos)));
    };
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  return (
    <section id="antes-depois" ref={sectionRef} className="relative py-[80px] lg:py-[120px]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="mb-16" />
      <div className="max-w-[1000px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <span className="reveal-item block font-body font-medium text-[11px] uppercase tracking-[0.15em] text-[#C9956C] mb-3">
            Transformações reais
          </span>
          <h2 className="reveal-item font-display font-normal text-[32px] lg:text-[48px] text-[#1A1A1A] leading-[1.15] inline-block">
            O poder da mudança
            <svg className="block w-full h-[6px] mt-2" viewBox="0 0 300 6" preserveAspectRatio="none">
              <path d="M0,3 Q75,0 150,3 T300,3" stroke="#D4AF37" strokeWidth="2" fill="none" />
            </svg>
          </h2>
        </div>

        <div className="reveal-item relative select-none">
          <div
            ref={sliderRef}
            className="scissors-cursor relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseEnter={() => clearInterval(autoPlayRef.current)}
            onMouseLeave={() => {
              autoPlayRef.current = setInterval(() => setCurrent((prev) => (prev + 1) % transformations.length), 5000);
            }}
          >
            {transformations.map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === current ? 1 : 0 }}
              >
                {/* Depois — imagem vibrante e colorida */}
                <img src={t.image} alt={`Depois: ${t.after}`} className="w-full h-full object-cover" />
                {/* Antes — mesmo ângulo, filtro dessaturado para simular cabelo sem tratamento */}
                <div
                  className="absolute top-0 bottom-0 left-0 overflow-hidden"
                  style={{ width: `${dividerPos}%` }}
                >
                  <img
                    src={t.image}
                    alt={`Antes: ${t.before}`}
                    className="h-full object-cover"
                    style={{
                      width: `${100 / (dividerPos / 100)}%`,
                      maxWidth: 'none',
                      filter: 'saturate(0.1) brightness(0.8) contrast(0.9)',
                    }}
                  />
                  <span className="absolute bottom-4 left-4 bg-black/50 text-white text-xs uppercase px-3 py-1 font-body font-medium">
                    Antes
                  </span>
                </div>
                <span className="absolute bottom-4 right-4 bg-[#D4AF37]/80 text-[#1A1A1A] text-xs uppercase px-3 py-1 font-body font-medium">
                  Depois
                </span>

                <div
                  className="absolute top-0 bottom-0 w-[3px] bg-[#D4AF37] cursor-none"
                  style={{ left: `${dividerPos}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#D4AF37] bg-white flex items-center justify-center shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l4 4-4 4M12 4L8 8l4 4" stroke="#C9956C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="font-body font-light text-sm text-[#1A1A1A]/70 mb-4 min-h-[3rem]">
              {transformations[current].desc}
            </p>
            <div className="flex items-center justify-center gap-3">
              {transformations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === current ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)',
                    transform: i === current ? 'scale(1.3)' : 'scale(1)',
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
