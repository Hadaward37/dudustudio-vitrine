import { useCallback } from 'react';

interface MatrixBackgroundProps {
  active?: boolean;
}

export default function MatrixBackground({ active = true }: MatrixBackgroundProps) {
  const canvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas || !active) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    const cols = Math.floor(w / 20);
    const drops: number[] = Array(cols).fill(1);
    const chars = '01$¥€£';

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 22, 40, 0.08)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = '14px JetBrains Mono';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        const y = drops[i] * 20;

        const isHead = Math.random() > 0.95;
        ctx.fillStyle = isHead ? '#00D4AA' : 'rgba(0, 212, 170, 0.3)';
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}
