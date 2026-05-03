import { useEffect, useRef, useState } from 'react';
import { MessageCircle, FileSearch, Cog, PartyPopper } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Conversa Inicial',
    desc: 'Agendamos uma call gratuita para entender seu negócio, dores e objetivos. Sem compromisso.',
    color: '#00D4AA',
  },
  {
    icon: FileSearch,
    title: 'Diagnóstico Completo',
    desc: 'Analisamos sua situação fiscal e contábil atual. Identificamos riscos e oportunidades de economia.',
    color: '#2563EB',
  },
  {
    icon: Cog,
    title: 'Implementação',
    desc: 'Cuidamos de toda a burocracia: abertura, regularização, declarações e rotinas mensais.',
    color: '#F59E0B',
  },
  {
    icon: PartyPopper,
    title: 'Acompanhamento',
    desc: 'Você recebe relatórios mensais, alertas automáticos e um contador disponível no WhatsApp.',
    color: '#7c3aed',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate steps one by one
          let current = 0;
          const interval = setInterval(() => {
            setActiveStep(current);
            current++;
            if (current >= steps.length) clearInterval(interval);
          }, 400);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="relative py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[rgba(245,158,11,0.1)] text-[#F59E0B] text-xs font-semibold uppercase tracking-wider mb-4">
            Como Funciona
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Simples e sem burocracia
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto">
            Em 4 passos você está com a contabilidade resolvida e focado no crescimento.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.06)] md:-translate-x-px">
            <div
              className="absolute top-0 left-0 w-full bg-[#00D4AA] transition-all duration-700"
              style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              const isActive = i <= activeStep;

              return (
                <div
                  key={i}
                  className={`relative flex items-center gap-8 transition-all duration-700 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? 'border-[#00D4AA] bg-[#00D4AA] shadow-[0_0_15px_rgba(0,212,170,0.5)]'
                          : 'border-[rgba(255,255,255,0.2)] bg-[#0A1628]'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[45%] ${
                      isLeft ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                    }`}
                  >
                    <div
                      className={`glass-dark rounded-2xl p-6 border transition-all duration-500 ${
                        isActive
                          ? 'border-[rgba(0,212,170,0.2)]'
                          : 'border-[rgba(255,255,255,0.06)]'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          isLeft ? 'md:ml-auto' : ''
                        }`}
                        style={{
                          background: `${step.color}20`,
                          border: `1px solid ${step.color}40`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                      <div className="font-mono-num text-xs text-[rgba(240,244,255,0.3)] mb-2">
                        PASSO 0{i + 1}
                      </div>
                      <h3 className="font-display font-bold text-xl text-[#F0F4FF] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[rgba(240,244,255,0.5)] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
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
