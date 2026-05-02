import { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, FileText, ArrowUpRight, ArrowDownRight, Activity, CreditCard, Wallet, PiggyBank } from 'lucide-react';

export default function DashboardMockup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Canvas chart animations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = 760;
    const cssH = 420;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    ctx.scale(dpr, dpr);

    let progress = 0;
    const speed = 0.003;

    // Generate smooth data points
    const generatePoints = (count: number, amp: number, offset: number, trend: number) => {
      return Array.from({ length: count }, (_, i) => {
        const x = i / (count - 1);
        return Math.sin(x * Math.PI * 4 + offset) * amp + trend * x + Math.random() * 10;
      });
    };

    const areaPoints = generatePoints(60, 40, 0, 30);
    const linePoints = generatePoints(60, 25, 2, 20);
    const barPoints = generatePoints(12, 30, 1, 15);

    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const drawGrid = (x: number, y: number, w: number, h: number) => {
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const gy = y + (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + w, gy);
        ctx.stroke();
      }
      for (let i = 0; i <= 6; i++) {
        const gx = x + (w / 6) * i;
        ctx.beginPath();
        ctx.moveTo(gx, y);
        ctx.lineTo(gx, y + h);
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, cssW, cssH);
      progress += speed;

      // === LEFT: Area Chart (Receita) ===
      const ax = 20, ay = 20, aw = 340, ah = 160;
      drawGrid(ax, ay, aw, ah);

      // Area fill
      ctx.beginPath();
      ctx.moveTo(ax, ay + ah);
      for (let i = 0; i < areaPoints.length; i++) {
        const x = ax + (i / (areaPoints.length - 1)) * aw;
        const animatedY = areaPoints[i] * Math.min(progress * 3, 1);
        const y = ay + ah - 20 - animatedY;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(ax + aw, ay + ah);
      ctx.closePath();
      const areaGrad = ctx.createLinearGradient(ax, ay, ax, ay + ah);
      areaGrad.addColorStop(0, 'rgba(0, 212, 170, 0.35)');
      areaGrad.addColorStop(1, 'rgba(0, 212, 170, 0.0)');
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Area line
      ctx.beginPath();
      for (let i = 0; i < areaPoints.length; i++) {
        const x = ax + (i / (areaPoints.length - 1)) * aw;
        const animatedY = areaPoints[i] * Math.min(progress * 3, 1);
        const y = ay + ah - 20 - animatedY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#00D4AA';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Glow dot at end
      const lastIdx = areaPoints.length - 1;
      const lastX = ax + aw;
      const lastY = ay + ah - 20 - areaPoints[lastIdx] * Math.min(progress * 3, 1);
      ctx.beginPath();
      ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#00D4AA';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lastX, lastY, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 170, 0.2)';
      ctx.fill();

      // Labels
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('Receita Mensal', ax, ay - 6);
      ctx.fillStyle = '#00D4AA';
      ctx.font = 'bold 14px JetBrains Mono, monospace';
      ctx.fillText('R$ 47.320', ax + aw - 90, ay - 6);

      // === RIGHT TOP: Bar Chart (Despesas por Categoria) ===
      const bx = 390, by = 20, bw = 340, bh = 160;
      drawGrid(bx, by, bw, bh);

      const barW = (bw / barPoints.length) * 0.6;
      const barGap = (bw / barPoints.length) * 0.4;
      for (let i = 0; i < barPoints.length; i++) {
        const x = bx + i * (barW + barGap) + barGap / 2;
        const maxH = barPoints[i] * Math.min(progress * 3, 1);
        const h = Math.max(maxH, 4);
        const y = by + bh - 20 - h;
        const colors = ['#2563EB', '#00D4AA', '#F59E0B', '#7c3aed', '#ff3366', '#2563EB', '#00D4AA', '#F59E0B'];
        ctx.fillStyle = colors[i % colors.length] + '80';
        drawRoundedRect(x, y, barW, h, 3);
        ctx.fill();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(x, y, barW, 3);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('Despesas por Categoria', bx, by - 6);
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 14px JetBrains Mono, monospace';
      ctx.fillText('R$ 12.845', bx + bw - 90, by - 6);

      // === LEFT BOTTOM: Line Chart (Crescimento %) ===
      const cx = 20, cy = 210, cw = 340, ch = 160;
      drawGrid(cx, cy, cw, ch);

      ctx.beginPath();
      for (let i = 0; i < linePoints.length; i++) {
        const x = cx + (i / (linePoints.length - 1)) * cw;
        const animatedY = linePoints[i] * Math.min(Math.max((progress - 0.2) * 3, 0), 1);
        const y = cy + ch - 20 - animatedY;
        if (i === 0) ctx.moveTo(x, y);
        else {
          const prevX = cx + ((i - 1) / (linePoints.length - 1)) * cw;
          const prevAnimatedY = linePoints[i - 1] * Math.min(Math.max((progress - 0.2) * 3, 0), 1);
          const prevY = cy + ch - 20 - prevAnimatedY;
          const cpX = (prevX + x) / 2;
          ctx.quadraticCurveTo(cpX, prevY, (cpX + x) / 2, (prevY + y) / 2);
          ctx.quadraticCurveTo(x, y, x, y);
        }
      }
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Fill under line
      ctx.beginPath();
      ctx.moveTo(cx, cy + ch);
      for (let i = 0; i < linePoints.length; i++) {
        const x = cx + (i / (linePoints.length - 1)) * cw;
        const animatedY = linePoints[i] * Math.min(Math.max((progress - 0.2) * 3, 0), 1);
        const y = cy + ch - 20 - animatedY;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(cx + cw, cy + ch);
      ctx.closePath();
      const lineGrad = ctx.createLinearGradient(cx, cy, cx, cy + ch);
      lineGrad.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
      lineGrad.addColorStop(1, 'rgba(37, 99, 235, 0.0)');
      ctx.fillStyle = lineGrad;
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('Crescimento %', cx, cy - 6);
      ctx.fillStyle = '#2563EB';
      ctx.font = 'bold 14px JetBrains Mono, monospace';
      ctx.fillText('+24.8%', cx + cw - 60, cy - 6);

      // === RIGHT BOTTOM: Donut Chart (Mix Tributário) ===
      const dx = 480, dy = 260, dr = 60;
      const segments = [
        { value: 0.45, color: '#00D4AA', label: 'Simples' },
        { value: 0.30, color: '#2563EB', label: 'Lucro Pres.' },
        { value: 0.15, color: '#F59E0B', label: 'ISS' },
        { value: 0.10, color: '#7c3aed', label: 'Outros' },
      ];

      let currentAngle = -Math.PI / 2;
      const animSegments = Math.min(progress * 4, 1);

      segments.forEach((seg) => {
        const sweep = seg.value * Math.PI * 2 * animSegments;
        ctx.beginPath();
        ctx.arc(dx, dy, dr, currentAngle, currentAngle + sweep);
        ctx.arc(dx, dy, dr - 18, currentAngle + sweep, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = seg.color + '90';
        ctx.fill();
        ctx.strokeStyle = '#0d1117';
        ctx.lineWidth = 3;
        ctx.stroke();
        currentAngle += sweep;
      });

      // Donut center text
      ctx.fillStyle = '#F0F4FF';
      ctx.font = 'bold 16px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('R$ 2.1M', dx, dy - 4);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('Total Anual', dx, dy + 12);
      ctx.textAlign = 'left';

      // Legend
      let ly = 240;
      segments.forEach((seg) => {
        ctx.fillStyle = seg.color;
        ctx.fillRect(640, ly, 10, 10);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(seg.label, 655, ly + 9);
        ctx.fillStyle = '#F0F4FF';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.fillText(`${Math.round(seg.value * 100)}%`, 720, ly + 9);
        ly += 20;
      });

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('Mix Tributário', 640, 220);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const metrics = [
    { label: 'Faturamento', value: 'R$ 47.320', change: '+12%', up: true, icon: DollarSign, color: '#00D4AA' },
    { label: 'Despesas', value: 'R$ 12.845', change: '-3%', up: false, icon: CreditCard, color: '#F59E0B' },
    { label: 'Clientes', value: '1.247', change: '+8%', up: true, icon: Users, color: '#2563EB' },
    { label: 'Lucro Líquido', value: 'R$ 28.420', change: '+18%', up: true, icon: PiggyBank, color: '#7c3aed' },
  ];

  const transactions = [
    { date: 'Hoje', desc: 'Nota Fiscal #1042', amount: 'R$ 3.200,00', type: 'in', status: 'Recebido' },
    { date: 'Hoje', desc: 'Pagamento Fornecedor', amount: 'R$ 1.450,00', type: 'out', status: 'Pago' },
    { date: 'Ontem', desc: 'DAS Outubro', amount: 'R$ 89,00', type: 'out', status: 'Pago' },
    { date: 'Ontem', desc: 'Serviço Consultoria', amount: 'R$ 5.600,00', type: 'in', status: 'Recebido' },
    { date: '02/10', desc: 'Aluguel Escritório', amount: 'R$ 2.800,00', type: 'out', status: 'Pago' },
  ];

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[rgba(0,212,170,0.1)] text-[#00D4AA] text-xs font-semibold uppercase tracking-wider mb-4">
            Dashboard
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Seu painel, em tempo real
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto">
            Acompanhe a saúde financeira da sua empresa de qualquer lugar, em qualquer dispositivo.
          </p>
        </div>

        {/* Monitor 3D Mockup */}
        <div className="relative max-w-5xl mx-auto perspective-[1200px]">
          <div
            className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0d1117]"
            style={{
              transform: 'rotateX(6deg) rotateY(-2deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(0,212,170,0.06)',
            }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-5 py-3 bg-[#161b22] border-b border-[rgba(255,255,255,0.05)]">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-grow flex justify-center">
                <div className="px-4 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00D4AA20] flex items-center justify-center">
                    <span className="text-[#00D4AA] text-[8px] font-bold">K</span>
                  </div>
                  <span className="text-[11px] text-[rgba(240,244,255,0.35)]">app.contabilidade.com.br</span>
                </div>
              </div>
              <div className="w-20" />
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-14 bg-[#0d1117] border-r border-[rgba(255,255,255,0.04)] py-4 flex flex-col items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00D4AA20] flex items-center justify-center mb-2">
                  <Activity className="w-4 h-4 text-[#00D4AA]" />
                </div>
                {[Wallet, FileText, TrendingUp, Users, CreditCard].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center hover:bg-[rgba(0,212,170,0.08)] transition-colors cursor-pointer">
                    <Icon className="w-4 h-4 text-[rgba(240,244,255,0.3)]" />
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-grow p-5">
                {/* Top metric cards */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={i}
                        className="rounded-xl p-3 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(0,212,170,0.1)] transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: `${m.color}15` }}
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                          </div>
                          <div
                            className={`flex items-center gap-0.5 text-[10px] font-mono-num font-bold ${
                              m.up ? 'text-[#00D4AA]' : 'text-[#ff3366]'
                            }`}
                          >
                            {m.up ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            {m.change}
                          </div>
                        </div>
                        <div className="font-mono-num text-sm font-bold text-[#F0F4FF]">
                          {m.value}
                        </div>
                        <div className="text-[9px] text-[rgba(240,244,255,0.35)] mt-0.5">{m.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Charts canvas */}
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom: Recent transactions bar */}
            <div className="border-t border-[rgba(255,255,255,0.05)] bg-[#0d1117] px-5 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[rgba(240,244,255,0.4)] uppercase tracking-wider font-semibold">
                  Transações Recentes
                </span>
                <span className="text-[10px] text-[#00D4AA] cursor-pointer hover:underline">Ver todas</span>
              </div>
              <div className="flex gap-4 overflow-hidden">
                {transactions.map((t, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 rounded-lg px-3 py-2 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] flex items-center gap-2"
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        t.type === 'in' ? 'bg-[#00D4AA15]' : 'bg-[#ff336615]'
                      }`}
                    >
                      {t.type === 'in' ? (
                        <TrendingUp className="w-3 h-3 text-[#00D4AA]" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-[#ff3366]" />
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] text-[rgba(240,244,255,0.7)] leading-tight">{t.desc}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-[10px] font-mono-num font-bold ${
                            t.type === 'in' ? 'text-[#00D4AA]' : 'text-[#ff3366]'
                          }`}
                        >
                          {t.amount}
                        </span>
                        <span className="text-[9px] text-[rgba(240,244,255,0.3)]">{t.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.015)] to-transparent pointer-events-none" />
          </div>

          {/* Monitor stand */}
          <div className="mx-auto w-40 h-3 bg-[rgba(255,255,255,0.04)] rounded-b-lg mt-0" />
          <div className="mx-auto w-28 h-2 bg-[rgba(255,255,255,0.02)] rounded-b-sm" />

          {/* Floating badges around monitor */}
          <div
            className="absolute -top-2 -right-2 glass rounded-xl px-4 py-2.5 border border-[rgba(0,212,170,0.15)] animate-bounce"
            style={{ animationDuration: '4s' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00D4AA] pulse-dot" />
              <span className="font-mono-num text-[#00D4AA] text-xs font-bold">DAS Pago</span>
            </div>
          </div>

          <div
            className="absolute -bottom-2 -left-4 glass rounded-xl px-4 py-2.5 border border-[rgba(245,158,11,0.15)] animate-bounce"
            style={{ animationDuration: '5s', animationDelay: '1s' }}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3 h-3 text-[#F59E0B]" />
              <span className="font-mono-num text-[#F59E0B] text-xs font-bold">3 NFs Emitidas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
