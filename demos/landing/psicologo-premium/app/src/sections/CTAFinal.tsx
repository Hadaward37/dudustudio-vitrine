import { ShieldCheck } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/5511914969488?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.';

export default function CTAFinal() {
  return (
    <section className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[120px]"
      style={{
        background: 'linear-gradient(135deg, #7D9B76 0%, #6A8564 50%, #5A7A5A 100%)',
      }}
    >
      {/* Decorative Circles */}
      <div
        className="reveal-scale absolute -top-[100px] -right-[100px] w-[400px] h-[400px] rounded-full bg-white/[0.06] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="reveal-scale absolute -bottom-[80px] -left-[80px] w-[300px] h-[300px] rounded-full bg-white/[0.06] pointer-events-none"
        style={{ transitionDelay: '0.3s' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="reveal font-serif text-[34px] md:text-[42px] lg:text-[48px] text-white leading-[1.15] tracking-[-0.01em]">
          Dar o primeiro passo é o mais importante
        </h2>

        <p className="reveal reveal-delay-2 mt-6 text-base md:text-lg font-light text-white/85 leading-relaxed max-w-xl mx-auto">
          Você não precisa enfrentar seus desafios sozinho. Estou aqui para caminhar ao seu lado nessa jornada
          de autoconhecimento e transformação.
        </p>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal reveal-delay-3 inline-flex items-center gap-2 mt-10 px-12 py-[18px] bg-white text-sage font-medium text-base rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-beige hover:scale-[1.03] hover:shadow-[0_6px_28px_rgba(0,0,0,0.2)] transition-all duration-300"
        >
          <span className="text-lg">💬</span> Falar no WhatsApp
        </a>

        <div className="reveal-fade reveal-delay-4 flex items-center justify-center gap-2 mt-5">
          <ShieldCheck size={14} className="text-white/60" />
          <span className="text-[13px] font-light text-white/60">
            Resposta em até 2 horas • Consulta inicial sem compromisso
          </span>
        </div>
      </div>
    </section>
  );
}
