import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-base)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-active))',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative">
        <div
          className={`max-w-3xl mx-auto text-center p-12 md:p-16 rounded-[2.5rem] transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
          }}
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-dark)',
            }}
          >
            <Sparkles size={16} />
            <span className="text-label">Vagas limitadas para este mês</span>
          </div>

          <h2
            className={`text-h1 mb-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark)' }}
          >
            Comece sua transformação hoje
          </h2>

          <p
            className={`text-body max-w-xl mx-auto mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark-secondary)' }}
          >
            Não espere mais para cuidar da sua saúde. Agende sua primeira 
            consulta e dê o primeiro passo em direção a uma vida mais saudável 
            e equilibrada.
          </p>

          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className={`group inline-flex items-center gap-3 px-10 py-5 rounded-full text-h4 font-bold transition-all duration-500 hover:scale-105 hover:shadow-xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              backgroundColor: 'var(--color-dark)',
              color: 'var(--color-base)',
              transitionDelay: '400ms',
            }}
          >
            <Calendar size={22} />
            Agendar Consulta
            <ArrowRight
              size={22}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
