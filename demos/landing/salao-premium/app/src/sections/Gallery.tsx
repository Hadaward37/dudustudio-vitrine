import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  { caption: 'Penteado elegante', image: './gallery-1.jpg' },
  { caption: 'Detalhes perfeitos', image: './gallery-2.jpg' },
  { caption: 'Olhar poderoso', image: './gallery-3.jpg' },
  { caption: 'Cores que encantam', image: './gallery-4.jpg' },
  { caption: 'Beleza natural', image: './gallery-5.jpg' },
  { caption: 'Nos bastidores', image: './gallery-6.jpg' },
];

const rotations = ['-2deg', '1deg', '-1deg', '1.5deg', '-1.5deg', '2deg'];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-item') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.02)`;
    card.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(26,26,26,0.15)`;
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    card.style.transform = `rotate(${rotations[idx]})`;
    card.style.boxShadow = '0 4px 20px rgba(26, 26, 26, 0.08), 0 1px 3px rgba(26, 26, 26, 0.06)';
  };

  const openLightbox = (image: string) => {
    setLightbox(image);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="galeria" ref={sectionRef} className="relative py-[80px] lg:py-[120px]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="mb-16" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <span className="reveal-item block font-body font-medium text-[11px] uppercase tracking-[0.15em] text-[#C9956C] mb-3">
            Nosso universo
          </span>
          <h2 className="reveal-item font-display font-normal text-[32px] lg:text-[48px] text-[#1A1A1A] leading-[1.15] inline-block">
            Momentos de beleza
            <svg className="block w-full h-[6px] mt-2" viewBox="0 0 300 6" preserveAspectRatio="none">
              <path d="M0,3 Q75,0 150,3 T300,3" stroke="#D4AF37" strokeWidth="2" fill="none" />
            </svg>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {gallery.map((item, i) => (
            <div
              key={item.caption}
              ref={(el) => { cardsRef.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onClick={() => openLightbox(item.image)}
              className="reveal-item polaroid-card bg-white p-3 pb-10 transition-all duration-300 ease-out cursor-none"
              style={{
                transform: `rotate(${rotations[i]})`,
                boxShadow: '0 4px 20px rgba(26, 26, 26, 0.08), 0 1px 3px rgba(26, 26, 26, 0.06)',
              }}
            >
              <div className="overflow-hidden mb-4">
                <img src={item.image} alt={item.caption} className="w-full aspect-square object-cover" />
              </div>
              <p className="font-handwriting text-[20px] text-[#1A1A1A] text-center">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-[#1A1A1A]/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-[#D4AF37] transition-colors"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img
            src={lightbox}
            alt="Galeria"
            className="max-w-full max-h-[70vh] object-contain shadow-2xl"
            style={{ animation: 'fadeIn 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
