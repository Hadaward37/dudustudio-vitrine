import { useEffect, useRef } from 'react';
import {
  Settings,
  Droplets,
  CircleDot,
  Zap,
  Sparkles,
  Wind,
} from 'lucide-react';
import { useHolographicEffect } from '../hooks/useHolographicEffect';

const services = [
  {
    icon: Settings,
    title: 'REVISAO COMPLETA',
    description:
      'Inspecao detalhada de todos os sistemas do seu veiculo. Diagnostico computadorizado e relatório completo do estado do carro.',
    price: 'A partir de R$ 299',
    features: ['Diagnostico computadorizado', '160 itens verificados', 'Relatorio digital'],
  },
  {
    icon: Droplets,
    title: 'TROCA DE OLEO PREMIUM',
    description:
      'Utilizamos oleos sinteticos de alta performance e filtros originais ou de primeira linha para maxima protecao do motor.',
    price: 'A partir de R$ 189',
    features: ['Oleo 100% sintetico', 'Filtro premium', 'Limpeza do sistema'],
  },
  {
    icon: CircleDot,
    title: 'FREIOS E SUSPENSAO',
    description:
      'Sistema de frenagem e suspensao revisados com pecas de alta performance. Seguranca e conforto em todas as condicoes.',
    price: 'A partir de R$ 459',
    features: ['Discos ventilados', 'Pastilas ceramicas', 'Alinhamento 3D'],
  },
  {
    icon: Zap,
    title: 'ELETRICA AUTOMOTIVA',
    description:
      'Diagnostico e reparo de sistemas eletricos, bateria, alternador, starter e sistema de injecao eletronica.',
    price: 'A partir de R$ 129',
    features: ['Scanner avancado', 'Circuitos eletricos', 'Bateria testada'],
  },
  {
    icon: Sparkles,
    title: 'POLIMENTO E VITRIFICACAO',
    description:
      'Recuperacao do brilho original da pintura com polimento profissional e protecao ceramica de alta durabilidade.',
    price: 'A partir de R$ 799',
    features: ['Polimento em 3 etapas', 'Vitrificacao 3 anos', 'Correcao de pintura'],
  },
  {
    icon: Wind,
    title: 'HIGIENIZACAO INTERNA',
    description:
      'Limpeza profunda de estofados, carpetes, ar-condicionado e todos os componentes internos do veiculo.',
    price: 'A partir de R$ 349',
    features: ['Extracao a vapor', 'Ozônio sanitizante', 'Impermeabilizacao'],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { cardRef, handleMouseMove, handleMouseLeave } = useHolographicEffect();
  const cardAnimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardAnimRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = service.icon;

  return (
    <div
      ref={cardAnimRef}
      className="opacity-0 translate-y-8 transition-all duration-700"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="holographic-card rounded-lg p-6 md:p-8 h-full flex flex-col"
        style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center mb-5 group-hover:bg-[#E63946]/20 transition-colors">
            <Icon size={28} className="text-[#E63946]" />
          </div>

          <h3 className="font-['Oswald'] text-xl md:text-2xl font-bold text-white tracking-wide mb-3">
            {service.title}
          </h3>

          <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5 flex-grow">
            {service.description}
          </p>

          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-[#C0C0C0]">
                <span className="w-1.5 h-1.5 bg-[#E63946] rounded-full flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-white/10">
            <span className="text-gradient-gold font-['Oswald'] text-lg font-bold tracking-wide">
              {service.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-carbon">
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-[#E63946]/40 text-[#E63946] text-xs tracking-[0.3em] font-['Oswald'] uppercase mb-4">
            Nossos Servicos
          </span>
          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 skew-motion">
            ARSENAL DE <span className="text-gradient-red">SERVICOS</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Solucoes completas para manter seu veiculo em estado de excelencia.
            Tecnologia de ponta e equipe especializada.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
