import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function Location() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-carbon">
      <div className="absolute inset-0 blueprint-grid opacity-15" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-[#E63946]/40 text-[#E63946] text-xs tracking-[0.3em] font-['Oswald'] uppercase mb-4">
            Localizacao
          </span>
          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 skew-motion">
            ONDE ESTAMOS
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] rounded-xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0979!2d-46.6539!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsMzMnMDEuOCJTIDQ2wrAzOScxNC4wIlc!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localizacao Velocita Motors"
            />
            <div className="absolute inset-0 pointer-events-none border border-[#E63946]/20 rounded-xl" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#E63946]/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E63946]/20 transition-colors">
                  <MapPin size={22} className="text-[#E63946]" />
                </div>
                <div>
                  <h3 className="font-['Oswald'] text-lg font-bold text-white mb-1">
                    Endereco
                  </h3>
                  <p className="text-[#A1A1AA]">
                    Av. Brigadeiro Faria Lima, 3477
                  </p>
                  <p className="text-[#A1A1AA]">
                    Itaim Bibi, Sao Paulo - SP
                  </p>
                  <p className="text-[#A1A1AA]">CEP: 04538-133</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#E63946]/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E63946]/20 transition-colors">
                  <Clock size={22} className="text-[#E63946]" />
                </div>
                <div>
                  <h3 className="font-['Oswald'] text-lg font-bold text-white mb-1">
                    Horario de Funcionamento
                  </h3>
                  <p className="text-[#A1A1AA]">
                    Segunda a Sexta: 8h as 18h
                  </p>
                  <p className="text-[#A1A1AA]">Sabado: 8h as 13h</p>
                  <p className="text-[#D4AF37] text-sm mt-1">
                    Domingo: Fechado
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#E63946]/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E63946]/20 transition-colors">
                  <Phone size={22} className="text-[#E63946]" />
                </div>
                <div>
                  <h3 className="font-['Oswald'] text-lg font-bold text-white mb-1">
                    Contato
                  </h3>
                  <a
                    href="https://wa.me/5511914969488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A1A1AA] hover:text-[#E63946] transition-colors block"
                  >
                    (11) 99999-9999
                  </a>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail size={14} className="text-[#A1A1AA]" />
                    <a
                      href="mailto:contato@velocitamotors.com"
                      className="text-[#A1A1AA] hover:text-[#E63946] transition-colors text-sm"
                    >
                      contato@velocitamotors.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
