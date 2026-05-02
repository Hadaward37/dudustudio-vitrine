import { useCountUp } from '../hooks/useCountUp';
import { Users, Calendar, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 1200,
    suffix: '+',
    label: 'Carros Atendidos',
    description: 'Veiculos de todos os segmentos',
  },
  {
    icon: Calendar,
    value: 8,
    suffix: '',
    label: 'Anos de Experiencia',
    description: 'Especializacao continua',
  },
  {
    icon: Award,
    value: 98,
    suffix: '%',
    label: 'Taxa de Aprovacao',
    description: 'Clientes satisfeitos',
  },
  {
    icon: Clock,
    value: 24,
    suffix: 'h',
    label: 'Diagnostico Rapido',
    description: 'Resultado em ate 24 horas',
  },
];

function StatCard({
  stat,
}: {
  stat: (typeof stats)[0];
}) {
  const { count, ref } = useCountUp(stat.value, 2500);
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className="relative group text-center p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#E63946]/30 transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#E63946]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center mb-5 group-hover:bg-[#E63946]/20 transition-colors">
          <Icon size={28} className="text-[#E63946]" />
        </div>

        <div className="font-['Oswald'] text-5xl md:text-6xl font-bold text-gradient-gold mb-2">
          {count.toLocaleString()}
          <span className="text-[#E63946]">{stat.suffix}</span>
        </div>

        <h3 className="font-['Oswald'] text-lg font-bold text-white tracking-wide mb-1">
          {stat.label}
        </h3>

        <p className="text-[#A1A1AA] text-sm">{stat.description}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 md:py-32 bg-[#0A0A0A]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(230, 57, 70, 0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-[#D4AF37]/40 text-[#D4AF37] text-xs tracking-[0.3em] font-['Oswald'] uppercase mb-4">
            Nossos Numeros
          </span>
          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 skew-motion">
            RESULTADOS QUE <span className="text-gradient-gold">IMPRESSIONAM</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
