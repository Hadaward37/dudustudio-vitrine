import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Check, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [showCheck, setShowCheck] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 3D Grid Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let animId: number;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    const gridSize = 40;
    const perspective = 800;
    const speed = 0.6;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      offset += speed;

      const centerX = w / 2;
      const centerY = h / 2;

      // Draw perspective grid lines
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.12)';
      ctx.lineWidth = 1;

      for (let i = -gridSize * 10; i <= gridSize * 10; i += gridSize) {
        const z = ((i + offset) % (gridSize * 20)) - gridSize * 10;
        const scale = perspective / (perspective + z);
        const x1 = centerX - w * scale;
        const x2 = centerX + w * scale;
        const y = centerY + (z * 0.3);

        if (z > -perspective + 50) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
      }

      // Vertical lines converging to center
      for (let i = -20; i <= 20; i++) {
        const x = centerX + i * gridSize * 3;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(centerX + i * 20, h);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Scroll fade effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 600);
      const translateY = scrollY * 0.3;
      section.style.opacity = String(opacity);
      section.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* 3D Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Radial glow from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,212,170,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[rgba(0,212,170,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[#00D4AA] pulse-dot" />
          <span className="text-xs font-medium text-[#00D4AA] tracking-wide uppercase">
            Primeira consulta 100% grátis
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6">
          <span className="block text-[#F0F4FF]">Sua empresa.</span>
          <span className="block text-[#F0F4FF]">Organizada.</span>
          <span className="block gradient-text">Crescendo.</span>
        </h1>

        <p className="text-lg md:text-xl text-[rgba(240,244,255,0.6)] max-w-2xl mb-10 leading-relaxed">
          Contabilidade digital para MEIs e pequenas empresas. Deixe a burocracia
          conosco e foque no que realmente importa: o crescimento do seu negócio.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleCTAClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00D4AA] text-[#0A1628] font-bold text-lg transition-all duration-300 hover:scale-105 glow-cyan overflow-hidden"
        >
          <span
            className={`transition-all duration-300 ${
              showCheck ? 'opacity-0 translate-x-[-20px]' : 'opacity-100'
            }`}
          >
            Começar Agora
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              showCheck ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <Check className="w-6 h-6" />
          </span>
          <ArrowRight
            className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
              showCheck ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </button>

        {/* Dashboard Mockup */}
        <div className="mt-16 relative w-full max-w-4xl mx-auto perspective-[1200px]">
          <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl transform rotateX(12deg) hover:rotateX(0deg) transition-transform duration-700"
            style={{
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,170,0.1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="./dashboard-ui.jpg"
              alt="Dashboard Contábil"
              className="w-full h-auto"
            />
            {/* Glare overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.03)] to-transparent pointer-events-none" />
          </div>

          {/* Floating stats */}
          <div className="absolute -top-4 -right-4 md:right-8 glass rounded-xl px-4 py-3 border border-[rgba(0,212,170,0.2)] animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00D4AA]" />
              <span className="font-mono-num text-[#00D4AA] text-sm font-bold">+24%</span>
            </div>
            <div className="text-[10px] text-[rgba(240,244,255,0.5)] mt-0.5">Economia tributária</div>
          </div>

          <div className="absolute -bottom-4 -left-4 md:left-8 glass rounded-xl px-4 py-3 border border-[rgba(245,158,11,0.2)] animate-bounce"
            style={{ animationDuration: '4s', animationDelay: '1s' }}
          >
            <div className="font-mono-num text-[#F59E0B] text-sm font-bold">R$ 12.450</div>
            <div className="text-[10px] text-[rgba(240,244,255,0.5)] mt-0.5">Faturamento mensal</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] text-[rgba(240,244,255,0.4)] uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-[rgba(240,244,255,0.2)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-[#00D4AA] animate-bounce" style={{ animationDuration: '1.5s' }} />
        </div>
      </div>
    </section>
  );
}
