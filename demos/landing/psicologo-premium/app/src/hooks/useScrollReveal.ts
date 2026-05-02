import { useEffect } from 'react';

export function useScrollReveal(threshold = 0.15) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-fade, .reveal-scale, .reveal-line');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
