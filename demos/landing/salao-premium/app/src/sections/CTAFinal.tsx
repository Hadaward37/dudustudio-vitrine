import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center py-[80px] lg:py-[120px]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="absolute top-0 left-0 w-full" fast />
      <div className="max-w-[800px] mx-auto px-6 lg:px-20 text-center">
        <h2
          className="reveal-item font-display font-light text-[36px] lg:text-[56px] text-[#1A1A1A] leading-[1.1] mb-6"
          style={{
            background: 'linear-gradient(90deg, #1A1A1A 0%, #D4AF37 25%, #C9956C 50%, #D4AF37 75%, #1A1A1A 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmerText 3s linear infinite',
          }}
        >
          Agende e ganhe 15% na primeira visita
        </h2>

        <p className="reveal-item font-body font-light text-sm text-[#1A1A1A]/60 max-w-[500px] mx-auto mb-10">
          Válido para serviços de corte, coloração ou tratamento. Não cumulativo com outras promoções.
        </p>

        <div className="reveal-item flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://wa.me/5511914969488"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto text-center"
          >
            Agendar pelo WhatsApp
          </a>
          <a
            href="tel:+5511914969488"
            className="btn-ghost w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Ligar agora
          </a>
        </div>
      </div>
    </section>
  );
}
