import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline({ delay: 1.6 });
    tl.from('.hero-name', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
    .from('.hero-tagline', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.hero-scroll', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    // Parallax on scroll
    if (bgRef.current && sectionRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (textRef.current && sectionRef.current) {
      gsap.to(textRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => { tl.kill(); };
  }, []);

  // Focus circle following mouse
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    section.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * 0.1;
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * 0.1;

      if (focusRef.current) {
        focusRef.current.style.left = `${smoothPos.current.x}px`;
        focusRef.current.style.top = `${smoothPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-end"
      id="hero"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{
          backgroundImage: 'url(./images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-[#0D0D0D]/30 z-[1]" />

      {/* Grain Overlay */}
      <div className="grain-overlay z-[2]" />

      {/* Dot Grid */}
      <div className="absolute inset-0 dot-grid z-[1] opacity-50" />

      {/* Focus Circle */}
      <div
        ref={focusRef}
        className="absolute z-[3] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.25)',
          boxShadow: '0 0 60px rgba(212,175,55,0.1), inset 0 0 40px rgba(212,175,55,0.05)',
        }}
      >
        <div
          className="absolute inset-2 rounded-full border border-gold/10"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gold/10" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gold/10" />
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="relative z-[4] w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24"
      >
        <h1 className="hero-name font-display text-[clamp(48px,8vw,96px)] font-light tracking-[0.1em] text-[#F5F5F0] uppercase leading-none">
          Lucas<br />Mendes
        </h1>
        <p className="hero-tagline font-mono text-xs tracking-[0.15em] text-gold uppercase mt-6">
          Photographer · São Paulo · Since 2016
        </p>

        {/* Scroll Indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">Scroll</span>
          <div className="animate-scroll-bounce">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
