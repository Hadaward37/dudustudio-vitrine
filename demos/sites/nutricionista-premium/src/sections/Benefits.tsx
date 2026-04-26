import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { UserCheck, ClipboardList, MessageCircle, TrendingUp, Clock, HeartHandshake } from 'lucide-react';

const benefits = [
  {
    icon: UserCheck,
    title: 'Atendimento Individualizado',
    description: 'Cada plano é único, desenvolvido considerando suas preferências, rotina e objetivos específicos.',
  },
  {
    icon: ClipboardList,
    title: 'Plano Alimentar Exclusivo',
    description: 'Cardápios práticos e saborosos, adaptados à sua realidade e que respeitam seus gostos pessoais.',
  },
  {
    icon: MessageCircle,
    title: 'Suporte Contínuo',
    description: 'Acompanhamento próximo via WhatsApp para tirar dúvidas e ajustar o plano sempre que necessário.',
  },
  {
    icon: TrendingUp,
    title: 'Resultados Mensuráveis',
    description: 'Avaliações periódicas para acompanhar sua evolução e manter a motivação em alta.',
  },
  {
    icon: Clock,
    title: 'Consultas Online e Presencial',
    description: 'Flexibilidade para atender pelo computador ou em meu consultório, no que for mais conveniente.',
  },
  {
    icon: HeartHandshake,
    title: 'Sem Restrições Extremas',
    description: 'Aprenda a equilibrar alimentação e prazer, sem dietas restritivas ou culpa alimentar.',
  },
];

export default function Benefits() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="benefits"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--color-secondary)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block text-label mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-primary-active)' }}
          >
            Benefícios
          </span>
          <h2
            className={`text-h1 mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark)' }}
          >
            Por que me escolher
          </h2>
          <p
            className={`text-body transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark-secondary)' }}
          >
            Mais do que uma consulta, ofereço uma experiência completa de 
            transformação alimentar e de saúde.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group p-8 rounded-[2rem] transition-all duration-700 hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                backgroundColor: 'var(--color-base)',
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <benefit.icon size={22} style={{ color: 'var(--color-dark)' }} />
              </div>

              <h3
                className="text-h4 mb-3"
                style={{ color: 'var(--color-dark)' }}
              >
                {benefit.title}
              </h3>

              <p
                className="text-body-sm"
                style={{ color: 'var(--color-dark-secondary)' }}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
