import { useEffect, useRef } from 'react';
import { Search, FileText, Wrench, Car } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'DIAGNOSTICO',
    description:
      'Avaliacao completa do veiculo com equipamentos de ultima geracao. Identificamos cada necessidade com precisao.',
    color: '#E63946',
  },
  {
    icon: FileText,
    title: 'ORCAMENTO',
    description:
      'Proposta transparente e detalhada sem surpresas. Aprovacao digital rapida e pratica para seu conforto.',
    color: '#D4AF37',
  },
  {
    icon: Wrench,
    title: 'SERVICO',
    description:
      'Execucao pelo time de especialistas com pecas de qualidade e acompanhamento em tempo real do progresso.',
    color: '#E63946',
  },
  {
    icon: Car,
    title: 'ENTREGA',
    description:
      'Seu veiculo pronto com garantia de qualidade. Test drive de validacao e checklist final de entrega.',
    color: '#D4AF37',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const car = carRef.current;
    const progress = progressRef.current;
    if (!section || !car || !progress) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      if (sectionTop < viewportHeight && sectionTop + sectionHeight > 0) {
        const scrollProgress = Math.max(
          0,
          Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight * 0.5))
        );

        const carPosition = scrollProgress * 80;
        car.style.left = `${carPosition}%`;
        car.style.transform = `translateX(-50%) scaleX(${scrollProgress > 0.5 ? 1 : -1})`;

        progress.style.width = `${scrollProgress * 100}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-grid opacity-15" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 border border-[#E63946]/40 text-[#E63946] text-xs tracking-[0.3em] font-['Oswald'] uppercase mb-4">
            Como Funciona
          </span>
          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 skew-motion">
            NOSSO <span className="text-gradient-red">PROCESSO</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Da avaliacao a entrega, um fluxo otimizado para sua conveniencia e tranquilidade.
          </p>
        </div>

        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />
          <div
            ref={progressRef}
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#E63946] to-[#D4AF37] -translate-y-1/2 rounded-full transition-all duration-100"
            style={{ width: '0%' }}
          />

          <div
            ref={carRef}
            className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
            style={{ left: '0%' }}
          >
            <div className="w-16 h-16 rounded-full bg-[#E63946] flex items-center justify-center glow-red-strong">
              <Car size={28} className="text-white" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative group"
              >
                <div className="text-center">
                  <div
                    className="w-20 h-20 mx-auto rounded-xl border-2 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${step.color}40`,
                      background: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
                    }}
                  >
                    <Icon size={32} style={{ color: step.color }} />
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span
                      className="font-['Oswald'] text-3xl font-bold"
                      style={{ color: step.color }}
                    >
                      0{index + 1}
                    </span>
                    <div className="h-px w-8 bg-white/20" />
                  </div>

                  <h3 className="font-['Oswald'] text-xl font-bold text-white tracking-wide mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[#A1A1AA] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 right-0 translate-x-1/2">
                    <div className="w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
