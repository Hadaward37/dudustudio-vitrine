import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Mariana Oliveira',
    role: 'Paciente há 2 anos',
    rating: 5,
    text: 'A Dra. Ana mudou completamente minha relação com a comida. Em 6 meses perdi 12kg de forma saudável e, pela primeira vez, não engordei de volta. O acompanhamento é incrível!',
  },
  {
    name: 'Carlos Mendes',
    role: 'Paciente há 1 ano',
    rating: 5,
    text: 'Como atleta, precisava de orientação específica para performance. A Dra. Ana otimizou minha alimentação e meus resultados no treino melhoraram significativamente.',
  },
  {
    name: 'Fernanda Costa',
    role: 'Paciente há 8 meses',
    rating: 5,
    text: 'Depois de anos fazendo dietas restritivas sem sucesso, encontrei na reeducação alimentar da Dra. Ana uma transformação real. Hoje me sinto leve e com energia!',
  },
  {
    name: 'Ricardo Lima',
    role: 'Paciente há 3 anos',
    rating: 5,
    text: 'Minha família inteira passou a comer melhor graças às orientações da Dra. Ana. Ela tem uma paciência incrível e explica tudo de forma muito didática.',
  },
  {
    name: 'Juliana Santos',
    role: 'Paciente há 1.5 anos',
    rating: 5,
    text: 'A consulta online é super prática e o atendimento é igualmente atencioso. O plano alimentar é flexível e se adapta perfeitamente à minha rotina corrida.',
  },
  {
    name: 'Pedro Henrique',
    role: 'Paciente há 6 meses',
    rating: 5,
    text: 'Consegui controlar meu colesterol e triglicerídeos apenas com a mudança alimentar orientada pela Dra. Ana. Sem medicamentos, só com comida de verdade!',
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--color-base)' }}
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
            Depoimentos
          </span>
          <h2
            className={`text-h1 mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark)' }}
          >
            O que meus pacientes dizem
          </h2>
          <p
            className={`text-body transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark-secondary)' }}
          >
            Histórias reais de transformação que me inspiram todos os dias 
            a continuar esse trabalho com dedicação.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`group p-8 rounded-[2rem] transition-all duration-700 hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                backgroundColor: 'var(--color-base)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote
                  size={28}
                  style={{ color: 'var(--color-primary)' }}
                  className="opacity-60"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="var(--color-accent-lime)"
                    stroke="var(--color-accent-lime)"
                  />
                ))}
              </div>

              {/* Text */}
              <p
                className="text-body-sm mb-6"
                style={{ color: 'var(--color-dark-secondary)' }}
              >
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-body-sm font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-dark)',
                  }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="text-body-sm font-semibold"
                    style={{ color: 'var(--color-dark)' }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-label"
                    style={{ color: 'var(--color-dark-secondary)' }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
