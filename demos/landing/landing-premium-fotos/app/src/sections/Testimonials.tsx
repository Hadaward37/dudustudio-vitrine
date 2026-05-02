import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ricardo Mendes',
    role: 'Proprietario - BMW M3',
    avatar: './assets/avatar-1.jpg',
    text: 'A Velocita transformou minha experiencia com oficinas. O atendimento e impecavel, a qualidade do servico e excepcional e o resultado do polimento com vitrificacao superou todas as expectativas. Meu M3 nunca esteve tao brilhante.',
    rating: 5,
  },
  {
    name: 'Fernanda Lopes',
    role: 'Diretora Executiva',
    avatar: './assets/avatar-2.jpg',
    text: 'Levo meu Porsche aqui ha mais de 2 anos. A confianca e total. Equipe extremamente qualificada, diagnostico preciso e transparencia no orcamento. Recomendo a todos que valorizam seu veiculo.',
    rating: 5,
  },
  {
    name: 'Carlos Eduardo',
    role: 'Empresario - Mercedes AMG',
    avatar: './assets/avatar-1.jpg',
    text: 'Servico de suspensao e freios de altissimo nivel. Notaram detalhes que outras oficinas ignoraram. O carro ficou com uma dirigibilidade completamente renovada. Profissionais serios e competentes.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goNext = () => goTo((activeIndex + 1) % testimonials.length);
  const goPrev = () =>
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, rgba(230, 57, 70, 0.15) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-[#E63946]/40 text-[#E63946] text-xs tracking-[0.3em] font-['Oswald'] uppercase mb-4">
            Depoimentos
          </span>
          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 skew-motion">
            O QUE DIZEM <span className="text-gradient-red">NOSSOS CLIENTES</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto perspective-1000">
          <div className="relative preserve-3d">
            {testimonials.map((testimonial, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-600 ${
                    isActive ? 'relative z-20' : 'z-10'
                  }`}
                  style={{
                    transform: isActive
                      ? 'translateZ(0) rotateY(0deg)'
                      : `translateX(${offset * 60}%) translateZ(${-absOffset * 150}px) rotateY(${offset * -15}deg)`,
                    opacity: absOffset > 1 ? 0 : isActive ? 1 : 0.4,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div
                    className={`p-8 md:p-12 rounded-2xl border transition-all duration-500 ${
                      isActive
                        ? 'bg-[#141414] border-[#E63946]/30'
                        : 'bg-[#0F0F0F] border-white/5'
                    }`}
                  >
                    <Quote
                      size={40}
                      className="text-[#E63946]/30 mb-6"
                    />

                    <p className="text-lg md:text-xl text-[#E0E0E0] leading-relaxed mb-8 italic">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#E63946]/30"
                        />
                        <div>
                          <h4 className="font-['Oswald'] text-lg font-bold text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-[#A1A1AA] text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="text-[#D4AF37] fill-[#D4AF37]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-[#E63946] w-8'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
