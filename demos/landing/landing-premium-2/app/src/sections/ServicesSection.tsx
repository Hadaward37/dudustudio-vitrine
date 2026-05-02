import { Receipt, FileCheck, BarChart3, Landmark, Users, MessageSquare } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const services = [
  {
    icon: Receipt,
    title: 'Abertura de Empresa',
    desc: 'CNPJ, alvarás e inscrições em 48h. Tudo online, sem filas.',
    color: '#00D4AA',
  },
  {
    icon: FileCheck,
    title: 'Declarações MEI',
    desc: 'DAS, DASN, DIRPF e todas obrigações automatizadas.',
    color: '#2563EB',
  },
  {
    icon: BarChart3,
    title: 'Planejamento Tributário',
    desc: 'Pague menos imposto legalmente com estratégias sob medida.',
    color: '#F59E0B',
  },
  {
    icon: Landmark,
    title: 'Folha de Pagamento',
    desc: 'Cálculos, holerites, FGTS e INSS com precisão total.',
    color: '#7c3aed',
  },
  {
    icon: Users,
    title: 'Consultoria Empresarial',
    desc: 'Análise financeira, fluxo de caixa e indicadores de saúde.',
    color: '#00D4AA',
  },
  {
    icon: MessageSquare,
    title: 'Suporte Humano 1:1',
    desc: 'Contador dedicado disponível via WhatsApp com resposta em minutos.',
    color: '#2563EB',
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[rgba(0,212,170,0.1)] text-[#00D4AA] text-xs font-semibold uppercase tracking-wider mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Tudo que sua empresa precisa
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto">
            De MEI a empresa consolidada, cuidamos de toda a parte contábil e fiscal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <TiltCard key={i} className="h-full">
                <div className="glass-dark rounded-2xl p-8 h-full flex flex-col border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,212,170,0.2)] transition-colors duration-300">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${service.color}20`,
                      border: `1px solid ${service.color}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#F0F4FF] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[rgba(240,244,255,0.5)] text-sm leading-relaxed flex-grow">
                    {service.desc}
                  </p>
                  <div
                    className="mt-5 h-[2px] rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${service.color}, transparent)`,
                    }}
                  />
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
