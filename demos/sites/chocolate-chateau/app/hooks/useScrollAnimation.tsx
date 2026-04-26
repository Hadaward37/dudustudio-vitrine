'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useStaggerAnimation(parentRef: React.RefObject<HTMLDivElement | null>, childSelector: string) {
  useEffect(() => {
    if (!parentRef.current) return;

    const ctx = gsap.context(() => {
      const children = parentRef.current?.querySelectorAll(childSelector);
      if (!children || children.length === 0) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'cubic-bezier(0.33, 1, 0.68, 1)',
          scrollTrigger: {
            trigger: parentRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, parentRef);

    return () => ctx.revert();
  }, [parentRef, childSelector]);
}
