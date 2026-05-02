import { Zap, Phone } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(8px) brightness(0.3)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.2) 0%, rgba(10, 10, 10, 0.95) 50%, rgba(212, 175, 55, 0.1) 100%)',
          }}
        />
      </div>

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="speed-line"
            style={{
              top: `${10 + i * 12}%`,
              width: `${150 + Math.random() * 300}px`,
              animationDelay: `${i * 0.25}s`,
              animationDuration: `${1 + Math.random() * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <span className="inline-block px-4 py-1.5 border border-[#E63946]/40 text-[#E63946] text-xs tracking-[0.3em] font-['Oswald'] uppercase mb-6">
          Nao Espere Mais
        </span>

        <h2 className="font-['Oswald'] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 skew-motion">
          AGENDE <span className="text-gradient-red">AGORA</span>
        </h2>

        <p className="text-xl md:text-2xl text-[#A1A1AA] max-w-2xl mx-auto mb-10">
          Seu veiculo merece o melhor. Entre em contato e descubra a experiencia
          Velocita Motors.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://wa.me/5511914969488"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ignite rounded-sm text-lg py-5 px-10 flex items-center gap-3"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          >
            <Phone size={24} />
            WHATSAPP
          </a>

          <a
            href="tel:+5511914969488"
            className="px-10 py-5 border-2 border-white/20 text-white font-['Oswald'] tracking-[0.1em] text-lg hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 rounded-sm flex items-center gap-3"
          >
            <Zap size={24} />
            LIGAR AGORA
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-[#A1A1AA] text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Atendimento imediato
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            Garantia de 12 meses
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E63946] rounded-full" />
            Pecas originais
          </span>
        </div>
      </div>
    </section>
  );
}
