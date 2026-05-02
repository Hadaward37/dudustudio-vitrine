import { useEffect, useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function CTASection() {
  const [countdown, setCountdown] = useState({ days: 2, hours: 14, minutes: 32 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes } = prev;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 2;
          hours = 14;
          minutes = 32;
        }
        return { days, hours, minutes };
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Intensified grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,170,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,170,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-[#F0F4FF] mb-6 leading-tight">
          Pare de perder
          <br />
          <span className="gradient-text">dinheiro agora</span>
        </h2>

        <p className="text-lg md:text-xl text-[rgba(240,244,255,0.6)] max-w-2xl mx-auto mb-10">
          A cada mês sem planejamento tributário, você deixa dinheiro na mesa.
          Vamos recuperar isso juntos.
        </p>

        {/* Countdown */}
        <div className="inline-flex items-center gap-6 glass rounded-2xl px-8 py-4 border border-[rgba(0,212,170,0.2)] mb-10">
          <Clock className="w-5 h-5 text-[#00D4AA]" />
          <div className="flex items-center gap-4">
            {[
              { value: countdown.days, label: 'dias' },
              { value: countdown.hours, label: 'horas' },
              { value: countdown.minutes, label: 'min' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-mono-num text-2xl font-bold text-[#00D4AA]">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-[rgba(240,244,255,0.4)] uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-[rgba(240,244,255,0.5)] max-w-[140px] text-left leading-tight">
            Próxima consulta grátis
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511914969488"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00D4AA] text-[#0A1628] font-bold text-lg transition-all duration-300 hover:scale-105 glow-cyan"
          >
            Agendar Consulta Grátis
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#planos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[rgba(255,255,255,0.15)] text-[#F0F4FF] font-medium transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]"
          >
            Ver Planos
          </a>
        </div>
      </div>
    </section>
  );
}
