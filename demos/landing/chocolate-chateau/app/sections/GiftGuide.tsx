'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Gift } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GiftGuide() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="gift-guide"
      ref={sectionRef}
      className="bg-[#F5F0EB] py-20 md:py-32 px-4 md:px-12"
    >
      <div ref={contentRef} className="max-w-[640px] mx-auto text-center">
        <Gift size={36} className="mx-auto mb-6 text-[#D4AF37] opacity-30" />

        <h2 className="font-serif text-4xl md:text-[4vw] font-normal text-[#2C1810] mb-6">
          O Presente Perfeito
        </h2>

        <p className="font-light text-lg text-[#8B7355] leading-relaxed mb-8">
          De aniversários a gestos de gratidão, nossas caixas de presente são preparadas 
          com cuidado artesanal. Escolha o tamanho, adicione uma mensagem manuscrita e 
          deixe o resto conosco.
        </p>

        <button
          onClick={() => {
            const el = document.getElementById('all-chocolates');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center px-8 py-4 bg-[#C4A77D] text-[#2C1810] font-medium rounded-full hover:bg-[#B8976A] hover:scale-[1.02] transition-all"
        >
          Montar Caixa de Presente
        </button>

        <p className="mt-6 text-xs text-[#8B7355]">
          Entrega refrigerada em São Paulo e Rio de Janeiro · Frete grátis acima de R$ 150
        </p>
      </div>
    </section>
  );
}
