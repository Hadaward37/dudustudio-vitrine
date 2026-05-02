import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: 'A Bianca transformou não só meu cabelo, mas minha relação comigo mesma. Sair do salão me sentindo radiante virou ritual.', name: 'Mariana Lopes', role: 'Empresária', image: './testimonial-1.jpg' },
  { quote: 'Já fui em dezenas de salões, mas nunca me senti tão acolhida. O cuidado com cada detalhe é incomparável.', name: 'Fernanda Costa', role: 'Advogada', image: './testimonial-2.jpg' },
  { quote: 'Aos 52 anos, finalmente encontrei um lugar que entende que beleza não tem idade. Saio daqui me sentindo poderosa.', name: 'Helena Martins', role: 'Consultora', image: './testimonial-3.jpg' },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
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
      goTo((current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(autoPlayRef.current);
  }, [current]);

  const goTo = (idx: number) => {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    const dir = idx > current ? 1 : -1;

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -40 * dir,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setCurrent(idx);
          gsap.fromTo(contentRef.current, { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out', onComplete: () => setIsAnimating(false) });
        },
      });
    } else {
      setCurrent(idx);
      setIsAnimating(false);
    }
  };

  const t = testimonials[current];

  return (
    <section id="depoimentos" ref={sectionRef} className="relative py-[80px] lg:py-[120px]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="mb-16" />
      <div className="max-w-[1000px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <span className="reveal-item block font-body font-medium text-[11px] uppercase tracking-[0.15em] text-[#C9956C] mb-3">
            Clientes felizes
          </span>
          <h2 className="reveal-item font-display font-normal text-[32px] lg:text-[48px] text-[#1A1A1A] leading-[1.15] inline-block">
            O que dizem sobre nós
            <svg className="block w-full h-[6px] mt-2" viewBox="0 0 300 6" preserveAspectRatio="none">
              <path d="M0,3 Q75,0 150,3 T300,3" stroke="#D4AF37" strokeWidth="2" fill="none" />
            </svg>
          </h2>
        </div>

        <div className="reveal-item relative max-w-[800px] mx-auto">
          <button
            onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[#C9956C] hover:scale-110 transition-transform hidden lg:flex"
            aria-label="Anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo((current + 1) % testimonials.length)}
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[#C9956C] hover:scale-110 transition-transform hidden lg:flex"
            aria-label="Próximo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div ref={contentRef} className="border-l-[3px] border-[#D4AF37] pl-8 pr-4 py-4">
            <span className="font-display text-[48px] text-[#D4AF37] leading-none block mb-4">❝</span>
            <p className="font-display font-light text-[24px] lg:text-[36px] text-[#1A1A1A] leading-[1.4] mb-8">
              {t.quote}
            </p>
            <div className="flex items-center gap-4">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]" />
              <div>
                <p className="font-body font-medium text-base text-[#1A1A1A]">{t.name}</p>
                <p className="font-body font-light text-[13px] text-[#C9956C]">{t.role}</p>
              </div>
              <div className="ml-auto flex gap-1 text-[#D4AF37] text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)',
                  transform: i === current ? 'scale(1.3)' : 'scale(1)',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
