import { useEffect, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-base)' }}
    >
      {/* Subtle background decoration */}
      <div
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]"
        style={{ backgroundColor: 'var(--color-accent-lime)' }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full py-24 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-8 items-center">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1">
            <span
              className={`inline-block text-label mb-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ color: 'var(--color-primary-active)' }}
            >
              Nutrição Clínica Funcional
            </span>

            <h1
              className={`text-display mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ color: 'var(--color-dark)' }}
            >
              Transforme sua saúde
              <br />
              <span style={{ color: 'var(--color-primary-active)' }}>
                através da nutrição
              </span>
            </h1>

            <p
              className={`text-body max-w-lg mb-8 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ color: 'var(--color-dark-secondary)' }}
            >
              Atendimento personalizado que une ciência, empatia e resultados 
              reais. Sua jornada para uma vida mais saudável começa aqui.
            </p>

            <div
              className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-body font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-dark)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary-active)';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--color-dark)';
                }}
              >
                <Calendar size={18} />
                Agendar Consulta
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#services"
                onClick={(e) => handleScroll(e, '#services')}
                className="inline-flex items-center gap-2 px-6 py-4 text-body font-medium transition-all duration-300 hover:gap-3"
                style={{ color: 'var(--color-dark-secondary)' }}
              >
                Ver Serviços
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative">
              {/* Decorative circle behind image */}
              <div
                className="absolute -inset-4 rounded-[2.5rem] opacity-40"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              <div
                className="absolute -inset-8 rounded-[3rem] opacity-20"
                style={{ backgroundColor: 'var(--color-accent-lime)' }}
              />
              <img
                src="./hero-portrait.jpg"
                alt="Dra. Ana Silva - Nutricionista"
                className="relative w-[300px] sm:w-[380px] lg:w-[420px] h-auto rounded-[2rem] object-cover shadow-xl"
                style={{ aspectRatio: '3/4' }}
              />
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 px-4 py-3 rounded-2xl shadow-lg backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.8)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Calendar size={18} style={{ color: 'var(--color-dark)' }} />
                  </div>
                  <div>
                    <p className="text-label" style={{ color: 'var(--color-dark-secondary)' }}>
                      Experiência
                    </p>
                    <p className="text-h4 font-bold" style={{ color: 'var(--color-dark)' }}>
                      10+ Anos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
