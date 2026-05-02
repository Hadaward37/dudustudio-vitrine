import { AlertTriangle, TrendingDown, FileText, HelpCircle, ShieldCheck, Calculator, CheckCircle } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Medo de multa',
    desc: 'Recebi uma notificação da Receita e não sei o que fazer.',
    solution: 'Defesa tributária imediata e acompanhamento de processos.',
    color: 'from-[#ff3366] to-[#ff6b8a]',
  },
  {
    icon: TrendingDown,
    title: 'Imposto errado',
    desc: 'Acho que estou pagando mais imposto do que deveria.',
    solution: 'Planejamento tributário que reduz sua carga legalmente.',
    color: 'from-[#F59E0B] to-[#fbbf24]',
  },
  {
    icon: FileText,
    title: 'Burocracia',
    desc: 'Passo horas com papelada em vez de cuidar do meu negócio.',
    solution: 'Tudo digital: notas fiscais, DAS e DASN automáticos.',
    color: 'from-[#2563EB] to-[#60a5fa]',
  },
  {
    icon: HelpCircle,
    title: 'MEI em dia?',
    desc: 'Não sei se minha situação cadastral está regular.',
    solution: 'Monitoramento contínuo + alertas antes do vencimento.',
    color: 'from-[#7c3aed] to-[#a78bfa]',
  },
];

export default function ProblemsSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Dores que resolvemos
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto">
            Vire o card e descubra como transformamos cada problema em tranquilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, i) => {
            const IconFront = item.icon;
            const IconBack = i % 2 === 0 ? ShieldCheck : CheckCircle;
            return (
              <div key={i} className="flip-card h-72 group cursor-pointer">
                <div className="flip-card-inner w-full h-full relative">
                  {/* Front - Problem */}
                  <div className="flip-card-front absolute inset-0 glass-dark rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-[rgba(255,255,255,0.06)]">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg`}>
                      <IconFront className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#F0F4FF] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[rgba(240,244,255,0.5)] leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="mt-4 text-xs text-[rgba(240,244,255,0.3)] uppercase tracking-wider">
                      Passe o mouse para virar
                    </div>
                  </div>

                  {/* Back - Solution */}
                  <div className="flip-card-back absolute inset-0 glass rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-[rgba(0,212,170,0.2)] glow-cyan">
                    <div className="w-14 h-14 rounded-xl bg-[#00D4AA] flex items-center justify-center mb-5 shadow-lg">
                      <IconBack className="w-7 h-7 text-[#0A1628]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#00D4AA] mb-3">
                      Solução
                    </h3>
                    <p className="text-sm text-[rgba(240,244,255,0.7)] leading-relaxed">
                      {item.solution}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#00D4AA] text-xs font-medium">
                      <Calculator className="w-3 h-3" />
                      <span>Sem burocracia</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
