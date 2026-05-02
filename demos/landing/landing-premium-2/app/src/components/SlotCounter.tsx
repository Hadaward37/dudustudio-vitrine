import { useEffect, useRef, useState } from 'react';

interface SlotCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

function SlotDigit({ target, delay, duration = 800 }: { target: string; delay: number; duration?: number }) {
  const [display, setDisplay] = useState('0');
  const digits = '0123456789';

  useEffect(() => {
    const isComma = target === ',' || target === '.' || target === ' ';
    if (isComma) {
      setDisplay(target);
      return;
    }

    const targetNum = parseInt(target, 10);
    if (isNaN(targetNum)) {
      setDisplay(target);
      return;
    }

    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - delay;

      if (elapsed < 0) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // eased variable intentionally unused - kept for future easing logic
      void (1 - Math.pow(1 - progress, 3));

      if (progress < 1) {
        const randomIdx = Math.floor(Math.random() * 10);
        setDisplay(digits[randomIdx]);
        animId = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [target, delay, duration]);

  return (
    <span className="inline-block min-w-[0.6em] text-center">
      {display}
    </span>
  );
}

export default function SlotCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1200,
  decimals = 0,
  className = '',
}: SlotCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatted = isVisible
    ? value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : '0';

  const chars = formatted.split('');

  return (
    <span ref={ref} className={`font-mono-num ${className}`}>
      {prefix}
      {chars.map((char, i) => (
        <SlotDigit
          key={i}
          target={char}
          delay={isVisible ? i * 80 : 0}
          duration={duration}
        />
      ))}
      {suffix}
    </span>
  );
}
