import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'Corte Premium', description: 'Corte personalizado com análise de formato de rosto, textura e estilo de vida. Finalização com produtos de alta performance.', price: 'A partir de R$ 180', bg: './service-bg-1.jpg' },
  { name: 'Coloração Artística', description: 'Técnicas exclusivas de coloração: balayage, ombré, highlights e colorações completas com produtos importados.', price: 'A partir de R$ 320', bg: './service-bg-2.jpg' },
  { name: 'Progressiva Orgânica', description: 'Alisamento natural sem formol, com ativos orgânicos que tratam enquanto alinham. Resultado por até 4 meses.', price: 'A partir de R$ 450', bg: './service-bg-3.jpg' },
  { name: 'Tratamentos Intensivos', description: 'Reconstrução capilar profunda, hidratação de longa duração e terapias com laser e ozônio.', price: 'A partir de R$ 220', bg: './service-bg-4.jpg' },
  { name: 'Nail Art & Spa', description: 'Esmalteria de luxo com técnicas de nail art exclusivas, alongamento em fibra e spa para mãos e pés.', price: 'A partir de R$ 120', bg: './service-bg-5.jpg' },
  { name: 'Design de Sobrancelha', description: 'Design com henna, microblanding realista e remodelação facial através da sobrancelha perfeita.', price: 'A partir de R$ 150', bg: './service-bg-6.jpg' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', `${x}%`);
          card.style.setProperty('--mouse-y', `${y}%`);
        };
        card.addEventListener('mousemove', onMove);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicos" ref={sectionRef} className="relative py-[80px] lg:py-[120px]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="mb-16" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <span className="reveal-item block font-body font-medium text-[11px] uppercase tracking-[0.15em] text-[#C9956C] mb-3">
            Nossos serviços
          </span>
          <h2 className="reveal-item font-display font-normal text-[32px] lg:text-[48px] text-[#1A1A1A] leading-[1.15] inline-block">
            Arte para o seu brilho
            <svg className="block w-full h-[6px] mt-2" viewBox="0 0 300 6" preserveAspectRatio="none">
              <path d="M0,3 Q75,0 150,3 T300,3" stroke="#D4AF37" strokeWidth="2" fill="none" />
            </svg>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="reveal-item group relative overflow-hidden rounded-2xl min-h-[320px] flex flex-col justify-end p-8"
              style={{
                backgroundImage: `url(${service.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-400 group-hover:bg-black/20" />
              <div
                className="absolute inset-0 glass-card opacity-0 group-hover:opacity-100 transition-all duration-400"
                style={{ borderRadius: '16px' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)',
                    mixBlendMode: 'overlay',
                  }}
                />
              </div>

              <div className="relative z-10">
                <h3 className="font-display font-medium text-[28px] text-white leading-[1.2] mb-2">{service.name}</h3>
                <p className="font-body font-light text-sm text-white/80 leading-[1.7] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75">
                  <span className="font-display font-medium italic text-[24px] text-[#D4AF37]">{service.price}</span>
                  <button className="border border-white text-white px-4 py-2 text-xs uppercase tracking-wider hover:bg-white hover:text-[#1A1A1A] transition-colors">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
