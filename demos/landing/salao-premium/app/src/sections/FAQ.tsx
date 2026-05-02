import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: 'Preciso agendar com antecedência?', a: 'Recomendamos agendar com pelo menos 3 dias de antecedência para garantir o horário e profissional de sua preferência. Atendimentos de última hora podem ser disponibilizados por WhatsApp.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos todas as bandeiras de cartão de crédito e débito, PIX, transferência bancária e dinheiro. Parcelamos em até 6x sem juros para serviços acima de R$ 300.' },
  { q: 'Os produtos são testados em animais?', a: 'Não. Trabalhamos exclusivamente com marcas cruelty-free e veganas, comprometidas com a beleza consciente e sustentável.' },
  { q: 'Posso trazer referências de cortes ou cores?', a: 'Claro! Adoramos quando você traz referências. Analisamos juntas o que funciona melhor para seu tipo de rosto, tom de pele e estilo de vida.' },
  { q: 'Qual a política de cancelamento?', a: 'Pedimos aviso com 24h de antecedência para cancelamentos ou remarcações. Cancelamentos com menos de 24h podem incidir em taxa de 30% sobre o valor do serviço.' },
  { q: 'Vocês atendem crianças e gestantes?', a: 'Sim. Temos protocolos especiais para gestantes (com produtos liberados) e atendimento infantil em horários dedicados para maior tranquilidade.' },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-item') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[80px] lg:py-[120px]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="mb-16" />
      <div className="max-w-[800px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <span className="reveal-item block font-body font-medium text-[11px] uppercase tracking-[0.15em] text-[#C9956C] mb-3">
            Tire suas dúvidas
          </span>
          <h2 className="reveal-item font-display font-normal text-[32px] lg:text-[48px] text-[#1A1A1A] leading-[1.15] inline-block">
            Perguntas frequentes
            <svg className="block w-full h-[6px] mt-2" viewBox="0 0 300 6" preserveAspectRatio="none">
              <path d="M0,3 Q75,0 150,3 T300,3" stroke="#D4AF37" strokeWidth="2" fill="none" />
            </svg>
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal-item border-b border-[rgba(212,175,55,0.2)]"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="font-body text-base text-[#1A1A1A] group-hover:text-[#C9956C] transition-colors pr-4">
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{ transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#C9956C] group-hover:scale-110 transition-transform">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: openIdx === i ? '200px' : '0px',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <p className="font-body font-light text-[15px] text-[#1A1A1A] leading-[1.7] pb-6">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
