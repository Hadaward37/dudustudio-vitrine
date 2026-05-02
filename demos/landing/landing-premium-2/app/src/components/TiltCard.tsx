import { useRef, useCallback, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (-mouseY / (rect.height / 2)) * maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      // Move glare
      const glare = card.querySelector('.tilt-glare') as HTMLElement;
      if (glare) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
      }
    },
    [maxTilt, scale, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const glare = card.querySelector('.tilt-glare') as HTMLElement;
    if (glare) {
      glare.style.background = 'transparent';
    }
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card relative ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div className="tilt-glare absolute inset-0 rounded-inherit pointer-events-none z-10 transition-opacity" />
      <div className="tilt-card-content relative z-[1]">{children}</div>
    </div>
  );
}
