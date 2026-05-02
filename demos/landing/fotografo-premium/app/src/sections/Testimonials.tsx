import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Mariana Silva',
    image: '/images/client-1.jpg',
    text: 'Lucas tem um dom de capturar a essência de cada momento. Nossas fotos de casamento são verdadeiras obras de arte.',
  },
  {
    name: 'Ricardo Mendonça',
    image: '/images/client-2.jpg',
    text: 'Profissionalismo impecável. As fotos do nosso evento corporativo superaram todas as expectativas.',
  },
  {
    name: 'Camila & Pedro',
    image: '/images/client-3.jpg',
    text: 'O ensaio pré-wedding ficou mágico. Cada foto conta uma história. Recomendamos de olhos fechados!',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    gsap.from('.testimonials-header', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="testimonials-header text-center mb-16">
          <span className="font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-4">
            05 — Depoimentos
          </span>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-light tracking-[0.05em] text-[#F5F5F0]">
            O que Dizem os Clientes
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`transition-all duration-700 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 absolute translate-y-4 pointer-events-none'
              }`}
              style={{ position: i === current ? 'relative' : 'absolute', inset: 0 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                {/* Client Photo */}
                <div className="shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/30">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Quote */}
                <div className="text-center md:text-left">
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="font-display text-xl md:text-2xl italic text-[#F5F5F0] leading-relaxed mb-6">
                    "{t.text}"
                  </blockquote>

                  <p className="font-mono text-xs tracking-[0.15em] text-gold uppercase">
                    {t.name}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold w-6' : 'bg-[#2A2A2A] hover:bg-[#555555]'
                }`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
