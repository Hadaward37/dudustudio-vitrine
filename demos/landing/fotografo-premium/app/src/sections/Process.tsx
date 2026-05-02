import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Settings, Camera, Sliders, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessageCircle,
    title: 'Consulta',
    description: 'Conversamos para entender sua visão, estilo e expectativas. Cada projeto é único.',
  },
  {
    icon: Settings,
    title: 'Planejamento',
    description: 'Definimos locação, iluminação, mood e todos os detalhes para o dia perfeito.',
  },
  {
    icon: Camera,
    title: 'Sessão',
    description: 'O dia da captura com direção artística, buscando os momentos mais autênticos.',
  },
  {
    icon: Sliders,
    title: 'Edição',
    description: 'Seleção criteriosa e tratamento individual de cada fotografia com dedicação.',
  },
  {
    icon: Download,
    title: 'Entrega',
    description: 'Galeria online privada + arquivos em alta resolução prontos para impressão.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate timeline line
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );
    }

    // Animate steps
    gsap.from('.process-step', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-4">
            04 — Processo
          </span>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-light tracking-[0.05em] text-[#F5F5F0]">
            Como Funciona
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#2A2A2A] origin-top">
            <div ref={lineRef} className="absolute inset-0 bg-gold origin-top" style={{ transform: 'scaleY(0)' }} />
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="process-step flex gap-8 items-start">
                  {/* Icon circle */}
                  <div className="relative z-10 w-10 h-10 rounded-full border border-gold bg-[#0D0D0D] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-[#555555] uppercase block mb-1">
                      Etapa {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-xl text-[#F5F5F0] mb-2">{step.title}</h3>
                    <p className="font-sans text-sm text-[#888888] leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
