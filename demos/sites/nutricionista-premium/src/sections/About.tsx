import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, BookOpen, Users, Heart } from 'lucide-react';

const credentials = [
  { icon: Award, label: 'CRN', value: '3-12345' },
  { icon: BookOpen, label: 'Especialização', value: 'Nutrição Funcional' },
  { icon: Users, label: 'Pacientes', value: '2.000+' },
  { icon: Heart, label: 'Taxa de', value: 'Satisfação 98%' },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--color-secondary)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full rounded-[2rem]"
                style={{ backgroundColor: 'var(--color-primary)', opacity: 0.3 }}
              />
              <img
                src="/about-photo.jpg"
                alt="Dra. Ana Silva em consultório"
                className="relative w-full h-auto rounded-[2rem] object-cover shadow-lg"
                style={{ aspectRatio: '4/3' }}
              />
              {/* Experience badge */}
              <div
                className="absolute -bottom-6 -right-4 sm:right-8 px-6 py-4 rounded-2xl shadow-xl"
                style={{ backgroundColor: 'var(--color-dark)' }}
              >
                <p className="text-label mb-1" style={{ color: 'var(--color-primary)' }}>
                  Experiência
                </p>
                <p className="text-h2 font-bold" style={{ color: 'var(--color-base)' }}>
                  10+ <span className="text-h4 font-normal">anos</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Text */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <span
              className="inline-block text-label mb-4"
              style={{ color: 'var(--color-primary-active)' }}
            >
              Sobre Mim
            </span>

            <h2
              className="text-h1 mb-6"
              style={{ color: 'var(--color-dark)' }}
            >
              Dra. Ana Silva
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-body" style={{ color: 'var(--color-dark-secondary)' }}>
                Sou nutricionista clínica funcional com mais de 10 anos de experiência 
                ajudando pessoas a transformarem sua relação com a alimentação e 
                alcançarem seus objetivos de saúde de forma sustentável.
              </p>
              <p className="text-body" style={{ color: 'var(--color-dark-secondary)' }}>
                Formada pela Universidade de São Paulo (USP) e pós-graduada em Nutrição 
                Funcional e Comportamento Alimentar, acredito que cada pessoa é única 
                e merece um plano nutricional personalizado, respeitando sua rotina, 
                preferências e objetivos.
              </p>
              <p className="text-body" style={{ color: 'var(--color-dark-secondary)' }}>
                Meu trabalho vai além de prescrever dietas — eu educo, incentivo e 
                acompanho cada paciente em sua jornada, celebrando cada conquista 
                ao longo do caminho.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-base)',
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <item.icon size={18} style={{ color: 'var(--color-dark)' }} />
                  </div>
                  <div>
                    <p
                      className="text-label mb-0.5"
                      style={{ color: 'var(--color-dark-secondary)' }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-body-sm font-semibold"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
