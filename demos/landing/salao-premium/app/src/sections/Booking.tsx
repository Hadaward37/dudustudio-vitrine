import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

const schedule = [
  { day: 'Segunda', hours: '09h — 18h' },
  { day: 'Terça', hours: '09h — 20h' },
  { day: 'Quarta', hours: '09h — 20h' },
  { day: 'Quinta', hours: '09h — 20h' },
  { day: 'Sexta', hours: '09h — 20h' },
  { day: 'Sábado', hours: '10h — 16h' },
];

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-left') || [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-right') || [],
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="agendamento" ref={sectionRef} className="relative py-[80px] lg:py-[120px] bg-[#1A1A1A]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="mb-16" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="reveal-left block font-body font-medium text-[11px] uppercase tracking-[0.15em] text-[#C9956C] mb-3">
            Reserve seu momento
          </span>
          <h2 className="reveal-left font-display font-light text-[32px] lg:text-[48px] text-white leading-[1.15] mb-6">
            Agende sua transformação
          </h2>
          <p className="reveal-left font-body font-light text-base text-white/70 leading-[1.7] max-w-md mb-8">
            Escolha o horário que melhor funciona para você. Nossa equipe está pronta para criar uma experiência única.
          </p>
          <a
            href="https://wa.me/5511914969488"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-left inline-flex items-center gap-3 px-10 py-6 rounded-2xl text-white font-body font-medium text-lg"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              animation: 'pulseGlow 2s infinite',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar pelo WhatsApp
          </a>
        </div>

        <div>
          <span className="reveal-right block font-body font-medium text-[13px] uppercase tracking-[0.1em] text-[#C9956C] mb-6">
            Horários disponíveis
          </span>
          <div className="reveal-right grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {schedule.map((s) => (
              <div
                key={s.day}
                className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  background: 'rgba(250, 247, 242, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
              >
                <p className="font-body font-medium text-sm text-white mb-1">{s.day}</p>
                <p className="font-body font-light text-[13px] text-white/60">{s.hours}</p>
              </div>
            ))}
          </div>
          <p className="reveal-right font-body font-light text-[13px] text-white/40 italic">
            Fechado aos domingos
          </p>
        </div>
      </div>
    </section>
  );
}
