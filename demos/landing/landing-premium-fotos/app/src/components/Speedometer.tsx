import { useEffect, useRef } from 'react';

export default function Speedometer() {
  const needleRef = useRef<SVGLineElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let angle = -120;
    let targetAngle = 120;
    let speed = 1;

    const animate = () => {
      const diff = targetAngle - angle;
      angle += diff * 0.02 * speed;

      if (Math.abs(diff) < 1) {
        targetAngle = targetAngle > 0 ? -120 : 120;
        speed = 0.5 + Math.random() * 1.5;
      }

      if (needleRef.current) {
        needleRef.current.setAttribute('transform', `rotate(${angle}, 100, 100)`);
      }

      if (glowRef.current) {
        const intensity = (angle + 120) / 240;
        glowRef.current.style.opacity = String(0.3 + intensity * 0.7);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64" style={{ perspective: '800px' }}>
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(230,57,70,0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: 'rotateX(20deg)' }}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#E63946" />
          </linearGradient>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
        />

        <path
          d="M 25 130 A 85 85 0 1 1 175 130"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {[...Array(13)].map((_, i) => {
          const angle = -120 + (i * 20);
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 70 * Math.cos(rad);
          const y1 = 100 + 70 * Math.sin(rad);
          const x2 = 100 + 80 * Math.cos(rad);
          const y2 = 100 + 80 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i >= 10 ? '#E63946' : '#C0C0C0'}
              strokeWidth="2"
            />
          );
        })}

        {[0, 40, 80, 120, 160, 200, 240].map((speed, i) => {
          const angle = -120 + (i * 20);
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 55 * Math.cos(rad);
          const y = 100 + 55 * Math.sin(rad);
          return (
            <text
              key={speed}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#C0C0C0"
              fontSize="10"
              fontFamily="Oswald, sans-serif"
            >
              {speed}
            </text>
          );
        })}

        <text
          x="100"
          y="125"
          textAnchor="middle"
          fill="#F4F4F5"
          fontSize="14"
          fontFamily="Oswald, sans-serif"
          letterSpacing="2"
        >
          KM/H
        </text>

        <line
          ref={needleRef}
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="#E63946"
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(-120, 100, 100)"
        />

        <circle cx="100" cy="100" r="8" fill="#E63946" />
        <circle cx="100" cy="100" r="4" fill="#0A0A0A" />
      </svg>
    </div>
  );
}
