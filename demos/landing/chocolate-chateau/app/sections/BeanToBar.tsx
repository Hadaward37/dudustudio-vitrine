'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TIMELINE_NODES } from '@/app/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function BeanToBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }

    nodesRef.current.forEach((node, i) => {
      if (!node) return;
      const isLeft = i % 2 === 0;
      gsap.fromTo(
        node,
        { opacity: 0, x: isLeft ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 70%',
            once: true,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="bean-to-bar"
      ref={sectionRef}
      className="bg-[#F5F0EB] py-20 md:py-32 px-4 md:px-12"
    >
      <div className="max-w-[720px] mx-auto">
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-[5.5vw] font-normal text-[#2C1810] mb-4">
            Do Grão ao Bombom
          </h2>
          <p className="font-light text-lg text-[#8B7355] max-w-[560px] mx-auto">
            A jornada do cacau da nossa fazenda parceira em Ilhéus até sua caixa de presente
          </p>
        </div>

        <div className="relative">
          {/* Center line - background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#C4A77D]/40 -translate-x-1/2" />
          {/* Center line - fill */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 w-px bg-[#D4AF37] -translate-x-1/2"
            style={{ height: '0%' }}
          />

          <div className="space-y-16 md:space-y-24">
            {TIMELINE_NODES.map((node, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={el => { nodesRef.current[i] = el; }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 bg-[#C4A77D] rounded-full -translate-x-1/2 z-10 ring-4 ring-[#F5F0EB]" />

                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-[calc(50%-40px)] ${
                    isLeft ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'
                  }`}>
                    <h3 className="font-serif text-xl md:text-2xl text-[#2C1810] mb-2">
                      {node.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#8B7355] leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
