import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus effect animation - words blur in and out
    const words = wordsRef.current?.querySelectorAll('.focus-word');
    if (words) {
      words.forEach((word, i) => {
        gsap.to(word, {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.5,
          delay: i * 0.6,
          ease: 'power2.inOut',
        });
      });
    }

    gsap.from('.cta-content', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-40 lg:py-56 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(./images/cta-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#0D0D0D]/70" />
      <div className="grain-overlay z-[1]" />

      {/* Content */}
      <div className="cta-content relative z-[2] max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <span className="font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-6">
          Vamos Conversar
        </span>

        {/* Headline with focus effect */}
        <div ref={wordsRef} className="mb-8">
          <h2 className="font-display text-[clamp(36px,6vw,72px)] font-light tracking-[0.05em] text-[#F5F5F0] leading-tight">
            {['Vamos', 'Criar', 'Algo', 'Inesquecível?'].map((word) => (
              <span
                key={word}
                className="focus-word inline-block mx-2"
                style={{
                  filter: 'blur(4px)',
                  opacity: 0.5,
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        <p className="font-sans text-lg text-[#888888] max-w-xl mx-auto mb-12">
          Cada momento merece ser lembrado para sempre. Vamos criar algo extraordinário juntos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/5511914969488"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] tracking-[0.15em] uppercase px-10 py-4 bg-gold text-[#0D0D0D] hover:bg-[#F5F5F0] hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-gold/20"
          >
            Agendar Sessão
          </a>
          <a
            href="mailto:contato@lucasmendes.photo"
            className="font-mono text-[12px] tracking-[0.15em] uppercase px-10 py-4 border border-[#2A2A2A] text-[#888888] hover:border-gold hover:text-gold transition-all duration-300"
          >
            Enviar Email
          </a>
        </div>
      </div>
    </section>
  );
}
