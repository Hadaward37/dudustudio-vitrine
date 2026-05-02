import { Star, Quote } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const testimonials = [
  {
    name: 'Mariana Costa',
    role: 'MEI - Design Gráfico',
    image: './testimonial-1.jpg',
    text: 'Finalmente entendi meu DAS. Antes pagava atrasado sem saber. Agora recebo alerta no WhatsApp e está tudo sempre em dia. Economizei R$ 1.200 no primeiro ano só em multas evitadas.',
    rating: 5,
  },
  {
    name: 'Roberto Almeida',
    role: 'Pequeno Empresário - E-commerce',
    image: './testimonial-2.jpg',
    text: 'Mudei de contador e descobri que estava pagando imposto a mais há 3 anos. Conseguimos recuperar parte do valor. O planejamento tributário fez diferença real no meu caixa.',
    rating: 5,
  },
  {
    name: 'Camila Ferreira',
    role: 'MEI - Consultoria',
    image: './testimonial-3.jpg',
    text: 'O suporte via WhatsApp é um diferencial enorme. Dúvida rápida, resposta rápida. Não preciso mais marcar reunião e perder tempo. Minha contabilidade está 100% digital.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[rgba(124,58,237,0.1)] text-[#a78bfa] text-xs font-semibold uppercase tracking-wider mb-4">
            Depoimentos
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Quem confia, recomenda
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto">
            Histórias reais de empreendedores que transformaram sua relação com a contabilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TiltCard key={i} className="h-full">
              <div className="glass-dark rounded-2xl p-8 h-full flex flex-col border border-[rgba(255,255,255,0.06)] hover:border-[rgba(245,158,11,0.15)] transition-all duration-500">
                <Quote className="w-8 h-8 text-[rgba(245,158,11,0.3)] mb-4" />

                <p className="text-[rgba(240,244,255,0.7)] text-sm leading-relaxed flex-grow mb-6">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-4 h-4 ${
                        si < t.rating
                          ? 'text-[#F59E0B] fill-[#F59E0B]'
                          : 'text-[rgba(255,255,255,0.1)]'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[rgba(0,212,170,0.2)]"
                  />
                  <div>
                    <div className="font-semibold text-[#F0F4FF] text-sm">{t.name}</div>
                    <div className="text-xs text-[rgba(240,244,255,0.4)]">{t.role}</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
