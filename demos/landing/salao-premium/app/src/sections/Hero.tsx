import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(imageRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, 0.2);

    const typeLine = (el: HTMLSpanElement | null, delay: number) => {
      if (!el) return;
      const text = el.textContent || '';
      el.textContent = '';
      el.style.opacity = '1';
      tl.to({}, {
        duration: text.length * 0.03,
        onUpdate() {
          const progress = this.progress();
          const chars = Math.floor(progress * text.length);
          el.textContent = text.slice(0, chars);
        },
      }, delay);
    };

    typeLine(line1Ref.current, 0.6);
    typeLine(line2Ref.current, 1.0);
    typeLine(line3Ref.current, 1.4);

    tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.8);
    tl.fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 2.0);
    tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center pt-20 lg:pt-0">
        <div className="order-2 lg:order-1">
          <div ref={headlineRef} className="font-display font-light text-[#1A1A1A] leading-[1.1] mb-6" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
            <span ref={line1Ref} className="block opacity-0">Você merece</span>
            <span ref={line2Ref} className="block opacity-0">se sentir</span>
            <span ref={line3Ref} className="block opacity-0">radiante.</span>
          </div>

          <p ref={subtitleRef} className="font-body font-light text-base lg:text-lg leading-[1.7] text-[#1A1A1A]/80 max-w-md mb-8 opacity-0">
            Bianca Studio — onde transformação encontra arte. Cabelo, pele e bem-estar em um espaço pensado para você.
          </p>

          <a
            ref={btnRef}
            href="https://wa.me/5511914969488?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20experi%C3%AAncia%20no%20sal%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-block opacity-0"
          >
            Agende sua experiência
          </a>
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <img
            ref={imageRef}
            src="./hero-model.jpg"
            alt="Modelo editorial"
            className="w-full max-w-[420px] lg:max-w-none lg:w-[120%] lg:mr-[-10%] object-cover opacity-0"
            style={{ aspectRatio: '3/4' }}
          />
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="font-body font-light text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/60">Explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-[bounceDown_2s_ease-in-out_infinite]">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
