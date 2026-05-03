import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const instagramImages = [
  './images/wedding-1.jpg',
  './images/portrait-1.jpg',
  './images/wedding-2.jpg',
  './images/portrait-2.jpg',
  './images/event-1.jpg',
  './images/wedding-4.jpg',
  './images/corporate-1.jpg',
  './images/portrait-4.jpg',
  './images/wedding-3.jpg',
];

export default function Instagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.from('.instagram-grid-item', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-4">
            06 — Instagram
          </span>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-light tracking-[0.05em] text-[#F5F5F0] mb-4">
            @lucasmendes.photo
          </h2>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-3xl mx-auto mb-10">
          {instagramImages.map((src, i) => (
            <div
              key={i}
              className="instagram-grid-item relative aspect-square overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-image
            >
              <img
                src={src}
                alt={`Instagram ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/40 transition-all duration-300 flex items-center justify-center">
                {/* Like heart */}
                <div
                  className={`transition-all duration-300 ${
                    hoveredIndex === i
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                  }`}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#D4AF37" stroke="none">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <span className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-8 py-3 border border-gold text-gold">
            @lucasmendes.photo
          </span>
        </div>
      </div>
    </section>
  );
}
