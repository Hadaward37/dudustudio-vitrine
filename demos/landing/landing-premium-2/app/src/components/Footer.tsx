import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00D4AA] flex items-center justify-center">
                <span className="font-display font-black text-[#0A1628] text-lg">K</span>
              </div>
              <span className="font-display font-bold text-xl text-[#F0F4FF]">
                Krypto Contabilidade
              </span>
            </div>
            <p className="text-sm text-[rgba(240,244,255,0.5)] max-w-sm leading-relaxed mb-6">
              Contabilidade digital de alta performance para MEIs e pequenas empresas.
              Tecnologia, expertise e atendimento humano.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-[rgba(240,244,255,0.5)] hover:text-[#00D4AA] hover:bg-[rgba(0,212,170,0.1)] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-[rgba(240,244,255,0.5)] hover:text-[#00D4AA] hover:bg-[rgba(0,212,170,0.1)] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@krypto.contabilidade"
                className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-[rgba(240,244,255,0.5)] hover:text-[#00D4AA] hover:bg-[rgba(0,212,170,0.1)] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#F0F4FF] text-sm mb-4 uppercase tracking-wider">
              Serviços
            </h4>
            <ul className="space-y-3">
              {['Abertura de Empresa', 'Contabilidade MEI', 'Folha de Pagamento', 'Planejamento Tributário', 'Consultoria'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#servicos"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('servicos');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-sm text-[rgba(240,244,255,0.5)] hover:text-[#00D4AA] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#F0F4FF] text-sm mb-4 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[rgba(240,244,255,0.5)]">
                <MapPin className="w-4 h-4 shrink-0" />
                São Paulo, SP
              </li>
              <li className="text-sm text-[rgba(240,244,255,0.5)]">
                <a
                  href="https://wa.me/5511914969488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00D4AA] transition-colors duration-300"
                >
                  WhatsApp: (11) 91496-9488
                </a>
              </li>
              <li className="text-sm text-[rgba(240,244,255,0.5)]">
                contato@krypto.contabilidade
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgba(240,244,255,0.3)]">
            © 2024 Krypto Contabilidade. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[rgba(240,244,255,0.3)] hover:text-[rgba(240,244,255,0.6)] transition-colors duration-300"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-xs text-[rgba(240,244,255,0.3)] hover:text-[rgba(240,244,255,0.6)] transition-colors duration-300"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
