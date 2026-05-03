import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const WHATSAPP_LINK = 'https://wa.me/5511914969488?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.6
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.8
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.0
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 0.5, duration: 0.6 },
          1.5
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hide scroll indicator after scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        if (window.scrollY > 100) {
          scrollRef.current.style.opacity = '0';
          scrollRef.current.style.transition = 'opacity 0.3s ease';
        } else {
          scrollRef.current.style.opacity = '0.5';
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/hero-bg.jpg"
          alt="Folhagem verde suave"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(245, 240, 232, 0.75) 0%, rgba(245, 240, 232, 0.60) 50%, rgba(245, 240, 232, 0.85) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full mb-8 opacity-0"
        >
          <span className="w-2 h-2 bg-[#25D366] rounded-full pulse-dot inline-block" />
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-secondary">
            Atendimento online disponível
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-serif font-light text-[42px] md:text-[56px] lg:text-[72px] text-text-primary leading-[1.05] tracking-[-0.02em] opacity-0"
        >
          Você merece se sentir bem
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-6 text-base md:text-lg font-light text-text-secondary leading-relaxed max-w-xl mx-auto opacity-0"
        >
          Psicoterapia online e presencial para ajudar você a reencontrar o equilíbrio, a autoconfiança e a
          tranquilidade.
          <br />
          <br />
          Agende sua primeira consulta e dê o primeiro passo.
          <br />
          <span className="text-text-tertiary text-sm mt-2 block">
            — Dra. Sofia Martins | CRP 06/123456
          </span>
        </p>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-sage text-white font-medium text-[15px] rounded-full shadow-[0_2px_12px_rgba(125,155,118,0.25)] hover:bg-sage-dark hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(125,155,118,0.35)] transition-all duration-300 opacity-0"
        >
          Agendar Consulta
          <ArrowRight size={16} />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
      >
        <ChevronDown size={24} className="text-text-tertiary bounce-indicator" />
      </div>
    </section>
  );
}
