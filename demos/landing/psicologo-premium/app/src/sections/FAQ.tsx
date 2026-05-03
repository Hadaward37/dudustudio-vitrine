import { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'Quanto custa a sessão?',
    answer:
      'O valor da sessão individual é de R$ 200, com duração de 50 minutos. Para terapia de casal, o valor é de R$ 280 por sessão de 60 minutos. Ofereço também pacotes mensais com condições especiais. Entre em contato pelo WhatsApp para mais informações.',
  },
  {
    question: 'Planos de saúde são aceitos?',
    answer:
      'Atualmente não trabalho com convênios diretamente, mas emito o recibo para reembolso junto ao seu plano de saúde. Muitos planos oferecem reembolso parcial ou integral para sessões de psicoterapia. Verifique as condições do seu plano.',
  },
  {
    question: 'Como funciona o atendimento online?',
    answer:
      'As sessões online são realizadas por vídeo chamada em plataforma segura e específica para telemedicina. Você receberá o link de acesso após a confirmação do agendamento. É necessário apenas um dispositivo com câmera, microfone e conexão com internet estável. O sigilo e a qualidade são os mesmos do atendimento presencial.',
  },
  {
    question: 'Qual a duração de cada sessão?',
    answer:
      'As sessões individuais têm duração de 50 minutos. A terapia de casal tem duração de 60 minutos. A frequência recomendada é de uma sessão por semana, mas pode ser ajustada conforme as necessidades de cada paciente.',
  },
  {
    question: 'Como agendar uma consulta?',
    answer:
      'É muito simples! Basta clicar no botão do WhatsApp, enviar uma mensagem com seu nome e disponibilidade de horários. Responderei o mais rápido possível para confirmarmos sua primeira consulta.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="reveal-fade inline-block text-xs font-medium uppercase tracking-[0.15em] text-gold mb-4">
            PERGUNTAS FREQUENTES
          </span>
          <h2 className="reveal reveal-delay-1 font-serif text-[36px] md:text-[44px] lg:text-[52px] text-text-primary leading-[1.15] mb-4">
            Tire suas dúvidas
          </h2>
          <p className="reveal reveal-delay-2 text-base md:text-lg font-light text-text-secondary leading-relaxed max-w-md mx-auto">
            Aqui estão as respostas para as perguntas mais comuns. Se a sua dúvida não estiver aqui, entre em
            contato!
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`reveal reveal-delay-${Math.min(index + 3, 6)} bg-beige rounded-2xl border border-[#7D9B7610] overflow-hidden`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 md:px-7 py-5 md:py-6 text-left cursor-pointer hover:bg-beige-dark transition-colors duration-300"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-text-primary pr-4">{faq.question}</span>
                  <span className={`faq-icon flex-shrink-0 ${isOpen ? 'rotate' : ''}`}>
                    <Plus size={20} className="text-gold" />
                  </span>
                </button>

                {/* Answer */}
                <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                  <div className="px-6 md:px-7 pb-5 md:pb-6 border-t border-[#7D9B7615]">
                    <p className="pt-5 text-[15px] font-light text-text-secondary leading-[1.7]">
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
