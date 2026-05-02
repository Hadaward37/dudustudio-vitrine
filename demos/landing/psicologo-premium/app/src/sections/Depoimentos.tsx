import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'A Dra. Ana mudou minha vida. Depois de anos lutando contra a ansiedade, finalmente encontrei alguém que me entendeu e me deu ferramentas reais para melhorar. Hoje me sinto uma pessoa completamente diferente.',
    author: 'M. S.',
    time: 'Paciente há 1 ano',
    initials: 'MS',
  },
  {
    quote:
      'O atendimento online é extremamente prático e não perde em nada em relação ao presencial. A Ana é uma profissional incrível, muito atenciosa e empática. Recomendo de olhos fechados!',
    author: 'J. R.',
    time: 'Paciente há 8 meses',
    initials: 'JR',
  },
  {
    quote:
      'Minha esposa e eu fizemos terapia de casal e os resultados foram além do que esperávamos. Aprendemos a nos comunicar melhor e a valorizar nosso relacionamento. Eternamente gratos!',
    author: 'C. e P.',
    time: 'Pacientes há 6 meses',
    initials: 'CP',
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-beige py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="reveal-fade inline-block text-xs font-medium uppercase tracking-[0.15em] text-gold mb-4">
            DEPOIMENTOS
          </span>
          <h2 className="reveal reveal-delay-1 font-serif text-[36px] md:text-[44px] lg:text-[52px] text-text-primary leading-[1.15] mb-4">
            O que dizem meus pacientes
          </h2>
          <p className="reveal reveal-delay-2 text-base md:text-lg font-light text-text-secondary leading-relaxed max-w-md mx-auto">
            Histórias reais de pessoas que transformaram suas vidas através da terapia.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.initials}
              className={`reveal reveal-delay-${index + 3} bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(45,58,46,0.06)] relative overflow-hidden`}
            >
              {/* Decorative Quote */}
              <span
                className="absolute -top-5 left-6 font-serif text-[120px] leading-none text-[#C9A84C15] select-none pointer-events-none z-0"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="relative z-10 flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-gold" fill="#C9A84C" />
                ))}
              </div>

              {/* Quote */}
              <p className="relative z-10 text-base font-light italic text-text-primary leading-[1.7]">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-[#7D9B7620] my-6" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#7D9B7620] flex items-center justify-center flex-shrink-0">
                  <span className="font-serif font-medium text-lg text-sage">{t.initials}</span>
                </div>
                <div>
                  <p className="font-serif font-medium text-lg text-text-primary">{t.author}</p>
                  <p className="text-[13px] font-light text-text-tertiary">{t.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
