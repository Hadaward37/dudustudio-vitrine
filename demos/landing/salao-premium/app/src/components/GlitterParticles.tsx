import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  opacity: number;
  maxOpacity: number;
}

export default function GlitterParticles({ intensity = 'normal' }: { intensity?: 'normal' | 'high' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const count = intensity === 'high' ? (isMobile ? 60 : 120) : (isMobile ? 40 : 80);
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 2,
        speedY: 0.2 + Math.random() * 0.5,
        sway: Math.random() * 2 - 1,
        swaySpeed: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        opacity: 0,
        maxOpacity: 0.3 + Math.random() * 0.5,
      });
    }

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.y -= p.speedY;
        p.phase += p.swaySpeed;
        p.x += Math.sin(p.phase) * p.sway * 0.5;

        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let brightness = p.maxOpacity;
        if (dist < 150) {
          brightness = 1;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * 1.5;
          p.y += Math.sin(angle) * 1.5;
        }

        const pulse = 0.7 + 0.3 * Math.sin(p.phase * 3);
        const finalOpacity = brightness * pulse;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${finalOpacity})`);
        gradient.addColorStop(0.5, `rgba(201, 149, 108, ${finalOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(201, 149, 108, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
