import { MessageCircle, Handshake, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Agende pelo WhatsApp',
    description:
      'Envie uma mensagem e escolha o melhor horário para você. Responderei o mais breve possível para confirmarmos sua consulta.',
  },
  {
    number: '02',
    icon: Handshake,
    title: 'Primeira Consulta de Acolhimento',
    description:
      'Nosso primeiro encontro será uma conversa inicial para que eu possa te conhecer, entender suas necessidades e definirmos juntos os objetivos da terapia.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Seu Processo Terapêutico Começa',
    description:
      'A partir da segunda sessão, iniciamos o trabalho terapêutico propriamente dito, com acompanhamento contínuo e ajustes sempre que necessário.',
  },
];

export default function ComoFunciona() {
  return (
    <section className="bg-white py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="reveal-fade inline-block text-xs font-medium uppercase tracking-[0.15em] text-gold mb-4">
            COMO FUNCIONA
          </span>
          <h2 className="reveal reveal-delay-1 font-serif text-[36px] md:text-[44px] lg:text-[52px] text-text-primary leading-[1.15] mb-4">
            Três passos para começar
          </h2>
          <p className="reveal reveal-delay-2 text-base md:text-lg font-light text-text-secondary leading-relaxed max-w-md mx-auto">
            O processo é simples e descomplicado. Estou aqui para acompanhar você em cada etapa.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden lg:block absolute top-7 left-[16.67%] right-[16.67%] h-0.5">
            <div className="reveal-line w-full h-full bg-[#7D9B7640]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`reveal reveal-delay-${index + 3} text-center relative`}
              >
                {/* Number Circle */}
                <div className="reveal-scale inline-flex w-14 h-14 bg-sage rounded-full items-center justify-center relative z-10">
                  <span className="font-serif font-semibold text-lg text-white">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="mt-7">
                  <step.icon size={36} className="text-gold mx-auto" />
                </div>

                {/* Title */}
                <h3 className="font-serif font-medium text-xl md:text-2xl text-text-primary mt-5 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] font-light text-text-secondary leading-[1.6] max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
