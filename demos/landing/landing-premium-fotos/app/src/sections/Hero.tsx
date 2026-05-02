import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import SparkParticles from '../components/SparkParticles';
import Speedometer from '../components/Speedometer';

export default function Hero() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const [showSub, setShowSub] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const text1 = 'SEU CARRO.';
  const text2 = 'NOSSA PAIXAO.';
  const text3 = 'RESULTADO GARANTIDO.';

  useEffect(() => {
    const typeText = (
      text: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      delay: number
    ) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          let i = 0;
          const interval = setInterval(() => {
            setter(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
              clearInterval(interval);
              resolve();
            }
          }, 80);
        }, delay);
      });
    };

    const runAnimation = async () => {
      await typeText(text1, setLine1, 500);
      await typeText(text2, setLine2, 300);
      await typeText(text3, setLine3, 300);
      setTimeout(() => setShowSub(true), 400);
      setTimeout(() => setShowCta(true), 800);
    };

    runAnimation();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 50%, #0A0A0A 100%)',
          }}
        />
      </div>

      <div className="absolute inset-0 blueprint-grid opacity-30 z-[1]" />

      <SparkParticles />

      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="speed-line"
            style={{
              top: `${20 + i * 15}%`,
              width: `${100 + Math.random() * 200}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${1.5 + Math.random()}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="mb-2">
              <span className="inline-block px-4 py-1.5 border border-[#E63946]/40 text-[#E63946] text-xs tracking-[0.3em] font-['Oswald'] uppercase bg-[#E63946]/5">
                Centro Automotivo Premium
              </span>
            </div>

            <h1 className="font-['Oswald'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 skew-motion">
              <span className="block text-white mb-2">
                {line1}
                {line1.length < text1.length && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-[#E63946] ml-1 animate-pulse" />
                )}
                {line1.length === text1.length && line2.length === 0 && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-[#E63946] ml-1 animate-pulse" />
                )}
              </span>
              <span className="block text-gradient-red mb-2">
                {line2}
                {line2.length < text2.length && line1.length === text1.length && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-[#E63946] ml-1 animate-pulse" />
                )}
                {line2.length === text2.length && line3.length === 0 && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-[#E63946] ml-1 animate-pulse" />
                )}
              </span>
              <span className="block text-white">
                {line3}
                {line3.length < text3.length && line2.length === text2.length && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-[#E63946] ml-1 animate-pulse" />
                )}
                {line3.length === text3.length && (
                  <span className="inline-block w-[3px] h-[0.8em] bg-transparent ml-1" />
                )}
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl text-[#A1A1AA] max-w-lg mb-10 transition-all duration-700 ${
                showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Oficina mecanica e estetica automotiva de alto padrao. 
              Performance, estilo e cuidado em cada detalhe do seu veiculo.
            </p>

            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 ${
                showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href="https://wa.me/5511914969488"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ignite rounded-sm flex items-center gap-3 group"
              >
                <Zap size={20} className="transition-transform group-hover:scale-125" />
                AGENDAR SERVICO
              </a>
              <a
                href="#services"
                className="px-8 py-4 border border-white/20 text-white font-['Oswald'] tracking-[0.1em] text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 rounded-sm flex items-center gap-2"
              >
                CONHECA MAIS
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <Speedometer />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.3em] text-[#A1A1AA] font-['Oswald']">SCROLL</span>
        <ChevronDown
          size={24}
          className="text-[#E63946]"
          style={{ animation: 'scroll-indicator 1.5s ease-in-out infinite' }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-32 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0A0A, transparent)',
        }}
      />
    </section>
  );
}
