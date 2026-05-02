import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] border-t-2 border-[#E63946]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 border-2 border-[#E63946] rounded-sm flex items-center justify-center">
                <span className="font-['Oswald'] text-lg font-bold text-[#E63946]">
                  V
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Oswald'] text-xl font-bold tracking-[0.15em] text-white leading-none">
                  VELOCITA
                </span>
                <span className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase leading-none mt-0.5">
                  Motors
                </span>
              </div>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5">
              Centro de performance e estetica automotiva de alto padrao.
              Excelencia em cada detalhe.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#E63946] hover:border-[#E63946]/40 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-['Oswald'] text-lg font-bold text-white tracking-wide mb-5">
              LINKS RAPIDOS
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Servicos', href: '#services' },
                { label: 'Processo', href: '#process' },
                { label: 'Galeria', href: '#gallery' },
                { label: 'Depoimentos', href: '#testimonials' },
                { label: 'Contato', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#A1A1AA] text-sm hover:text-[#E63946] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#E63946] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Oswald'] text-lg font-bold text-white tracking-wide mb-5">
              SERVICOS
            </h4>
            <ul className="space-y-3">
              {[
                'Revisao Completa',
                'Troca de Oleo Premium',
                'Freios e Suspensao',
                'Eletrica Automotiva',
                'Polimento e Vitrificacao',
                'Higienizacao Interna',
              ].map((service) => (
                <li key={service}>
                  <span className="text-[#A1A1AA] text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Oswald'] text-lg font-bold text-white tracking-wide mb-5">
              CONTATO
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#E63946] flex-shrink-0 mt-0.5" />
                <span className="text-[#A1A1AA] text-sm">
                  Av. Brigadeiro Faria Lima, 3477
                  <br />
                  Itaim Bibi, Sao Paulo - SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#E63946] flex-shrink-0" />
                <a
                  href="https://wa.me/5511914969488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] text-sm hover:text-[#E63946] transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#E63946] flex-shrink-0" />
                <a
                  href="mailto:contato@velocitamotors.com"
                  className="text-[#A1A1AA] text-sm hover:text-[#E63946] transition-colors"
                >
                  contato@velocitamotors.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#52525B] text-sm">
            &copy; 2025 Velocita Motors. Todos os direitos reservados.
          </p>
          <p className="text-[#52525B] text-sm">
            Desenvolvido com{' '}
            <span className="text-[#E63946]">paixao</span> por velocidade
          </p>
        </div>
      </div>
    </footer>
  );
}
