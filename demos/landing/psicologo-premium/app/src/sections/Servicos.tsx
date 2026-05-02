import { User, Heart, Video, ClipboardCheck } from 'lucide-react';

const services = [
  {
    icon: User,
    title: 'Terapia Individual',
    description:
      'Atendimento personalizado, focado nas suas necessidades únicas. Um espaço seguro para explorar seus pensamentos, emoções e desenvolver estratégias para uma vida mais plena.',
  },
  {
    icon: Heart,
    title: 'Terapia de Casal',
    description:
      'Ajudo casais a melhorarem a comunicação, resolverem conflitos e fortalecerem seus laços. Um espaço neutro e acolhedor para reconstruir o relacionamento.',
  },
  {
    icon: Video,
    title: 'Atendimento Online',
    description:
      'Sessões de qualidade pelo vídeo, no conforto da sua casa. Flexibilidade de horários e a mesma eficácia do atendimento presencial, com total privacidade.',
  },
  {
    icon: ClipboardCheck,
    title: 'Avaliação Psicológica',
    description:
      'Avaliações detalhadas e baseadas em evidências para diagnóstico clínico, orientação vocacional ou avaliações específicas conforme sua necessidade.',
  },
];

export default function Servicos() {
  return (
    <section id="servicos" className="bg-beige py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="reveal-fade inline-block text-xs font-medium uppercase tracking-[0.15em] text-gold mb-4">
            SERVIÇOS
          </span>
          <h2 className="reveal reveal-delay-1 font-serif text-[36px] md:text-[44px] lg:text-[52px] text-text-primary leading-[1.15] mb-4">
            Como posso te ajudar
          </h2>
          <p className="reveal reveal-delay-2 text-base md:text-lg font-light text-text-secondary leading-relaxed max-w-xl mx-auto">
            Ofereço diferentes modalidades de atendimento para atender às suas necessidades. Cada sessão é
            planejada com cuidado e personalizada para você.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`reveal reveal-delay-${index + 3} bg-white rounded-3xl p-8 md:p-10 text-center shadow-[0_4px_24px_rgba(45,58,46,0.06)] hover:shadow-[0_8px_32px_rgba(45,58,46,0.10)] hover:scale-[1.01] hover:border hover:border-[#7D9B7630] transition-all duration-[400ms]`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {/* Icon */}
              <div className="w-[72px] h-[72px] rounded-[20px] bg-[#C9A84C15] flex items-center justify-center mx-auto">
                <service.icon size={32} className="text-gold" />
              </div>

              {/* Title */}
              <h3 className="font-serif font-medium text-xl md:text-2xl text-text-primary mt-5 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] font-light text-text-secondary leading-[1.6]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
