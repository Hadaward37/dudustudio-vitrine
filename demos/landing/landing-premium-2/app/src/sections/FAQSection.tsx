import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Preciso ter CNPJ para contratar?',
    answer: 'Não. Cuidamos da abertura do seu CNPJ gratuitamente em qualquer plano. Se você ainda é MEI ou autônomo, fazemos todo o processo de formalização.',
  },
  {
    question: 'Como funciona o suporte via WhatsApp?',
    answer: 'Você tem um contador dedicado disponível de segunda a sexta, das 8h às 18h. Dúvidas rápidas são respondidas em minutos. Para assuntos complexos, agendamos uma call.',
  },
  {
    question: 'Posso migrar do meu contador atual?',
    answer: 'Sim. Cuidamos de toda a transição: solicitamos os documentos do contador anterior, fazemos a troca de procuração e garantimos a continuidade das obrigações sem atrasos.',
  },
  {
    question: 'O que está incluso no DAS automático?',
    answer: 'Calculamos seu DAS todo mês com base no seu faturamento, emitimos o boleto e enviamos no WhatsApp com 5 dias de antecedência. Você só precisa pagar.',
  },
  {
    question: 'Tem fidelidade ou multa de cancelamento?',
    answer: 'Nenhuma. Nossos planos são mensais e você pode cancelar quando quiser sem taxas. Acreditamos que a qualidade do serviço é o que mantém o cliente.',
  },
  {
    question: 'Como funciona o planejamento tributário?',
    answer: 'Analisamos seu faturamento, custos e estrutura para identificar a melhor forma de tributação (Simples Nacional, Lucro Presumido, etc.) e reduzir sua carga legalmente.',
  },
  {
    question: 'Vocês cuidam da DIRPF também?',
    answer: 'Sim. A Declaração de Imposto de Renda Pessoa Física está inclusa nos planos Pequena Empresa e Empresarial. Para MEI, oferecemos um valor adicional simbólico.',
  },
  {
    question: 'E se eu receber uma notificação da Receita?',
    answer: 'Entramos em contato imediatamente. Analisamos o teor da notificação, preparamos a defesa e acompanhamos todo o processo até a resolução.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[rgba(255,51,102,0.1)] text-[#ff6b8a] text-xs font-semibold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#F0F4FF] mb-4">
            Dúvidas frequentes
          </h2>
          <p className="text-[rgba(240,244,255,0.5)] text-lg max-w-2xl mx-auto">
            Tudo que você precisa saber antes de começar.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`glass-dark rounded-xl border transition-all duration-500 ${
                  isOpen
                    ? 'border-[rgba(0,212,170,0.2)]'
                    : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.1)]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                >
                  <HelpCircle
                    className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                      isOpen ? 'text-[#00D4AA]' : 'text-[rgba(240,244,255,0.3)]'
                    }`}
                  />
                  <span className="font-semibold text-[#F0F4FF] text-sm flex-grow">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[rgba(240,244,255,0.4)] transition-transform duration-500 ${
                      isOpen ? 'rotate-180 text-[#00D4AA]' : ''
                    }`}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5 pl-16">
                    <p className="text-sm text-[rgba(240,244,255,0.6)] leading-relaxed">
                      {faq.answer}
                    </p>
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
