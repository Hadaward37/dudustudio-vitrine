import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Ensaio',
    price: 'R$ 1.500',
    image: '/images/portrait-5.jpg',
    features: [
      '2 horas de sessão',
      '50 fotos editadas',
      '2 locações diferentes',
      'Todas em alta resolução',
      'Galeria online privada',
      'Direção artística completa',
    ],
  },
  {
    name: 'Evento',
    price: 'R$ 3.500',
    image: '/images/wedding-6.jpg',
    features: [
      '6 horas de cobertura',
      '200 fotos editadas',
      'Galeria online',
      'Entrega em 7 dias',
      'Fotos em alta resolução',
      'Pré-consulta inclusa',
    ],
  },
  {
    name: 'Casamento',
    price: 'R$ 8.000',
    image: '/images/wedding-5.jpg',
    features: [
      '12 horas de cobertura',
      '500+ fotos editadas',
      'Álbum premium 30×40cm',
      'Making of incluso',
      '2 fotógrafos no dia',
      'Vídeo highlight 3min',
    ],
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from('.package-card', {
      rotateY: -90,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="packages" className="relative py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-4">
            03 — Pacotes
          </span>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-light tracking-[0.05em] text-[#F5F5F0]">
            Escolha sua Experiência
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className="package-card group relative h-[480px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative h-full overflow-hidden border border-[#2A2A2A] group-hover:border-gold/30 transition-colors">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-2">
                        Pacote {i + 1}
                      </span>
                      <h3 className="font-display text-3xl text-[#F5F5F0] mb-2">{pkg.name}</h3>
                      <p className="font-display text-2xl text-gold">{pkg.price}</p>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-[#1A1A1A] border border-gold/40 p-8 flex flex-col justify-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <h3 className="font-display text-2xl text-[#F5F5F0] mb-2">{pkg.name}</h3>
                  <p className="font-display text-xl text-gold mb-6">{pkg.price}</p>
                  <ul className="space-y-3">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="text-gold mt-0.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                        </span>
                        <span className="font-sans text-sm text-[#888888]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => window.open('https://wa.me/5511914969488', '_blank')}
                    className="mt-8 font-mono text-[11px] tracking-[0.12em] uppercase px-6 py-3 bg-gold text-[#0D0D0D] hover:bg-[#F5F5F0] transition-colors w-fit"
                  >
                    Solicitar
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
