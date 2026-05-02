import SlotCounter from '../components/SlotCounter';

const stats = [
  { value: 850, label: 'Clientes atendidos', prefix: '+', suffix: '', color: '#00D4AA' },
  { value: 12, label: 'Anos de experiência', prefix: '', suffix: '', color: '#2563EB' },
  { value: 2000000, label: 'Reais economizados', prefix: 'R$', suffix: '', color: '#F59E0B', format: true },
  { value: 98, label: 'Satisfação clientes', prefix: '', suffix: '%', color: '#00D4AA' },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,212,170,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Números que falam
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto">
            Resultados concretos de quem confiou na nossa expertise contábil.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-dark rounded-2xl p-8 text-center border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,212,170,0.15)] transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className="font-mono-num text-4xl md:text-5xl font-bold mb-3"
                style={{ color: stat.color }}
              >
                <SlotCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={1500}
                />
              </div>
              <div className="text-sm text-[rgba(240,244,255,0.5)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
