'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' })
      .fromTo(brandRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
      .fromTo(sloganRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.4');
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video / Image Background */}
      <div ref={overlayRef} className="absolute inset-0 opacity-0">
        {isMobile ? (
          <img
            src="./images/hero-fallback.jpg"
            alt="Chocolate artesanal"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="./videos/hero-chocolate.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#2C1810] to-transparent z-[1]" />
      <div className="absolute inset-0 bg-[#2C1810]/30 z-[1]" />

      {/* Text content */}
      <div className="absolute bottom-[15%] left-[5%] z-[2] max-w-[90%]">
        <h1
          ref={brandRef}
          className="font-serif text-[10vw] md:text-[6.5vw] text-[#F5F0EB] leading-none tracking-[-0.01em] mb-4"
        >
          Chocolaterie<br />Château
        </h1>
        <p
          ref={sloganRef}
          className="font-sans font-light text-lg md:text-xl text-[#F5F0EB]/90 tracking-wide"
        >
          Do Grão ao Bombom
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ChevronDown size={24} className="text-[#F5F0EB]/60 animate-bounce-down" />
      </div>
    </section>
  );
}
