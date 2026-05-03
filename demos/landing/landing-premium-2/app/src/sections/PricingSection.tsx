import { useState } from 'react';
import { Check, Zap, Building2, Crown } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const plans = [
  {
    icon: Zap,
    name: 'MEI',
    monthlyPrice: 89,
    yearlyPrice: 79,
    description: 'Ideal para autônomos e MEIs',
    features: [
      'DAS mensal automático',
      'DASN anual incluso',
      'Emissão de notas fiscais',
      'Suporte via WhatsApp',
      'Relatório anual simplificado',
      'Abertura de CNPJ grátis',
    ],
    highlight: false,
    color: '#00D4AA',
  },
  {
    icon: Building2,
    name: 'Pequena Empresa',
    monthlyPrice: 249,
    yearlyPrice: 219,
    description: 'Para negócios em crescimento',
    features: [
      'Tudo do plano MEI',
      'Folha de pagamento (até 5 func.)',
      'Declaração de Imposto de Renda PJ',
      'Planejamento tributário básico',
      'Balanço semestral',
      'Contador dedicado',
    ],
    highlight: true,
    color: '#2563EB',
  },
  {
    icon: Crown,
    name: 'Empresarial',
    monthlyPrice: null,
    yearlyPrice: null,
    description: 'Solução sob medida',
    features: [
      'Tudo dos planos anteriores',
      'Folha ilimitada',
      'Auditoria interna',
      'Consultoria estratégica mensal',
      'Relatórios personalizados',
      'Reuniões presenciais',
    ],
    highlight: false,
    color: '#F59E0B',
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="planos" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[rgba(37,99,235,0.1)] text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-4">
            Planos e Preços
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Invista no que importa
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto mb-8">
            Escolha o plano ideal para o tamanho do seu negócio. Troque quando quiser.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full glass border border-[rgba(255,255,255,0.08)]">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly
                  ? 'bg-[#00D4AA] text-[#0A1628]'
                  : 'text-[rgba(240,244,255,0.5)] hover:text-[#F0F4FF]'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isYearly
                  ? 'bg-[#00D4AA] text-[#0A1628]'
                  : 'text-[rgba(240,244,255,0.5)] hover:text-[#F0F4FF]'
              }`}
            >
              Anual
              <span className="text-[10px] bg-[#F59E0B] text-[#0A1628] px-1.5 py-0.5 rounded-full font-bold">
                -15%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <TiltCard
                key={i}
                className={`h-full ${plan.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                <div
                  className={`glass rounded-2xl p-8 h-full flex flex-col border transition-all duration-500 ${
                    plan.highlight
                      ? 'border-[rgba(0,212,170,0.3)] glow-cyan'
                      : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#00D4AA] text-[#0A1628] text-xs font-bold rounded-full uppercase tracking-wider">
                      Mais Popular
                    </div>
                  )}

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${plan.color}20`,
                      border: `1px solid ${plan.color}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: plan.color }} />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#F0F4FF] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[rgba(240,244,255,0.5)] mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    {price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-[rgba(240,244,255,0.5)] text-lg">R$</span>
                        <span className="font-mono-num text-5xl font-bold text-[#F0F4FF]">
                          {price}
                        </span>
                        <span className="text-[rgba(240,244,255,0.5)] text-sm">/mês</span>
                      </div>
                    ) : (
                      <span className="font-mono-num text-3xl font-bold text-[#F0F4FF]">
                        Personalizado
                      </span>
                    )}
                    {isYearly && price && (
                      <div className="text-xs text-[#00D4AA] mt-1 font-medium">
                        Economia de R$ {(plan.monthlyPrice! - plan.yearlyPrice!) * 12}/ano
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm text-[rgba(240,244,255,0.7)]">
                        <Check className="w-4 h-4 text-[#00D4AA] shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-[#00D4AA] text-[#0A1628] hover:scale-105 glow-cyan'
                        : 'bg-[rgba(255,255,255,0.06)] text-[#F0F4FF] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.08)]'
                    }`}
                  >
                    {price ? 'Começar Agora' : 'Falar com Especialista'}
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
