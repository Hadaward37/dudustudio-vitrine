import { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function SparkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let sparks: Spark[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const colors = [
      'rgba(230, 57, 70, ',
      'rgba(255, 107, 107, ',
      'rgba(212, 175, 55, ',
      'rgba(255, 200, 100, ',
      'rgba(192, 192, 192, ',
    ];

    const createSpark = (side: 'left' | 'right') => {
      const spark: Spark = {
        x: side === 'left' ? -10 : canvas.width + 10,
        y: Math.random() * canvas.height,
        vx: side === 'left' ? Math.random() * 3 + 1 : -(Math.random() * 3 + 1),
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: Math.random() * 120 + 60,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      return spark;
    };

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (frameCount % 3 === 0) {
        sparks.push(createSpark('left'));
        sparks.push(createSpark('right'));
      }

      sparks = sparks.filter((spark) => {
        spark.life -= 1 / spark.maxLife;
        if (spark.life <= 0) return false;

        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += Math.sin(frameCount * 0.05 + spark.x * 0.01) * 0.1;

        const dx = spark.x - mouseX;
        const dy = spark.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          spark.vx += (dx / dist) * force * 2;
          spark.vy += (dy / dist) * force * 2;
        }

        spark.vx *= 0.98;
        spark.vy *= 0.98;

        const alpha = spark.life * (0.5 + Math.random() * 0.5);
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
        ctx.fillStyle = spark.color + alpha + ')';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * spark.life * 2, 0, Math.PI * 2);
        ctx.fillStyle = spark.color + (alpha * 0.2) + ')';
        ctx.fill();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
