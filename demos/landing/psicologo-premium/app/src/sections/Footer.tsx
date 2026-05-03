import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/5511914969488?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.';

const footerLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  const handleLinkClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-text-primary pt-16 md:pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Col 1 - Brand */}
          <div>
            <h3 className="font-serif text-[28px] text-white">Dra. Sofia Martins</h3>
            <p className="mt-2 text-[15px] font-light text-text-tertiary">Psicóloga Clínica</p>
            <p className="mt-3 text-[13px] font-normal text-gold">CRP 06/123456</p>
          </div>

          {/* Col 2 - Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-4">
              Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-sm font-normal text-white hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-text-tertiary mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-normal text-white hover:text-gold transition-colors duration-300"
                >
                  <MessageCircle size={16} />
                  (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-white/10 my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-text-tertiary text-center md:text-left">
            © 2024 Dra. Sofia Martins. Todos os direitos reservados.
          </p>
          <p className="text-xs font-light text-text-tertiary text-center md:text-right">
            Sigilo garantido conforme o CFP
          </p>
        </div>
      </div>
    </footer>
  );
}
