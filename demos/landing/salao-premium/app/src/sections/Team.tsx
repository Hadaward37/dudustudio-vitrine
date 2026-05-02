import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldenRibbon from '../components/GoldenRibbon';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Bianca Ferreira', role: 'Fundadora & Hair Director', years: '15 anos', image: './team-1.jpg' },
  { name: 'Camila Rocha', role: 'Colorista Master', years: '10 anos', image: './team-2.jpg' },
  { name: 'Juliana Mendes', role: 'Beauty & Nail Specialist', years: '8 anos', image: './team-3.jpg' },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.reveal-item') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.02)`;
    card.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(26,26,26,0.15)`;
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
    card.style.boxShadow = '0 4px 20px rgba(26, 26, 26, 0.08), 0 1px 3px rgba(26, 26, 26, 0.06)';
  };

  return (
    <section id="equipe" ref={sectionRef} className="relative py-[80px] lg:py-[120px]" style={{ zIndex: 2 }}>
      <GoldenRibbon className="mb-16" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <span className="reveal-item block font-body font-medium text-[11px] uppercase tracking-[0.15em] text-[#C9956C] mb-3">
            Quem cuida de você
          </span>
          <h2 className="reveal-item font-display font-normal text-[32px] lg:text-[48px] text-[#1A1A1A] leading-[1.15] inline-block">
            Nossas especialistas
            <svg className="block w-full h-[6px] mt-2" viewBox="0 0 300 6" preserveAspectRatio="none">
              <path d="M0,3 Q75,0 150,3 T300,3" stroke="#D4AF37" strokeWidth="2" fill="none" />
            </svg>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {team.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="reveal-item polaroid-card bg-white p-3 pb-10 transition-all duration-300 ease-out"
              style={{
                boxShadow: '0 4px 20px rgba(26, 26, 26, 0.08), 0 1px 3px rgba(26, 26, 26, 0.06)',
                transform: i === 1 ? 'translateY(-24px)' : 'none',
                maxWidth: 320,
                width: '100%',
              }}
            >
              <div className="overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="text-center px-2">
                <h3 className="font-display font-medium text-[22px] text-[#1A1A1A] mb-1">{member.name}</h3>
                <p className="font-body font-light text-[13px] uppercase tracking-[0.08em] text-[#C9956C] mb-1">{member.role}</p>
                <p className="font-display font-medium italic text-[16px] text-[#D4AF37]">{member.years}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
