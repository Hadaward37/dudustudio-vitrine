import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Stethoscope, Apple, Scale, Dumbbell, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Consulta Nutricional',
    description:
      'Avaliação completa do seu estado nutricional, histórico alimentar e saúde. Elaboração de um plano alimentar personalizado baseado em evidências científicas.',
    features: ['Avaliação bioquímica', 'Análise de composição corporal', 'Plano alimentar individualizado'],
  },
  {
    icon: Apple,
    title: 'Reeducação Alimentar',
    description:
      'Mudança de hábitos alimentares de forma gradual e sustentável. Aprenda a fazer escolhas conscientes sem deprivação ou culpa.',
    features: ['Mindful eating', 'Controle emocional', 'Hábitos sustentáveis'],
  },
  {
    icon: Scale,
    title: 'Emagrecimento Saudável',
    description:
      'Perda de peso gradual e duradoura, respeitando o metabolismo individual. Foco em resultados sustentáveis, não em dietas restritivas.',
    features: ['Metabolismo ativo', 'Sem dietas malucas', 'Acompanhamento contínuo'],
  },
  {
    icon: Dumbbell,
    title: 'Nutrição Esportiva',
    description:
      'Planejamento nutricional para atletas e praticantes de atividade física. Otimize seu desempenho, recuperação e composição corporal.',
    features: ['Periodização nutricional', 'Suplementação segura', 'Performance máxima'],
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--color-base)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span
            className={`inline-block text-label mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-primary-active)' }}
          >
            Serviços
          </span>
          <h2
            className={`text-h1 mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark)' }}
          >
            Como posso ajudar você
          </h2>
          <p
            className={`text-body transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark-secondary)' }}
          >
            Cada serviço é pensado para atender às suas necessidades específicas,
            com um plano personalizado e acompanhamento de perto.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative p-8 rounded-[2rem] transition-all duration-700 cursor-default hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                backgroundColor: 'var(--color-secondary)',
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <service.icon size={24} style={{ color: 'var(--color-dark)' }} />
              </div>

              {/* Title */}
              <h3
                className="text-h3 mb-3"
                style={{ color: 'var(--color-dark)' }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-body-sm mb-6"
                style={{ color: 'var(--color-dark-secondary)' }}
              >
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-body-sm"
                    style={{ color: 'var(--color-dark-secondary)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-primary-active)' }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover arrow */}
              <div className="flex items-center gap-2 text-body-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" style={{ color: 'var(--color-primary-active)' }}>
                Saiba mais
                <ArrowUpRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
